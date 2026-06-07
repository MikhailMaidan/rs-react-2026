import { useState, type ChangeEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { addFormSubmission } from '../../store/formsSlice';
import {
  basicFormSchema,
  genderOptions,
  getPasswordStrength,
  readImageAsBase64,
  type BasicFormInput,
} from '../../utils/formValidation';
import type { AppDispatch } from '../../store';
import type { BasicFormValues } from '../../types/forms';

interface ReactHookBasicFormProps {
  countries: string[];
  countriesError: string;
  isLoadingCountries: boolean;
  onSuccess: () => void;
}

export const ReactHookBasicForm = ({
  countries,
  countriesError,
  isLoadingCountries,
  onSuccess,
}: ReactHookBasicFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [avatarPreview, setAvatarPreview] = useState('');
  const hasCountries = countries.length > 0;
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<BasicFormInput, unknown, BasicFormValues>({
    defaultValues: {
      name: '',
      email: '',
      gender: '',
      country: '',
      password: '',
      passwordConfirm: '',
      avatar: '',
      acceptedTerms: false,
    },
    mode: 'onChange',
    resolver: zodResolver(basicFormSchema),
  });
  const password = String(useWatch({ control, name: 'password' }) ?? '');

  const handleAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatarPreview('');
      setValue('avatar', '', { shouldValidate: true });
      return;
    }

    const imageBase64 = await readImageAsBase64(file);

    setAvatarPreview(imageBase64);
    setValue('avatar', imageBase64, { shouldValidate: true });
  };

  const onSubmit = (values: BasicFormValues) => {
    dispatch(addFormSubmission({ formType: 'React Hook Form', values }));
    reset();
    setAvatarPreview('');
    onSuccess();
  };

  return (
    <form className="forms-grid" onSubmit={handleSubmit(onSubmit)}>
      <label className="forms-field" htmlFor="rhf-name">
        <span>Name</span>
        <input id="rhf-name" type="text" {...register('name')} />
        {errors.name && <span className="forms-field-error">{errors.name.message}</span>}
      </label>

      <label className="forms-field" htmlFor="rhf-age">
        <span>Age</span>
        <input id="rhf-age" type="number" {...register('age')} />
        {errors.age && <span className="forms-field-error">{errors.age.message}</span>}
      </label>

      <label className="forms-field sm:col-span-2" htmlFor="rhf-email">
        <span>Email</span>
        <input id="rhf-email" type="email" {...register('email')} />
        {errors.email && (
          <span className="forms-field-error">{errors.email.message}</span>
        )}
      </label>

      <label className="forms-field" htmlFor="rhf-gender">
        <span>Gender</span>
        <select id="rhf-gender" {...register('gender')}>
          <option value="" disabled>
            Select gender
          </option>
          {genderOptions.map((gender) => (
            <option key={gender} value={gender}>
              {gender}
            </option>
          ))}
        </select>
        {errors.gender && (
          <span className="forms-field-error">{errors.gender.message}</span>
        )}
      </label>

      <label className="forms-field" htmlFor="rhf-country">
        <span>Country</span>
        <input
          id="rhf-country"
          type="text"
          list="countries-list"
          disabled={isLoadingCountries && !hasCountries}
          placeholder={isLoadingCountries ? 'Loading countries...' : 'Country'}
          {...register('country')}
        />
        {countriesError && (
          <span className="forms-field-error">{countriesError}</span>
        )}
        {errors.country && (
          <span className="forms-field-error">{errors.country.message}</span>
        )}
      </label>

      <label className="forms-field" htmlFor="rhf-avatar">
        <span>Profile image</span>
        <input
          id="rhf-avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
        <input type="hidden" {...register('avatar')} />
        {errors.avatar && (
          <span className="forms-field-error">{errors.avatar.message}</span>
        )}
      </label>

      {avatarPreview && (
        <img className="forms-avatar-preview" src={avatarPreview} alt="" />
      )}

      <label className="forms-field" htmlFor="rhf-password">
        <span>Password</span>
        <input id="rhf-password" type="password" {...register('password')} />
        <span className="forms-help-text">
          Strength: {getPasswordStrength(password)}
        </span>
        {errors.password && (
          <span className="forms-field-error">{errors.password.message}</span>
        )}
      </label>

      <label className="forms-field" htmlFor="rhf-password-confirm">
        <span>Confirm password</span>
        <input
          id="rhf-password-confirm"
          type="password"
          {...register('passwordConfirm')}
        />
        {errors.passwordConfirm && (
          <span className="forms-field-error">
            {errors.passwordConfirm.message}
          </span>
        )}
      </label>

      <label
        className="flex items-center gap-3 text-sm text-zinc-100 sm:col-span-2"
        htmlFor="rhf-terms"
      >
        <input id="rhf-terms" type="checkbox" {...register('acceptedTerms')} />
        <span>I accept Terms and Conditions</span>
      </label>
      {errors.acceptedTerms && (
        <p className="forms-field-error sm:col-span-2">
          {errors.acceptedTerms.message}
        </p>
      )}

      <button
        className="forms-primary-button sm:col-span-2"
        type="submit"
        disabled={!isValid}
      >
        Submit React Hook Form
      </button>
    </form>
  );
};
