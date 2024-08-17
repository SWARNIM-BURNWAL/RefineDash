import { DndContext } from "@dnd-kit/core";
import React from "react";

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
      <div style={{
        display: "flex",
        gap: "20px",
        padding: "32px",
        overflowX: "auto",
        height: "100%",
        width: "100%",
      }}>{children}</div>
    </div>
  );
};

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{children}</DndContext>;
};
