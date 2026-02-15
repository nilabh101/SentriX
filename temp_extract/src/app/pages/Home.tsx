import { motion } from 'motion/react';
import { Shield, Zap, Brain, TrendingUp, Lock, Users, Sparkles, AlertTriangle, Activity, Target } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import AppleCarousel from '../components/AppleCarousel';
import { Suspense, lazy } from 'react';

// Lazy load Spline to prevent blocking
const Spline = lazy(() => import('@splinetool/react-spline'));

export default function Home() {
  const features = [
    { icon: <Shield className="w-6 h-6" />, title: 'Alert Triage', description: 'AI-powered prioritization of security alerts' },
    { icon: <Brain className="w-6 h-6" />, title: 'Smart Analysis', description: 'Automated threat detection and classification' },
    { icon: <Zap className="w-6 h-6" />, title: 'Real-time Response', description: 'Instant threat assessment and recommendations' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Predictive Intelligence', description: 'Machine learning-based threat prediction' },
  ];

  const sectors = [
    { icon: <Users className="w-8 h-8" />, title: 'Farmer Help', description: 'AI assistance for agricultural security', gradient: 'from-green-600 to-emerald-600' },
    { icon: <Lock className="w-8 h-8" />, title: 'Legal Help', description: 'Compliance and legal guidance', gradient: 'from-purple-600 to-indigo-600' },
    { icon: <Sparkles className="w-8 h-8" />, title: 'AI Helper', description: 'General purpose AI assistance', gradient: 'from-orange-600 to-red-600' },
  ];

  const recentHelps = [
    { id: '1', title: 'Critical Alert Triaged', description: 'Ransomware attempt blocked successfully', icon: <AlertTriangle className="w-6 h-6" />, gradient: 'bg-gradient-to-br from-red-600 to-orange-600' },
    { id: '2', title: 'Threat Intelligence', description: 'New phishing campaign detected', icon: <Activity className="w-6 h-6" />, gradient: 'bg-gradient-to-br from-blue-600 to-cyan-600' },
    { id: '3', title: 'Security Posture', description: 'Compliance score improved by 15%', icon: <Target className="w-6 h-6" />, gradient: 'bg-gradient-to-br from-green-600 to-emerald-600' },
    { id: '4', title: 'Incident Response', description: 'DDoS attack mitigated in real-time', icon: <Shield className="w-6 h-6" />, gradient: 'bg-gradient-to-br from-purple-600 to-pink-600' },
  ];

  return (
    <div className="pt-16 pb-32">
      {/* Hero Section with Spline */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading 3D Scene...</p>
              </div>
            </div>
          }>
            <Spline 
              scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
              className="w-full h-full"
            />
          </Suspense>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950 z-10" />

        {/* Hero content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-xl mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-cyan-300">Next-Gen Security Operations</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI SOC Analyst
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Revolutionize threat detection with AI-powered alert triage. Prioritize, analyze, and respond to security incidents in real-time.
            </p>

            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl font-semibold hover:bg-slate-700/50 transition-colors"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Core Capabilities
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Powered by LangChain, OpenAI, and advanced ML models</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor="blue">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sectors Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Multi-Sector Support
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Tailored AI assistance across industries</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={sector.gradient.includes('green') ? 'green' : sector.gradient.includes('purple') ? 'purple' : 'pink'}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center mb-4 text-white`}>
                  {sector.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{sector.title}</h3>
                <p className="text-gray-400">{sector.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Real-Time Dashboard
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Monitor and respond to threats instantly</p>
        </motion.div>

        <TiltCard glowColor="purple" className="max-w-4xl mx-auto">
          <div className="aspect-video bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <Activity className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-gray-300">Dashboard visualization preview</p>
            </div>
          </div>
        </TiltCard>
      </section>

      {/* Recent Helps Carousel */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Recent Security Events
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Latest threat intelligence and incident responses</p>
        </motion.div>

        <AppleCarousel items={recentHelps} />
      </section>
    </div>
  );
}