import { Box, Button, Container, CssBaseline, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { IFormLogin } from "../../utils/Models.types";
import useLoginPage from "./hooks/useLoginPage";

const LoginPage = () => {

    const [loginForm, setLoginForm] = useState<IFormLogin>({
        login: "",
        password: ""
    });
    const { handleSubmit } = useLoginPage({ fields: loginForm });

    return (
        <Container
            component="main"
            sx={{
                width: "100%",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    width: "60%",
                    height: "80%",
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={loginForm.login}
                        onChange={(e) => setLoginForm({ ...loginForm, login: e.target.value })}
                        id="login"
                        label="Login"
                        name="login"
                        autoComplete="login"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                    />
                    <Button
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;
