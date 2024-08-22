import { UseDroppableArguments, useDroppable } from "@dnd-kit/core";
import { Badge, Space, Button } from "antd";
import { Text } from "@/components/text";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments["data"];
  onAddClick?: (args: { id: string }) => void;
};

const KanbanColumn = ({
  children,
  id,
  title,
  description,
  count, 
  data,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
  });

  const onClickHnadler = () => {};
  return (
    <div
      ref={setNodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0 16px",
      }}
    >
      <div
        style={{
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        <Space style={{ width: "100%", justifyContent: "space-between" }}>
          <Space>
            <Text
              ellipsis={{ tooltip: title }}
              size="md"
              strong
              style={{
                textTransform: "capitalize",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Text>
            {!!count && <Badge count={count} color="blue" />}
          </Space>
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            onClick={onClickHnadler}
          />
        </Space>
        {description}
      </div>
      <div
        style={{
          flex: 1,
          overflowY: active ? "unset" : "scroll",
          border: "1px dashed #d9d9d9",
          backgroundColor: isOver ? "#f7f7f7" : "transparent",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            marginTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            padding: "16px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default KanbanColumn;
