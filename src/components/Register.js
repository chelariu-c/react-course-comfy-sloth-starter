import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PhoneField from "./PhoneField";
import axios from "axios";
import { user_url as url } from "../utils/constants";
import Alert from "@mui/material/Alert";
import styled from "styled-components";

const theme = createTheme();

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const password = document.getElementById("password").value;
        const confirmPass = document.getElementById("confirm-password").value;
        const address = document.getElementById("address").value;
        const contact = document.getElementById("contact").value;

        const formData = {
            firstName,
            lastName,
            password,
            email: data.get("email"),
            address,
            contact,
            role: "USER",
        };

        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
        try {
            const response = await axios.post(url, formData);
            console.log("Form data submitted successfully", response);
            setSuccess(true);
            setOpen(true);
        } catch (error) {
            setSuccess(false);
            setOpen(true);
            console.log("Error submitting form data:", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 3,
                        marginBottom: 4,
                    }}
                >
                    <Avatar src="/broken-image.jpg" />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {success && open && (
                        <Alert
                            variant="filled"
                            severity="success"
                            onClose={() => setOpen(false)}
                        >
                            Account created! Please Login
                        </Alert>
                    )}
                    {success === false && open && (
                        <Alert
                            variant="filled"
                            severity="error"
                            onClose={() => setOpen(false)}
                        >
                            Error creating account. Please try again.
                        </Alert>
                    )}
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirm-password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    autoComplete="address"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PhoneField
                                    required
                                    fullWidth
                                    name="contact"
                                    label="Mobile"
                                    type="tel"
                                    id="contact"
                                    autoComplete="contact"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="allowExtraEmails"
                                            color="primary"
                                        />
                                    }
                                    label="I have read and agree to the Terms and Conditions, the Privacy Policy. I confirm that I am over 16 years old."
                                />
                            </Grid>
                        </Grid>
                        {/* <Grid container justifyContent="center"> */}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        {/* </Grid> */}
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Register;
