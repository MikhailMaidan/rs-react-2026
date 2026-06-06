import { useState, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addFormSubmission } from '../../store/formsSlice';
import { basicFormSchema, genderOptions } from '../../utils/formValidation';
import type { AppDispatch } from '../../store';
import type { BasicFormValues } from '../../types/forms';

interface UncontrolledBasicFormProps {
  onSuccess: () => void;
}

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
    const validatedForm = basicFormSchema.safeParse(values);

    if (!validatedForm.success) {
      setErrors(
        validatedForm.error.issues.map((issue) => {
          return issue.message;
        })
      );
      return;
    }

    dispatch(
      addFormSubmission({
        formType: 'Uncontrolled',
        values: validatedForm.data,
      })
    );
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
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
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
