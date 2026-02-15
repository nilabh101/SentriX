import { motion } from 'motion/react';
import { Activity, AlertTriangle, Shield, TrendingUp, Clock, Eye, Target, Zap, BarChart3, PieChart, LineChart } from 'lucide-react';
import TiltCard from '../components/TiltCard';

export default function Dashboard() {
  const stats = [
    { icon: <Activity className="w-6 h-6" />, label: 'Active Alerts', value: '247', change: '+12%', trend: 'up', color: 'blue' },
    { icon: <AlertTriangle className="w-6 h-6" />, label: 'Critical Events', value: '8', change: '-5%', trend: 'down', color: 'pink' },
    { icon: <Shield className="w-6 h-6" />, label: 'Threats Blocked', value: '1,429', change: '+23%', trend: 'up', color: 'green' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'Response Time', value: '47ms', change: '-15%', trend: 'down', color: 'purple' },
  ];

  const widgets = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Threat Distribution',
      description: 'Real-time threat category breakdown',
      gradient: 'from-blue-600 to-cyan-600',
      color: 'blue'
    },
    {
      icon: <PieChart className="w-8 h-8" />,
      title: 'Alert Severity',
      description: 'Priority levels across all alerts',
      gradient: 'from-purple-600 to-pink-600',
      color: 'purple'
    },
    {
      icon: <LineChart className="w-8 h-8" />,
      title: 'Trend Analysis',
      description: 'Historical security metrics',
      gradient: 'from-green-600 to-emerald-600',
      color: 'green'
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Live Monitoring',
      description: 'Active security event stream',
      gradient: 'from-orange-600 to-red-600',
      color: 'pink'
    },
  ];

  const recentAlerts = [
    { id: 1, type: 'Critical', message: 'Ransomware detection on server-prod-01', time: '2 min ago', severity: 'high' },
    { id: 2, type: 'Warning', message: 'Unusual login pattern detected', time: '5 min ago', severity: 'medium' },
    { id: 3, type: 'Info', message: 'Firewall rule updated successfully', time: '12 min ago', severity: 'low' },
    { id: 4, type: 'Critical', message: 'DDoS attack mitigated', time: '18 min ago', severity: 'high' },
    { id: 5, type: 'Warning', message: 'Port scan detected from external IP', time: '23 min ago', severity: 'medium' },
  ];

  const severityColors = {
    high: 'from-red-600 to-orange-600',
    medium: 'from-yellow-600 to-orange-600',
    low: 'from-blue-600 to-cyan-600',
  };

  return (
    <div className="pt-24 pb-32 px-4">
      {/* Hero */}
      <section className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 backdrop-blur-xl mb-4">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-300">All Systems Operational</span>
              </div>
              <h1 className="text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Security Dashboard
                </span>
              </h1>
              <p className="text-gray-400">Real-time monitoring and threat intelligence</p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-shadow flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              Run Full Scan
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={stat.color}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-600/20 to-${stat.color}-600/10 border border-${stat.color}-500/30 flex items-center justify-center text-${stat.color}-400`}>
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
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

      {/* Widgets Grid */}
      <section className="max-w-7xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Analytics Widgets
            </span>
          </h2>
          <p className="text-gray-400">Interactive visualizations and insights</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.map((widget, index) => (
            <motion.div
              key={widget.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <TiltCard glowColor={widget.color}>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${widget.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {widget.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{widget.title}</h3>
                    <p className="text-gray-400 text-sm">{widget.description}</p>
                  </div>
                </div>
                
                {/* Mock chart area */}
                <div className="h-32 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl border border-slate-700/50 flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Chart visualization</div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Alerts */}
      <section className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Recent Alerts
            </span>
          </h2>
          <p className="text-gray-400">Latest security events and notifications</p>
        </motion.div>

        <TiltCard glowColor="purple">
          <div className="space-y-3">
            {recentAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${severityColors[alert.severity as keyof typeof severityColors]} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold">{alert.type}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 text-gray-400 capitalize">
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm truncate">{alert.message}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm flex-shrink-0">
                  <Clock className="w-4 h-4" />
                  {alert.time}
                </div>
              </motion.div>
            ))}
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
