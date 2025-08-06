import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { ValidatePassword } from '@/lib/utils/validations';
import { AuthService } from '@/lib/services/auth.service';
import { AppRoutes } from '@/constants/routes';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await AuthService.resetPassword(token, password);
      toast.success(result.message);
      navigate(AppRoutes.signIn);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const passwordValid = ValidatePassword(password).allCriteriaMet;
  const confirmPasswordValid =
    ValidatePassword(confirmPassword).allCriteriaMet &&
    password === confirmPassword;
  const disabled =
    !password ||
    !passwordValid ||
    !confirmPassword ||
    !confirmPasswordValid ||
    password !== confirmPassword;

  return (
    <form onSubmit={onSubmit}>
      <Input
        icon={Lock}
        type='password'
        placeholder='Password'
        value={password}
        disabled={loading}
        autoComplete='off'
        name='password'
        maxLength={64}
        onChange={(e) => setPassword(e.target.value)}
        isValid={passwordValid}
      />
      <Input
        icon={Lock}
        type='password'
        placeholder='Confirm Password'
        value={confirmPassword}
        disabled={loading}
        autoComplete='off'
        name='confirm-password'
        maxLength={64}
        onChange={(e) => setConfirmPassword(e.target.value)}
        isValid={confirmPasswordValid}
      />

      <Button
        loading={loading}
        disabled={disabled}
        label='Set New Password'
        withLoader={false}
        loadingLabel='Resetting...'
      />
    </form>
  );
};

export { ResetPasswordForm };
