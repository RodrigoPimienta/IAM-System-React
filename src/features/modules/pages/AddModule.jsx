import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import { useError } from "../../../hooks";
import { Loading , CustomForm} from "../../../components";
import { useModules } from "../hooks/useModules";

export const AddModule =({ title, permissionsPage }) => {
    const navigate = useNavigate();
    const { handleGlobalError } = useError();

    const {post, isLoading} = useModules({enabled: false});

    const handleAdd = (formData) => {
        post.mutate(formData, {
          onSuccess: () => {
              Swal.fire({
                  icon: "success",
                  title:"Success",
                  text: "Module added successfully",
                  showConfirmButton: true,
                  timer: 4000,
                  willClose: () => navigate("/admin/modules"),
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
            { key: "cancel", label: "Cancel", handle: () => navigate("/admin/modules") },
            { key: "add", label: "Submit", type: "submit" }, // Este botón ahora usará submit
          ]}
          onSubmit={handleAdd} // Se ejecutará solo al enviar el formulario
        />
      </>
    );
  };

  