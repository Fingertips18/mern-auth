import { motion } from "framer-motion";

import { VerifyEmailForm } from "./_components/verify-email-form";

const VerifyEmailPage = () => {
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
      className="max-w-md w-full bg-secondary/20 backdrop-filter backdrop-blur-md rounded-lg shadow-2xl overflow-hidden mx-4 lg:mx-0"
    >
      <div className="p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-2 text-center bg-clip-text">
          Verify Email
        </h2>
        <p className="text-sm text-center font-medium mb-6">
          Enter the 4-digit code sent to your email address.
        </p>
        <VerifyEmailForm />
      </div>
    </motion.section>
  );
};

export default VerifyEmailPage;
