import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { AuthService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/stores/authStore';
import { AppRoutes } from '@/constants/routes';
import { Button } from '@/components/button';

const VerifyEmailForm = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const [submittedCode, setSubmittedCode] = useState([]);
  const { setUser } = useAuthStore();
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const onChange = (value, index) => {
    if (index === 3 && value.length > 1) return;

    value = value.replace(/\D/g, '');

    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 4).split('');
      for (let i = 0; i < 4; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 3 ? lastFilledIndex + 1 : 3;
      inputRef.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const onKeyDown = (event, index) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const verificationCode = code.join('');

      setLoading(true);

      try {
        const result = await AuthService.verifyEmail(verificationCode);
        setUser(result.user);
        toast.success(result.message);
        navigate(AppRoutes.root);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
      }
    },
    [code, setUser, navigate],
  );

  useEffect(() => {
    if (code.every((digit) => digit !== '') && submittedCode !== code) {
      setSubmittedCode(code);
      onSubmit(new Event('submit'));
    }
  }, [code, submittedCode, onSubmit]);

  const disabled = code.join('').length !== 4;

  return (
    <form onSubmit={onSubmit} className='space-y-6'>
      <div className='flex-center gap-x-4'>
        {code.map((digit, i) => (
          <input
            key={`code-${i}`}
            name={`code-${i}`}
            ref={(el) => (inputRef.current[i] = el)}
            type='text'
            maxLength={4}
            value={digit}
            onChange={(e) => onChange(e.target.value, i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            autoComplete='off'
            className='w-12 h-12 text-center text-2xl font-bold bg-secondary/50 rounded-lg border border-secondary outline-hidden
            focus:border-primary/20 focus:ring-2 focus:ring-primary placeholder-foreground/40 transition duration-200'
          />
        ))}
      </div>
      {Error && (
        <p className='text-red-500 font-semibold mt-2 text-sm text-center'>
          {Error}
        </p>
      )}

      <Button
        loading={loading}
        disabled={disabled}
        label='Verify Email'
        withLoader={false}
        loadingLabel='Verifying...'
      />
    </form>
  );
};

export { VerifyEmailForm };
