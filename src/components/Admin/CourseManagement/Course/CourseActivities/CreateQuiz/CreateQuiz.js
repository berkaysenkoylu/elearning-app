import React, { useState } from 'react';

import classes from './CreateQuiz.module.scss';
import FileUpload from '../../../../../FileUpload/FileUpload';
// import Input from '../../../../../UI/Input/Input';
import Button from '../../../../../UI/Button/Button';

const CreateQuiz = props => {
    const [quizName, setquizName] = useState('Test');
    const [file, setFile] = useState(undefined);

    const onFileSelectedHandler = (selectedFile) => {
        setFile(selectedFile);
    }

    const onQuizCreate = () => {
        const formData = new FormData();

        formData.append('quizName', quizName);
        formData.append('file', file);

        props.onQuizCreated(formData);
    }

    return (
        <section className={classes.CreateQuiz}>
            <header className={classes.CreateQuiz__Header}>
                <h1>Create a quiz</h1>
            </header>

            <div className={classes.CreateQuiz__Body}>
                {/* <Input
                    elementType={quizFormControls.name.elementType}
                    elementConfig={quizFormControls.name.elementConfig}
                    label={quizFormControls.name.label}
                    value={quizFormControls.name.value}
                    touched={quizFormControls.name.touched}
                    isValid={quizFormControls.name.valid}
                    changed={(event) => inputChangedHandler(event, 'name')}
                /> */}

                <FileUpload fileSelected={onFileSelectedHandler} />
            </div>

            <div className={classes.CreateQuiz__Cta}>
                <Button
                    clicked={onQuizCreate}>Create</Button>
            </div>
        </section>
    )
}

export default CreateQuiz;