import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect directly to authentication since we've removed the landing page
  redirect('/auth/signin');
}
