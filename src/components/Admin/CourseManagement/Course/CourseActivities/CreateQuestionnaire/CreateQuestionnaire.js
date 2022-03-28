import React, { useState, useEffect } from 'react';

import classes from './CreateQuestionnaire.module.scss';
import FileUpload from '../../../../../FileUpload/FileUpload';
import Input from '../../../../../UI/Input/Input';
import Button from '../../../../../UI/Button/Button';
import formValidation from '../../../../../../utility/formValidation';

const CreateQuestionnaire = props => {
    const [editMode, setEditMode] = useState(false);
    const [questionnaireToEditData, setQuestionnaireToEditData] = useState(null);
    const [questionnaireNameFormControl, setQuestionnaireNameFormControl] = useState({
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [file, setFile] = useState(undefined);

    useEffect(() => {
        if (typeof props.currentQuestionaireData === 'undefined') {
            return;
        }

        setEditMode(true);

        setQuestionnaireToEditData(props.currentQuestionaireData);

        const copiedQuestionnaireNameFormCtrl = { ...questionnaireNameFormControl };

        copiedQuestionnaireNameFormCtrl.touched = true;
        copiedQuestionnaireNameFormCtrl.value = props.currentQuestionaireData.name;
        copiedQuestionnaireNameFormCtrl.valid = true;

        setQuestionnaireNameFormControl(copiedQuestionnaireNameFormCtrl);
        // eslint-disable-next-line
    }, [props.currentQuestionaireData]);

    const onInputFieldChanged = (event) => {
        const copiedQuestionnaireNameFormCtrl = { ...questionnaireNameFormControl };

        let value = event.target.value;

        copiedQuestionnaireNameFormCtrl.touched = true;
        copiedQuestionnaireNameFormCtrl.value = value;
        copiedQuestionnaireNameFormCtrl.valid = formValidation(value, copiedQuestionnaireNameFormCtrl.validation);

        setQuestionnaireNameFormControl(copiedQuestionnaireNameFormCtrl);
    }

    const onFileSelectedHandler = (selectedFile) => {
        setFile(selectedFile);
    }

    const onQuuestionnaireCreate = () => {
        const formData = new FormData();

        formData.append('quizName', questionnaireNameFormControl.value);
        
        if (typeof file !== 'undefined') {
            formData.append('file', file);
        } else {
            formData.append('fileName', questionnaireToEditData.questionDataUrl);
        }

        if (editMode) {
            formData.append('quizId', questionnaireToEditData._id);

            props.onQuestionnaireEdited(formData)
        } else {
            props.onQuuestionnaireCreated(formData);
        }
    }

    return (
        <section className={classes.CreateQuestionnaire}>
            <header className={classes.CreateQuestionnaire__Header}>
                <h1>{!editMode ? 'Create a' : 'Edit the'} questionnaire</h1>
            </header>

            <div className={classes.CreateQuestionnaire__Body}>
                <Input
                    elementType='input'
                    elementConfig={{
                        type: 'text',
                        placeholder: 'Questionnaire name'
                    }}
                    label='Questionnaire name'
                    value={questionnaireNameFormControl.value}
                    touched={questionnaireNameFormControl.touched}
                    isValid={questionnaireNameFormControl.valid}
                    changed={(event) => onInputFieldChanged(event)}
                />

                <FileUpload
                    fileSelected={onFileSelectedHandler}
                    preSelectedFile={editMode ? questionnaireToEditData.questionDataUrl.split("\\").pop().slice(Date.now().toString().length) : undefined}
                />
            </div>

            <div className={classes.CreateQuestionnaire__Cta}>
                <Button
                    clicked={onQuuestionnaireCreate}>{!editMode ? 'Create' : 'Edit'}</Button>
            </div>
        </section>
    )
}

export default CreateQuestionnaire;