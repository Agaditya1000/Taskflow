import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx'; // Ensure clsx is installed or just use string templates? I installed it.

export default function LoginPage() {
    const [email, setEmail] = useState('intern@demo.com');
    const [password, setPassword] = useState('intern123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }
            await login(email, password, true); // Always remember for now or add checkbox
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.message || 'Failed to login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-center min-h-screen p-4">
            <div className="glass-panel w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gradient mb-2">TaskFlow</h1>
                    <p className="text-white/60">Manage your tasks with elegance</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            id="email"
                            type="email"
                            label="Email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        <Input
                            id="password"
                            type="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-3"
                        isLoading={isLoading}
                    >
                        Sign In
                    </Button>

                    <div className="text-center text-xs text-white/40 mt-4">
                        Use <span className="text-white/70">intern@demo.com</span> / <span className="text-white/70">intern123</span>
                    </div>
                </form>
            </div>
        </div>
    );
}
