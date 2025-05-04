// pages/logout.js

import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
    router.push("/"); 
  }, []);

  return (
    <div className="text-center">
      <p>Logging out...</p>
    </div>
  );
}
