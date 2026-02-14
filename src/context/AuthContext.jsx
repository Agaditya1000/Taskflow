import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const MOCK_USER = {
    email: 'intern@demo.com',
    password: 'intern123',
    name: 'Intern User',
    avatar: 'https://ui-avatars.com/api/?name=Intern+User&background=random'
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('taskflow_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user from storage", e);
                localStorage.removeItem('taskflow_user');
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password, remember = false) => {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                if (email === MOCK_USER.email && password === MOCK_USER.password) {
                    const userData = { email: MOCK_USER.email, name: MOCK_USER.name, avatar: MOCK_USER.avatar };
                    setUser(userData);
                    if (remember) {
                        localStorage.setItem('taskflow_user', JSON.stringify(userData));
                    } else {
                        // For session only (sessionStorage), but req says "Remember me behavior using storage"
                        // Usually "Remember me" means persisting across browser close (localStorage).
                        // Without it, maybe sessionStorage? Or just component state?
                        // "Board state must persist across refresh" implies data persistence.
                        // Login persistence is separate.
                        // I'll use sessionStorage for non-remember-me.
                        sessionStorage.setItem('taskflow_user', JSON.stringify(userData));
                    }
                    resolve(userData);
                } else {
                    reject(new Error('Invalid email or password'));
                }
            }, 800);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('taskflow_user');
        sessionStorage.removeItem('taskflow_user');
    };

    // Check sessionStorage too if not found in localStorage (for refresh persistence if not remember me)
    useEffect(() => {
        if (!user && !loading) {
            const sessionUser = sessionStorage.getItem('taskflow_user');
            if (sessionUser) {
                setUser(JSON.parse(sessionUser));
            }
        }
    }, [loading, user]);


    const value = {
        user,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
