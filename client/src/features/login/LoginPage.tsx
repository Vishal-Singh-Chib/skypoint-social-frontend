import React, { useState } from "react";
import {
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Card,
    CardContent,
    CircularProgress,
    Divider,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useLoginHandler } from "./LoginProcessor";
import type { Message } from "../../app/models/message";
import { GoogleLogin } from "@react-oauth/google";



export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<Message | null>(null);

    const { handleGoogleLogin, handleSubmit, isLoading } = useLoginHandler(
        email,
        password,
        setMessage
    );

    return (
        <Box
            sx={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card
                elevation={10}
                sx={{
                    minWidth: 350,
                    padding: 2,
                    borderRadius: 4,
                    backdropFilter: "blur(10px)",
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        align="center"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Login
                    </Typography>

                    {message?.type === "success" && (
                        <Alert
                            icon={<CheckCircleOutlineIcon />}
                            severity="success"
                            sx={{ my: 2 }}
                        >
                            {message.text}
                        </Alert>
                    )}
                    {message?.type === "error" && (
                        <Alert
                            icon={<CheckCircleOutlineIcon />}
                            severity="error"
                            sx={{ my: 2 }}
                        >
                            {message.text}
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 3 }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            color="primary"
                            sx={{ fontWeight: "bold", py: 1.5, }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "LOGIN"
                            )}
                        </Button>
                    </form>

                    <Divider sx={{ my: 3 }}>or</Divider>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Box sx={{ width: 250 }}>
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() =>
                                    setMessage({ type: "error", text: "Google login error." })
                                }
                                theme="outline"         // Optional styling
                                size="large"            // Optional size
                                shape="pill"            // Optional shape
                            />
                        </Box>
                    </Box>


                </CardContent>
            </Card>
        </Box>
    );
};
