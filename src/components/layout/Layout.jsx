import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { LogOut, LayoutDashboard, Activity } from 'lucide-react';
import clsx from 'clsx';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass-panel m-4 mr-0 flex flex-col border-r-0">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-gradient">TaskFlow</h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Button
                        variant="ghost"
                        className={clsx(
                            "w-full justify-start",
                            isActive('/') && "text-white/90 bg-white/5 font-medium"
                        )}
                        onClick={() => navigate('/')}
                    >
                        <LayoutDashboard size={20} />
                        Board
                    </Button>
                    <Button
                        variant="ghost"
                        className={clsx(
                            "w-full justify-start",
                            isActive('/activity') && "text-white/90 bg-white/5 font-medium"
                        )}
                        onClick={() => navigate('/activity')}
                    >
                        <Activity size={20} />
                        Activity
                    </Button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name}</p>
                            <p className="text-xs text-white/50 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="w-full text-xs" onClick={handleLogout}>
                        <LogOut size={14} />
                        Log Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}
