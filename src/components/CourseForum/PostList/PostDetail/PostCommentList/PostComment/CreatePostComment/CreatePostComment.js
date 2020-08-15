import React, { useState } from 'react';

import classes from './CreatePostComment.module.scss';
import Modal from '../../../../../../Modal/Modal';
import Input from '../../../../../../UI/Input/Input';
import Button from '../../../../../../UI/Button/Button';
import checkValidity from '../../../../../../../utility/formValidation';

const CreatePostComment = (props) => {
    const [postContent, setPostContent] = useState({
        elementType: 'textarea',
        elementConfig: {
            type: 'textarea',
            placeholder: 'Comment'
        },
        label: "Comment",
        validation: {
            required: true
        },
        valid: false,
        touched: false,
        value: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const onCreatePostModalClosedHandler = () => {
        props.cancelPostComment(false);
    }

    const inputChangedHandler = (event) => {
        const copiedPostContent = { ...postContent };

        copiedPostContent.value = event.target.value;
        copiedPostContent.valid = checkValidity(copiedPostContent.value, postContent.validation);
        copiedPostContent.touched = true;

        setIsFormValid(copiedPostContent.valid);
        setPostContent(copiedPostContent);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const formData = {
            index: postContent.value
        };

        if (isFormValid) {
            props.formSubmitted(formData);
        }
    }

    return (
        <div>
            <Modal 
                show={props.postCommentEnabled}
                customStyle={{width: '60rem', height: '37rem'}}
                closed={onCreatePostModalClosedHandler}>
                <section className={classes.CreatePostComment}>
                    <span className={classes.CreatePostComment__Close} onClick={onCreatePostModalClosedHandler}>
                        &nbsp;
                    </span>

                    <header className={classes.CreatePostComment__Header}>
                        <h2>Post a comment</h2>
                    </header>

                    <form className={classes.CreatePostComment__Form} onSubmit={formSubmitHandler}>
                        <Input 
                            elementType={postContent.elementType}
                            elementConfig={postContent.elementConfig}
                            label={postContent.label}
                            value={postContent.value}
                            touched={postContent.touched}
                            isValid={postContent.valid}
                            changed={(event) => inputChangedHandler(event)}
                        />

                        <div className={classes.CreatePostComment__Form__Cta}>
                            <Button
                                disabled={!isFormValid}
                            >Post</Button>
                        </div>
                    </form>
                </section>
            </Modal>
        </div>
    )
}

export default CreatePostComment;