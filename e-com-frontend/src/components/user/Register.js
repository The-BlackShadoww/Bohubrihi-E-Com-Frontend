import React from "react";
import { useState } from "react";
import Layout from "../Layout";
import { Alert, Button, Typography } from "@mui/material";
import { showError, showLoading } from "../../utils/messages";
import { register } from "../../api/apiAuth";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        loading: false,
        disabled: false,
        success: false,
    });
    const { name, email, password, success, error, loading, disabled } = values;

    const handleChange = (e) => {
        setValues({
            ...values,
            error: false,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // alert(JSON.stringify(values));
        setValues({
            ...values,
            error: false,
            loading: true,
            disabled: true,
        });
        register({ name, email, password })
            .then((res) => {
                setValues({
                    // ...values,
                    name: "",
                    email: "",
                    password: "",
                    success: true,
                    disabled: false,
                    loading: false,
                });
            })
            .catch((err) => {
                let errMsg = "Something went wrong!";
                if (err.response) {
                    errMsg = err.response.data;
                } else {
                    errMsg = "Something went wrong!";
                }
                setValues({
                    ...values,
                    error: errMsg,
                    disabled: false,
                    loading: false,
                });
            });
    };

    const signUpForm = () => {
        const form = (
            <form onSubmit={handleSubmit}>
                <label className="">Name:</label>
                <input
                    type="text"
                    name="name"
                    className="w-full border p-4"
                    value={name}
                    onChange={handleChange}
                    required
                />

                <label className="">Email:</label>
                <input
                    type="email"
                    name="email"
                    className="w-full border p-4"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <label className="text-muted">Password:</label>
                <input
                    type="password"
                    name="password"
                    className="w-full border p-4"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <Button variant="contained" type="submit" disabled={disabled}>
                    Create Account
                </Button>

                {/* <button
                    type="submit"
                    className="w-full border p-4"
                    disabled={disabled}
                >
                    Create Account
                </button> */}
            </form>
        );
        return form;
    };

    const showSuccess = () => {
        if (success)
            return (
                <div>
                    <Alert severity="success">
                        <Typography variant="body1">
                            New Account Created. Please{" "}
                            <Link to="/login">Login</Link>.
                        </Typography>
                    </Alert>
                </div>
            );
    };

    return (
        <Layout title="Register">
            {/* //* The purpose of this function is that if the user is logged in he can not go to the register page again. */}
            {isAuthenticated() ? <Navigate to="/" /> : ""}
            {showSuccess()}
            {showLoading(loading)}
            {showError(error, error)}
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Register Here,
            </Typography>
            {signUpForm()}
        </Layout>
    );
};

export default Register;
