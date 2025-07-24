import React, { useState } from "react";
import { post } from "../../../component/api/Service";
import { useAuth } from "../../../AuthContext";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { User, ErrorResponse } from "../../../types";

const Add: React.FC = () =>  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitDisabled(true);
    setNameError('');
    setEmailError('');
    setRoleError('');

    try {
      const response = await post('/api/admin/users', { name, email, role }, token);

      if (response.ok) {
        let user: User = await response.json();
        setError('登録しました');
      } else {
        let error: ErrorResponse = await response.json();
        let msgs: string[] = [];
        Object.entries(error.errors).forEach(([key, value]) => {
          switch (key) {
            case 'name':
              setNameError(value.toString());
              break;
            case 'email':
              setEmailError(value.toString());
              break;
            case 'role':
              setRoleError(value.toString());
              break;
            default:
              msgs.push(value.toString())
              break;
          }
        });
        if (msgs.length > 0) {
          setError(`登録に失敗しました（${msgs.toString()}）`);
        } else {
          setError('登録に失敗しました');
        }

        setSubmitDisabled(false);
      }
    } catch (err: any) {
      setError('システムエラー');
      setSubmitDisabled(false);
    }
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ pt: 5 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Typography variant={"h5"} sx={{ m: "30px" }}>
              ユーザ登録
            </Typography>
            <Typography sx={{ color: 'red', mb: 1.5 }}>{ error }</Typography>
            <FormControl fullWidth>
              <TextField
                label="Name"
                variant="standard"
                fullWidth
                required
                error={nameError != ''}
                helperText={nameError}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                required
                error={emailError != ''}
                helperText={emailError}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>
              Role</InputLabel>
              <Select
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  error={roleError != ''}
                >
                  <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                  <MenuItem value={"INSTRUCTOR"}>INSTRUCTOR</MenuItem>
                  <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
              </Select>
              <FormHelperText className='Mui-error'>{roleError}</FormHelperText>
            </FormControl>
            <Grid
              spacing={2}
            >
              <Link href="/admin/user" variant="button">
                戻る
              </Link>
              <Button type="submit" color="primary" variant="contained" disabled={submitDisabled}>
                登録
              </Button>
            </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Add;
