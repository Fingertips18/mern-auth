import { Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

import { ValidateEmail, ValidatePassword } from '@/lib/utils/validations';
import { AuthService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/stores/authStore';
import { AppRoutes } from '@/constants/routes';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

const SignInForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setAuthorized } = useAuthStore();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await AuthService.signIn(email, password);
      setUser(result.user);
      setAuthorized(true);
      toast.success(result.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const emailValid = ValidateEmail(email);
  const passwordValid = ValidatePassword(password).allCriteriaMet;
  const disabled = !email || !emailValid || !password || !passwordValid;

  return (
    <form onSubmit={onSubmit}>
      <Input
        icon={Mail}
        type='email'
        placeholder='example@domain.com'
        value={email}
        disabled={loading}
        autoComplete='email'
        name='email'
        maxLength={30}
        onChange={(e) => setEmail(e.target.value)}
        isValid={emailValid}
      />
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
      <Link
        to={AppRoutes.forgotPassword}
        className='text-sm text-dark-accent hover:underline underline-offset-4 font-semibold'
      >
        Forgot Password?
      </Link>

      <Button loading={loading} disabled={disabled} label='Sign In' />
    </form>
  );
};

export { SignInForm };
