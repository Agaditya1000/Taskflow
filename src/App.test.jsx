import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { BrowserRouter } from 'react-router-dom';

// Utility wrapper for tests
const renderApp = () => {
    return render(<App />);
};

describe('TaskFlow App', () => {
    it('renders login page by default', () => {
        renderApp();
        expect(screen.getByText(/TaskFlow/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
    });

    it('shows error on empty login', async () => {
        renderApp();
        const submitBtn = screen.getByText(/Sign In/i);

        // Clear inputs if they have defaults (our mocked login has defaults in state, need to check)
        // Actually, in LoginPage.js: useState('intern@demo.com').
        // So distinct test needed: Clear inputs then submit.

        const emailInput = screen.getByPlaceholderText(/name@example.com/i);
        const passwordInput = screen.getByPlaceholderText(/••••••••/i);

        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.click(submitBtn);

        // Expect HTML5 validation or custom error?
        // LoginPage: checks "if (!email || !password)" then throws 'Please fill in all fields'
        // Rendered in div with class bg-red-500/10

        expect(await screen.findByText(/Please fill in all fields/i)).toBeInTheDocument();
    });

    it('navigates to board on successful login', async () => {
        renderApp();
        const submitBtn = screen.getByText(/Sign In/i);

        // Use default creds
        fireEvent.click(submitBtn);

        // Wait for navigation
        await waitFor(() => {
            expect(screen.getByText(/My Board/i)).toBeInTheDocument();
        }, { timeout: 2000 });
    });

    /* 
       Ideally we'd test Task Creation here too, but it requires being logged in.
       Since the previous test logs us in, we could chain or utilize beforeEach, 
       but local storage persists between tests in jsdom unless cleared?
       AuthProvider checks localStorage on mount.
    */
});
