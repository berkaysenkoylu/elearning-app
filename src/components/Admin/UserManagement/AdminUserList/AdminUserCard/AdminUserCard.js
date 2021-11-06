import React from 'react';

import classes from './AdminUserCard.module.scss';
import Button from '../../../../UI/Button/Button';

// TODO: ADD MORE FIELD AND CUSTOM DESIGN
const AdminUserCard = props => {
    return (
        <section className={classes.AdminUserCard}>
            <div className={classes.AdminUserCard__Body}>
                {props.email + ' - ' + props.status}
            </div>

            <div className={classes.AdminUserCard__Cta}>
                <Button btnType='BtnSecondary' btnSize='BtnSmall' clicked={props.userEdit}>Edit</Button>
                <Button btnType='BtnDanger' btnSize='BtnSmall' clicked={props.userDelete}>Delete</Button>
            </div>
        </section>
    )
}

export default AdminUserCard;