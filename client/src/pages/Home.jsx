import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import Files from '../components/Files'

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    useEffect(() => {
        const verifyCookie = async () => {
            const cokie = Cookies.get('token')
            console.log(cokie);
            if (!cokie) {
                console.log(false);
                navigate("/login");
            }
            const { data } = await axios.post(
                "http://localhost:4000",
                {},
                { withCredentials: true }
            );
            const { status, user } = data;
            setUsername(user);

            return status
                ? (console.log(""))
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, []);

    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    return (
<div className="h-100">
    <Navbar user={username} logout={Logout}></Navbar>
    <div className="">
        <div className="files-container px-4">
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
            <Files className="file-item"></Files>
        </div>
    </div>
    <ToastContainer />
</div>
    );
};

export default Home;