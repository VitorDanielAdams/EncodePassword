import { Box, Button, Container, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import useHomePage from "./hooks/useHomePage";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from '@mui/icons-material/Login';
import { Link, Outlet } from "react-router-dom";
import authService from "../../service/authService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 600,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const HomePage = () => {

    const { list, pageRequest, handleChangePage, deletePassword } = useHomePage();
    const { logout } = authService();

    console.log(list);

    return (
        <Container 
            component="main"
        >
            <Box
                sx={{
                    height: 70,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                }}
            >
                <Typography variant="h6">Gerenciador de Senhas</Typography>
                <Link
                    to="/"
                    onClick={logout}
                    style={{
                        textDecoration: "none",
                        color: "black",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography>Logout</Typography>
                    <LoginIcon />
                </Link>
            </Box>
            <Container
                sx={{
                    width: "100%",
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "end",
                    textDecoration: "none",
                }}
            >
                <Link
                    to="form/new"
                    style={{ textDecoration: "none" }}
                >
                    <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Adicionar<AddIcon />
                    </Button>
                </Link>
                <TableContainer
                    sx={{
                        height: 440,
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>
                                    Password
                                </StyledTableCell>
                                <StyledTableCell>
                                    Description
                                </StyledTableCell>
                                <StyledTableCell >
                                    Url
                                </StyledTableCell>
                                <StyledTableCell >
                                    Actions
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(list
                                ? list.slice(pageRequest.currentPage * pageRequest.pageSize, pageRequest.currentPage * pageRequest.pageSize + pageRequest.pageSize)
                                : list)
                                .map((item, index) => {
                                    console.log(list);
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={0} key={index}>
                                            <StyledTableCell>{item.password}</StyledTableCell>
                                            <StyledTableCell>{item.description}</StyledTableCell>
                                            <StyledTableCell>{item.url}</StyledTableCell>
                                            <StyledTableCell>
                                                <Link
                                                    to={"form/view/" + item.id}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "rgba(0, 0, 0, 0.87)",
                                                    }}
                                                >
                                                    <VisibilityIcon />
                                                </Link>
                                                <Link
                                                    to={"form/edit/" + item.id}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "rgba(0, 0, 0, 0.87)",
                                                    }}
                                                >
                                                    <EditIcon />
                                                </Link>
                                                <DeleteIcon 
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={() => deletePassword(item.id)} 
                                                />
                                            </StyledTableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[10]}
                                    count={list.length}
                                    rowsPerPage={pageRequest.pageSize}
                                    page={pageRequest.currentPage}
                                    onPageChange={handleChangePage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
            <Outlet />
        </Container>
    );
}

export default HomePage;
