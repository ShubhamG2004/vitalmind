import Head from "next/head";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { 
  FiActivity, 
  FiTrendingUp, 
  FiHeart, 
  FiDroplet, 
  FiClock, 
  FiBarChart2,
  FiZap,
  FiUsers,
  FiShield,
  FiLogIn,
  FiUser,
  FiCheck,
  FiCalendar,
  FiPieChart,
  FiArrowRight
} from "react-icons/fi";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();

  const features = [
    {
      icon: <FiActivity className="text-purple-600 text-2xl" />,
      title: "Comprehensive Tracking",
      description: "Log sleep, water intake, nutrition, mood, and symptoms with our intuitive interface."
    },
    {
      icon: <FiZap className="text-purple-600 text-2xl" />,
      title: "AI Health Assistant",
      description: "Get personalized suggestions based on your data patterns and health goals."
    },
    {
      icon: <FiBarChart2 className="text-purple-600 text-2xl" />,
      title: "Visual Analytics",
      description: "Understand your health trends through beautiful, interactive charts and graphs."
    },
    {
      icon: <FiHeart className="text-purple-600 text-2xl" />,
      title: "Wellness Scores",
      description: "Track your overall wellness with our proprietary VitalScore algorithm."
    },
    {
      icon: <FiClock className="text-purple-600 text-2xl" />,
      title: "Reminders & Alerts",
      description: "Never miss important health routines with our smart notification system."
    },
    {
      icon: <FiShield className="text-purple-600 text-2xl" />,
      title: "Data Privacy",
      description: "Your health data is encrypted and never shared without your permission."
    }
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up",
      description: "Create your free account in seconds",
      icon: <FiUser className="text-purple-600 text-xl" />
    },
    {
      number: "2",
      title: "Log Daily Metrics",
      description: "Track your key health indicators",
      icon: <FiCheck className="text-purple-600 text-xl" />
    },
    {
      number: "3",
      title: "Get Insights",
      description: "Receive AI-powered analysis",
      icon: <FiPieChart className="text-purple-600 text-xl" />
    },
    {
      number: "4",
      title: "Improve",
      description: "Implement suggestions and track progress",
      icon: <FiTrendingUp className="text-purple-600 text-xl" />
    }
  ];

  const testimonials = [
    {
      quote: "VitalMind helped me identify patterns in my sleep and nutrition that I never noticed before. The AI suggestions are surprisingly accurate!",
      name: "Sarah K.",
      role: "Nutritionist",
      stars: 5
    },
    {
      quote: "As a fitness coach, I recommend VitalMind to all my clients. The tracking features are comprehensive yet easy to use.",
      name: "Michael T.",
      role: "Fitness Coach",
      stars: 5
    },
    {
      quote: "The visualization tools helped me understand my health journey better than any other app I've tried.",
      name: "Priya M.",
      role: "Long-time User",
      stars: 5
    }
  ];

  return (
    <>
      <Head>
        <title>VitalMind – Personal Health Diary with AI</title>
        <meta name="description" content="Track your health and get AI-powered insights with VitalMind – your intelligent health diary." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-2 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
              <FiActivity className="text-white text-xl" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">VitalMind</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {status === "authenticated" ? (
              <Link href="/dashboard" className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium">
                <FiUser className="text-white" />
                <span>Dashboard</span>
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium"
              >
                <FiLogIn className="text-white" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 sm:px-6 pt-24 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <div className="inline-block mb-4">
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                ✨ AI-Powered Health Tracking
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Take Control of Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Health Journey
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              VitalMind combines comprehensive health tracking with artificial intelligence to help you understand and improve your wellbeing every day.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {status === "authenticated" ? (
                <Link href="/dashboard" className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  Go to Dashboard 
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="group inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              )}
              <Link href="#features" className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-purple-700 font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-2 border-purple-100">
                Learn More
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center md:justify-start space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <FiUsers className="text-purple-600 mr-2" />
                <span>10,000+ Users</span>
              </div>
              <div className="flex items-center">
                <FiShield className="text-purple-600 mr-2" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 sm:h-[28rem] lg:h-[32rem] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative w-full h-full bg-white/40 backdrop-blur-sm rounded-3xl p-4 shadow-2xl">
              <div className="relative w-full h-full">
                <Image 
                  src="/Hero.png" 
                  alt="VitalMind Dashboard Preview"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-2xl drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              ✨ Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Powerful Health Tracking</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Everything you need to track, analyze, and improve your health in one beautiful, intuitive interface
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 hover:border-purple-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>4 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              🚀 Simple Steps
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">How VitalMind Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your health in just four simple steps. Get started in minutes!
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-gray-100 hover:border-purple-300"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <FiArrowRight className="text-purple-300 text-3xl" />
                  </div>
                )}
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-6 relative shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                  <div className="absolute -right-3 -top-3 bg-white p-2 rounded-full shadow-md group-hover:rotate-12 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              💎 Interface
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Beautiful & Intuitive</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Designed for clarity and ease of use on any device. Experience seamless health tracking.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500 border-4 border-white hover:border-purple-300">
              <Image 
                src="/sty1.png"
                alt="Dashboard Screen"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                <div>
                  <span className="text-white font-bold text-xl block mb-2">Dashboard Overview</span>
                  <span className="text-purple-200 text-sm">Track all your metrics at a glance</span>
                </div>
              </div>
            </div>
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500 border-4 border-white hover:border-purple-300">
              <Image 
                src="/sty2.png"
                alt="Tracking Screen"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                <div>
                  <span className="text-white font-bold text-xl block mb-2">Health Tracking</span>
                  <span className="text-purple-200 text-sm">Log your daily health metrics</span>
                </div>
              </div>
            </div>
            <div className="group relative h-96 rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.03] transition-all duration-500 border-4 border-white hover:border-purple-300">
              <Image 
                src="/sty3.png"
                alt="Analytics Screen"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-110 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-8">
                <div>
                  <span className="text-white font-bold text-xl block mb-2">Advanced Analytics</span>
                  <span classN4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-6 py-2 rounded-full text-sm font-semibold mb-4 shadow-sm">
              ⭐ Testimonials
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join thousands of happy users transforming their health journey every day
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="flex mb-6 space-x-1">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 w-5 h-5" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center pt-6 border-t border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-purple-600 font-medium
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                    {testimoni4 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">Ready to Transform Your Health?</h2>
          <p className="text-purple-100 text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of users who are taking control of their wellbeing with VitalMind. Start your free journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {status === "authenticated" ? (
              <Link href="/dashboard" className="group inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
                Go to Dashboard 
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <button
                onClick={() => signIn()}
                className="group inline-flex items-center justify-center bg-white text-purple-600 hover:bg-gray-100 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Start Your Free Journey 
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <Link href="#features" className="inline-flex items-center justify-center bg-transparent border-3 border-white text-white hover:bg-white hover:text-purple-600 font-bold px-10 py-5 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
              Learn More
            </Link>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-12 text-white/90">
            <div className="flex items-center">
              <FiCheck className="mr-2 text-xl" />
              <span className="text-lg">Free to start</span>
            </div>
            <div className="flex items-center">
              <FiCheck className="mr-2 text-xl" />20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-2 rounded-xl">
                  <FiActivity className="text-white text-2xl" />
                </div>
                <span className="text-2xl font-bold">VitalMind</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your intelligent health companion for better living and wellness tracking.
              </p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 transform hover:-translate-y-1 font-medium">
                    {social.charAt(0)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Product</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="#features" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Blog</Link></li>
                <li><Link href="/updates" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Contact</Link></li>
                <li><Link href="/press" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-6 text-white">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/privacy" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Cookie Policy</Link></li>
                <li><Link href="/security" className="hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} VitalMind. All rights reserved. Made with ❤️ for better health.
              </p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <FiShield className="mr-2 text-purple-400" />
                  SSL Secured
                </span>
                <span className="flex items-center">
                  <FiHeart className="mr-2 text-purple-400" />
                  HIPAA Compliant
                </span>
              </div>
            </div>ransition duration-300">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition duration-300">Pricing</Link></li>
                <li><Link href="/blog" className="hover:text-white transition duration-300">Blog</Link></li>
                <li><Link href="/updates" className="hover:text-white transition duration-300">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition duration-300">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition duration-300">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition duration-300">Contact</Link></li>
                <li><Link href="/press" className="hover:text-white transition duration-300">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition duration-300">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition duration-300">Cookie Policy</Link></li>
                <li><Link href="/security" className="hover:text-white transition duration-300">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} VitalMind. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function FiStar() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );
}