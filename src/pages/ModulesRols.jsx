import { useRef } from "react";
import { Link, useParams } from "react-router";
import { CustomTable, CustomActions, Loading, Error } from "../components/index";
import permissionsDefault from "../mocks/permissions.json";
import { useRols } from "../hooks/useRols";

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
  
  export const ModulesRols = () => {
    const { moduleId } = useParams();
    const firstLoad = useRef(true);

    const { 
      rols,
      module, 
      loading, 
      errorRols, 
      getRols, 
      activateRol, 
      deactivateRol, 
      editRol 
    } = useRols();
  

    if (firstLoad.current) {
        getRols(moduleId);
        firstLoad.current = false;
    }

  
    const Actions = [
      {
        key: "activate",
        Name: "Activate",
        Condition: (row) => row.status !== 1,
        Handle: activateRol,
      },
      {
        key: 'inactivate',
        Name: 'Inactivate',
        Condition: (row) => row.status === 1,
        Handle: deactivateRol,
      },
      {
        key: "edit",
        Name: "Edit",
        Condition: () => true,
        Handle: editRol,
      },
    ];
  
  
    if (loading) return <Loading />;
    if (errorRols) return <Error message={errorRols} />;
    
    return (
      <div className="container-fluid">
        <h2>
          <Link className="linkCustom" to="/catalogs/modules">
            {
                module.name
            }
          </Link>
          {" > "} Rols
        </h2>
        <CustomTable
          columns={columns}
          rows={rols}
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