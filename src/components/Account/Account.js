import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Account.module.scss';
import axiosAuth from '../../axiosUtility/axios-auth';
import FeedbackDialogue from '../FeedbackDialogue/FeedbackDialogue';
import PasswordChange from './PasswordChange/PasswordChange';
import AccountDataChange from './AccountDataChange/AccountDataChange';
import File from '../UI/File/File';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const Account = props => {
    const [userData, setUserData] = useState({});
    const [imageFile, setImageFile] = useState(undefined);
    const [feedbackDialogue, setFeedbackDialogue] = useState({
        isError: false,
        message: '',
        show: false
    });

    useEffect(() => {
        axiosAuth.get(`${props.userId}`).then(response => {
            setUserData(response.data.user)
        }).catch(err => {
            console.log(err);
        });
    }, [props.userId]);

    const checkMimeType = (file) => {
        return MIME_TYPE_MAP[file];
    }

    const fileSelectHandler = (file) => {
        if(!checkMimeType(file.type)) {
            return;
        }

        setImageFile(file);
    }

    const onPasswordChangedHandler = (data) => {
        axiosAuth.put('/change-passwor', data, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            setFeedbackDialogue(() => {
                return {
                    isError: false,
                    message: response.data.message,
                    show: true
                };
            });
        }).catch(error => {
            setFeedbackDialogue(() => {
                return {
                    isError: true,
                    message: error.response.data.message || 'Something went wrong!',
                    show: true
                };
            });
        });
    }

    const onAccountDataChangedHandler = (data) => {
        const formData = new FormData();

        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        });
        
        if (typeof imageFile !== 'undefined') {
            formData.append('file', imageFile);
        } else {
            formData.append('avatarUrl', userData.avatarUrl);
        }

        axiosAuth.put('/edit-account', formData, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            let newUserData = response.data.newUserData;

            setUserData(newUserData);

            props.changeAvatar(newUserData.avatarUrl);

            setFeedbackDialogue(() => {
                return {
                    isError: false,
                    message: response.data.message || 'Successful!',
                    show: true
                };
            });
        });
    }

    const onCloseFeedBackDialogueHandler = () => {
        setFeedbackDialogue(() => {
            return {
                isError: false,
                message: '',
                show: false
            };
        });
    }

    let style = {};

    if (imageFile) {
        style['backgroundImage'] = `url(${URL.createObjectURL(imageFile)})`;
    } else if (userData.avatarUrl !== '') {
        let imageUrl = userData.avatarUrl || '';
        
        if (imageUrl !== '')
            style['backgroundImage'] = `url(${'http://localhost:8000/' + imageUrl.replace(/\\/g, '/')})`;
    }

    return (
        <>
            <FeedbackDialogue
                show={feedbackDialogue.show}
                feedbackMessage={feedbackDialogue.message}
                closed={onCloseFeedBackDialogueHandler}
                isError={feedbackDialogue.isError}
            />

            <section className={classes.Account}>
                <header className={classes.Account__Header}>
                    <h2>My Account</h2>
                </header>

                <div className={classes.Account__Content}>
                    <div className={classes.Account__Content__ImageContainer}>
                        <figure>
                            <div className={classes.Account__Content__ImageContainer__Image} style={style}></div>
                        </figure>

                        <File selectedFile={fileSelectHandler} />
                    </div>

                    <div className={classes.Account__Content__FormContainer}>
                        <AccountDataChange
                            userData={userData}
                            accountDataChange={onAccountDataChangedHandler} />

                        <PasswordChange passwordChange={onPasswordChangedHandler} />
                    </div>
                </div>
            </section>
        </>
    );
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeAvatar: (newImgUrl) => dispatch(actions.changeAvatar(newImgUrl))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);