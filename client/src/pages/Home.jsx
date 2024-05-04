import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import Files from '../components/Files'
import PinModel from "../components/PinModel"

const Home = () => {
    const navigate = useNavigate();
   
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [userData, setuserData] = useState([]);
    const [pinModel, setpinModel] = useState(false);
    const [pin, setpin] = useState(null);
    const [fileUploaded, setfileUploaded] = useState(false);

    const fileUpload = () => {
        setfileUploaded(!fileUploaded)
    };

    const showPin = () => {
        setpinModel(true)
    };
    const closePin = () => {
        setpinModel(false)
    };

    const getFiles = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_POINT}/file`, {
            headers: {
                'user-id': userId
            }
        })
            .then(function (response) {

                setuserData(response.data)

            })
            .catch(error =>

                toast.error("Error uploading file", {
                    position: "bottom-left",
                })
            );
    };

    useEffect(() => {

        const verifyCookie = async () => {
            const cokie = Cookies.get('token')

            if (!cokie) {

                navigate("/login");
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_POINT}`,
                {},
                { withCredentials: true }
            );
            const { status, user, userId } = data;
            setUsername(user);
            setUserId(userId);

            return status
                ? (console.log(""))
                : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, []);

    useEffect(() => {
        getFiles()

    }, [userId, fileUploaded])


    const Logout = () => {
        removeCookie("token");
        navigate("/login");
    };

    const deleteFile = async (filename) => {

        const response = await axios.delete(`${process.env.REACT_APP_API_POINT}/file/delete/${userId}/${filename}`)
            .then(function (response) {

                fileUpload()

            })
            .catch(error =>

                toast.error("Error uploading file", {
                    position: "bottom-left",
                })
            );
    };

  

    const navigateToDownload = async (filename) => {
        navigate(`/download/${userId}/${filename}`)
    }

    const onFileUpload = async (file, model, setFile) => {

        if (userData.includes(file.name)) {

            alert("File Already Exist");
            return
        }

        const formData = new FormData();
        formData.append('file', file);


        await axios.post(`${process.env.REACT_APP_API_POINT}/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'user-id': userId
            }
        }).then(function (response) {

            setpin(response.data.pin);
            setTimeout(() => {
                setFile(null)
                fileUpload()
                model()
                showPin()
            }, 1000)

        }).catch(error =>
            console.log(error)
        );
    };

    return (
        <div className="files-background d-flex flex-column justi">
            <Navbar user={username} onFileUpload={onFileUpload} logout={Logout}></Navbar>
            <div className="h-100">
                <div className="files-container h-100 px-2">

                    {
                        (userData.length === 0) ? (<div className="no-file h4"> No File Uploaded</div>) : (Array.isArray(userData) &&
                            userData.map((file, index) => (
                                <Files key={index} className="file-item" filename={file} deleteFile={deleteFile}  navigateToDownload={navigateToDownload}></Files>
                            )))

                    }
                </div>
            </div>
            <PinModel
    
                pin ={pin}
                model={closePin}
                show={pinModel}
                onHide={() => setpinModel(false)}
            />
            <ToastContainer />
        </div>
    );
};

export default Home;