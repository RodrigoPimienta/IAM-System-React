import {usePermissions} from '../../../hooks/usePermissions';
import { useUsers } from "../hooks/useUsers";
import { Loading, Error , CustomPage} from "../../../components";
import { useNavigate } from 'react-router';

const moduleKey = 'users';
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
    const { permissions } = usePermissions();
    const permissionsPage = permissions[moduleKey]?.permissions || {};
    const { resUsers, isLoading, error, editUser, updateStatus, updatePassword } = useUsers();
    const actions = [
        {
            key: 'update',
            label: 'Edit',
            condition: (row) => true,
            handle: (id) => editUser.mutate(id)
        },
        {
            key: 'updateStatus',
            label: 'Disable',
            condition: (row) => row.status === 1,
            handle: (id) => updateStatus.mutate({id_user, status: 0})
        },
        {
            key: 'updateStatus',
            label: 'Enable',
            condition: (row) => row.status === 0,
            handle: (id) => updateStatus.mutate({id_user, status: 1})
        },
        {
            key: 'updatePassword',
            label: 'Enable',
            condition: (row) => row.id_user === 0,
            handle: (id) => updatePassword.mutate({id_user, status: 1})
        }
    ];

    const navigate = useNavigate();
    const actionsHeader = [
        {key: 'create', label: 'Add User', handle: () => {navigate('/admin/users/add')}},
    ]
    
    return (
        <>
            {isLoading && <Loading />}
            {error && <Error text={error.message} />}
            <div className="container-fluid">
                <CustomPage title='Users' permissionsPage={permissionsPage} actions={actions} actionsHeader={actionsHeader} rows={resUsers || []} columns={columns} />
            </div>
        </>
    );
};
