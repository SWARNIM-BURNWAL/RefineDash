import {
  KanbanAddCardButton,
  KanbanBoard,
  KanbanBoardContainer,
  KanbanItem,
  ProjectCardMemo,
} from "@/components";
import KanbanColumn from "@/components/tasks/kanban/column";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { TaskStage } from "@/graphql/schema.types";
import { TasksQuery } from "@/graphql/types";
import { useList } from "@refinedev/core";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import React, { useMemo } from "react";

export const Tasks = () => {
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

  if(isLoading){
    return <PageSkeleton />;
  }

  const handleAddTask = (args: { stageId: string }) => {};
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
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

            {taskStages.unassigned.length && (
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
            />
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};
