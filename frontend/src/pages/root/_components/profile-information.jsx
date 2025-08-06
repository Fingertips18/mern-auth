import { motion } from 'framer-motion';

const ProfileInformation = ({ username, email }) => {
  return (
    <motion.div
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
      className='p-4 bg-primary/50 rounded-lg backdrop-blur-md border border-primary'
    >
      <h3 className='text-lg font-extrabold mb-3'>Profile Information</h3>
      <p className='capitalize font-medium'>
        Username: <span className='font-bold'>{username}</span>
      </p>
      <p className='font-medium'>
        Email: <span className='font-bold'>{email}</span>
      </p>
    </motion.div>
  );
};

export { ProfileInformation };
