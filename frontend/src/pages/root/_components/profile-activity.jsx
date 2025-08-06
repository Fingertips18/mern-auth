import { motion } from 'framer-motion';

import { formatDate } from '@/lib/utils/date';

const ProfileActivity = ({ lastSignedIn, createdAt }) => {
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
      <h3 className='text-lg font-extrabold mb-3'>Account Activity</h3>
      <p className='capitalize font-medium'>
        Joined:{' '}
        <span className='font-bold'>
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </p>
      <p className='font-medium'>
        Last Sign In:{' '}
        <span className='font-bold'>{formatDate(lastSignedIn)}</span>
      </p>
    </motion.div>
  );
};

export { ProfileActivity };
