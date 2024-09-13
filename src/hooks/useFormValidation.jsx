import { useState } from "react";
import { normalizeDate } from "utils/dateUtil";
import { useTranslation } from "react-i18next";

const useFormValidation = (initialState, validate) => {
  const { t } = useTranslation();

  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (value, name) => {
    let newValue = value;
    if (name === "height" || name === "weight") {
      newValue = value.replace(/\D/g, ""); // Solo números
    }

    setFormState((prevState) => ({
      ...prevState,
      [name]: newValue === "" ? null : newValue,
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
    errors,
    handleChange,
    handleChangeBirthdate,
    handleValidation,
  };
};

export default useFormValidation;
