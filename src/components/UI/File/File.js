import React, { useRef } from 'react';

import classes from './File.module.scss';
import Button from '../Button/Button';

const File = (props) => {
    const fileInput = useRef();

    const onFileSelected = (event) => {
        props.selectedFile(event.target.files[0]);
    }

    if(props.droppedFile) {
        fileInput.current.files = props.droppedFile;
    }

    const openFilePicker = (e) => {
        e.preventDefault();
        fileInput.current.click();
    }

    return (
        <>
            <input
                type="file"
                name="file"
                id="file"
                onChange={onFileSelected}
                ref={fileInput}
                className={classes.Input} />
            
            <Button clicked={openFilePicker} type="ButtonSmall">Select File</Button>
        </>
    )
}

export default File;