import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchCode, Sparkles, AlertCircle, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C/C++' },
    { id: 'html', name: 'HTML/CSS' },
    { id: 'go', name: 'Go' }
];

export default function Analysis() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState(LANGUAGES[0]);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [feedback, setFeedback] = useState("");
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const analyzeCode = async () => {
        if (!code.trim()) return;

        setIsLoading(true);
        setFeedback("");
        setIsError(false);

        try {
            const response = await fetch("http://127.0.0.1:8000/review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: code, language: language.name })
            });

            const data = await response.json();
            setFeedback(data.feedback);
        } catch (error) {
            setIsError(true);
            setFeedback("Error connecting to backend");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <SearchCode size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Code Analysis</h1>
                        <p className="text-gray-400 text-sm">AI-powered code review, vulnerability detection, and standard enforcement.</p>
                    </div>
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
                            onClick={analyzeCode}
                            disabled={isLoading || !code.trim()}
                            className="bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                                />
                            ) : <Sparkles size={16} />}
                            {isLoading ? 'Analyzing...' : 'Analyze Code'}
                        </button>
                    </div>
                    <textarea
                        className="flex-1 w-full bg-transparent p-4 outline-none font-mono text-sm resize-none"
                        placeholder={`Paste your ${language.name} code here...`}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        spellCheck="false"
                    />
                </div>

                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                        <span className="text-sm font-medium text-gray-300">AI Feedback</span>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                        {isLoading ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                                    <SearchCode size={32} className="opacity-50" />
                                </motion.div>
                                <p>Generating insights...</p>
                            </div>
                        ) : feedback ? (
                            <div className={isError ? "text-red-400" : "text-white leading-relaxed"}>
                                {feedback}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 gap-3 text-center">
                                <AlertCircle size={32} className="opacity-50" />
                                <p className="max-w-[250px]">Paste your code and click analyze to see AI feedback here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
