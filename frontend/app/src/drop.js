import React, {useState, useEffect} from 'react';
import './drop.css'

const dragOver = (e) => {
    e.preventDefault();
}

const dragEnter = (e) => {
    e.preventDefault();
}

const dragLeave = (e) => {
    e.preventDefault();
}

const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
        handleFiles(files);
    }
}
const validateFile = (file) => {
    const validTypes = ['application/json'];
    if (validTypes.indexOf(file.type) === -1) {
        return false;
    }
    return true;
}
const handleFiles = (file) => {
    for(let i=0;i<file.length;i++)
    {
        if(validateFile(file))
        {
            //fetch-post
        }
        else
        {
            file[i]['invalid'] = true;
          //  setSelectedFiles(prevArray => [...prevArray, files[i]]);
           // setErrorMessage('File type not permitted');
            //error message
        }
    }
}

const Drop = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    
    return (
        <div className="contain">
            <div className="dropcont"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
            >
                <div className="file-display-container">
                        
                    </div>
            <div className="drop-message">
                <div className="upload-icon"></div>
                    
                    Drag & Drop files here or click to upload
                </div>
            </div>
        </div>
    )
}
export default Drop;