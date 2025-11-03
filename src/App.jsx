import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { getNavItems } from "./nav-items";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/common";
import { 
  SignIn, Register, RegisterSuccess, ResetPassword,
  Home, Pricing, Techniques, WhyFree,
  Index, Dashboard, Account, PaymentSuccess,
  PromptDetail, Groups, GroupDetail, Chains, ChainDetail, CreateChain, ViewChain
} from "@/pages";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/signin" />;
};

const AppRoutes = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/why-free" element={<WhyFree />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/register-success" element={<RegisterSuccess />} />

      {/* Protected routes */}
      <Route path="/app" element={<PrivateRoute><Index /></PrivateRoute>}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* Account Settings */}
        <Route path="account" element={<Account />} />
        
        {/* Prompt Detail Route */}
        <Route path="prompts/:id" element={<PromptDetail />} />

        {/* Dynamic routes from navItems */}
        {getNavItems().filter(item => item.component && item.external !== true).map((item) => {
          if (item.dynamicRoutes === false) {
            return (
              <Route
                key={item.to}
                path={item.to}
                element={<item.component />}
              />
            );
          }
          return (
            <Route key={item.to} path={item.to}>
              <Route index element={<item.component />} />
              {item.to === 'groups' && <Route path=":id" element={<GroupDetail />} />}
              {item.to === 'library' && <Route path="prompt/:id" element={<PromptDetail />} />}
            </Route>
          );
        })}
        
        {/* Chain routes */}
        <Route path="chains">
          <Route index element={<Chains />} />
          <Route path="create" element={<CreateChain />} />
          <Route path=":id" element={<ViewChain />} />
          <Route path=":id/edit" element={<ChainDetail />} />
        </Route>
        
        {/* Detail pages */}
        <Route path="techniques" element={<Techniques />} />
        <Route path="why-free" element={<WhyFree />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-background relative">
          <Toaster />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;