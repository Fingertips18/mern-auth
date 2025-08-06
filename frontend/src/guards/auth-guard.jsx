import { useCallback, useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { LoadingSpinner } from '@/components/loading-spinner';
import { AuthService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/stores/authStore';
import { AppRoutes } from '@/constants/routes';

const AuthGuard = () => {
  const { authorized, setAuthorized, user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleVerification = useCallback(async () => {
    setLoading(true);

    try {
      const result = await AuthService.verifyToken();
      setUser(result.user);
      setAuthorized(true);
    } catch {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  }, [setAuthorized, setUser, setLoading]);

  useEffect(() => {
    handleVerification();
  }, [handleVerification]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (authorized && user.isVerified) {
    return <Navigate to={AppRoutes.root} replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
