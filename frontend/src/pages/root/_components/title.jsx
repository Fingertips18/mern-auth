import { motion } from 'framer-motion';

const Title = () => {
  return (
    <motion.h1
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
      }}
      transition={{
        delay: 0.5,
        duration: 0.4,
        type: 'spring',
        bounce: 0.5,
      }}
      className='font-bold text-lg lg:text-4xl text-center drop-shadow-foreground-glow'
    >
      Welcome
    </motion.h1>
  );
};

export { Title };
