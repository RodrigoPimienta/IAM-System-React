import Swal from "sweetalert2";

export const Error = ({icon = 'error', tittle ='Error', text}) => {
  // regresar un sweetalert con el icono, titulo y texto
  return (
    Swal.fire({
      icon: icon,
      title: tittle,
      text: text,
    })
  );
}
