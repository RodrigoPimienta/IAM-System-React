import { useRef } from "react"
import { useNavigate } from "react-router";
import { CustomTable, CustomActions, Loading, Error } from "../../components/index"
import permissionsDefault  from '../../mocks/permissions.json'
import { useModules } from "../../hooks/useModules";

const statusMap = {
    1: 'Active',
    2: 'Inactive',
    3: 'Suspended'
};

const columns = [
    { header: 'Name', key: 'name' },
    {
        header: 'Status',
        key: 'status',
        render: (row) => statusMap[row.status] || 'Unknown'
    },
    {
        header: 'Actions',
        key: 'actions',
        render: (row, ActionsComponent) => <ActionsComponent row={row} />
    }
]

export const Modules = () => {
    let navigate = useNavigate();

    const firstLoad = useRef(true);

    const { modules, loading, errorModules, getModules, activateModule, deactivateModule, editModule } = useModules()

    if (firstLoad.current) {
        getModules();
        firstLoad.current = false;
    }
    
    
    const Actions = [
        {
            key: 'activate',
            Name: 'Activate',
            Condition: (row) => row.status !== 1,
            Handle: (id) => activateModule(id)
        },
        {
            key: 'inactivate',
            Name: 'Inactivate',
            Condition: (row) => row.status === 1,
            Handle: (id) => deactivateModule(id)
        },
        {
            key: 'edit',
            Name: 'Edit',
            Condition: (row) => true,
            Handle: (id) => editModule(id)
        },
        // butoton to see the permissions of the module
        {
            key: 'viewPermissions',
            Name: 'Permissions',
            Condition: (row) => true,
            Handle: (id) => navigate(`/catalogs/modules/${id}/permissions`)
        },
        // buton to see the roles of the module
        {
            key: 'viewRoles',
            Name: 'Roles',
            Condition: (row) => true,
            Handle: (id) => navigate(`/catalogs/modules/${id}/rols`)
        }
    ]

    if (loading) return <Loading />;
    if (errorModules) return <Error message={errorModules} />;

    return (
      <div className="container-fluid">
          <h2>Modules</h2>
          <CustomTable 
                columns={columns} 
                rows={modules} 
                ActionsComponent={(props) => (
                    <CustomActions
                        {...props}
                        permissions={permissionsDefault}
                        actions={Actions}
                    />
                )} />
      </div>
    )
}
