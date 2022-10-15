import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import useFormModal from "./hooks/useFormModal";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

const FormModal = () => {

    const navigate = useNavigate();
    const handleClose = () => navigate("/home");

    const { type, id } = useParams();
    const { form, handleInput, handleSubmit } = useFormModal({ type: type, id: id });

    return (
        <Modal
            open={true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {type === "new" ? "Cadastrar Senha" : type === "edit" ? "Editar Senha" : "Visualizar Senha"}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        disabled={type === "view"}
                        value={form.password}
                        onChange={handleInput}
                        name="password"
                        label="Password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        disabled={type === "view"}
                        value={form.description || ""}
                        onChange={handleInput}
                        id="description"
                        label="Description"
                        name="description"
                        autoComplete="description"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        disabled={type === "view"}
                        value={form.url}
                        onChange={handleInput}
                        id="url"
                        label="Url"
                        name="url"
                        autoComplete="url"
                        autoFocus
                    />
                    <Button
                        disabled={type === "view"}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Enviar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default FormModal;
