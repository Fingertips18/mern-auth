import { Check, X } from 'lucide-react';

import {
  LowerCaseRegex,
  NumberRegex,
  SpecialRegex,
  UpperCaseRegex,
} from '@/constants/regex';
import { ValidatePassword } from '@/lib/utils/validations';

const PasswordCriteria = ({ password }) => {
  const { criteria } = ValidatePassword(password);

  return (
    <div className='mt-2 space-y-1 '>
      {criteria.map((c) => (
        <div key={c.label} className='flex items-center text-xs'>
          {c.met ? (
            <Check className='size-4 text-green-500 mr-2' />
          ) : (
            <X className='text-foreground/50 size-4 mr-2' />
          )}
          <span className={c.met ? 'text-green-400' : 'text-foreground/40'}>
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(LowerCaseRegex) && pass.match(UpperCaseRegex)) strength++;
    if (pass.match(NumberRegex)) strength++;
    if (pass.match(SpecialRegex)) strength++;

    return strength;
  };

  const strength = getStrength(password);

  const getStrengthText = (strength) => {
    if (strength === 0) return 'Very Weak';
    else if (strength === 1) return 'Weak';
    else if (strength === 2) return 'Fair';
    else if (strength === 3) return 'Good';

    return 'Strong';
  };

  const label = getStrengthText(strength);

  const getColor = (strength) => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-red-400';
    if (strength === 2) return 'bg-yellow-500';
    if (strength === 3) return 'bg-yellow-400';
    return 'bg-green-500';
  };

  return (
    <div className='mt-2'>
      <div className='flex-between space-x-1 mb-1'>
        <span className='text-xs text-foreground/60 font-semibold'>
          Password Strength
        </span>
        <span className='text-xs text-foreground font-semibold'>{label}</span>
      </div>

      <div className='flex space-x-1 '>
        {[...Array(4)].map((_, i) => (
          <div
            key={`line-${i}`}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              i < strength ? getColor(strength) : 'bg-foreground/20'
            }`}
          />
        ))}
      </div>
      <PasswordCriteria password={password} />
    </div>
  );
};

export { PasswordStrengthMeter };
