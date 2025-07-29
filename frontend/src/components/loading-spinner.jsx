import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex-center overflow-hidden drop-shadow-glow p-2 rounded-lg bg-secondary/15 backdrop-blur-xs">
      <motion.div
        className="w-12 h-12 border-4 border-t-4 border-t-primary border-primary/50 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export { LoadingSpinner };
