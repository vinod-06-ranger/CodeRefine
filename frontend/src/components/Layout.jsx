import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            <Sidebar />
            <main className="flex-1 h-screen overflow-y-auto w-full relative">
                <div className="max-w-6xl mx-auto p-6 md:p-10 min-h-full">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
