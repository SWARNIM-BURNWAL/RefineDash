import React, { useState } from "react";
import { Popover, Button } from "antd";
import CustomAvator from "../custom-avatar";
import { useGetIdentity } from "@refinedev/core";
import { Text } from "../text";
import { AccountSettings } from "./account-settings";

import type { User } from "@/graphql/schema.types";
import { SettingFilled } from "@ant-design/icons";

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();
  const [visible, setVisible] = useState(false);
  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text strong style={{ padding: "12px 20px" }}>
        {user?.name}
      </Text>
      <div
        style={{
          marginTop: "5px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          borderTop: "1px solid #f0f0f0",
        }}
      >
        <Button
          style={{ textAlign: "left", color: "rgba(0, 0, 0, 0.65)" }}
          icon={<SettingFilled />}
          type="link"
          block
          onClick={() => {
            setVisible(true);
          }}
        >
          Account Settings
        </Button>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
        content={content}
      >
        <CustomAvator name={user?.name} src={user?.avatarUrl} />
      </Popover>
      {user && <AccountSettings opened={visible}  setOpened={setVisible} userId={user.id}/>}
    </>
  );
};

export default CurrentUser;
