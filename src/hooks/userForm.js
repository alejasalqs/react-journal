import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const reset = (newFormState = initialState) => {
    setValues(newFormState);
  };

  return [values, handleInputChange, reset];
};
