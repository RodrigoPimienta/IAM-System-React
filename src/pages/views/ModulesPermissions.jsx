import { useRef } from "react";
import { Link, useParams } from "react-router";
import { CustomTable, CustomActions, Loading, Error } from "../../components/index";
import permissionsDefault from "../../mocks/permissions.json";
import { useModelsPermissions } from "../../hooks/useModelsPermissions";

const statusMap = {
    1: "Active",
    2: "Inactive",
    3: "Suspended",
  };
  
  const columns = [
    { header: "Name", key: "name" },
    {
      header: "Status",
      key: "status",
      render: (row) => statusMap[row.status] || "Unknown",
    },
    {
      header: "Actions",
      key: "actions",
      render: (row, ActionsComponent) => <ActionsComponent row={row} />,
    },
  ];
  
  export const ModulesPermissions = () => {
    const { moduleId } = useParams();
    const firstLoad = useRef(true);

    const { 
      permissions,
      loading, 
      errorPermissions, 
      getPermissions, 
      activatePermission, 
      deactivatePermission, 
      editPermission 
    } = useModelsPermissions();
  

    if (firstLoad.current) {
        getPermissions(moduleId);
        firstLoad.current = false;
    }

  
    const Actions = [
      {
        key: "activate",
        Name: "Activate",
        Condition: (row) => row.status !== 1,
        Handle: activatePermission,
      },
      {
        key: 'inactivate',
        Name: 'Inactivate',
        Condition: (row) => row.status === 1,
        Handle: deactivatePermission,
      },
      {
        key: "edit",
        Name: "Edit",
        Condition: () => true,
        Handle: editPermission,
      },
    ];
  
  
    if (loading) return <Loading />;
    if (errorPermissions) return <Error message={errorPermissions} />;
    
    console.log(permissions);
    return (
      <div className="container-fluid">
        <h2>
          <Link className="linkCustom" to="/catalogs/modules">
            {
                permissions.module
            }
          </Link>
          {" > "} Permissions
        </h2>
        <CustomTable
          columns={columns}
          rows={permissions.permissions}
          ActionsComponent={(props) => (
            <CustomActions 
              {...props} 
              permissions={permissionsDefault} 
              actions={Actions} 
            />
          )}
        />
      </div>
    );
  };