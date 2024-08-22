import { User } from "@/graphql/schema.types";
import { Button, Card, ConfigProvider, theme, Tag, Space, Tooltip } from "antd";
import { Text } from "@/components/text";
import Dropdown from "antd/es/dropdown/dropdown";
import { useMemo } from "react";
import React from "react";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MenuOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd/lib";
import dayjs from "dayjs";
import { getDateColor } from "@/utilities";
import CustomAvator from "@/components/custom-avatar";
import { useDelete, useNavigation } from "@refinedev/core";

interface ProjectCardProps {
  id: string;
  title: string;
  updatatedAt: string;
  dueDate?: string;
  users?: [
    {
      id: string;
      name: string;
      avatarUrl?: User["avatarUrl"];
    },
  ];
}

const ProjectCard = ({ id, title, dueDate, users }: ProjectCardProps) => {
  const { token } = theme.useToken();
  const { edit } = useNavigation();
  const { mutate } = useDelete();
  const dropdownitems = useMemo(() => {
    const dropdownitems: MenuProps["items"] = [
      {
        key: "1",
        label: "View Card",
        icon: <EyeOutlined />,
        onClick: () => {
          edit("tasks", id, "replace");
        },
      },

      {
        danger: true,
        key: "2",
        label: "Delete",
        icon: <DeleteOutlined />,
        onClick: () => {
          mutate({
            resource: "tasks",
            id,
            meta: {
              operation: "task",
            },
          });
        },
      },
    ];
    return dropdownitems;
  }, []);

  const dueDateOptions = useMemo(() => {
    if (!dueDate) {
      return null;
    }
    const date = dayjs(dueDate).format("MMM DD");
    return {
      color: getDateColor({ date: dueDate }) as string,
      text: date,
    };
  }, []);
  return (
    <ConfigProvider
      theme={{
        components: {
          Tag: {
            colorText: token.colorTextSecondary,
          },
          Card: {
            headerBg: "transparent",
          },
        },
      }}
    >
      <Card
        size="small"
        title={<Text ellipsis={{ tooltip: title }}>{title}</Text>}
        onClick={() => edit()}
        extra={
          <Dropdown
            trigger={["click"]}
            menu={{
              items: dropdownitems,
            }}
            placement="bottomRight"
            arrow={{ pointAtCenter: true }}
          >
            <Button
              type="text"
              size="small"
              shape="circle"
              icon={
                <MoreOutlined
                  style={{
                    transform: "rotate(90deg)",
                  }}
                />
              }
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        }
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <MenuOutlined />
          {dueDateOptions && (
            <Tag
              icon={<ClockCircleOutlined style={{ fontSize: "12px" }} />}
              style={{
                padding: "0 4px",
                marginInlineEnd: "4px",
                backgroundColor:
                  dueDateOptions.color === "default" ? "transparent" : "unset",
              }}
              color={dueDateOptions.color}
              bordered={dueDateOptions.color !== "default"}
            >
              {dueDateOptions.text}
            </Tag>
          )}
          {!!users?.length && (
            <Space
              size={4}
              wrap
              direction="horizontal"
              align="center"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "auto",
                marginRight: "0",
              }}
            >
              {users.map((user) => {
                return (
                  <Tooltip title={user.name} key={user.id}>
                    <CustomAvator
                      src={user.avatarUrl}
                      alt={user.name}
                      size="small"
                    />
                  </Tooltip>
                );
              })}
            </Space>
          )}
        </div>
      </Card>
    </ConfigProvider>
  );
};

export const ProjectCardMemo = React.memo(
  ProjectCard,
  (prevProps, nextProps) => {
    return (
      prevProps.id === nextProps.id &&
      prevProps.title === nextProps.title &&
      prevProps.updatatedAt === nextProps.updatatedAt &&
      prevProps.dueDate === nextProps.dueDate &&
      prevProps.users === nextProps.users?.length &&
      prevProps.updatatedAt === nextProps.updatatedAt
    );
  }
);
