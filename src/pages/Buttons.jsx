
import { useRef } from "react"
import { CustomTable, CustomActions, Loading, Error } from "../components/index"
import permissionsDefault  from '../mocks/permissions.json'
import { useButtons } from "../hooks/useButtons";

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

export const Buttons = () => {

    const firstLoad = useRef(true);

    const { buttons, loading, errorButtons, getButtons, activateButton, deactivateButton, editButton } = useButtons()

    if (firstLoad.current) {
        getButtons();
        firstLoad.current = false;
    }
    
    
    const Actions = [
        {
            key: 'activate',
            Name: 'Activate',
            Condition: (row) => row.status !== 1,
            Handle: (id) => activateButton(id)
        },
        {
            key: 'deactivate',
            Name: 'Deactivate',
            Condition: (row) => row.status === 1,
            Handle: (id) => deactivateButton(id)
        },
        {
            key: 'edit',
            Name: 'Edit',
            Condition: (row) => true,
            Handle: (id) => editButton(id)
        }
    ]

    if (loading) return <Loading />;
    if (errorButtons) return <Error />;

    return (
      <div className="container-fluid">
          <h2>Modules</h2>
          <CustomTable 
                columns={columns} 
                rows={buttons} 
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
