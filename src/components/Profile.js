import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";

const ProfileCard = styled(Card)(({ theme }) => ({
    maxWidth: 400,
    margin: "0 auto",
    marginTop: theme.spacing(8),
    minHeight: "calc(80vh - 30px)", // Adjust the height based on your layout
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
}));

const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("Auth state:", currentUser);
    }, [currentUser]);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    const { token, id, email, roles } = currentUser;

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(token);
        toast.success("Token copied to clipboard!");
    };

    return (
        <ProfileCard>
            <CardContent>
                <Typography variant="h5" component="h2" align="center">
                    Profile
                </Typography>
                <Avatar
                    alt="User"
                    sx={{
                        margin: "auto",
                        marginBottom: "1rem",
                        marginTop: "2rem",
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
                    <ul>
                        {roles &&
                            roles.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                    </ul>
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
