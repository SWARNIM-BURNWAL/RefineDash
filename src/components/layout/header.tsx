import { Layout, Space } from "antd";
import CurrentUser from "./current-user";
const Header = () => {
  const headerStyles: React.CSSProperties = {
    backgroundColor: "#171330",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 24px",
    boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
    top: 0,
    position: "sticky",
    zIndex: 999,
  };
  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size="middle">
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};

export default Header;
