import React, { useState, useEffect } from 'react';

import classes from './CreateQuiz.module.scss';
import FileUpload from '../../../../../FileUpload/FileUpload';
import Input from '../../../../../UI/Input/Input';
import Button from '../../../../../UI/Button/Button';
import formValidation from '../../../../../../utility/formValidation';

const CreateQuiz = props => {
    const [editMode, setEditMode] = useState(false);
    const [quizToEditData, setQuizToEditData] = useState(null);
    const [quizNameFormControl, setquizNameFormControl] = useState({
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        if (typeof props.currentQuizData === 'undefined') {
            return;
        }

        setEditMode(true);

        setQuizToEditData(props.currentQuizData);

        const copiedQuizNameFormCtrl = { ...quizNameFormControl };

        copiedQuizNameFormCtrl.touched = true;
        copiedQuizNameFormCtrl.value = props.currentQuizData.name;
        copiedQuizNameFormCtrl.valid = true;

        setquizNameFormControl(copiedQuizNameFormCtrl);
        // eslint-disable-next-line
    }, [props.currentQuizData]);

    const onInputFieldChanged = (event) => {
        const copiedQuizNameFormCtrl = { ...quizNameFormControl };

        let value = event.target.value;

        copiedQuizNameFormCtrl.touched = true;
        copiedQuizNameFormCtrl.value = value;
        copiedQuizNameFormCtrl.valid = formValidation(value, copiedQuizNameFormCtrl.validation);

        setquizNameFormControl(copiedQuizNameFormCtrl);
    }

    const onFileSelectedHandler = (selectedFile) => {
        setFile(selectedFile);
    }

    const onQuizCreate = () => {
        const formData = new FormData();

        formData.append('quizName', quizNameFormControl.value);
        
        if (typeof file !== 'undefined') {
            formData.append('file', file);
        } else {
            formData.append('fileName', quizToEditData.questionDataUrl);
        }

        if (editMode) {
            formData.append('quizId', quizToEditData._id);

            props.onQuizEdited(formData)
        } else {
            props.onQuizCreated(formData);
        }
    }

    return (
        <section className={classes.CreateQuiz}>
            <header className={classes.CreateQuiz__Header}>
                <h1>{!editMode ? 'Create a' : 'Edit the'} quiz</h1>
            </header>

            <div className={classes.CreateQuiz__Body}>
                <Input
                    elementType='input'
                    elementConfig={{
                        type: 'text',
                        placeholder: 'Quiz name'
                    }}
                    label='Quiz name'
                    value={quizNameFormControl.value}
                    touched={quizNameFormControl.touched}
                    isValid={quizNameFormControl.valid}
                    changed={(event) => onInputFieldChanged(event)}
                />

                <FileUpload
                    fileSelected={onFileSelectedHandler}
                    preSelectedFile={editMode ? quizToEditData.questionDataUrl.split("\\").pop().slice(Date.now().toString().length) : undefined}
                />
            </div>

            <div className={classes.CreateQuiz__Cta}>
                <Button
                    clicked={onQuizCreate}>{!editMode ? 'Create' : 'Edit'}</Button>
            </div>
        </section>
    )
}

export default CreateQuiz;