import { Route, Routes } from "react-router-dom";
import FormModal from "../pages/Form/FormModal";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute";

const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="home" element={<PrivateRoute />} >
                <Route path="/home" element={<HomePage />} >
                    <Route path="form" element={<FormModal />} >
                        <Route path=":type" element={<FormModal />} >
                            <Route path=":id" element={<FormModal />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

export default RouterConfig;
