import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UploadModel(props) {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
    };

    const onFileUpload = async() => {
        const formData = new FormData();
        formData.append("file", file);
        const config = {headers: {'Content-Type': 'multipart/form-data'}}
        await axios.post("http://localhost:4000/file/upload", formData,config)
          .then(response =>
            toast.success("File uploaded successfully", {
                position: "bottom-left",
            })
        )
          .catch(error => 
            
            toast.error("Error uploading file", {
                position: "bottom-left",
            })
        );
      };

    return (
        <Modal
            {...props}
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
                        <FileUploader className="" handleChange={handleChange} maxSize='50' name="file" />
                    </div>
                    <p className='mt-4 d-flex justify-content-center'>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
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