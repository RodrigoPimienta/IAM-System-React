import { useNavigate } from 'react-router';
import { usePermissions, useError } from "../../../hooks/";
import { Loading , CustomPage} from "../../../components";
import { useUsers } from "../hooks/useUsers";
import Swal from "sweetalert2";

const moduleKey = 'users';
const requiredPermision = 'show';
const statusMap = {
    0: 'Inactive',
    1: 'Active',
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
    const { handleGlobalError } = useError();
    const permissionsPage = permissions[moduleKey]?.permissions || {};

    if (Object.keys(permissionsPage).length === 0 || !permissionsPage[requiredPermision]) {
        navigate('/admin');
        return <Loading />;
    }
    
    const { resUsers, isLoading, error, updateStatus, updatePassword, handleMutationState } = useUsers();
    const handleUpdateStatus = async (row, status) => {
        updateStatus.mutate(
            { id_user: row.id_user, status },
            {
                onSuccess: async () => {
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Status updated successfully",
                        showConfirmButton: true,
                        timer: 4000,
                    });
                    navigate("/admin/users");
                },
                onError: (error) => handleGlobalError(error),
            }
        );
    };
    
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
            handle: (row) => handleUpdateStatus(row, row.status === 1 ? 0 : 1),
        },
        {
            key: 'updateStatus',
            label: 'Enable',
            condition: (row) => row.status === 0,
            handle: (row) => handleUpdateStatus(row, row.status === 1 ? 0 : 1),
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

    if(error  && !isLoading){ 
        handleGlobalError(error);
        handleMutationState(false);
    }

    return (
        <>
            {isLoading && <Loading />}

            {/* {error || errorUsers && <Error text={error.message || errorUsers.message} />} */}
            <div className="container-fluid">
                <CustomPage title='Users' permissionsPage={permissionsPage} actions={actions} actionsHeader={actionsHeader} rows={resUsers || []} columns={columns} />
            </div>
        </>
    );
};