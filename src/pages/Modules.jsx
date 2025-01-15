import { useRef } from "react"
import { CustomTable, CustomActions, Loading, Error } from "../components/index"
import permissionsDefault  from '../mocks/permissions.json'
import { useModules } from "../hooks/useModules";

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
            key: 'deactivate',
            Name: 'Deactivate',
            Condition: (row) => row.status === 1,
            Handle: (id) => deactivateModule(id)
        },
        {
            key: 'edit',
            Name: 'Edit',
            Condition: (row) => true,
            Handle: (id) => editModule(id)
        }
    ]

    if (loading) return <Loading />;
    if (errorModules) return <Error />;

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
