import { useNavigate } from 'react-router';
import Swal from "sweetalert2";
import { useError } from "../../../hooks/";
import { Loading , CustomPage} from "../../../components";
import { useUsers } from "../hooks/useUsers";
import { statusMap } from '../constants';
 
  export const Users = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { handleGlobalError } = useError();

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


    if(error  && !isLoading){ 
        handleGlobalError(error);
        handleMutationState(false);
    }

    return (
      <>
        {isLoading && <Loading />}

        <div className="container-fluid">
          <CustomPage 
              title={title} 
              permissionsPage={permissionsPage} 
              rows={resUsers || []} 
              actionsHeader={[
                  {key: 'create', label: 'New user', handle: () => {navigate('/admin/users/add')}},
              ]} 
              actions={[
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
              ]} 
              columns={[
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
              ]} 
          />
        </div>
      </>
    );
};