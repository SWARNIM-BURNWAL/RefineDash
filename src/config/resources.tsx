import { IResourceItem } from "@refinedev/core";
import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";

export const Resources: IResourceItem[] = [
  {
    name: "Dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },

  {
    name: "Comapany",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/new",
    edit: "/companies/edit/:id",
    meta: {
      label: "Companies",
      icon: <ShopOutlined />,
    },
  },
  {
    name:"Tasks",
    list:"/tasks",
    create:"/tasks/new",
    edit:"/tasks/edit/:id",
    meta:{
        label:"Tasks",
        icon:<ProjectOutlined/>
    }
  }
];
