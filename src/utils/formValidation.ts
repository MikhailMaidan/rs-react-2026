import { z } from 'zod';

export const genderOptions = ['female', 'male', 'other'];

const validateEmail = (email: string) => {
  const emailParts = email.split('@');

  if (emailParts.length !== 2) {
    return false;
  }

  const [emailName, emailDomain] = emailParts;

  if (!emailName || !emailDomain) {
    return false;
  }

  return emailDomain.includes('.');
};

export const basicFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required.')
    .refine((name) => name[0] === name[0].toUpperCase(), {
      message: 'Name should start with an uppercase letter.',
    }),
  age: z.preprocess(
    (value) => {
      if (typeof value === 'string' && value.trim() === '') {
        return Number.NaN;
      }

      return Number(value);
    },
    z
      .number()
      .finite('Age should be a number.')
      .min(0, 'Age should be a positive number.')
  ),
  email: z
    .string()
    .trim()
    .refine(validateEmail, {
      message: 'Email should have one @, local part, and domain with a dot.',
    }),
  gender: z.string().min(1, 'Please select gender.'),
  acceptedTerms: z.boolean().refine((value) => value, {
    message: 'Terms and Conditions should be accepted.',
  }),
});

export type BasicFormInput = z.input<typeof basicFormSchema>;
