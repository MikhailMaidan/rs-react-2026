import { describe, expect, it } from 'vitest';
import {
  createBasicFormSchema,
  getPasswordStrength,
  getPasswordChecks,
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

  it('shows simple age type error', () => {
    const schema = createBasicFormSchema(['Serbia']);
    const result = schema.safeParse({
      ...validForm,
      age: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Age has wrong data type.'
      );
    }
  });

  it('rejects mismatched password', () => {
    const schema = createBasicFormSchema(['Serbia']);

    expect(
      schema.safeParse({
        ...validForm,
        passwordConfirm: 'Password2!',
      }).success
    ).toBe(false);
  });

  it('shows password strength checks', () => {
    expect(getPasswordStrength('abc')).toBe('Weak');
    expect(getPasswordStrength('Password1')).toBe('Medium');
    expect(getPasswordStrength('Password1!')).toBe('Strong');
    expect(getPasswordChecks('Password1!')).toEqual({
      hasLowercase: true,
      hasNumber: true,
      hasSpecial: true,
      hasUppercase: true,
    });
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
