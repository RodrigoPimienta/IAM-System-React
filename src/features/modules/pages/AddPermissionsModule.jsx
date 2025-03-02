import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useError } from "../../../hooks";
import { Loading , CustomForm} from "../../../components";
import { usePermissionsModule } from "../hooks/usePermissionsModule";

export const AddPermissionsModule =({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { id_module } = useParams();
    const { handleGlobalError } = useError();
    const {post, isLoading} = usePermissionsModule({enabled: false, id_module});

    const handleAdd = (formData) => {
        post.mutate(formData, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "Permission added successfully",
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
            { key: "name", input: "input", type: "text", label: "Name", placeholder: "Enter name", required: true },
            { key: "key", input: "input", type: "text", label: "Key", placeholder: "Enter key", required: true },
          ]}
          buttons={[
            { key: "cancel", label: "Cancel", handle: () => navigate(`/admin/modules/${id_module}/permissions`) },
            { key: "add", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleAdd} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

  