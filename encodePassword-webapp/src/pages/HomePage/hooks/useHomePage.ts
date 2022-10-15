import { IPassword, PageRequest } from "./../../../utils/Models.types";
import { useEffect, useState } from "react";
import Api from "../../../api";
import { useNavigate } from "react-router-dom";

const useHomePage = () => {

    const api = new Api();

    const [pageRequest, setPageRequest] = useState<PageRequest>({
        filter: "",
        currentPage: 0,
        pageSize: 5,
        direction: "ASC",
    });
    const [list, setList] = useState<IPassword[]>([]);
    
    useEffect(() => {
        api.findPagePasswords(pageRequest).then((response) => {
            setList(response.content);
        }).catch((error) => { 
            console.log(error);
        });
    }, []);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPageRequest({ ...pageRequest, currentPage: newPage });
    };

    const deletePassword = (id: number | undefined) => {
        if (id) {
            api.delete(id).then((response) => {
                const newList = list.filter((item) => item.id !== id);
                setList([...newList]);
            });
        }
    };

    return { list, pageRequest, handleChangePage, deletePassword };
}

export default useHomePage;
