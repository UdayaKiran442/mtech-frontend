import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

import { getUserProfileAPI } from "@/actions/user.actions";
import LandingPage from "@/components/LandingPage";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  let isAuthenticated = false;
  if (token) {
    const userProfile = await getUserProfileAPI(token)
    isAuthenticated = userProfile?.success === true;
    if (isAuthenticated) {
      redirect(`/client/${userProfile.workspaceId}`)
    }
  }
  return (
    <div>
      <LandingPage />
    </div>
  );
}
