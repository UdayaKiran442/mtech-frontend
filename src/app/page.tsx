import { cookies } from 'next/headers'

import { getUserProfileAPI } from "@/actions/user.actions";
import LandingPage from "@/components/LandingPage";
import Workspace from "./client/[workspaceId]/page";

export default async function Home() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  let isAuthenticated = false;
  if (token) {
    const userProfile = await getUserProfileAPI(token)
    isAuthenticated = userProfile?.success === true;
  }
  return (
    <div>
      {isAuthenticated ? <LandingPage /> : <Workspace />}
    </div>
  );
}
