import { Navigate, Outlet } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { LoadingSpinner } from '@/components/loading-spinner';
import { AuthService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/stores/authStore';
import { AppRoutes } from '@/constants/routes';

const ProtectedGuard = () => {
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

  if (!authorized) {
    return <Navigate to={AppRoutes.signIn} replace />;
  }

  if (!user.isVerified) {
    return <Navigate to={AppRoutes.verifyEmail} replace />;
  }

  return <Outlet />;
};

export default ProtectedGuard;
