export const Routes = Object.freeze({
  root: { name: 'root', path: '/' },
  auth: { name: 'auth', path: '/api/auth' },
});

export const AuthRoutes = Object.freeze({
  signUp: { name: 'sign-up', path: '/sign-up' },
  signIn: { name: 'sign-in', path: '/sign-in' },
  signOut: { name: 'sign-out', path: '/sign-out' },
  verifyEmail: { name: 'verify-email', path: '/verify-email' },
  forgotPassword: { name: 'forgot-password', path: '/forgot-password' },
  resetPassword: { name: 'reset-password', path: '/reset-password' },
  verifyToken: { name: 'verify-token', path: '/verify-token' },
});
