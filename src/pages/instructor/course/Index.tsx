import React, { useState, useEffect } from "react";
import { get } from "../../../component/api/Service";
import { useAuth } from "../../../AuthContext";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { ErrorResponse, Course } from "../../../types";

const Index: React.FC = () =>  {
  const [error, setError] = useState('');
  const [rows, setRows] = useState<Course[]>([]);
  const { token } = useAuth();

  async function fetchData() {
    try {
      const response = await get('/api/courses', {}, token);

      if (response.ok) {
        let users: Course[] = await response.json();
        setRows(users);
      } else {
        let error: ErrorResponse = await response.json();
        if (error.errors === undefined) {
          setError(`コースの取得に失敗しました（${error.message}）`);
        } else {
          let msgs: string[] = [];
          Object.entries(error.errors).forEach(([key, value]) => {
            msgs.push(value.toString())
          });
          setError(`コースの取得に失敗しました（${msgs.toString()}）`);
        }
      }
    } catch (err: any) {
      setError('システムエラー');
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box sx={{
        position: 'relative',
      }}>
        <Grid container spacing={2}>
          <Typography sx={{ color: 'red', mb: 1.5 }}>{ error }</Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>name</TableCell>
                <TableCell>description</TableCell>
                <TableCell>start at</TableCell>
                <TableCell>end at</TableCell>
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
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.startAt}</TableCell>
                  <TableCell>{row.endAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default Index;
