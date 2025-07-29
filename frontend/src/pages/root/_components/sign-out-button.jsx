import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AuthService } from "@/lib/services/auth.service";
import { useAuthStore } from "@/lib/stores/authStore";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, setAuthorized } = useAuthStore();

  const onClick = async () => {
    setLoading(true);

    try {
      const result = await AuthService.signOut();
      setUser(null);
      setAuthorized(false);
      toast.success(result.message);
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
      }}
      className="mt-5 w-full py-3 px-4 bg-accent font-bold rounded-lg shadow-lg hover:brightness-90
        focus:outline-hidden hover:drop-shadow-glow active:scale-90 flex-center
        disabled:bg-accent/50 disabled:text-foreground/50 disabled:pointer-events-none"
      disabled={loading}
      onClick={onClick}
    >
      {loading ? <Loader className="w-5 h-5 animate-spin" /> : "Sign Out"}
    </motion.button>
  );
};

export { SignOutButton };
