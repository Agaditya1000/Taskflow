import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { LogOut, LayoutDashboard, Activity, Menu, X } from 'lucide-react';
import clsx from 'clsx';

import logo from '../../images/taskflowlogo.png';

export default function Layout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;


    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex h-screen overflow-hidden relative flex-col-mobile">
            {/* Mobile Header */}
            <div className="hidden-desktop w-full p-4 flex justify-between items-center glass-panel m-4 mb-0 z-40">
                <img src={logo} alt="TaskFlow" className="w-32 object-contain" />
                <Button variant="ghost" onClick={() => setIsMobileMenuOpen(true)}>
                    <Menu size={24} />
                </Button>
            </div>

            {/* Mobile Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm hidden-desktop"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={clsx(
                "w-64 glass-panel m-4 mr-0 flex flex-col border-r-0 transition-transform duration-300",
                // Desktop: Always visible, static
                "md:flex",
                // Mobile: Fixed, transformed based on state
                "fixed-mobile",
                !isMobileMenuOpen && "hidden-mobile"
            )}>
                <div className="p-6 flex justify-between items-center">
                    <img src={logo} alt="TaskFlow" className="w-32 md:w-40 object-contain" />
                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white/60 hover:text-white hidden-desktop bg-transparent"
                    >
                        <X size={20} />
                    </button>
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
            <main className="flex-1 overflow-auto p-4 flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    );
}
