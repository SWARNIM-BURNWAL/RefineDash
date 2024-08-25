import {
  KanbanAddCardButton,
  KanbanBoard,
  KanbanBoardContainer,
  KanbanItem,
  ProjectCardMemo,
  ProjectCardSkeleton,
} from "@/components";
import KanbanColumnSkeleton from "@/components/skeleton/kanban";
import KanbanColumn from "@/components/tasks/kanban/column";
import { UPDATE_TASK_STAGE_MUTATION } from "@/graphql/mutations";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { DragEndEvent } from "@dnd-kit/core";
import {   type HttpError,useList, useNavigation, useUpdate } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import React, { useMemo } from "react";
import type { TaskUpdateInput } from "@/graphql/schema.types";
type Task = GetFieldsFromList<TasksQuery>;

export const Tasks = ({ children }: React.PropsWithChildren) => {
  const { replace } = useNavigation();
  const { data: stages, isLoading: isLoadingStages } = useList<TaskStage>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TO DO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
    pagination: {
      mode: "off",
    },
  });
  const { data: tasks, isLoading: isLoadingTasks } = useList<
    GetFieldsFromList<TasksQuery>
  >({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    queryOptions: {
      enabled: !!stages,
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
    pagination: {
      mode: "off",
    },
  });

  const { mutate: updateTask } = useUpdate<Task, HttpError, TaskUpdateInput>({
    resource: "tasks",
    mutationMode: "optimistic",
    successNotification: false,
    meta: {
      gqlMutation: UPDATE_TASK_STAGE_MUTATION,
    },
  });

  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassigned: [],
        stages: [],
      };
    }

    const unassigned = tasks.data.filter((task) => !task.stageId);
    const grouped: TaskStage[] = stages.data.map((stage) => ({
      ...stage,
      tasks: tasks.data.filter((task) => task.stageId?.toString() === stage.id),
    }));
    return {
      unassigned,
      columns: grouped,
    };
  }, [stages, tasks]);

  const isLoading = isLoadingStages || isLoadingTasks;

  if (isLoading) {
    return <PageSkeleton />;
  }

  const handleAddTask = (args: { stageId: string }) => {
    const path =
      args.stageId === "unassigned"
        ? "/tasks/new"
        : `/tasks/new?stageId=${args.stageId}`;

    replace(path);
  };
  const handleOnDragEnd = (event: DragEndEvent) => {
    let stageId = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const taskStageId = event.active.data.current?.stageId;

    if (taskStageId === stageId) {
      return;
    }

    if (stageId === "unassigned") {
      stageId = null;
    }

    updateTask({
      id: taskId,
      values: {
        stageId: stageId,
      },
    });
  };
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          <KanbanColumn
            id="unassigned"
            title={"Unassigned"}
            count={taskStages.unassigned?.length || 0}
            onAddClick={() => handleAddTask({ stageId: "unassigned" })}
          >
            {taskStages?.unassigned.map((task) => (
              <KanbanItem
                key={task.id}
                id={task.id}
                data={{ ...tasks, stageId: "unassinged" }}
              >
                <ProjectCardMemo
                  {...task}
                  dueDate={task.dueDate || undefined}
                />
              </KanbanItem>
            ))}

            {!taskStages.unassigned.length && (
              <KanbanAddCardButton
                onClick={() => handleAddTask({ stageId: "unassigned" })}
              />
            )}
          </KanbanColumn>

          {taskStages.columns?.map((coloum) => (
            <KanbanColumn
              key={coloum.id}
              id={coloum.id}
              title={coloum.title}
              count={coloum.tasks.length}
              onAddClick={() => handleAddTask({ stageId: coloum.id })}
            >
              {!isLoading &&
                coloum.tasks.map((task) => (
                  <KanbanItem key={task.id} id={task.id} data={task}>
                    <ProjectCardMemo
                      {...task}
                      dueDate={task.dueDate || undefined}
                    />
                  </KanbanItem>
                ))}
              {!coloum.tasks.length && (
                <KanbanAddCardButton
                  onClick={() => handleAddTask({ stageId: coloum.id })}
                />
              )}
            </KanbanColumn>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

const PageSkeleton = () => {
  const columns_count = 6;
  const card_count = 4;
  return (
    <KanbanBoardContainer>
      {Array.from({ length: columns_count }).map((_, index) => (
        <KanbanColumnSkeleton key={index}>
          {Array.from({ length: card_count }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))}
        </KanbanColumnSkeleton>
      ))}
    </KanbanBoardContainer>
  );
};
