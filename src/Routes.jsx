// src/routes.jsx
import { useRoutes, useNavigate } from 'react-router';
import { QueryClient } from '@tanstack/react-query';
import { usePermissions } from './hooks/usePermissions';
import { PublicLayout, AdminLayout, ProtectedRoute, Login } from './layouts/index';
import { HomePublic, Users, AddUser, UpdateUser , Profiles, Modules, AddModule, UpdateModule, PermissionsModule, AddPermissionsModule, UpdatePermissionsModule, HomePrivate} from './pages/index';
import { PermissionsProvider, ErrorProvider } from './context/index';
import AccessDenied from './components/AccessDenied'; // Importa AccessDenied

const queryClient = new QueryClient();

function RouteWithProps({ component: Component, moduleKey, requiredPermission, ...props }) {
  const { permissions } = usePermissions();

  if (!moduleKey || !requiredPermission || !permissions[moduleKey]?.permissions[requiredPermission]) {
    return <AccessDenied />;
  }

  const permissionsPage = permissions[moduleKey]?.permissions || {};

  const { moduleKey: _, requiredPermission: __, ...restProps } = props;

  return <Component {...{ ...restProps, permissionsPage }} />;
}

// ... el resto de tu código ...
function AppRoutes() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        { index: true, element: <HomePublic /> },
        { path: "home", element: <HomePublic /> },
        { path: "login", element: <Login /> },
      ],
    },
    {
      path: "/admin",
      element: (
        <PermissionsProvider>
          <ErrorProvider>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </ErrorProvider>
        </PermissionsProvider>
      ),
      children: [
        { index: true, element: <HomePrivate /> },
        {
          path: "users",
          element: <RouteWithProps component={Users} title="Users" moduleKey="users" requiredPermission="show" />,
        },
        { path: "users/add",
          element: <RouteWithProps component={AddUser} title="Add User" moduleKey="users" requiredPermission="create" />
        },
        { path: "users/:id_user/update", 
          element: <RouteWithProps component={UpdateUser} title="Update User" moduleKey="users" requiredPermission="update" />
        },
        {
          path: "modules",
          element: <RouteWithProps component={Modules} title="Modules" moduleKey="modules" requiredPermission="show" />,
        },
        { path: "modules/add",
          element: <RouteWithProps component={AddModule} title="Add Module" moduleKey="modules" requiredPermission="create" />
        },
        { path: "modules/:id_module/update", 
          element: <RouteWithProps component={UpdateModule} title="Update Module" moduleKey="modules" requiredPermission="update" />
        },
        { path: "modules/:id_module/permissions", 
          element: <RouteWithProps component={PermissionsModule} title="Permissions Module" moduleKey="modules" requiredPermission="showPermissions" />
        },
        {
          path: "modules/:id_module/permissions/add",
          element: <RouteWithProps component={AddPermissionsModule} title="Add Permission Module" moduleKey="modules" requiredPermission="addPermission" />
        },
        { 
          path: "modules/:id_module/permissions/:id_permission/update",
          element: <RouteWithProps component={UpdatePermissionsModule} title="Update Permission Module" moduleKey="modules" requiredPermission="updatePermission" />
        },

        { path: "profiles", element: <Profiles /> },
        { path: "modules", element: <Modules /> },
        // { path: "modules/:moduleId/rols", element: <ModulesRols /> },
        // { path: "modules/:moduleId/permissions", element: <ModulesPermissions /> },
      ],
    },
  ]);
  return routes;
}

export { AppRoutes, queryClient };