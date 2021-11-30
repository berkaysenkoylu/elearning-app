import React from 'react';

import classes from './SectionItem.module.scss';
import SubSectionItem from './SubSectionItem/SubSectionItem';

const SectionItem = props => {
    const sectionData = props.sectionData || {};

    const onSubSectionAdd = () => {
        props.subsectionAdded(sectionData._id);
    }

    return (
        <li className={classes.SectionItem}>
            <div className={classes.SectionItem__Name}>
                {sectionData.name}
                
                <button className={classes.SectionItem__Add} onClick={onSubSectionAdd}>Add</button>
            </div>

            <ul className={classes.SectionItem__List}>
                <SubSectionItem name='Subsection 1' />

                <SubSectionItem name='Subsection 2' />
            </ul>
        </li>
    )
}

export default SectionItem;