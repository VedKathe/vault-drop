import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UploadModel({ fileUpload, userid, model, show, onHide }) {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    function handleChange1(event) {
        setFile(event.target.files[0])
    }
    


    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);


        await axios.post("http://localhost:4000/file/upload", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'user-id': userid
            }
        }).then(function (response) {
            setTimeout(() => {
                fileUpload()
                model()
            }, 1000)

        }).catch(error =>
           console.log(error)
        );
    };

    return (
        <Modal show={show} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload File
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center flex-column  m-4'>
                    <div className='d-flex justify-content-center w-100'>
                        {/* <FileUploader className="" handleChange={handleChange} maxSize='50' name="file" /> */}
                        <div className="mb-3">
                            <label for="formFile" className="form-label w-100 text-center py-3">Drag and Drop or Choose File</label>
                            <input className="form-control" type="file" id="formFile" onChange={handleChange1} />
                        </div>
                    </div>
                    
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className='btn-warning' onClick={onFileUpload}>Upload</Button>
            </Modal.Footer>
            <ToastContainer></ToastContainer>
        </Modal>
    );
}

export default UploadModel;