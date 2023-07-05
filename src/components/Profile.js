import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
    const { accessToken, email, roles, expiryDate } = currentUser;

    useEffect(() => {
        console.log("Auth state:", currentUser);

        if (currentUser) {
            let expiryTime = expiryDate;
            let timer = setInterval(() => {
                let currentTime = new Date();
                let currentHours = currentTime.getHours().toString();
                let currentMinutes = currentTime.getMinutes().toString();

                let [expiryHours, expiryMinutes] = expiryTime.split(":");
                let expiryMinutesTotal =
                    parseInt(expiryHours) * 60 + parseInt(expiryMinutes);
                let currentTotalMinutes =
                    parseInt(currentHours) * 60 + parseInt(currentMinutes);
                let timeRemaining = expiryMinutesTotal - currentTotalMinutes;

                let remainingHours = Math.floor(timeRemaining / 60);
                let remainingMinutes = timeRemaining % 60;

                setTimeLeft({
                    hours: remainingHours,
                    minutes: remainingMinutes,
                });
            }, 6);

            return () => clearInterval(timer);
        }
    }, [currentUser, expiryDate]);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(accessToken);
        toast.success("Token copied to clipboard!");
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
                    <strong>Expiry Date:</strong> {currentUser.expiryDate}
                </Typography>
                <Typography variant="body2" align="center">
                    <strong>Time Left:</strong> {timeLeft.hours} hours{" "}
                    {timeLeft.minutes} minutes
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
