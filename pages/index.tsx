import { Code } from "@mui/icons-material";
import {
  AppBar,
  Breadcrumbs,Box,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const columns = [
  { id: "fname", label: "First Name" },
  { id: "lname", label: "Last Name" },
  { id: "sex", label: "Sex" },
  { id: "dno", label: "Department No" },
];
interface IRow {
  fname?: string;
  lname?: string;
  sex?: string;
  dno?: string;
}

export default function Home() {
  const [rows, setRows] = useState<IRow[]>([]);
  const [search, setSearch] = useState("");

  const fetchResults = () => {
    axios
      .get(`http://localhost:3000/api/fetch?q=${search}`)
      .then((res) => {
        setRows(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container maxWidth="sm">
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary"><h1>Biswadeep Mazumder | 2860920</h1></Typography>
      </Breadcrumbs>

      <Paper style={{ marginTop: 10 }}>
        <TextField
          label="First Name"
          variant="outlined"
          size="small"
          fullWidth
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button color="success" variant="contained" style={{ margin: 5 }} onClick={() => fetchResults()}>
          Search
          </Button>
        </Box>
        
      </Paper>
      <TableContainer sx={{ maxHeight: 500, marginTop: 4 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: IRow, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    return (
                      <TableCell key={column.id}>
                        {row[column.id as keyof typeof rows.keys]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
