import { motion } from 'motion/react';
import { Shield, Lock, FileCheck, Award, CheckCircle2, Eye, Server, Fingerprint, Key, Database } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function Profile() {
  const trustFeatures = [
    { icon: <Lock className="w-6 h-6" />, title: 'End-to-End Encryption', description: 'Military-grade AES-256 encryption' },
    { icon: <Eye className="w-6 h-6" />, title: 'Privacy First', description: 'Zero-knowledge architecture' },
    { icon: <Server className="w-6 h-6" />, title: 'Secure Infrastructure', description: 'Multi-region data centers' },
    { icon: <Fingerprint className="w-6 h-6" />, title: 'Biometric Auth', description: 'Multi-factor authentication' },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', status: 'Certified', icon: <Award className="w-8 h-8" /> },
    { name: 'ISO 27001', status: 'Certified', icon: <Award className="w-8 h-8" /> },
    { name: 'GDPR Compliant', status: 'Verified', icon: <CheckCircle2 className="w-8 h-8" /> },
    { name: 'HIPAA Compliant', status: 'Verified', icon: <CheckCircle2 className="w-8 h-8" /> },
  ];

  const securityMetrics = [
    { label: 'Uptime SLA', value: '99.99%', color: 'green' },
    { label: 'Threat Detection Rate', value: '99.9%', color: 'blue' },
    { label: 'False Positive Rate', value: '<0.01%', color: 'cyan' },
    { label: 'Response Time', value: '<100ms', color: 'purple' },
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
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Enterprise-Grade Security</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Trust & Security Profile
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on a foundation of trust, compliance, and industry-leading security standards
          </p>
        </motion.div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor="blue">
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Compliance & Certifications
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Independently verified and audited</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor="purple">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 mx-auto mb-4 flex items-center justify-center text-purple-400">
                    {cert.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-400">{cert.status}</span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Metrics */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Performance Metrics
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Industry-leading security performance</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={metric.color}>
                <div className="text-center">
                  <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-${metric.color}-400 to-${metric.color}-600 bg-clip-text text-transparent`}>
                    {metric.value}
                  </div>
                  <div className="text-gray-400">{metric.label}</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Security Architecture */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Security Architecture
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Multi-layered defense system</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TiltCard glowColor="blue">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-lg">
                <Key className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Data Protection</h3>
                <p className="text-gray-400">Advanced encryption and access controls</p>
              </div>
            </div>
            <ul className="space-y-3">
              {['256-bit AES encryption', 'Zero-knowledge architecture', 'Encrypted backups', 'Secure key management'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>

          <TiltCard glowColor="purple">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Infrastructure</h3>
                <p className="text-gray-400">Enterprise-grade infrastructure</p>
              </div>
            </div>
            <ul className="space-y-3">
              {['Multi-region redundancy', 'DDoS protection', 'Automated failover', 'Real-time monitoring'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto mt-20">
        <TiltCard glowColor="cyan">
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Secure Your Operations?
              </span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of organizations trusting AI SOC Analyst for their security operations
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow"
            >
              Get Started Now
            </motion.button>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
