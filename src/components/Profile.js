import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";

const ProfileCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
    minHeight: "calc(80vh - 30px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}));

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        console.log("Auth state:", currentUser);

        if (currentUser) {
            const expiryTime = new Date(currentUser.expiryDate).getTime();
            const currentTime = new Date().getTime();
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining > 0) {
                setTimeLeft(timeRemaining);
                const timer = setInterval(() => {
                    setTimeLeft((prevTime) => prevTime - 1000);
                }, 1000);

                return () => clearInterval(timer);
            }
        }
    }, [currentUser]);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const { token, id, email, expiryDate, roles } = currentUser;

    const formattedExpiryDate = new Date(expiryDate).toLocaleDateString();

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(token);
        toast.success("Token copied to clipboard!");
    };

    const formatTimeLeft = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <ProfileCard>
            <CardContent>
                <Typography variant="h4" component="h2" align="center">
                    Profile
                </Typography>
                <Avatar
                    alt="User"
                    sx={{
                        margin: "auto",
                        marginBottom: "1rem",
                        marginTop: "2rem",
                        width: 150,
                        height: 150,
                    }}
                />
                <Typography
                    variant="body2"
                    align="center"
                    sx={{ marginBottom: "1rem" }}
                >
                    <strong>Email:</strong> {email}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Authorities:</strong>
                    {roles &&
                        roles.map((role, index) => <li key={index}>{role}</li>)}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Expiry Date:</strong> {formattedExpiryDate}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Time Left:</strong> {formatTimeLeft(timeLeft)}
                </Typography>
            </CardContent>
            <Button
                variant="contained"
                color="primary"
                sx={{ margin: "1rem" }}
                onClick={handleCopyToClipboard}
            >
                Copy Token to Clipboard
            </Button>
        </ProfileCard>
    );
};

export default Profile;
