import React from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from 'react-helmet-async';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppProvider } from "@/contexts/AppContext";

// 前台页面组件
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// 用户认证组件
import UserAuth from "@/pages/UserAuth";

// 管理后台组件
import Login from "@/pages/Login";
import AdminLayout from "@/components/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProperties from "@/pages/admin/AdminProperties";
import AdminDebugPage from "@/pages/admin/AdminDebugPage";
import CreateProperty from "@/pages/admin/CreateProperty";
import AdminPendingProperties from "@/pages/admin/AdminPendingProperties";
import PropertyLogs from "@/pages/admin/PropertyLogs";
import MembersAnalytics from "@/pages/admin/MembersAnalytics";
import ListingsAnalytics from "@/pages/admin/ListingsAnalytics";

// 创建QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-center" expand={false} richColors />
          <AuthProvider>
            <AppProvider>
              <Router>
              <Routes>
                {/* 前台网站路由 */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/properties" element={<Layout><Properties /></Layout>} />
                <Route path="/property/:id" element={<Layout><PropertyDetail /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="/favorites" element={<Layout><Favorites /></Layout>} />
                <Route path="/profile" element={<Layout><Profile /></Layout>} />
                
                {/* Blog 路由 */}
                <Route path="/blog" element={<Layout><Blog /></Layout>} />
                <Route path="/blog/:slug" element={<Layout><BlogPost /></Layout>} />
                
                {/* 普通用户登录/注册页面 */}
                <Route path="/login" element={<UserAuth />} />
                
                {/* 管理后台登录页面（独立路由） */}
                <Route path="/admin/login" element={<Login />} />
                
                {/* 管理后台路由 */}
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="properties" element={<AdminProperties />} />
                  <Route path="properties/create" element={<CreateProperty />} />
                  <Route path="properties/pending" element={<AdminPendingProperties />} />
                  <Route path="properties/logs" element={<PropertyLogs />} />
                  <Route path="analytics/members" element={<MembersAnalytics />} />
                  <Route path="analytics/listings" element={<ListingsAnalytics />} />
                  <Route path="debug" element={<AdminDebugPage />} />
                </Route>
              </Routes>
            </Router>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;