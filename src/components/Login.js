import React, { useState } from "react";
import { Link as RouterLink, useNavigate, Navigate } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import SocialAuth from "./SocialAuth";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { motion } from "framer-motion";
import { login } from "../context/auth";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};

const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 400,
    maxHeight: 570,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
});

const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

const Login = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: (values) => {
            handleLogin(values.email, values.password);
        },
    });

    const {
        errors,
        touched,
        values,
        isSubmitting,
        handleSubmit,
        getFieldProps,
    } = formik;

    const handleLogin = (email, password) => {
        try {
            dispatch(login(email, password));
            navigate("/products");
            //  window.location.reload();
        } catch (error) {
            console.log("naspa");
        }
    };
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (isLoggedIn) {
        return <Navigate to="/products" />;
    }

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                        <Logo />
                        <Typography sx={{ color: "text.secondary", mb: 5 }}>
                            Login to your account
                        </Typography>
                    </HeadingStyle>

                    <Box component={motion.div} {...fadeInUp}>
                        <SocialAuth />
                    </Box>

                    <Divider
                        sx={{ my: 3 }}
                        component={motion.div}
                        {...fadeInUp}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                        >
                            OR
                        </Typography>
                    </Divider>
                    <FormikProvider value={formik}>
                        <Form
                            autoComplete="off"
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Box
                                component={motion.div}
                                animate={{
                                    transition: {
                                        staggerChildren: 0.55,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 3,
                                    }}
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={animate}
                                >
                                    <TextField
                                        fullWidth
                                        autoComplete="username"
                                        type="email"
                                        label="Email Address"
                                        {...getFieldProps("email")}
                                        error={Boolean(
                                            touched.email && errors.email
                                        )}
                                        helperText={
                                            touched.email && errors.email
                                        }
                                    />

                                    <TextField
                                        fullWidth
                                        autoComplete="current-password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        label="Password"
                                        {...getFieldProps("password")}
                                        error={Boolean(
                                            touched.password && errors.password
                                        )}
                                        helperText={
                                            touched.password && errors.password
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() =>
                                                            setShowPassword(
                                                                (prev) => !prev
                                                            )
                                                        }
                                                    >
                                                        {showPassword ? (
                                                            <Icon icon="eva:eye-fill" />
                                                        ) : (
                                                            <Icon icon="eva:eye-off-fill" />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>

                                <Box
                                    component={motion.div}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={animate}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{ my: 2 }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    {...getFieldProps(
                                                        "remember"
                                                    )}
                                                    checked={values.remember}
                                                />
                                            }
                                            label="Remember me"
                                        />

                                        <Link
                                            component={RouterLink}
                                            variant="subtitle2"
                                            to="/reset"
                                            underline="hover"
                                        >
                                            Forgot password?
                                        </Link>
                                    </Stack>

                                    <LoadingButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        {isSubmitting ? "loading..." : "Login"}
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </Form>
                    </FormikProvider>

                    <Typography
                        component={motion.p}
                        {...fadeInUp}
                        variant="body2"
                        align="center"
                        sx={{ mt: 3 }}
                    >
                        Don’t have an account?{" "}
                        <Link
                            variant="subtitle2"
                            component={RouterLink}
                            to="/register"
                        >
                            Sign up
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default Login;
