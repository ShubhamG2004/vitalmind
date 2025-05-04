// pages/_app.js

import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./Sidebar"; // If Sidebar.js is inside /pages
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideSidebarRoutes = ["/"]; // Add more if needed
  const showSidebar = !hideSidebarRoutes.includes(router.pathname);

  return (
    <SessionProvider session={pageProps.session}>
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "ml-[250px] p-6" : "p-6"}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp;
