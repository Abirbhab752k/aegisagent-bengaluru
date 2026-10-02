import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Activity, Database, Lock, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    totalIntercepted: 1420,
    promptInjectionsBlocked: 894,
    dbMutationsPrevented: 312,
    avgLatency: "18ms",
    systemHealth: "Optimal"
  });

  const [policies, setPolicies] = useState({
    strictIntent: true,
    dataExfiltrationShield: true,
    dbWriteGuard: true,
    sandboxEnforcement: false
  });

  const [logs, setLogs] = useState([
    { id: 1, timestamp: "12:05:22 AM", agent: "CustomerSupportBot-v4", threat: "Indirect Prompt Injection", status: "BLOCKED", risk: "Critical (9.8)" },
    { id: 2, timestamp: "12:04:10 AM", agent: "InvoiceParserAgent", threat: "Unauthorized SQL Mutation", status: "BLOCKED", risk: "High (8.5)" },
    { id: 3, timestamp: "11:59:45 PM", agent: "TicketSummarizer", threat: "Safe CRM Execution", status: "PASSED", risk: "0.0 (Safe)" },
    { id: 4, timestamp: "11:55:12 PM", agent: "LeadGenAgent", threat: "Data Exfiltration Attempt", status: "BLOCKED", risk: "Critical (9.2)" },
  ]);

  const togglePolicy = (key) => {
    setPolicies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Total Intercepted</span>
            <Activity size={18} className="text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.totalIntercepted || 0}</div>
          <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 size={12} /> +12% from last hour
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Prompt Injections Blocked</span>
            <ShieldAlert size={18} className="text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.promptInjectionsBlocked || 0}</div>
          <div className="text-xs text-rose-400 mt-1">Zero-trust runtime shield active</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">DB Mutations Prevented</span>
            <Database size={18} className="text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.dbMutationsPrevented || 0}</div>
          <div className="text-xs text-amber-400 mt-1">Unsanitized SQL payloads caught</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider">Interceptor Latency</span>
            <RefreshCw size={18} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{metrics?.avgLatency || "18ms"}</div>
          <div className="text-xs text-slate-400 mt-1">Gemini 1.5 Flash Intent Engine</div>
        </div>
      </div>

      {/* Policy Controls Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg lg:col-span-1">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lock size={18} className="text-cyan-400" /> Active Security Policies
          </h3>
          <div className="space-y-4">
            {Object.entries(policies).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-xs font-mono capitalize text-slate-300">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <button
                  onClick={() => togglePolicy(key)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${value ? 'bg-cyan-600' : 'bg-slate-800'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Audit Log */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl shadow-lg lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertTriangle size={18} className="text-amber-400" /> Live Firestore Security Audit Log
            </h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/50">
              Real-time Stream
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3">Time</th>
                  <th className="p-3">Agent ID</th>
                  <th className="p-3">Threat Vector</th>
                  <th className="p-3">Risk Score</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-slate-400">{log.timestamp}</td>
                    <td className="p-3 text-white font-sans font-semibold">{log.agent}</td>
                    <td className="p-3 text-slate-300">{log.threat}</td>
                    <td className="p-3 text-rose-400">{log.risk}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${log.status === 'BLOCKED' ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ToastNotification({ message, type }) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 border border-emerald-500/50 text-emerald-400 rounded-xl shadow-2xl backdrop-blur-lg animate-bounce">
      <ShieldCheck size={20} />
      <span className="text-sm font-medium text-slate-200">{message}</span>
    </div>
  );
}
// Example inside Dashboard.jsx
export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-slate-100">Cyber Command Center</h2>
      
      {/* Apply the class string here on your card wrappers */}
      <div className="p-5 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg hover:border-slate-700 transition">
        <h3 className="text-sm font-medium text-slate-400">Total Scanned Requests</h3>
        <p className="text-3xl font-bold text-slate-100 mt-2">1,482</p>
      </div>

      <div className="p-5 bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-2xl shadow-lg hover:border-slate-700 transition">
        <h3 className="text-sm font-medium text-slate-400">Threats Neutralized</h3>
        <p className="text-3xl font-bold text-red-500 mt-2">38</p>
      </div>
    </div>
  );
}