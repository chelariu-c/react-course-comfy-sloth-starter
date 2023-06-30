import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box } from "@mui/material";
import styled from "@emotion/styled";
import SocialAuth from "../components/SocialAuth";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { motion } from "framer-motion";
import ForgotPasswordForm from "./ForgotPasswordForm";

//////////////////////////////////
const RootStyle = styled("div")({
    background: "rgb(249, 250, 251)",
    height: "90vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 400,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#fff",
    // marginTop: -100, // adjust this value to move the form closer to the footer
});

let easing = [0.6, -0.05, 0.01, 0.99];
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

const ForgotPassword = ({ setAuth }) => {
    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                        <Logo />
                    </HeadingStyle>

                    <ForgotPasswordForm setAuth={setAuth} />

                    <Typography
                        component={motion.p}
                        {...fadeInUp}
                        variant="body2"
                        align="center"
                        sx={{ mt: 3 }}
                    >
                        Return To {"  "}
                        <Link
                            variant="subtitle2"
                            component={RouterLink}
                            to="/login"
                        >
                            Login
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default ForgotPassword;
