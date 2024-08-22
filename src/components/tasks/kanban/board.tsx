import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  TouchSensor,
  useSensors,
} from "@dnd-kit/core";
import React from "react";

interface Props {
  onDragEnd: (event: DragEndEvent) => void;
}
export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: "calc(100% - 20px)",
        height: "calc(100vh - 200px)",
        display: "flex",
        justifyContent: "column",
        margin: "-32px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          padding: "32px",
          overflowX: "auto",
          height: "100%",
          width: "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  const touchsensor = useSensor(TouchSensor, {
    activationConstraint: { distance: 10 },
  });
  const sensors = useSensors(mouseSensor, touchsensor);
  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  );
};
