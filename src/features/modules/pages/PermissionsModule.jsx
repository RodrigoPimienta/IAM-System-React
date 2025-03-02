import { useNavigate, useParams} from 'react-router';
import Swal from "sweetalert2";
import { useError } from "../../../hooks";
import { Loading , CustomPage} from "../../../components";
import { usePermissionsModule, useModules } from "../hooks";
import { statusMapPermissionsModules as statusMap } from '../constants';
 
  export const PermissionsModule = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { id_module } = useParams();
    const { handleGlobalError } = useError();

    const { resModules } = useModules();
    const currentModule = resModules.find((module) => module.id_module == id_module);
    const { resPermissions,refetch, isLoading, error, updateStatus, handleMutationState } = usePermissionsModule({id_module});
    const handleUpdateStatus = async (row, status) => {
        updateStatus.mutate(
            { id_permission: row.id_permission, status },
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
              title={`${title} : ${currentModule?.name}`} 
              permissionsPage={permissionsPage} 
              rows={resPermissions || []} 
              actionsHeader={[
                  {key: 'create', label: 'New permission', handle: () => {navigate(`/admin/modules/${id_module}/permissions/add`)}},
                  {key: 'show', label: 'Back', handle: () => {navigate('/admin/modules')}},
              ]} 
              actions={[
                  {
                      key: 'update',
                      label: 'Edit',
                      condition: (row) => true,
                      handle: (row) => navigate(`/admin/modules/${row.id_module}/permissions/${row.id_permission}/update`)
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