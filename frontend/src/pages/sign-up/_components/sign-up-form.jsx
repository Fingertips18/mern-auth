import { Lock, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import { PasswordStrengthMeter } from "../../../components/password-strength-meter";
import { ValidateEmail, ValidatePassword } from "../../../utils/validations";
import { useAuthStore } from "../../../stores/auth-store";
import { AppRoutes } from "../../../constants/routes";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signUp, loading, success, error: Error } = useAuthStore();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await signUp(username, email, password);
      toast.success(success);
      navigate(AppRoutes.verifyEmail);
    } catch (error) {
      console.error(error);
      toast.error(Error);
    }
  };

  const usernameValid = username.length > 3;
  const emailValid = ValidateEmail(email);
  const passwordValid = ValidatePassword(password).allCriteriaMet;

  const disabled =
    !username ||
    !usernameValid ||
    !email ||
    !emailValid ||
    !password ||
    !passwordValid;

  return (
    <form onSubmit={onSubmit}>
      <Input
        icon={User}
        type="text"
        placeholder="john doe"
        value={username}
        disabled={loading}
        autoComplete="username"
        name="username"
        maxLength={30}
        onChange={(e) => setUsername(e.target.value)}
        isValid={usernameValid}
      />
      <Input
        icon={Mail}
        type="email"
        placeholder="example@domain.com"
        value={email}
        disabled={loading}
        autoComplete="email"
        name="email"
        maxLength={30}
        onChange={(e) => setEmail(e.target.value)}
        isValid={emailValid}
      />
      <Input
        icon={Lock}
        type="password"
        placeholder="Password"
        value={password}
        disabled={loading}
        autoComplete="off"
        name="password"
        maxLength={64}
        onChange={(e) => setPassword(e.target.value)}
        isValid={passwordValid}
      />

      <PasswordStrengthMeter password={password} />

      <Button loading={loading} disabled={disabled} label="Sign Up" />
    </form>
  );
};

export { SignUpForm };
