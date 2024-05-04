
import UploadModel from "./Upload";
import { useState } from "react";

function Navs({ user,logout,onFileUpload}) {

  const [modalShow, setModalShow] = useState(false);

  const handleChange = () =>{
    setModalShow(false)
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white bg-gradient shadow-lg ">
      <div className="container">
        <a className="navbar-brand " href="/">
          <span className="text-warning px-1">Vault</span>Drop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-warning mx-2" onClick={() => setModalShow(true)}>
                Upload
              </button>
            </li>

            <li className="nav-item">
              <div className="dropdown">
                <button className="dropbtn  px-4">{user}</button>
                <div className="dropdown-content">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={logout}
                  >
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>

        </div>
      </div>
      <UploadModel
      
        onFileUpload={onFileUpload}
        
        model={handleChange}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </nav>
  );
}

export default Navs;