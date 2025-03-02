import { useNavigate, useParams  } from "react-router";
import Swal from "sweetalert2";
import { useError } from "../../../hooks";
import { Loading , CustomForm} from "../../../components";
import { usePermissionsModule } from "../hooks/usePermissionsModule";


export const UpdatePermissionsModule = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    // Obtener el id del usuario de la URL
    const { id_module, id_permission } = useParams();
    const { handleGlobalError } = useError();
    const {edit, resPermissions, isLoading} = usePermissionsModule({id_module});

    const permission = resPermissions.find((resPermission) => resPermission.id_permission == id_permission && resPermission.id_module == id_module);

    if(!permission) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Module not found",
            timer: 3000,
            willClose: () => navigate(`/admin/modules/${id_module}/permissions`),
        });
    }

    const handleUpdate = (formData) => {
        edit.mutate({id_permission, formData}, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "Permission updated successfully",
                  showConfirmButton: true,
                  timer: 4000,
                  willClose: () => navigate(`/admin/modules/${id_module}/permissions`),
              });
          },
          onError: (error) => handleGlobalError(error),
      });
  };
  

    return (
      <>
       {isLoading && <Loading />}
        <CustomForm
          title={title}
          permissionsPage={permissionsPage}
          actionsHeader={[]}
          fields={[
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true},
            { key: "key", input: "input", type: "text", label: "Key", placeholder: "Enter key", required: true},
          ]}
            defaultValues={{
                name: permission.name,
                key: permission.key,
            }}        
          buttons={[
            { key: "cancel", label: "Cancel", handle: () => navigate(`/admin/modules/${id_module}/permissions`) },
            { key: "update", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleUpdate} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

