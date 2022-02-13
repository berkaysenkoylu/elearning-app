import React, { useState } from 'react';

import classes from './FileUpload.module.scss';
import DragAndDrop from '../../containers/DragAndDrop/DragAndDrop';

const FileUpload = props => {
    const [file, setFile] = useState(undefined);

    const onSelectFile = (input_file) => {
        setFile(input_file);

        props.fileSelected(input_file);
    }

    return (
        <section className={classes.FileUpload}>
            <header className={classes.FileUploadHeader}>
                <h2>File Upload</h2>
            </header>
            
            <div className={classes.Form}>
                <DragAndDrop
                    dropHandle={onSelectFile}
                    file={file}
                    fileSelect={onSelectFile}
                    preSelectedFileName={props.preSelectedFile}
                />
            </div>
        </section>
    )
}

export default FileUpload;