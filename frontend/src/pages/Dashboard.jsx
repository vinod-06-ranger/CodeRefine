import { motion } from 'framer-motion';
import { ArrowRight, Code2, Zap, SearchCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Code Analysis',
            description: 'AI-powered code review and feedback.',
            icon: SearchCode,
            path: '/analysis'
        },
        {
            title: 'Code Debugger',
            description: 'Fix bugs and trace execution paths.',
            icon: Code2,
            path: '/debugger'
        },
        {
            title: 'Performance Optimizer',
            description: 'Make your code run faster and use less memory.',
            icon: Zap,
            path: '/performance'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl pt-8"
        >
            <h1 className="text-4xl font-semibold mb-3 tracking-tight">Welcome to CodeRefine</h1>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl">
                Your unified, AI developer workspace. Select a tool from the sidebar or choose a quick action below to get started.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -5 }}
                        className="p-6 rounded-2xl border border-border bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                        onClick={() => navigate(feature.path)}
                    >
                        <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <feature.icon size={24} />
                        </div>
                        <h3 className="text-xl font-medium mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm mb-6">{feature.description}</p>
                        <div className="flex items-center text-sm font-medium text-white group-hover:translate-x-1 transition-transform">
                            Get Started <ArrowRight size={16} className="ml-2" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
