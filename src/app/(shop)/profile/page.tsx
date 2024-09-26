import { auth } from '@/app/auth.config';
import { redirect } from 'next/navigation';
import { Title } from '@/components';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect('/auth/login');
  return (
    <div>
      <Title title="Profile" />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
