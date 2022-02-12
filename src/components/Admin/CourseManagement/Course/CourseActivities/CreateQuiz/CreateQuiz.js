import React, { useState } from 'react';

import classes from './CreateQuiz.module.scss';
import axiosAdmin from '../../../../../../axiosUtility/axios-admin';
import FileUpload from '../../../../../FileUpload/FileUpload';
// import Input from '../../../../../UI/Input/Input';
import Button from '../../../../../UI/Button/Button';
// import formValidation from '../../../../../../utility/formValidation';

const CreateQuiz = props => {
    const [quizName, setquizName] = useState('Test');
    const [file, setFile] = useState(undefined);

    const onFileSelectedHandler = (selectedFile) => {
        setFile(selectedFile);
    }

    const onQuizCreatedHandler = () => {

        const formData = new FormData();
        formData.append('quizName', quizName);
        formData.append('file', file);

        
        axiosAdmin.post('/quiz', formData, props.config).then(response => {
            const responseData = response.data || {};

            console.log(response)

            // if (responseData.isAdded) {
            //     const newCourseList = courseList.concat(responseData.addedProduct);

            //     setCourseList(newCourseList);

            //     history.push(props.match.url + '/course-management');
            // }
        }).catch(error => {
            console.log(error)
        });
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
                    clicked={onQuizCreatedHandler}>Create</Button>
            </div>
        </section>
    )
}

export default CreateQuiz;

/*

{
    text: "Aşağıdaki özelliklerden hangisi 'nöromuskuler' omurga deformitelerinin tipik özelliklerinden değildir?",
    type: "multiple-choice",
    questionNumber: 1,
    choices: [
        {
            text: "Özellikle erken dönemlerinde oldukça yumuşaktır, pasif olarak düzeltilebilir",
            isCorrect: false
        },
        {
            text: "Pelvisi içine alabilir",
            isCorrect: false
        },
        {
            text: "Vertebral kolonun çökmesi ile ortaya çıkar",
            isCorrect: false
        },
        {
            text: "İlerlemesi büyümenin sona ermesi ile sona ermez",
            isCorrect: false
        },
        {
            text: "Genellikle az sayıda vertebral içerir",
            isCorrect: true
        }
    ]
}

*/