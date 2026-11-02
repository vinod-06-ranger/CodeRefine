import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Wand2, ArrowRightLeft, ChevronDown, Check } from 'lucide-react';

const LANGUAGES = [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'java', name: 'Java' },
    { id: 'c', name: 'C/C++' },
    { id: 'html', name: 'HTML/CSS' },
    { id: 'go', name: 'Go' }
];

export default function Rewriter() {
    const [inputCode, setInputCode] = useState('function getUserData(userId) {\n  let data;\n  api.get("/user/" + userId).then(response => {\n    data = response.data;\n  });\n  return data; // Bug: returns undefined\n}');
    const [outputCode, setOutputCode] = useState('');
    const [isRewriting, setIsRewriting] = useState(false);
    const [language, setLanguage] = useState(LANGUAGES[1]); // Default JS
    const [isLangOpen, setIsLangOpen] = useState(false);

    const handleRewrite = async () => {
        setIsRewriting(true);
        setOutputCode('');

        try {
            const response = await fetch("http://127.0.0.1:8000/rewrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: inputCode, language: language.name })
            });

            const data = await response.json();
            setOutputCode(data.feedback);
        } catch (error) {
            setOutputCode(`Error securely rewriting code: ${error.message}`);
        } finally {
            setIsRewriting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl h-full flex flex-col"
        >
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <PenTool size={20} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Code Rewriter</h1>
                        <p className="text-gray-400 text-sm">Refactor old legacy code into modern, clean standards.</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setIsLangOpen(!isLangOpen)}
                            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors bg-muted px-4 py-2 rounded-lg border border-border"
                        >
                            Target: {language.name} <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isLangOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                        className="absolute top-full right-0 mt-2 w-48 bg-muted border border-border rounded-lg shadow-xl z-20 py-1 overflow-hidden"
                                    >
                                        {LANGUAGES.map(lang => (
                                            <button
                                                key={lang.id}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center justify-between transition-colors"
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
                        onClick={handleRewrite} disabled={isRewriting || !inputCode.trim()}
                        className="bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                        {isRewriting ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                        ) : <Wand2 size={16} />}
                        {isRewriting ? 'Refactoring...' : 'Refactor Code'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 flex-1 min-h-0 pb-8 items-stretch">
                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                        <span className="text-sm font-medium text-gray-300">Legacy Code (Input)</span>
                    </div>
                    <textarea
                        className="flex-1 bg-transparent p-4 outline-none font-mono text-sm resize-none"
                        value={inputCode} onChange={(e) => setInputCode(e.target.value)} spellCheck="false"
                    />
                </div>

                <div className="flex items-center justify-center">
                    <div className="h-10 w-10 rounded-full border border-border bg-muted flex items-center justify-center text-gray-400">
                        <ArrowRightLeft size={16} />
                    </div>
                </div>

                <div className="flex flex-col border border-border rounded-xl bg-muted/30 overflow-hidden relative">
                    <div className="px-4 py-3 border-b border-border bg-muted/50">
                        <span className="text-sm font-medium text-gray-300">Modern Refactored {language.name} (Output)</span>
                    </div>
                    <div className="flex-1 bg-transparent p-4 outline-none font-mono text-sm text-green-300/90 whitespace-pre-wrap overflow-auto">
                        {outputCode || <span className="text-gray-600 italic">Select a language and click refactor to serialize modern logic...</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
