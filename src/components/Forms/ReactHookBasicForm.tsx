import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addFormSubmission } from '../../store/formsSlice';
import {
  basicFormSchema,
  genderOptions,
  type BasicFormInput,
} from '../../utils/formValidation';
import type { AppDispatch } from '../../store';
import type { BasicFormValues } from '../../types/forms';

interface ReactHookBasicFormProps {
  onSuccess: () => void;
}

export const ReactHookBasicForm = ({ onSuccess }: ReactHookBasicFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<BasicFormInput, unknown, BasicFormValues>({
    defaultValues: {
      name: '',
      email: '',
      gender: '',
      acceptedTerms: false,
    },
    mode: 'onChange',
    resolver: zodResolver(basicFormSchema),
  });

  const onSubmit = (values: BasicFormValues) => {
    dispatch(addFormSubmission({ formType: 'React Hook Form', values }));
    reset();
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
