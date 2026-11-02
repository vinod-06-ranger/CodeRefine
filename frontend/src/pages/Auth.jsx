import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Auth() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login for now
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-8 rounded-2xl border border-border bg-muted/30"
            >
                <div className="flex items-center gap-3 mb-8 justify-center">
                    <div className="h-10 w-10 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-2xl">
                        C
                    </div>
                    <span className="font-semibold text-2xl tracking-tight">CodeRefine</span>
                </div>

                <h2 className="text-xl text-center mb-6 font-medium tracking-tight">Sign in to your account</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors text-sm"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-background border border-border rounded-lg px-4 py-2.5 outline-none focus:border-primary transition-colors text-sm"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-4 py-2.5 mt-4 hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    >
                        Sign In <ArrowRight size={16} />
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    New to CodeRefine? <span className="text-primary cursor-pointer hover:underline">Create an account</span>
                </p>
            </motion.div>
        </div>
    );
}
