import { useNavigate, useParams  } from "react-router";
import Swal from "sweetalert2";
import { useError } from "../../../hooks";
import { Loading , CustomForm} from "../../../components";
import { useModules } from "../hooks/useModules";


export const UpdateModule = ({ title, permissionsPage }) => {
    const navigate = useNavigate();
    // Obtener el id del usuario de la URL
    const { id_module } = useParams();
    const { handleGlobalError } = useError();
    const {edit, resModules, isLoading} = useModules();
    const module = resModules.find((user) => user.id_module == id_module);

    if(!module) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Module not found",
            timer: 3000,
            willClose: () => navigate("/admin/modules"),
        });
    }

    const handleUpdate = (formData) => {
        edit.mutate({id_module, formData}, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "Module updated successfully",
                  showConfirmButton: true,
                  timer: 4000,
              }).then(() => {
                  navigate("/admin/users");
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
                name: module.name,
                key: module.key,
            }}        
          buttons={[
            { key: "cancel", label: "Cancel", handle: () => navigate("/admin/modules") },
            { key: "update", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleUpdate} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

