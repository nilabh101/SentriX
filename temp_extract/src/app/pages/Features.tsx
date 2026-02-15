import { motion } from 'motion/react';
import { Shield, Zap, Brain, Target, Lock, Activity, AlertCircle, BarChart3, Network, Eye, Filter, Clock } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function Features() {
  const coreFeatures = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Intelligent Alert Triage',
      description: 'AI automatically prioritizes security alerts based on severity, context, and potential impact using advanced ML models.',
      gradient: 'from-blue-600 to-cyan-600',
      color: 'blue'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Contextual Analysis',
      description: 'Deep learning models analyze threat patterns and provide contextual insights for faster decision-making.',
      gradient: 'from-purple-600 to-pink-600',
      color: 'purple'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Processing',
      description: 'Process thousands of alerts per second with sub-second latency for immediate threat response.',
      gradient: 'from-orange-600 to-red-600',
      color: 'pink'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Precision Detection',
      description: 'Advanced detection algorithms reduce false positives by 95% while maintaining 99.9% threat accuracy.',
      gradient: 'from-green-600 to-emerald-600',
      color: 'green'
    },
  ];

  const advancedFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Zero Trust Architecture',
      description: 'Built-in zero trust security model',
      glowColor: 'blue'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Behavioral Analytics',
      description: 'ML-powered user behavior analysis',
      glowColor: 'cyan'
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Automated Response',
      description: 'Instant threat containment actions',
      glowColor: 'purple'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Predictive Analytics',
      description: 'Forecast potential security incidents',
      glowColor: 'green'
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: 'Threat Intelligence',
      description: 'Global threat feed integration',
      glowColor: 'pink'
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Visual Insights',
      description: 'Interactive threat visualization',
      glowColor: 'blue'
    },
    {
      icon: <Filter className="w-6 h-6" />,
      title: 'Smart Filtering',
      description: 'AI-driven noise reduction',
      glowColor: 'cyan'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Historical Analysis',
      description: 'Time-series threat pattern detection',
      glowColor: 'purple'
    },
  ];

  return (
    <div className="pt-24 pb-32 px-4">
      {/* Hero */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 backdrop-blur-xl mb-6">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Powered by LangChain & OpenAI</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Advanced Security Features
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Enterprise-grade AI capabilities designed to revolutionize your security operations center
          </p>
        </motion.div>

        {/* Core Features - Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {coreFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={feature.color}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-slate-700/50 flex gap-4">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">99.9%</div>
                    <div className="text-xs text-gray-500">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">&lt;100ms</div>
                    <div className="text-xs text-gray-500">Response Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">24/7</div>
                    <div className="text-xs text-gray-500">Monitoring</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advanced Features Grid */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Additional Capabilities
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Comprehensive security features for complete protection</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advancedFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <TiltCard glowColor={feature.glowColor}>
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="max-w-7xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technology Stack
            </span>
          </h2>
        </motion.div>

        <TiltCard glowColor="purple" className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'FastAPI', desc: 'Backend' },
              { name: 'LangChain', desc: 'AI Framework' },
              { name: 'OpenAI', desc: 'ML Models' },
              { name: 'PostgreSQL', desc: 'Database' },
            ].map((tech) => (
              <div key={tech.name} className="text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500" />
                </div>
                <div className="font-semibold">{tech.name}</div>
                <div className="text-xs text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
