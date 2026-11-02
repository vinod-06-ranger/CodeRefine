import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalSquare, Bug, CheckCircle2, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
    { id: 'python', name: 'Python', ext: 'py' },
    { id: 'javascript', name: 'JavaScript', ext: 'js' },
    { id: 'java', name: 'Java', ext: 'java' },
    { id: 'c', name: 'C/C++', ext: 'c' },
    { id: 'go', name: 'Go', ext: 'go' }
];

export default function Debugger() {
    const [code, setCode] = useState('def calculate_total(items):\n    total = 0\n    for item in items:\n        total += item"price" # SyntaxError expected\n    return total');
    const [isDebugging, setIsDebugging] = useState(false);
    const [debugResult, setDebugResult] = useState('');
    const [isError, setIsError] = useState(false);
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const startDebugging = async () => {
        setIsDebugging(true);
        setDebugResult('');
        setIsError(false);

        try {
            const response = await fetch("http://127.0.0.1:8000/debug", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code, language: language.name })
            });

            const data = await response.json();
            setDebugResult(data.feedback);
        } catch (error) {
            setIsError(true);
            setDebugResult(`Error connecting to debugger backend: ${error.message}`);
        } finally {
            setIsDebugging(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <TerminalSquare size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Code Debugger</h1>
                    <p className="text-gray-400 text-sm">Identify runtime errors and logical bugs with AI assistance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-8">
                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                        <div className="flex items-center gap-3">
                            <span className="text-sm border-r border-border pr-3 font-medium text-gray-400">
                                script.{language.ext}
                            </span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsLangOpen(!isLangOpen)}
                                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-black/20 px-2 py-1 rounded-md border border-border"
                                >
                                    {language.name} <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isLangOpen && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                className="absolute top-full left-0 mt-1 w-36 bg-muted border border-border rounded-lg shadow-xl z-20 py-1 overflow-hidden"
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
                        </div>

                        <button
                            onClick={startDebugging} disabled={isDebugging || !code.trim()}
                            className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                        >
                            <Bug size={14} /> {isDebugging ? 'Debugging...' : 'Start Debugging'}
                        </button>
                    </div>
                    <div className="flex-1 flex text-sm font-mono overflow-auto">
                        <div className="w-10 bg-black/20 text-right pr-2 py-4 select-none text-gray-600 border-r border-border">
                            {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
                        </div>
                        <textarea
                            className="flex-1 bg-transparent p-4 py-4 outline-none resize-none leading-snug whitespace-pre"
                            value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false"
                        />
                    </div>
                </div>

                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-300">Debugger Output</span>
                    </div>
                    <div className="flex-1 p-4 bg-black/50 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                        {debugResult ? (
                            <div className={isError ? "text-red-400" : "text-white leading-relaxed"}>
                                {debugResult}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                                <CheckCircle2 size={32} />
                                <p>System ready. Waiting for debug execution.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
