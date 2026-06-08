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

export const getPasswordChecks = (password: string) => {
  return {
    hasNumber: /[0-9]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
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

export const validateImageFile = (file: File) => {
  const allowedTypes = ['image/png', 'image/jpeg'];
  const maxImageSize = 1024 * 1024;

  if (!allowedTypes.includes(file.type)) {
    return 'Only png and jpeg images are allowed.';
  }

  if (file.size > maxImageSize) {
    return 'Image should be smaller than 1MB.';
  }

  return '';
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
      .refine((name) => !name || name[0] === name[0].toUpperCase(), {
        message: 'Name should start with an uppercase letter.',
      }),
    age: z.preprocess(
      (value) => {
        if (typeof value === 'string' && value.trim() === '') {
          return 'wrong data type';
        }

        const numberValue = Number(value);

        return Number.isNaN(numberValue) ? 'wrong data type' : numberValue;
      },
      z
        .number({ error: 'Age has wrong data type.' })
        .finite('Age has wrong data type.')
        .min(0, 'Age should be a positive number.')
    ),
    email: z.string().trim().refine(validateEmail, {
      message: 'Email should have one @, local part, and domain with a dot.',
    }),
    gender: z.string().min(1, 'Please select gender.'),
    country: z.string().trim().min(1, 'Country is required.'),
    password: z
      .string()
      .min(1, 'Password is required.'),
    passwordConfirm: z.string().min(1, 'Please confirm password.'),
    avatar: z
      .string()
      .min(1, 'Please upload profile image.')
      .refine(
        (avatar) =>
          avatar.startsWith('data:image/png') ||
          avatar.startsWith('data:image/jpeg'),
        {
          message: 'Only png and jpeg images are allowed.',
        }
      ),
    acceptedTerms: z.boolean().refine((value) => value, {
      message: 'Terms and Conditions should be accepted.',
    }),
  })
  .refine((values) => values.password === values.passwordConfirm, {
    message: 'Passwords should match.',
    path: ['passwordConfirm'],
  });

export const createBasicFormSchema = (countries: string[]) => {
  return basicFormSchema.refine(
    (values) => countries.length === 0 || countries.includes(values.country),
    {
      message: 'Please select country from list.',
      path: ['country'],
    }
  );
};

export type BasicFormInput = z.input<typeof basicFormSchema>;
