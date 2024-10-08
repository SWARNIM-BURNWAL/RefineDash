import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { liveProvider, dataProvider, authProvider } from "./providers";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Home, Login, Register, ForgotPassword } from "./pages";
import Layout from "./components/layout";
import { Authenticated } from "@refinedev/core";
import { Resources } from "./config/resources";
import { Companies } from "./pages/company/list";
import { EditCompany } from "./pages/company/edit";
import { Tasks } from "./pages/tasks/list";
import TaskCreatePage from "./pages/tasks/create";
import TaskEditPage from "./pages/tasks/edit";

import Create from "./pages/company/create";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              liveProvider={liveProvider}
              notificationProvider={useNotificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={Resources}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                useNewQueryKeys: true,
                projectId: "EFdRwq-RaN6Ob-9jNtV3",
                liveMode: "auto",
              }}
            >
              <Routes>
                {/* <Route index element={<WelcomePage />} /> */}
                <Route element={<Register />} path="/register" />
                <Route element={<Login />} path="/login" />
                <Route element={<ForgotPassword />} path="/forgot-password" />

                <Route
                  element={
                    <Authenticated
                      key="authenticated-test"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="/companies">
                    <Route index element={<Companies />} />
                    <Route path="new" element={<Create />} />
                    <Route path="edit/:id" element={<EditCompany />} />
                  </Route>
                  <Route
                    path="/tasks"
                    element={
                      <Tasks>
                        <Outlet />
                      </Tasks>
                    }
                  >
                    <Route path="new" element={<TaskCreatePage />} />
                    <Route path="edit/:id" element={<TaskEditPage />} />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
