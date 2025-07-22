import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { post } from "../component/api/Service";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { teal } from "@mui/material/colors";
import type { LoginResponse } from "../types";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const response = await post('/api/auth/login', { email, password });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        login(data);
        navigate(from, { replace: true });
      } else {
        setError('ログインに失敗しました');
      }
    } catch (err: any) {
      setError("ログインに失敗しました");
    }
  };

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "70vh",
          width: "300px",
          m: "20px auto"
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start" //多分、デフォルトflex-startなので省略できる。
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              ログイン
            </Typography>
          </Grid>
          <Typography sx={{ color: 'red', mb: 1.5 }}>{ error }</Typography>
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Password"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={3}>
            <Button type="submit" color="primary" variant="contained" fullWidth>
              ログイン
            </Button>

            <Typography variant="caption">
              <Link href="#">パスワードを忘れましたか？</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
