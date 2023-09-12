import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import { Container } from "@mui/material";
import Login from "./user/Login";
import Register from "./user/Register";
//-------------------------------------
import PrivateRoute from "./protectedRoutes/PrivateRoute";
import DashBoard from "./user/DashBoard";
import AdminRoute from "./protectedRoutes/AdminRoute";
import AdminDashboard from "./admin/AdminDashboard";

const Main = () => {
    return (
        <div>
            <Container>
                <Routes>
                    <Route path="/" exact Component={Home} />
                    <Route path="/login" exact Component={Login} />
                    <Route path="/register" exact Component={Register} />
                    <Route
                        path="/user/dashboard"
                        element={
                            <PrivateRoute>
                                <DashBoard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/admin/dashboard"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />
                </Routes>
                {/* <Navigate to="/"/> */}
            </Container>
        </div>
    );
};

export default Main;
