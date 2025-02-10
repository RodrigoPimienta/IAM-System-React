import { useState } from "react";
import { CustomHeader } from "./CustomHeader";
import Swal from "sweetalert2";

export const CustomForm = ({ title, permissionsPage, actionsHeader = [], fields = [], buttons = [], onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.key]: field.defaultValue || "" }), {})
  );
  const [errors, setErrors] = useState({});

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" }); // Limpia el error cuando el usuario escribe
  };

  // Validaciones dinámicas
  const validateField = (field, value) => {
    if (!field.validation) return null; // Si no hay validaciones, no hay error

    const rules = field.validation.split("|"); // Separar múltiples reglas con "|"

    for (let rule of rules) {
      const [type, param] = rule.split(":");

      if (type === "required" && !value.trim()) {
        return `${field.label} is required`;
      }

      if (type === "same" && formData[param] !== value) {
        return `${field.label} must match ${param}`;
      }

      if (type === "min" && value.length < parseInt(param, 10)) {
        return `${field.label} must be at least ${param} characters`;
      }

      if (type === "max" && value.length > parseInt(param, 10)) {
        return `${field.label} must be at most ${param} characters`;
      }

      if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return `${field.label} must be a valid email`;
      }
    }

    return null;
  };

  // Manejar el submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    // Validar todos los campos antes de enviar
    fields.forEach((field) => {
      const error = validateField(field, formData[field.key]);
      if (error) {
        newErrors[field.key] = error;
      }
    });

    setErrors(newErrors);

    // Si hay errores, no enviamos el formulario
    if (Object.keys(newErrors).length > 0){
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please check the form fields",
        customClass: {
          popup: "small-swal-popup"
        }
      });
    };

    if (onSubmit) {
      onSubmit(formData); // Envía los datos si todo está bien
    }
  };

  return (
    <>  
      <section className="section">
        <section className="section headerSection">
          <CustomHeader title={title} permissions={permissionsPage} actions={actionsHeader} />
        </section>
      </section>
      <section className="section">
        <form onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <p key={index} className="form-group">
              <label htmlFor={field.key}>{field.label}</label>
              {field.input === "input" && (
                <input
                  id={field.key}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.key]}
                  onChange={handleChange}
                  {...(field.required ? { required: true } : {})} // Only add required if it's true
                  className="form-control"
                />
              )}
              {field.input === "select" && (
                <select
                  id={field.key}
                  value={formData[field.key]}
                  onChange={handleChange}
                  {...(field.required ? { required: true } : {})} // Only add required if it's true
                  className="form-control"
                >
                  {field.init && <option value="">{field.init}</option>}
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
              {errors[field.key] && <small id={`${field}.id-helper`} className="errorMessage">{errors[field.key]}</small>} 

            </p>
          ))}

          <div className="button-group">
            {buttons.map((button, index) => (
              <button
                key={index}
                type={button.type || "button"}
                onClick={button.type === "submit" ? undefined : button.handle}
                className={`btn btn_${button.key}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </form>
      </section>
    </>
  );
};
