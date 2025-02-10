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
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    const permissionsPage = permissions[moduleKey]?.permissions || {};
    const { resUsers, isLoading, isLoadingUsers, error, errorUsers, editUser, updateStatus, updatePassword } = useUsers();
    const actions = [
        {
            key: 'update',
            label: 'Edit',
            condition: (row) => true,
            handle: (row) => navigate(`/admin/users/${row.id_user}/update`)
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

    const actionsHeader = [
        {key: 'create', label: 'New user', handle: () => {navigate('/admin/users/add')}},
    ]
    
    return (
        <>
            {isLoading || isLoadingUsers && <Loading />}
            {error || errorUsers && <Error text={error.message || errorUsers.message} />}
            <div className="container-fluid">
                <CustomPage title='Users' permissionsPage={permissionsPage} actions={actions} actionsHeader={actionsHeader} rows={resUsers || []} columns={columns} />
            </div>
        </>
    );
};
