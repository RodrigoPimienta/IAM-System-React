import {usePermissions} from '../../../hooks/usePermissions';
import { useUsers } from "../hooks/useUsers";
import { Loading , CustomPage} from "../../../components";
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";
import { useAuth } from '../../../hooks/useAuth';

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
    const {kickOut} = useAuth();
    const { permissions, refetch } = usePermissions();
    const permissionsPage = permissions[moduleKey]?.permissions || {};

    if (Object.keys(permissionsPage).length === 0 || !permissionsPage[requiredPermision]) {
        navigate('/admin');
        return <Loading />;
    }
    
    const { resUsers, isLoading, error, updateStatus, updatePassword, handleMutationState } = useUsers();
    const handleErros = {
        403: () => refetch(),
        401: (error) => kickOut(null),
      }
    
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
                    onError: (err) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: err.message,
                        }).then(() => {
                            if(handleErros[err?.status]){
                                handleErros[err.status](err);
                            }
                        
                    });
                },
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
        Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error?.message,
            }).then((result) => {
                if(result.isConfirmed){
                    if(handleErros[error?.status]){
                        handleErros[error.status](error);
                    }
                    handleMutationState(false);
                }
            });
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