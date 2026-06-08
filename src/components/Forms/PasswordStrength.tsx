import { getPasswordChecks, getPasswordStrength } from '../../utils/formValidation';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const checks = getPasswordChecks(password);

  return (
    <div className="forms-password-strength">
      <p>Strength: {getPasswordStrength(password)}</p>
      <p>Number: {checks.hasNumber ? 'yes' : 'no'}</p>
      <p>Uppercase: {checks.hasUppercase ? 'yes' : 'no'}</p>
      <p>Lowercase: {checks.hasLowercase ? 'yes' : 'no'}</p>
      <p>Special character: {checks.hasSpecial ? 'yes' : 'no'}</p>
    </div>
  );
};
