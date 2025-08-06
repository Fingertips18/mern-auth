import { useAuthStore } from '@/lib/stores/authStore';

import { ProfileInformation } from './_components/profile-information';
import { ProfileActivity } from './_components/profile-activity';
import { SignOutButton } from './_components/sign-out-button';
import { Title } from './_components/title';

const RootPage = () => {
  const { user } = useAuthStore();

  return (
    <section className='h-full z-50 relative p-4 lg:p-6 space-y-4 backdrop-blur-lg rounded-lg bg-primary/20 drop-shadow-2xl mx-4 lg:mx-0'>
      <Title />
      <ProfileInformation username={user.username} email={user.email} />
      <ProfileActivity
        lastSignedIn={user.lastSignedIn}
        createdAt={user.createdAt}
      />
      <SignOutButton />
    </section>
  );
};

export default RootPage;
