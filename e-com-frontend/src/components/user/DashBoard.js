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

const DashBoard = () => {
    const { name, email, role } = userInfo();

    const UserLinks = () => {
        return (
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="h4" color="text.secondary">User Links</Typography>
                    <ul>
                        <li>
                            <Link to="#">My Cart</Link>
                        </li>
                        <li>
                            <Link to="#">Update Profile</Link>
                        </li>
                    </ul>
                </CardContent>
            </Card>
        );
    };

    const PurchaseHistory = () => (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h4" color="text.secondary">
                    Purchase History
                </Typography>
                <ul>
                    <li>History</li>
                </ul>
            </CardContent>
        </Card>
    );

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
                    <PurchaseHistory />
                </div>
            </div>
        </Layout>
    );
};

export default DashBoard;
