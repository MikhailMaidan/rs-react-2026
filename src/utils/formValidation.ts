import { z } from 'zod';

export const genderOptions = ['female', 'male', 'other'];

export const getPasswordStrength = (password: string) => {
  let points = 0;

  if (password.length >= 8) {
    points += 1;
  }

  if (/[A-Z]/.test(password)) {
    points += 1;
  }

  if (/[a-z]/.test(password)) {
    points += 1;
  }

  if (/[0-9]/.test(password)) {
    points += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    points += 1;
  }

  if (points <= 2) {
    return 'Weak';
  }

  if (points <= 4) {
    return 'Medium';
  }

  return 'Strong';
};

export const readImageAsBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.onerror = () => {
      reject(new Error('Unable to read image.'));
    };
    reader.readAsDataURL(file);
  });
};

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

export const basicFormSchema = z
  .object({
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
    email: z.string().trim().refine(validateEmail, {
      message: 'Email should have one @, local part, and domain with a dot.',
    }),
    gender: z.string().min(1, 'Please select gender.'),
    password: z
      .string()
      .min(8, 'Password should be at least 8 characters.')
      .refine((password) => /[A-Z]/.test(password), {
        message: 'Password should contain uppercase letter.',
      })
      .refine((password) => /[a-z]/.test(password), {
        message: 'Password should contain lowercase letter.',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'Password should contain number.',
      })
      .refine((password) => /[^A-Za-z0-9]/.test(password), {
        message: 'Password should contain special character.',
      }),
    passwordConfirm: z.string().min(1, 'Please confirm password.'),
    avatar: z.string().min(1, 'Please upload profile image.'),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: 'Terms and Conditions should be accepted.',
    }),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: 'Passwords should match.',
    path: ['passwordConfirm'],
  });

export type BasicFormInput = z.input<typeof basicFormSchema>;
