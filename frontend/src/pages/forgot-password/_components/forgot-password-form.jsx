import { Button } from '@/components/button';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { AuthService } from '@/lib/services/auth.service';
import { ValidateEmail } from '@/lib/utils/validations';
import { Input } from '@/components/input';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await AuthService.forgotPassword(email);
      setSubmitted(true);
      toast.success(result.message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const emailValid = ValidateEmail(email);
  const disabled = !email || !emailValid;

  return !submitted ? (
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

      <Button loading={loading} disabled={disabled} label='Send Reset Link' />
    </form>
  ) : (
    <div className='text-center'>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className='w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4'
      >
        <Mail className='h-8 w-8 text-white' />
      </motion.div>
      <p className='text-sm text-foreground/80'>
        If an account exists for {email}, you will receive a password reset link
        shortly.
      </p>
    </div>
  );
};

export { ForgotPasswordForm };
