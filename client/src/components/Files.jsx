

import { FaFilePdf, FaFileWord, FaFileExcel, FaFileImage, FaFileAlt, FaFilePowerpoint, FaFileCode ,FaFileVideo,FaFileArchive,FaFileAudio} from 'react-icons/fa';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
function Navs({ logout, filename, deleteFile ,navigateToDownload}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const extension = filename.split('.').pop().toLowerCase();

  const iconMap = {
    pdf: <FaFilePdf size={70} />,
    doc: <FaFileWord size={70} />,
    docx: <FaFileWord size={70} />,
    xls: <FaFileExcel size={70} />,
    xlsx: <FaFileExcel size={70} />,
    png: <FaFileImage size={70} />,
    jpg: <FaFileImage size={70} />,
    jpeg: <FaFileImage size={70} />,
    gif: <FaFileImage size={70} />,
    txt: <FaFileAlt size={70} />,
    ppt: <FaFilePowerpoint size={70} />,
    pptx: <FaFilePowerpoint size={70} />,
    js: <FaFileCode size={70} />,
    css: <FaFileCode size={70} />,
    html: <FaFileCode size={70} />,
    mp3: <FaFileAudio size={70} />,
    wav: <FaFileAudio size={70} />,
    mp4: <FaFileVideo size={70} />,
    mov: <FaFileVideo size={70} />,
    avi: <FaFileVideo size={70} />,
    mkv: <FaFileVideo size={70} />,
    flv: <FaFileVideo size={70} />,
    rtf: <FaFileWord size={70} />,
    json: <FaFileCode size={70} />,
    xml: <FaFileCode size={70} />,
    php: <FaFileCode size={70} />,
    zip: <FaFileArchive size={70} />,
    rar: <FaFileArchive size={70} />,
    default: <FaFileAlt size={70} />
  };

  const iconComponent = iconMap[extension] || iconMap['default'];

  return (
    <div className="px-2 pt-2 name-box">
      <div className="bg-white file-box d-flex justify-content-center align-items-center rounded" >
        {iconComponent}
        <div className="download-icon">
          <MdOutlineDelete size={22} onClick={handleShow} />
          <MdOutlineFileDownload size={22} onClick={() => { navigateToDownload(filename)}} />
        </div>
      </div>
      <div className="text-dark p-2 name" title={filename}>{filename}</div>

      <Modal show={show} onHide={handleClose} animation={false}>

        <Modal.Body>Are you sure u want to delele this file?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={()=>{deleteFile(filename); handleClose()}}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Navs;