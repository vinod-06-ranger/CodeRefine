import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    TerminalSquare,
    SearchCode,
    Play,
    Zap,
    PenTool,
    LayoutDashboard,
    LogOut,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const tools = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Analysis', path: '/analysis', icon: SearchCode },
    { name: 'Debugger', path: '/debugger', icon: TerminalSquare },
    { name: 'Compiler', path: '/compiler', icon: Play },
    { name: 'Performance', path: '/performance', icon: Zap },
    { name: 'Rewriter', path: '/rewriter', icon: PenTool },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.div
            animate={{ width: collapsed ? 80 : 260 }}
            className="h-screen bg-muted border-r border-border flex flex-col justify-between hidden md:flex"
        >
            <div className="p-4">
                <div className="flex items-center gap-3 mb-8 px-2 mt-2">
                    <div className="h-8 w-8 rounded bg-primary flex items-center justify-center font-bold text-primary-foreground text-xl">
                        C
                    </div>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-semibold text-lg tracking-tight"
                        >
                            CodeRefine
                        </motion.span>
                    )}
                </div>

                <nav className="space-y-2">
                    {tools.map((tool) => (
                        <NavLink
                            key={tool.name}
                            to={tool.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive
                                    ? 'bg-primary text-primary-foreground font-medium'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <tool.icon size={20} className="shrink-0" />
                            {!collapsed && <span>{tool.name}</span>}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-4 border-t border-border/50">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-400 hover:bg-white/5 w-full mb-2"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    {!collapsed && <span>Collapse</span>}
                </button>
                <NavLink
                    to="/login"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-400 hover:text-red-400 hover:bg-red-400/10 w-full"
                >
                    <LogOut size={20} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </NavLink>
            </div>
        </motion.div>
    );
}
