import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addFormSubmission } from '../../store/formsSlice';
import type { AppDispatch } from '../../store';
import type { BasicFormValues } from '../../types/forms';

interface UncontrolledBasicFormProps {
  onSuccess: () => void;
}

const getEmailError = (email: string) => {
  const emailParts = email.split('@');

  if (emailParts.length !== 2) {
    return 'Email should contain one @ symbol.';
  }

  if (!emailParts[0] || !emailParts[1]) {
    return 'Email local part and domain are required.';
  }

  if (!emailParts[1].includes('.')) {
    return 'Email domain should contain a dot.';
  }

  return '';
};

const validateForm = (values: BasicFormValues) => {
  const errors: string[] = [];

  if (!values.name) {
    errors.push('Name is required.');
  } else if (values.name[0] !== values.name[0].toUpperCase()) {
    errors.push('Name should start with an uppercase letter.');
  }

  if (!Number.isFinite(values.age) || values.age < 0) {
    errors.push('Age should be a positive number.');
  }

  const emailError = getEmailError(values.email);

  if (emailError) {
    errors.push(emailError);
  }

  if (!values.gender) {
    errors.push('Please select gender.');
  }

  if (!values.acceptedTerms) {
    errors.push('Terms and Conditions should be accepted.');
  }

  return errors;
};

export const UncontrolledBasicForm = ({
  onSuccess,
}: UncontrolledBasicFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values: BasicFormValues = {
      name: String(formData.get('name') ?? '').trim(),
      age: Number(formData.get('age')),
      email: String(formData.get('email') ?? '').trim(),
      gender: String(formData.get('gender') ?? ''),
      acceptedTerms: formData.get('terms') === 'on',
    };
    const newErrors = validateForm(values);

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addFormSubmission({ formType: 'Uncontrolled', values }));
    event.currentTarget.reset();
    setErrors([]);
    onSuccess();
  };

  return (
    <form className="forms-grid" onSubmit={handleSubmit}>
      <label className="forms-field" htmlFor="uncontrolled-name">
        <span>Name</span>
        <input id="uncontrolled-name" name="name" type="text" />
      </label>

      <label className="forms-field" htmlFor="uncontrolled-age">
        <span>Age</span>
        <input id="uncontrolled-age" name="age" type="number" />
      </label>

      <label className="forms-field sm:col-span-2" htmlFor="uncontrolled-email">
        <span>Email</span>
        <input id="uncontrolled-email" name="email" type="email" />
      </label>

      <label className="forms-field" htmlFor="uncontrolled-gender">
        <span>Gender</span>
        <select id="uncontrolled-gender" name="gender" defaultValue="">
          <option value="" disabled>
            Select gender
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label
        className="flex items-center gap-3 text-sm text-zinc-100 sm:col-span-2"
        htmlFor="uncontrolled-terms"
      >
        <input id="uncontrolled-terms" name="terms" type="checkbox" />
        <span>I accept Terms and Conditions</span>
      </label>

      {errors.length > 0 && (
        <div className="forms-errors sm:col-span-2" role="alert">
          {errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}

      <button className="forms-primary-button sm:col-span-2" type="submit">
        Submit uncontrolled form
      </button>
    </form>
  );
};
