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
      <div className="flex flex-col md:flex-row min-h-screen">
        {showSidebar && (
          <aside className="w-full md:w-[250px] bg-white shadow-md">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 p-4 bg-gray-50 overflow-x-hidden">
          <Component {...pageProps} />
        </main>
      </div>
    </SessionProvider>
  );
}

export default MyApp;
