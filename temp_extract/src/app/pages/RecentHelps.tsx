import { motion } from 'motion/react';
import { Clock, Shield, AlertTriangle, Activity, Target, Zap, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
import TiltCard from '../components/TiltCard';
import AppleCarousel from '../components/AppleCarousel';

export default function RecentHelps() {
  const recentEvents = [
    {
      id: '1',
      title: 'Critical Alert Triaged',
      description: 'Ransomware attempt blocked successfully on production server',
      icon: <AlertTriangle className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-red-600 to-orange-600',
      time: '2 minutes ago',
      status: 'resolved',
      severity: 'critical'
    },
    {
      id: '2',
      title: 'Threat Intelligence Update',
      description: 'New phishing campaign detected targeting financial sector',
      icon: <Activity className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-blue-600 to-cyan-600',
      time: '15 minutes ago',
      status: 'monitoring',
      severity: 'high'
    },
    {
      id: '3',
      title: 'Security Posture Improved',
      description: 'Compliance score improved by 15% after latest security patches',
      icon: <Target className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-green-600 to-emerald-600',
      time: '1 hour ago',
      status: 'resolved',
      severity: 'info'
    },
    {
      id: '4',
      title: 'DDoS Attack Mitigated',
      description: 'Large-scale DDoS attack detected and mitigated in real-time',
      icon: <Shield className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-purple-600 to-pink-600',
      time: '2 hours ago',
      status: 'resolved',
      severity: 'critical'
    },
    {
      id: '5',
      title: 'Anomaly Detected',
      description: 'Unusual network traffic pattern identified from internal source',
      icon: <Zap className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-yellow-600 to-orange-600',
      time: '3 hours ago',
      status: 'investigating',
      severity: 'medium'
    },
    {
      id: '6',
      title: 'Vulnerability Patched',
      description: 'Zero-day vulnerability successfully patched across all systems',
      icon: <CheckCircle2 className="w-6 h-6" />,
      gradient: 'bg-gradient-to-br from-green-600 to-teal-600',
      time: '5 hours ago',
      status: 'resolved',
      severity: 'high'
    },
  ];

  const carouselItems = recentEvents.map(event => ({
    id: event.id,
    title: event.title,
    description: event.description,
    icon: event.icon,
    gradient: event.gradient,
  }));

  const stats = [
    { label: 'Total Incidents', value: '1,247', change: '+8%', icon: <Activity className="w-5 h-5" /> },
    { label: 'Resolved Today', value: '34', change: '+12%', icon: <CheckCircle2 className="w-5 h-5" /> },
    { label: 'Active Investigations', value: '7', change: '-5%', icon: <AlertTriangle className="w-5 h-5" /> },
    { label: 'Avg Resolution Time', value: '12m', change: '-18%', icon: <Clock className="w-5 h-5" /> },
  ];

  const statusColors = {
    resolved: 'text-green-400 bg-green-500/10 border-green-500/30',
    monitoring: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    investigating: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
  };

  const severityColors = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="pt-24 pb-32 px-4">
      {/* Hero */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-xl mb-6">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Real-Time Updates</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Recent Security Events
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track all security incidents, threat intelligence, and AI-powered responses in real-time
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor="blue">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    {stat.icon}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Apple Carousel */}
      <section className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Highlighted Events
            </span>
          </h2>
          <p className="text-gray-400">Browse through recent security events with our interactive carousel</p>
        </motion.div>

        <AppleCarousel items={carouselItems} />
      </section>

      {/* Detailed Event List */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              All Events
            </span>
          </h2>
          <p className="text-gray-400">Complete timeline of security operations</p>
        </motion.div>

        <div className="space-y-4">
          {recentEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <TiltCard glowColor="blue">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl ${event.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {event.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                        <p className="text-gray-400 text-sm">{event.description}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className={`px-3 py-1 rounded-full text-xs border ${statusColors[event.status as keyof typeof statusColors]}`}>
                          {event.status}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${severityColors[event.severity as keyof typeof severityColors]}`} />
                        <span className="text-gray-500 capitalize">{event.severity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-xl font-semibold hover:bg-slate-700/50 transition-colors"
          >
            Load More Events
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
