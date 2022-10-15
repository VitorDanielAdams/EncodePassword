import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";
import { IPassword } from "./../../../utils/Models.types";

const useFormModal = (props: { type?: string, id?: string }) => {

    const api = new Api();
    const navigate = useNavigate();
    const { type, id } = props;

    const [form, setForm] = useState<IPassword>({
        id: Number(id),
        password: "",
        description: "",
        url: "",
    });

    useEffect(() => {
        if (type === "view" || type === "edit") {
            if (id) {
                api.findById(Number(id)).then((response) => {
                    setForm(response);
                });
            }
        }
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (type === "new" && !id) {
            return api.insertPassword(form).then((response) => {
                navigate("/home");
                window.location.reload();
            });
        }
        return api.updatePassword(form, Number(id)).then((response) => {
            navigate("/home");
            window.location.reload();
        });
    };

    return { form, handleInput, handleSubmit };
}

export default useFormModal;
