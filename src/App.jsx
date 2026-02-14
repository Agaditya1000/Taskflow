import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import LoginPage from './pages/LoginPage';
import Layout from './components/layout/Layout';
import { RequireAuth } from './components/auth/RequireAuth';

import BoardPage from './pages/BoardPage';
import ActivityPage from './pages/ActivityPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<RequireAuth><Layout /></RequireAuth>}>
              <Route path="/" element={<BoardPage />} />
              <Route path="/activity" element={<ActivityPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
