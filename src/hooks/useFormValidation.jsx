import { useState } from "react";
import { normalizeDate } from "../utils/dateUtil";
import { useTranslation } from "react-i18next";

const useFormValidation = (initialState, validate) => {
  const { t } = useTranslation();

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (value, name) => {
    let newValue = value;

    if (name === "height" || name === "weight") {
      newValue = value.replace(/\D/g, ""); // Solo números
      newValue = newValue === "" ? null : Number(newValue); // Convertir a número
    }

    // Manejo de checkbox
    if (typeof value === "boolean") {
      newValue = value ? 1 : 0;
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleChangeBirthdate = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      birthdate: normalizeDate(date),
    }));
  };

  const handleValidation = () => {
    const validationErrors = validate(formState, t);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formState,
    setFormState,
    errors,
    handleChange,
    handleChangeBirthdate,
    handleValidation,
  };
};

export default useFormValidation;
