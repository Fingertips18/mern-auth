import { motion } from "framer-motion";

import { ResetPasswordForm } from "./_components/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="max-w-md w-full bg-secondary/20 backdrop-filter backdrop-blur-md rounded-lg shadow-2xl mx-4 lg:mx-0"
    >
      <div className="p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text">
          Reset Password
        </h2>

        <ResetPasswordForm />
      </div>
    </motion.section>
  );
};

export default ResetPasswordPage;
