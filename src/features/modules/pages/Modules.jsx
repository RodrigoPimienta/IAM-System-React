import { useNavigate } from 'react-router';
import Swal from "sweetalert2";
import { useError } from "../../../hooks/";
import { Loading , CustomPage} from "../../../components";
import { useModules } from "../hooks";
import { statusMapModules as statusMap } from '../constants';
 
  export const Modules = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { handleGlobalError } = useError();

    const { resModules,refetch, isLoading, error, updateStatus, handleMutationState } = useModules();
    const handleUpdateStatus = async (row, status) => {
        updateStatus.mutate(
            { id_module: row.id_module, status },
            {
                onSuccess: async () => {
                    await Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Status updated successfully",
                        showConfirmButton: true,
                        timer: 4000,
                        willClose: () => refetch(),
                    });
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
              rows={resModules || []} 
              actionsHeader={[
                  {key: 'create', label: 'New module', handle: () => {navigate('/admin/modules/add')}},
              ]} 
              actions={[
                  {
                      key: 'update',
                      label: 'Edit',
                      condition: (row) => true,
                      handle: (row) => navigate(`/admin/modules/${row.id_module}/update`)
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
                    key: 'showPermissions',
                    label: 'Show Permissions',
                    condition: (row) => true,
                    handle: (row) => navigate(`/admin/modules/${row.id_module}/permissions`)
                  }
              ]} 
              columns={[
                  { header: 'Name', key: 'name' },
                  { header: 'Key', key: 'key' },
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