import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { AppRoutes } from "@/constants/routes";

import { ForgotPasswordForm } from "./_components/forgot-password-form";

const ForgotPasswordPage = () => {
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
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text">
          Forgot Password
        </h2>

        <p className="text-sm text-center font-medium mb-6">
          Enter your email address and wait for a reset password link to be
          sent.
        </p>

        <ForgotPasswordForm />
      </div>
      <div className="px-8 py-4 bg-dark-secondary/40 flex-center">
        <Link
          to={AppRoutes.root}
          className="text-sm text-dark-accent hover:underline underline-offset-4 font-semibold"
        >
          Back
        </Link>
      </div>
    </motion.section>
  );
};

export default ForgotPasswordPage;
