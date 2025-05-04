import Link from "next/link";
import { useRouter } from "next/router";
import { FiHome, FiActivity, FiTrendingUp, FiZap, FiUser, FiLogOut, FiMenu,FiArchive } from "react-icons/fi";
import { signOut } from "next-auth/react";

export default function Sidebar() {
  const router = useRouter();
  const currentRoute = router.pathname;

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: <FiHome size={20} /> },
    { href: "/health-log", label: "Health Logs", icon: <FiActivity size={20} /> },
    { href: "/trends", label: "Health Trends", icon: <FiTrendingUp size={20} /> },
    { href: "/ai-chatbot", label: "AI Suggestions", icon: <FiZap size={20} /> },
    { href: "/history", label: "Health History", icon: <FiArchive size={20} /> },
    { href: "/profile", label: "Profile", icon: <FiUser size={20} /> },
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: "/auth/signin" });
  };

  return (
    <>
     
      <input type="checkbox" id="sidebar-toggle" className="peer hidden" />
      <label
        htmlFor="sidebar-toggle"
        className="fixed lg:hidden z-40 top-4 left-4 w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white cursor-pointer hover:shadow-lg transition-all shadow-md"
      >
        <FiMenu size={24} />
      </label>

      
      <div className="fixed top-0 left-0 h-screen w-72 bg-white text-gray-800 shadow-2xl transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out peer-checked:translate-x-0 z-30 border-r border-gray-100">
        <div className="flex flex-col h-full p-6">
       
          <div className="flex items-center justify-center mb-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md mb-3">
                <span className="text-white text-2xl font-bold">VM</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                VitalMind
              </h2>
              <p className="text-xs text-gray-500 mt-1">Health & Wellness</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  currentRoute === item.href
                    ? "bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 font-medium border border-cyan-200 shadow-sm"
                    : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className={`mr-3 ${
                  currentRoute === item.href ? "text-cyan-600" : "text-gray-500"
                }`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {currentRoute === item.href && (
                  <span className="ml-auto w-2 h-2 bg-cyan-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-xl mt-auto bg-gradient-to-r from-red-100 to-pink-100 text-red-600 hover:from-red-200 hover:to-pink-200 hover:text-red-700 transition-all shadow-sm border border-red-100"
          >
            <span className="mr-3 text-red-500">
              <FiLogOut size={20} />
            </span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <label
        htmlFor="sidebar-toggle"
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-20 lg:hidden hidden peer-checked:block cursor-pointer"
      ></label>
    </>
  );
}