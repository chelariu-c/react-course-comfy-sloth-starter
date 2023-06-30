import React, { useState } from "react";
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
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { register } from "../context/auth";
const theme = createTheme();

const Register = () => {
    const [success, setSuccess] = useState(false);
    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("07");
    const role = ["user"];

    const dispatch = useDispatch();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const onChangeContact = (newContact) => {
        setContact(newContact);
    };

    const onChangeAddress = (e) => {
        const address = e.target.value;
        setAddress(address);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false);

        dispatch(
            register(
                firstName,
                lastName,
                email,
                password,
                address,
                contact,
                role
            )
        )
            .then(() => {
                setSuccess(true);
                setOpen(true);
                setFirstName("");
                setLastName("");
                setEmail("");
                setPassword("");
                setAddress("");
                setContact("07");
            })
            .catch(() => {
                setSuccess(false);
            });
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
                    <Avatar
                        alt="User"
                        sx={{
                            margin: "auto",
                            width: 100,
                            height: 100,
                        }}
                    />
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
                                    onChange={onChangeFirstName}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    onChange={onChangeLastName}
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
                                    onChange={onChangeEmail}
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
                                    onChange={onChangePassword}
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
                                    onChange={onChangePassword}
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
                                    onChange={onChangeAddress}
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
                                    value={contact}
                                    onChange={onChangeContact}
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
