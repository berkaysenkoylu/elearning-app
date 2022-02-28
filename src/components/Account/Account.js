import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import classes from './Account.module.scss';
import axiosAuth from '../../axiosUtility/axios-auth';
import PasswordChange from './PasswordChange/PasswordChange';
import AccountDataChange from './AccountDataChange/AccountDataChange';
import File from '../UI/File/File';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

const Account = props => {
    const [userData, setUserData] = useState()
    const [imageFile, setImageFile] = useState(undefined);

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
        console.log(data)
    }

    const onAccountDataChangedHandler = (data) => {
        axiosAuth.put('/edit-account', data, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(response => {
            console.log(response.data)
        });
    }

    let style = {};

    if (imageFile) {
        style['backgroundImage'] = `url(${URL.createObjectURL(imageFile)})`;
    }

    return (
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
    );
}

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token
    }
}

export default connect(mapStateToProps, null)(Account);