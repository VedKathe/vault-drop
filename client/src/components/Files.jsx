
import { FaFile } from "react-icons/fa6";
import { useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
function Navs({...props}) {
const {name} = props
const {logout} = props

  return (
    <div className="px-2 pt-2">
        <div className="bg-white file-box d-flex justify-content-center align-items-center rounded" >
            <FaFile size={70}/>
            <div className="download-icon">
                <MdOutlineDelete size={22} onClick={()=>{alert("delete")}}/>
                <MdOutlineFileDownload size={22} onClick={()=>{alert("Download")}} />
                
            </div>
        </div>
        <div className="text-dark p-2">Files</div>
        
    </div>
  );
}

export default Navs;