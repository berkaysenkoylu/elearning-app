import React, { useState, useEffect, useCallback } from 'react';

import classes from './CreatePost.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import checkValidity from '../../../utility/formValidation';

const CreatePost = (props) => {
    const [formControls, setFormControls] = useState({
        title: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Title'
            },
            label: "Title",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        },
        content: {
            elementType: 'textarea',
            elementConfig: {
                type: 'textarea',
                placeholder: 'Post Content'
            },
            label: "Post Content",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const prePopulateFormFields = useCallback(() => {
        let prePopulatedFormFields = {};

        // Prepopulate the title
        const copiedTitle = { ...formControls.title };

        copiedTitle.value = props.editFormFields['title'];
        let isTitleValid = checkValidity(props.editFormFields['title'], copiedTitle.validation);
        copiedTitle.valid = isTitleValid;
        copiedTitle.touched = true;

        prePopulatedFormFields['title'] = {...copiedTitle};

        // Prepopulate the content
        const copiedContent = { ...formControls.content };

        copiedContent.value = props.editFormFields['content'];
        let isContentValid = checkValidity(props.editFormFields['content'], copiedContent.validation);
        copiedContent.valid = isContentValid;
        copiedContent.touched = true;

        prePopulatedFormFields['content'] = {...copiedContent};

        let formIsValid = true;
        Object.keys(prePopulatedFormFields).forEach(formControl => {
            formIsValid = formIsValid && prePopulatedFormFields[formControl].valid;
        });

        setIsFormValid(formIsValid);
        setFormControls(prePopulatedFormFields);
    }, [props.editFormFields, formControls.title, formControls.content]);

    useEffect(() => {
        if (props.isEditMode) {
            prePopulateFormFields();
        }
        // eslint-disable-next-line
    }, [props.isEditMode]);

    const inputChangedHandler = (event, inputName) => {
        event.preventDefault();

        const copiedFormControls = { ...formControls };

        const copiedFormControl = { ...copiedFormControls[inputName] };

        copiedFormControl.value = event.target.value;

        // Check validity & mark it as touched
        let isValid = checkValidity(event.target.value, copiedFormControl.validation);
        copiedFormControl.valid = isValid;
        copiedFormControl.touched = true;

        copiedFormControls[inputName] = copiedFormControl;

        let formIsValid = true;
        Object.keys(copiedFormControls).forEach(formControl => {
            formIsValid = formIsValid && copiedFormControls[formControl].valid;
        });

        setIsFormValid(formIsValid);
        setFormControls(copiedFormControls);
    }

    const createPostHandler = () => {
        let formData = {
            title: formControls.title.value,
            content: formControls.content.value
        };

        props.createPost(formData);
    }

    const updatePostHandler = () => {
        let formData = {
            title: formControls.title.value,
            content: formControls.content.value
        };

        props.editPost(formData);
    }

    let formFields = Object.keys(formControls).map((formControl, i) => {
        return <Input
            key={i}
            elementType={formControls[formControl].elementType}
            elementConfig={formControls[formControl].elementConfig}
            label={formControls[formControl].label}
            value={formControls[formControl].value}
            touched={formControls[formControl].touched}
            isValid={formControls[formControl].valid}
            changed={(event) => inputChangedHandler(event, formControl)}
        />
    });

    return (
        <section className={classes.CreatePost}>
            <header className={classes.CreatePost__Header}>
                <h2>
                    {!props.isEditMode ? 'Create a Post' : 'Edit the Post'}
                </h2>
            </header>

            <div className={classes.CreatePost__Body}>
                <div className={classes.CreatePost__Inputs}>
                    {formFields}
                </div>

                <div className={classes.CreatePost__Cta}>
                    {!props.isEditMode ? <Button
                        btnType="BtnPrimary"
                        disabled={!isFormValid}
                        clicked={createPostHandler}>Create</Button> :
                        <Button
                        btnType="BtnPrimary"
                        disabled={!isFormValid}
                        clicked={updatePostHandler}>Update</Button>}
                    <Button
                        btnType="BtnDanger"
                        clicked={props.createPostCancel}>Cancel</Button>
                </div>
            </div>
        </section>
    )
}

export default CreatePost;