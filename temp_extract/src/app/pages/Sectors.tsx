import { motion } from 'motion/react';
import { Users, Scale, Sparkles, Sprout, BookOpen, Gavel, Bot, MessageSquare, FileText, Lightbulb } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function Sectors() {
  const sectors = [
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Farmer Help',
      description: 'AI-powered assistance for agricultural security and compliance',
      gradient: 'from-green-600 to-emerald-600',
      color: 'green',
      features: [
        { icon: <Sprout className="w-5 h-5" />, text: 'Crop security monitoring' },
        { icon: <BookOpen className="w-5 h-5" />, text: 'Best practices guidance' },
        { icon: <FileText className="w-5 h-5" />, text: 'Compliance documentation' },
        { icon: <MessageSquare className="w-5 h-5" />, text: '24/7 support chat' },
      ]
    },
    {
      icon: <Scale className="w-12 h-12" />,
      title: 'Legal Help',
      description: 'Compliance monitoring and legal guidance for security operations',
      gradient: 'from-purple-600 to-indigo-600',
      color: 'purple',
      features: [
        { icon: <Gavel className="w-5 h-5" />, text: 'Regulatory compliance' },
        { icon: <FileText className="w-5 h-5" />, text: 'Legal documentation' },
        { icon: <BookOpen className="w-5 h-5" />, text: 'Policy templates' },
        { icon: <MessageSquare className="w-5 h-5" />, text: 'Legal consultation' },
      ]
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'AI Helper',
      description: 'General purpose AI assistance for all security operations',
      gradient: 'from-orange-600 to-red-600',
      color: 'pink',
      features: [
        { icon: <Bot className="w-5 h-5" />, text: 'Intelligent automation' },
        { icon: <Lightbulb className="w-5 h-5" />, text: 'Smart recommendations' },
        { icon: <MessageSquare className="w-5 h-5" />, text: 'Natural language queries' },
        { icon: <FileText className="w-5 h-5" />, text: 'Report generation' },
      ]
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-xl mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Multi-Industry Support</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sector-Specific Solutions
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tailored AI assistance across different industries with specialized security expertise
          </p>
        </motion.div>
      </section>

      {/* Sector Cards */}
      <section className="max-w-7xl mx-auto space-y-20">
        {sectors.map((sector, index) => (
          <motion.div
            key={sector.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Content */}
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-white mb-6 shadow-2xl shadow-${sector.color}-500/50`}>
                  {sector.icon}
                </div>
                
                <h2 className="text-4xl font-bold mb-4">{sector.title}</h2>
                <p className="text-gray-400 text-lg mb-8">{sector.description}</p>

                {/* Features List */}
                <div className="space-y-4">
                  {sector.features.map((feature, idx) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sector.gradient}/20 border border-${sector.color}-500/30 flex items-center justify-center text-${sector.color}-400`}>
                        {feature.icon}
                      </div>
                      <span className="text-gray-300">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Card */}
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <TiltCard glowColor={sector.color}>
                  <div className={`aspect-square bg-gradient-to-br ${sector.gradient}/20 rounded-xl flex items-center justify-center relative overflow-hidden`}>
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '30px 30px'
                      }} />
                    </div>
                    
                    {/* Center icon */}
                    <div className={`relative z-10 w-32 h-32 rounded-3xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-white shadow-2xl`}>
                      {sector.icon}
                    </div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-10 left-10 w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    />
                    <motion.div
                      animate={{
                        y: [0, 20, 0],
                        rotate: [0, -5, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute bottom-10 right-10 w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                    />
                  </div>
                </TiltCard>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto mt-20">
        <TiltCard glowColor="blue">
          <div className="text-center py-12">
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Need Custom Sector Support?
              </span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We can tailor our AI SOC Analyst to your specific industry requirements with custom integrations and specialized security protocols.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
            >
              Contact Us
            </motion.button>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
