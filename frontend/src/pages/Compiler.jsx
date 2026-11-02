import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Code2, Terminal, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
    { id: 'python', name: 'Python', ext: 'py' },
    { id: 'javascript', name: 'JavaScript', ext: 'js' },
    { id: 'java', name: 'Java', ext: 'java' },
    { id: 'c', name: 'C/C++', ext: 'c' },
    { id: 'go', name: 'Go', ext: 'go' }
];

export default function Compiler() {
    const [code, setCode] = useState('print("Hello, CodeRefine!")');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const runCode = async () => {
        setIsRunning(true);
        setOutput('');

        try {
            const response = await fetch("http://127.0.0.1:8000/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code, language: language.name })
            });

            const data = await response.json();
            setOutput(data.feedback);
        } catch (error) {
            setOutput(`Error connecting to compiler backend: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <Play size={20} className="ml-1" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Code Compiler</h1>
                    <p className="text-gray-400 text-sm">Run your code instantly in isolated environments.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0 pb-8">
                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                        <div className="flex items-center gap-3">
                            <span className="text-sm border-r border-border pr-3 font-medium text-gray-400 flex items-center gap-2">
                                <Code2 size={16} /> source.{language.ext}
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
                            onClick={runCode} disabled={isRunning || !code.trim()}
                            className="bg-primary text-primary-foreground px-4 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50"
                        >
                            {isRunning ? (
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                            ) : <Play size={14} className="fill-primary-foreground" />}
                            {isRunning ? 'Running...' : 'Run'}
                        </button>
                    </div>
                    <textarea
                        className="flex-1 w-full bg-transparent p-4 outline-none font-mono text-sm resize-none"
                        value={code} onChange={(e) => setCode(e.target.value)} spellCheck="false"
                    />
                </div>

                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center gap-2">
                        <Terminal size={16} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-300">Terminal Output</span>
                    </div>
                    <div className="flex-1 p-4 bg-black/50 overflow-y-auto font-mono text-sm whitespace-pre-wrap text-green-400">
                        {output || <span className="text-gray-600">// Output will appear here</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
