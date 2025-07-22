import React, { useState } from "react";
import { get } from "../../../component/api/Service";
import { useAuth } from "../../../AuthContext";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import type { User } from "../../../types";

const Search: React.FC = () =>  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [rows, setRows] = useState<User[]>([]);
  const { token } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await get('/api/admin/users', { name, email, role }, token);

      if (response.ok) {
        let users: User[] = await response.json();
        setRows(users);
      } else {
        setError('検索に失敗しました');
      }
    } catch (err: any) {
      setError('システムエラー');
    }
  };

  return (
    <>
      <Box sx={{
        position: 'relative',
      }}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <TextField
              label="Name"
              variant="standard"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid size={3}>
            <Select
                label="Role"
                fullWidth
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                <MenuItem value={"INSTRUCTOR"}>INSTRUCTOR</MenuItem>
                <MenuItem value={"STUDENT"}>STUDENT</MenuItem>
            </Select>
          </Grid>
          <Grid size={3}>
            <Box>
              <Button onClick={handleSubmit} type="button" color="primary" variant="contained">
                検索
              </Button>
            </Box>
          </Grid>
          <Typography sx={{ color: 'red', mb: 1.5 }}>{ error }</Typography>
        </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>name</TableCell>
                  <TableCell>email</TableCell>
                  <TableCell>role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Box>
    </>
  );
}

export default Search;
