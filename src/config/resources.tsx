import {
  DashboardOutlined,
  ProductOutlined,
  TableOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { IResourceItem } from "@refinedev/core";

export const resources: IResourceItem[] = [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "sensors",
    list: "/sensors",
    show: "/sensors/:id",
    create: "/sensors/new",
    edit: "/sensors/edit/:id",
    meta: {
      label: "Sensors",
      icon: <ProductOutlined />,
    },
  },
  {
    name: "reports",
    list: "/reports",
    show: "/reports/:id",
    create: "/reports/new",
    edit: "/reports/edit/:id",
    meta: {
      label: "Reports",
      icon: <TableOutlined />,
    },
  },
  {
    name: "user-management",
    list: "/user-management",
    show: "/user-management/:id",
    create: "/user-management/new",
    edit: "/user-management/edit/:id",
    meta: {
      label: "User Management",
      icon: <TeamOutlined />,
    },
  },
];
