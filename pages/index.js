import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn } from "next-auth/react";
import {
  FiActivity,
  FiTrendingUp,
  FiHeart,
  FiClock,
  FiBarChart2,
  FiZap,
  FiShield,
  FiLogIn,
  FiUser,
  FiCheck,
  FiPieChart,
  FiArrowRight,
} from "react-icons/fi";

export default function Home() {
  const { status } = useSession();

  const features = [
    {
      icon: <FiActivity className="text-purple-600 text-2xl" />,
      title: "Comprehensive Tracking",
      description:
        "Log sleep, water intake, nutrition, mood, and symptoms effortlessly.",
    },
    {
      icon: <FiZap className="text-purple-600 text-2xl" />,
      title: "AI Health Assistant",
      description:
        "Get personalized suggestions using intelligent AI insights.",
    },
    {
      icon: <FiBarChart2 className="text-purple-600 text-2xl" />,
      title: "Visual Analytics",
      description:
        "Understand trends through interactive charts and dashboards.",
    },
    {
      icon: <FiHeart className="text-purple-600 text-2xl" />,
      title: "Wellness Score",
      description:
        "Track your overall health using our VitalScore system.",
    },
    {
      icon: <FiClock className="text-purple-600 text-2xl" />,
      title: "Smart Reminders",
      description:
        "Never miss routines with adaptive alerts and reminders.",
    },
    {
      icon: <FiShield className="text-purple-600 text-2xl" />,
      title: "Data Privacy",
      description:
        "Your health data is encrypted and fully secure.",
    },
  ];

  return (
    <>
      <Head>
        <title>VitalMind – Personal Health Diary with AI</title>
        <meta
          name="description"
          content="Track your health and get AI-powered insights with VitalMind."
        />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed w-full bg-white/80 backdrop-blur shadow z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <FiActivity className="text-purple-600 text-2xl" />
            <span className="text-xl font-bold">VitalMind</span>
          </Link>

          {status === "authenticated" ? (
            <Link
              href="/dashboard"
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
            >
              Dashboard
            </Link>
          ) : (
            <button
              onClick={() => signIn()}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              <FiLogIn />
              Login
            </button>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/Hero.png"
            alt="VitalMind Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Glow */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Take Control of Your{" "}
              <span className="text-purple-300">Health Journey</span>
            </h1>

            <p className="mt-6 text-lg text-gray-200 max-w-xl">
              AI-powered health tracking to help you understand, improve, and
              optimize your wellbeing.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {status === "authenticated" ? (
                <Link
                  href="/dashboard"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  Go to Dashboard <FiArrowRight />
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                >
                  Get Started Free <FiArrowRight />
                </button>
              )}

              <Link
                href="#features"
                className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Side Image */}
          <div className="relative h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/sty1.png"
              alt="Dashboard Preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
            Powerful Health Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gray-50 p-8 rounded-2xl border hover:bg-white hover:shadow-xl transition-all hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),transparent_60%)]"></div>

        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Health?
          </h2>
          <p className="text-purple-100 text-lg mb-10">
            Join thousands improving their lives with VitalMind.
          </p>

          <button
            onClick={() => signIn()}
            className="bg-white text-purple-600 font-bold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            Start Free Today
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <FiActivity className="text-purple-400 text-2xl" />
            <span className="text-xl font-bold text-white">VitalMind</span>
          </div>
          <p>Your intelligent health companion.</p>
          <p className="mt-6 text-sm">
            © {new Date().getFullYear()} VitalMind. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
