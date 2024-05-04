import Modal from 'react-bootstrap/Modal';


function UploadModel({ model, show, onHide ,pin}) {
    

    return (
        <Modal show={show} onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Save this Pin
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center flex-column  m-4'>
                    <div className='d-flex justify-content-center w-100'>
                       
                        <div className="mb-3">
                            <label for="formFile" className="form-label w-100 text-center py-3">This is Pin For file</label>
                            <label for="formFile" className="form-label w-100 text-center py-3 h3">{pin}</label>
                        </div>
                    </div>
                    
                </div>
            </Modal.Body>

        </Modal>
    );
}

export default UploadModel;