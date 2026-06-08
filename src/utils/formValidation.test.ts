import { describe, expect, it } from 'vitest';
import {
  createBasicFormSchema,
  getPasswordStrength,
  validateImageFile,
} from './formValidation';

const validForm = {
  name: 'Michael',
  age: '30',
  email: 'michael@test.com',
  gender: 'male',
  country: 'Serbia',
  password: 'Password1!',
  passwordConfirm: 'Password1!',
  avatar: 'data:image/png;base64,test',
  acceptedTerms: true,
};

describe('formValidation', () => {
  it('validates correct form values', () => {
    const schema = createBasicFormSchema(['Serbia']);

    expect(schema.safeParse(validForm).success).toBe(true);
  });

  it('rejects country that is not in list', () => {
    const schema = createBasicFormSchema(['Germany']);

    expect(schema.safeParse(validForm).success).toBe(false);
  });

  it('rejects weak password', () => {
    const schema = createBasicFormSchema(['Serbia']);

    expect(
      schema.safeParse({
        ...validForm,
        password: 'password',
        passwordConfirm: 'password',
      }).success
    ).toBe(false);
  });

  it('shows password strength text', () => {
    expect(getPasswordStrength('abc')).toBe('Weak');
    expect(getPasswordStrength('Password1')).toBe('Medium');
    expect(getPasswordStrength('Password1!')).toBe('Strong');
  });

  it('checks image file type and size', () => {
    const validImage = new File(['test'], 'test.png', { type: 'image/png' });
    const wrongImage = new File(['test'], 'test.gif', { type: 'image/gif' });

    expect(validateImageFile(validImage)).toBe('');
    expect(validateImageFile(wrongImage)).toBe(
      'Only png and jpeg images are allowed.'
    );
  });
});
