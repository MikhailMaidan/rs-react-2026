import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addFormSubmission } from '../../store/formsSlice';
import {
  basicFormSchema,
  genderOptions,
  getPasswordStrength,
  readImageAsBase64,
  type BasicFormInput,
} from '../../utils/formValidation';
import type { AppDispatch } from '../../store';

interface UncontrolledBasicFormProps {
  countries: string[];
  countriesError: string;
  isLoadingCountries: boolean;
  onSuccess: () => void;
}

export const UncontrolledBasicForm = ({
  countries,
  countriesError,
  isLoadingCountries,
  onSuccess,
}: UncontrolledBasicFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<string[]>([]);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('Weak');
  const hasCountries = countries.length > 0;

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview('');
      return;
    }

    const imageBase64 = await readImageAsBase64(file);

    setAvatarPreview(imageBase64);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordStrength(getPasswordStrength(event.target.value));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values: BasicFormInput = {
      name: String(formData.get('name') ?? '').trim(),
      age: String(formData.get('age') ?? ''),
      email: String(formData.get('email') ?? '').trim(),
      gender: String(formData.get('gender') ?? ''),
      country: String(formData.get('country') ?? '').trim(),
      password: String(formData.get('password') ?? ''),
      passwordConfirm: String(formData.get('passwordConfirm') ?? ''),
      avatar: avatarPreview,
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
    setAvatarPreview('');
    setPasswordStrength('Weak');
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

      <label className="forms-field" htmlFor="uncontrolled-country">
        <span>Country</span>
        <input
          id="uncontrolled-country"
          name="country"
          type="text"
          list="countries-list"
          disabled={isLoadingCountries && !hasCountries}
          placeholder={isLoadingCountries ? 'Loading countries...' : 'Country'}
        />
        {countriesError && (
          <span className="forms-field-error">{countriesError}</span>
        )}
      </label>

      <label className="forms-field" htmlFor="uncontrolled-avatar">
        <span>Profile image</span>
        <input
          id="uncontrolled-avatar"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </label>

      {avatarPreview && (
        <img className="forms-avatar-preview" src={avatarPreview} alt="" />
      )}

      <label className="forms-field" htmlFor="uncontrolled-password">
        <span>Password</span>
        <input
          id="uncontrolled-password"
          name="password"
          type="password"
          onChange={handlePasswordChange}
        />
        <span className="forms-help-text">Strength: {passwordStrength}</span>
      </label>

      <label className="forms-field" htmlFor="uncontrolled-password-confirm">
        <span>Confirm password</span>
        <input
          id="uncontrolled-password-confirm"
          name="passwordConfirm"
          type="password"
        />
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
