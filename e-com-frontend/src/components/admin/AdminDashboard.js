import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
import { userInfo } from "../../utils/auth";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from "@mui/material";

const AdminDashboard = () => {
    const { name, email, role } = userInfo();

    const UserLinks = () => {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h4" color="text.secondary">
                        User Links
                    </Typography>
                    <ul>
                        <li>
                            <Link to="/create/category">Create Category</Link>
                        </li>
                        <li>
                            <Link to="/create/product">Create Product</Link>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        );
    };

    const UserInfo = () => (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    User Information
                </Typography>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>{role}</li>
                </ul>
            </CardContent>
        </Card>
    );

    return (
        <Layout title="Dashboard">
            <div>
                <div>
                    <UserLinks />
                </div>
                <div>
                    <UserInfo />
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
