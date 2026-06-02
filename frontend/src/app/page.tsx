import { DirectoryDashboard } from '@/components/directory-dashboard';
import { fetchDirectoryUsers } from '@/lib/users';

export default async function Home() {
  const users = await fetchDirectoryUsers();

  return <DirectoryDashboard users={users} />;
}
