import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addFormSubmission } from '../../store/formsSlice';
import { PasswordStrength } from './PasswordStrength';
import {
  createBasicFormSchema,
  genderOptions,
  readImageAsBase64,
  validateImageFile,
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
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const hasCountries = countries.length > 0;

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview('');
      return;
    }

    const imageError = validateImageFile(file);

    if (imageError) {
      setAvatarPreview('');
      setErrors([imageError]);
      return;
    }

    const imageBase64 = await readImageAsBase64(file);

    setAvatarPreview(imageBase64);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(event.target.value);
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
    const formSchema = createBasicFormSchema(countries);
    const validatedForm = formSchema.safeParse(values);

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
    setPassword('');
    setPasswordConfirm('');
    setShowPassword(false);
    setShowPasswordConfirm(false);
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

      <div className="forms-field forms-image-field">
        <span id="uncontrolled-avatar-label">Profile image</span>
        <label className="forms-image-upload" htmlFor="uncontrolled-avatar">
          {avatarPreview ? (
            <img
              className="forms-image-upload-preview"
              src={avatarPreview}
              alt=""
            />
          ) : (
            <span>Choose your Image</span>
          )}
        </label>
        <input
          id="uncontrolled-avatar"
          aria-labelledby="uncontrolled-avatar-label"
          className="forms-file-input"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="forms-password-row">
        <div className="forms-password-control">
          <label className="forms-field" htmlFor="uncontrolled-password">
            <span>Password</span>
            <input
              id="uncontrolled-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
            />
          </label>
          <label
            className="forms-checkbox-label"
            htmlFor="uncontrolled-show-password"
          >
            <input
              id="uncontrolled-show-password"
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
            />
            <span>Show password</span>
          </label>
        </div>
        <PasswordStrength password={password} />
      </div>

      <div className="forms-password-row">
        <div className="forms-password-control">
          <label
            className="forms-field"
            htmlFor="uncontrolled-password-confirm"
          >
            <span>Confirm password</span>
            <input
              id="uncontrolled-password-confirm"
              name="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              onChange={handlePasswordConfirmChange}
            />
          </label>
          <label
            className="forms-checkbox-label"
            htmlFor="uncontrolled-show-password-confirm"
          >
            <input
              id="uncontrolled-show-password-confirm"
              type="checkbox"
              checked={showPasswordConfirm}
              onChange={(event) =>
                setShowPasswordConfirm(event.target.checked)
              }
            />
            <span>Show password</span>
          </label>
        </div>
        <PasswordStrength password={passwordConfirm} />
      </div>

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
