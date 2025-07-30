import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
import type { ErrorResponse } from "../types";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const location = useLocation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const queryParams = new URLSearchParams(location.search);
      const email = queryParams.get('email');
      const token = queryParams.get('token');
      const response = await post('/api/auth/reset_password', { email, password, password_confirmation, token });

      if (response.ok) {
        setError('パスワードを変更しました');
        setSubmitDisabled(true);
      } else {
        let error: ErrorResponse = await response.json();
        let msgs: string[] = [];
        Object.entries(error.errors).forEach(([key, value]) => {
          msgs.push(value.toString())
        });
        setError(`パスワード変更に失敗しました（${msgs.toString()}）`);
      }
    } catch (err: any) {
      setError("パスワード変更に失敗しました（システムエラー）");
    }
  };

  return (
    <Grid>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          height: "70vh",
          width: "400px",
          m: "20px auto"
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: teal[400] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              パスワード変更
            </Typography>
          </Grid>
          <Typography sx={{ color: 'red', mb: 1.5 }}>{ error }</Typography>
          <TextField
            type="password"
            label="新しいパスワード"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            type="password"
            label="新しいパスワード（確認用）"
            variant="standard"
            fullWidth
            required
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Box mt={3}>
            <Button type="submit"
              color="primary"
              variant="contained"
              fullWidth
              disabled={submitDisabled}
            >
              パスワード変更
            </Button>

            <Typography variant="caption">
              <Link href="/login">ログインへ</Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
