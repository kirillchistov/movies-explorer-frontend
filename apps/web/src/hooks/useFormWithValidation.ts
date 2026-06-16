//  Хук для управления формой и валидации данных  //
import { useState, useCallback } from 'react';

type FormValues = Record<string, string>;

const useFormWithValidation = () => {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FormValues>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { value, name, validationMessage } = event.target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: validationMessage });
    setIsValid(event.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues: FormValues = {}, newErrors: FormValues = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export default useFormWithValidation;