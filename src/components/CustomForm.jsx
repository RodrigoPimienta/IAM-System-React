import { useState } from "react";
import { CustomHeader } from "./CustomHeader";

export const CustomForm = ({ title, permissionsPage, actionsHeader = [], fields = [], buttons = [], onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.defaultValue || "" }), {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (onSubmit) {
      onSubmit(formData); // Ejecuta la función `onSubmit` pasando los datos
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
            <div key={index} className="form-group">
              <label htmlFor={field.id}>{field.label}</label>
              {field.input === "input" && (
                <input
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
                  className="form-control"
                />
              )}
              {field.input === "select" && (
                <select
                  id={field.id}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required={field.required}
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
            </div>
          ))}

          <div className="button-group">
            {buttons.map((button, index) => (
              <button
                key={index}
                type={button.type || "button"}
                onClick={button.type === "submit" ? undefined : button.handle} // Evita onClick en el botón de submit
                className="btn"
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
