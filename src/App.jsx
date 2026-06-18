import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, ROLE_ROUTES } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

/* Lazy-loaded pages */
const LoginPage = lazy(() => import('./pages/LoginPage'));
const VillagerView = lazy(() => import('./pages/VillagerView'));
const JalBahiniDashboard = lazy(() => import('./pages/JalBahiniDashboard'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const PipelineMonitor = lazy(() => import('./pages/PipelineMonitor'));
const AlertsPage = lazy(() => import('./pages/AlertsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const OfficerDashboard = lazy(() => import('./pages/OfficerDashboard'));

/* Loading spinner */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-border border-t-navy rounded-full spinner" />
      <p className="text-sm text-text-muted">लोड हो रहा है... / Loading...</p>
    </div>
  </div>
);

/* Redirect handler — sends authenticated users to their role's home */
const HomeRedirect = () => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={ROLE_ROUTES[role] || '/login'} replace />;
};

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/village-status" element={<VillagerView />} />

        {/* Role-specific protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="jal_bahini">
              <JalBahiniDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute allowedRole="jal_bahini">
              <ReportsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pipeline"
          element={
            <ProtectedRoute allowedRole="jal_bahini">
              <PipelineMonitor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <ProtectedRoute allowedRole="jal_bahini">
              <AlertsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRole="jal_bahini">
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/officer-dashboard"
          element={
            <ProtectedRoute allowedRole="district_officer">
              <OfficerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch-all: redirect to role home or login */}
        <Route path="*" element={<HomeRedirect />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
