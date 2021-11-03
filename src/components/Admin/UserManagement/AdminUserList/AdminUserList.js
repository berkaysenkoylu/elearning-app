import React from 'react';

import classes from './AdminUserList.module.scss';
import Accordion from '../../../UI/Accordion/Accordion';

const AdminUserList = () => {
    let demo = {
		label: 'Alpaslan Senkoylu',
		content: 'Icons are everywhere. These "little miracle workers" (as John Hicks described them) help us reinforce meaning in the interfaces we design and build. Their popularity in web design has never been greater; the conciseness and versatility of pictograms in particular make them a lovely fit for displays large and small. But icons on the web have had their fair share of challenges.',
	}

    return (
        <div className={classes.AdminUserList}>
            <header>
                ADMIN USER LIST
            </header>

            <section>
                <Accordion label={demo.label}>{demo.content}</Accordion>

                <Accordion label={demo.label}>{demo.content}</Accordion>

                <Accordion label={demo.label}>{demo.content}</Accordion>
            </section>
        </div>
    )
}

export default AdminUserList;