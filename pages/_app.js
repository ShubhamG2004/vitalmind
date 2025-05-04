import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Sidebar from "./Sidebar"; 
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const hideSidebarRoutes = ["/", "/auth/signin", "/auth/signup", "/forgot-password"];

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
