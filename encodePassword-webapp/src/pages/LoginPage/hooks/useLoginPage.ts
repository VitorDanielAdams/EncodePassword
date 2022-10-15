import { IUseLoginPage } from "./../utils/loginPage.types";
import { useNavigate } from "react-router-dom";
import Api from "../../../api";
import { IToken } from "./../../../utils/Models.types";

const useLoginPage = (props: IUseLoginPage) => {

    const api = new Api();
    const navigate = useNavigate();

    const handleSubmit = (event: any) => {
        api.login(props.fields).then((response: IToken) => {
            localStorage.setItem("token", response.token);
            navigate("/home");
        }).catch((error: any) => {
            console.log(error);
        });
    };

    return { handleSubmit };
}

export default useLoginPage;
