import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@/constants/routes';
import { Button } from '@/components/button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className='space-y-2 bg-secondary/50 backdrop-blur-md drop-shadow-2xl rounded-lg p-6'>
      <h3 className='text-lg font-semibold drop-shadow-foreground-glow'>
        404 | Page not found
      </h3>

      <Button
        type='button'
        label='Go to Home'
        onClick={() => navigate(AppRoutes.root)}
      />
    </section>
  );
};

export default NotFoundPage;
