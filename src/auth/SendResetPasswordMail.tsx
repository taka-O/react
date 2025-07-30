import React, { useState } from "react";
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

const SendResetPasswordMail: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    try {
      const reset_url: string = `${window.location.protocol}//${window.location.hostname}::${window.location.port}/reset_password`;
      const response = await post('/api/auth/send_reset_password_token', { email, reset_url });

      if (response.ok) {
        setError('メール送信が完了しました');
        setSubmitDisabled(true);
      } else {
        let error: ErrorResponse = await response.json();
        let msgs: string[] = [];
        Object.entries(error.errors).forEach(([key, value]) => {
          msgs.push(value.toString())
        });
        setError(`メール送信に失敗しました（${msgs.toString()}）`);
      }
    } catch (err: any) {
      setError("メール送信に失敗しました（システムエラー）");
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
              パスワード変更メール送信
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
          <Box mt={3}>
            <Button type="submit"
              color="primary"
              variant="contained"
              fullWidth
              disabled={submitDisabled}
            >
              メール送信
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

export default SendResetPasswordMail;
