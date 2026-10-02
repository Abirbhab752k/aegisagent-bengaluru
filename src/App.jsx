import React, { useState } from 'react';
import { Shield, Terminal, Activity, Database, Cpu, Award } from 'lucide-react';
import Dashboard from './components/Dashboard';
import AttackSimulator from './components/AttackSimulator';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
            <Shield size={24} />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wide text-white flex items-center gap-2">
              AEGISAGENT <span className="text-xs px-2 py-0.5 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-mono">v2.4-RC</span>
            </h1>
            <p className="text-xs text-slate-400">Zero-Trust Runtime Guardrail for Autonomous AI Workflows</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-900/50 rounded-full text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Guardian Proxy Active • 18ms Latency
          </div>
          <div className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 font-mono">
            Hacksprint 2026 (MIT Bengaluru)
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-2 flex gap-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'bg-cyan-600 text-slate-950 shadow-lg shadow-cyan-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Activity size={16} /> Command Center Dashboard
        </button>
        <button
          onClick={() => setActiveTab('simulator')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'simulator'
              ? 'bg-cyan-600 text-slate-950 shadow-lg shadow-cyan-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Terminal size={16} /> AI Attack Simulator
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-2 text-white">Autonomous Agent Threat Protection</h2>
              <p className="text-slate-400 text-sm max-w-3xl mb-4">
                Traditional WAFs and static scanners cannot detect Indirect Prompt Injections inside dynamic AI reasoning chains. AegisAgent intercepts agent tool execution contracts in real time to prevent unauthorized database mutations and data exfiltration.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-1.5">
                  <Cpu size={14} /> Gemini 1.5 Flash Intent Engine
                </span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                  <Database size={14} /> Google Firestore Audit Log
                </span>
                <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-purple-300 flex items-center gap-1.5">
                  <Award size={14} /> Zero-Trust Runtime Shield
                </span>
              </div>
            </div>
            
            {/* Render Dashboard Component */}
            <Dashboard />
          </div>
        ) : (
          <AttackSimulator />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-4 px-6 text-center text-xs text-slate-500 bg-slate-900/40">
        AegisAgent Security Framework • Built for Hacksprint 2026 @ MIT Bengaluru
      </footer>
    </div>
  );
}