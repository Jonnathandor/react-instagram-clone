import React, { useState } from 'react'
import { Button } from '@material-ui/core';

function ImageUpload() {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        
    }

    return (
        <div>
            <input 
            type="text"
            placeholder="Enter Caption..."
            value={caption}
            onChange={e => setCaption(e.target.value)}/>
            <input type="file" onChage={handleChange}/>
            <Button onClick={handleUpload}>
                Upload
            </Button>
        </div>
    )
}

export default ImageUpload
