import { redirect } from "next/navigation";

import LandingPage from "@/components/LandingPage";
import { getAuthenticatedUser } from '@/lib/user';

export default async function Home() {
  const { isAuthenticated, userProfile } = await getAuthenticatedUser();
  if (isAuthenticated && userProfile) {
    redirect(`/workspace/${userProfile.workspace.workspaceId}/chat`);
  }
  return (
    <div>
      <LandingPage />
    </div>
  );
}
