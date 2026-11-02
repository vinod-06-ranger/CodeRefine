import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Activity, Gauge, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C/C++' },
    { id: 'go', name: 'Go' }
];

export default function Performance() {
    const [code, setCode] = useState('def get_even_numbers(max_val):\n    res = []\n    for i in range(max_val):\n        if i % 2 == 0:\n            res.append(i)\n    return res');
    const [isProfiling, setIsProfiling] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const runProfiler = async () => {
        setIsProfiling(true);
        setProfileData(null);

        try {
            const response = await fetch("http://127.0.0.1:8000/performance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code, language: language.name })
            });

            const data = await response.json();
            setProfileData(data);
        } catch (error) {
            setProfileData({
                time: "Error",
                space: "Error",
                score: 0,
                suggestion: `Network Error: ${error.message}`
            });
        } finally {
            setIsProfiling(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <Zap size={20} className="fill-white/20" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Performance Optimizer</h1>
                    <p className="text-gray-400 text-sm">Profile code complexity and get suggestions for O(1) solutions.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-8">
                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-black/20 px-3 py-1.5 rounded-md border border-border"
                            >
                                {language.name} <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isLangOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                            className="absolute top-full left-0 mt-1 w-40 bg-muted border border-border rounded-lg shadow-xl z-20 py-1 overflow-hidden"
                                        >
                                            {LANGUAGES.map(lang => (
                                                <button
                                                    key={lang.id}
                                                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors"
                                                    onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                                                >
                                                    {lang.name}
                                                    {language.id === lang.id && <Check size={14} className="text-primary" />}
                                                </button>
                                            ))}
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={runProfiler} disabled={isProfiling}
                            className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-blue-500/20 transition-colors disabled:opacity-50"
                        >
                            <Activity size={14} /> {isProfiling ? 'Profiling...' : 'Run Profiler'}
                        </button>
                    </div>
                    <textarea
                        className="flex-1 bg-transparent p-4 outline-none font-mono text-sm resize-none"
                        value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false"
                    />
                </div>

                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden relative">
                    <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
                        <Gauge size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Performance Metrics</span>
                    </div>

                    <div className="p-6">
                        {!profileData && !isProfiling ? (
                            <div className="h-full flex flex-col items-center gap-4 text-gray-500 mt-20">
                                <Gauge size={48} className="opacity-20" />
                                <p>Run profiler to view complexity score</p>
                            </div>
                        ) : isProfiling ? (
                            <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500 mt-20">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                    <Activity size={48} className="opacity-50 text-blue-400" />
                                </motion.div>
                                <p>Analyzing ast and instruction sets...</p>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h3 className="text-sm text-gray-400 uppercase tracking-widest font-semibold mb-1">Efficiency Score</h3>
                                        <div className="text-5xl font-bold tracking-tighter text-yellow-400">{profileData.score}<span className="text-2xl text-gray-500">/100</span></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/40 border border-border p-4 rounded-xl">
                                        <div className="text-sm text-gray-500 mb-1">Time Complexity</div>
                                        <div className="text-xl font-mono text-white">{profileData.time}</div>
                                    </div>
                                    <div className="bg-black/40 border border-border p-4 rounded-xl">
                                        <div className="text-sm text-gray-500 mb-1">Space Complexity</div>
                                        <div className="text-xl font-mono text-white">{profileData.space}</div>
                                    </div>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                                    <div className="text-blue-400 font-medium text-sm mb-2 flex items-center gap-2"><Zap size={14} /> Optimization Plan</div>
                                    <p className="text-sm text-blue-200/70 font-mono leading-relaxed">{profileData.suggestion}</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
