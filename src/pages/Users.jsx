import { useUsers } from "../hooks/useUsers";
import { CustomTable, CustomActions } from "../components/index"
import { useRef } from "react";
import permissionsDefault  from '../mocks/permissions.json'
import { useMemo } from "react";

const statusMap = {
    1: 'Active',
    2: 'Inactive',
    3: 'Suspended'
};

const columns = [
    { header: 'Name', key: 'name' },
    { header: 'Email', key: 'email' },
    { header: 'Profile', key: 'profile' },
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
];

export const Users = () => {
    const firstLoad = useRef(true);

    const {  resUsers, loading, errorUsers, getUsers, activateUser, deactivateUser, editUser} = useUsers()

    if (firstLoad.current) {
        getUsers();
        firstLoad.current = false;
    }

    const Actions =[
        {
            key: 'activate',
            Name: 'Activate',
            Condition : (row) => row.status !== 1,
            Handle : (id) => activateUser(id)
        },
        {
            key: 'deactivate',
            Name: 'Deactivate',
            Condition : (row) => row.status === 1,
            Handle : (id) => deactivateUser(id)
        },
        {
            key: 'edit',
            Name: 'Edit',
            Condition : (row) => true,
            Handle : (id) => editUser(id)
        }
    ]

  return (
    <div className="container-fluid">
        <h2>Users</h2>
        {/* <UsersTable users={resUsers} /> */}

        {
            loading && <p>Loading...</p>
        }

        {
            errorUsers && <p>Error: {errorUsers.message}</p>
        }

        <CustomTable 
            columns={columns} 
            rows={resUsers} 
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
