// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import UserHydrator from "@/components/UserHydrator";
import { getAuthenticatedUser } from "@/lib/user";

export const dynamic = "force-dynamic";


export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const {isAuthenticated, userProfile} = await getAuthenticatedUser();
  if (!isAuthenticated) redirect("/");

  if (isAuthenticated && userProfile){
    return (
        <>
            <UserHydrator user={userProfile} />
            {children}
        </>
      )
  }
}
