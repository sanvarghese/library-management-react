import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BooksPage from './pages/BooksPage';
import ProfilePage from './pages/ProfilePage';
import AdminBooksPage from './pages/AdminBooksPage';
import { useAuth } from './context/AuthContext';
import TestProfilePage from './pages/TestProfilePage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ProtectedRoute = ({ children }) => {  
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const AdminRoute = ({ children }) => {
  const { user, isAdmin } = useAuth();
  console.log('AdminRoute check:', { user, isAdmin: isAdmin() });

  if (!user) {
    console.log('Redirecting to login - no user');
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    console.log('Redirecting to dashboard - not admin');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Router should wrap AuthProvider */}
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout>
                    <BooksPage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  {/* <TestProfilePage /> */}

                  <DashboardLayout>
                    <ProfilePage />
                  </DashboardLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/books"
              element={
                <AdminRoute>
                  <DashboardLayout>
                    <AdminBooksPage />
                  </DashboardLayout>
                </AdminRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;