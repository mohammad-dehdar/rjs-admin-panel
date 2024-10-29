import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "../pages/Register"
import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import HomePage from "../pages/HomePage"
import PrivateRoute from "./PrivateRoutes"
import PublicRoute from "./PublicRoute"
import NotFound from "../pages/404"
import ProductProvider from "../context/ProductContext"

function AppRoutes() {
    return (
        <BrowserRouter>
            <ProductProvider>
                <Routes>
                    {/* صفحه اصلی با محتوا و منطق ریدایرکت */}
                    <Route path="/" element={<HomePage />} />
                    
                    {/* صفحات عمومی */}
                    <Route 
                        path="/register" 
                        element={
                            <PublicRoute>
                                <Register />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        } 
                    />
                
                    <Route 
                        path="/dashboard" 
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        } 
                    />
                    
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </ProductProvider>
        </BrowserRouter>
    )
}

export default AppRoutes