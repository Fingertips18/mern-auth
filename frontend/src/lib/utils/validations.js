import {
  EmailRegex,
  LowerCaseRegex,
  NumberRegex,
  SpecialRegex,
  UpperCaseRegex,
} from '../../constants/regex';

export const ValidatePassword = (password) => {
  const criteria = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains uppercase letter', met: UpperCaseRegex.test(password) },
    { label: 'Contains lowercase letter', met: LowerCaseRegex.test(password) },
    { label: 'Contains a number', met: NumberRegex.test(password) },
    {
      label: 'Contains special character',
      met: SpecialRegex.test(password),
    },
  ];

  return {
    criteria,
    allCriteriaMet: criteria.every((criterion) => criterion.met),
  };
};

export const ValidateEmail = (email) => EmailRegex.test(email);
