import React from 'react';

import classes from './SectionItem.module.scss';
import SubSectionItem from './SubSectionItem/SubSectionItem';

const SectionItem = props => {
    const sectionData = props.sectionData || {};

    const onSubSectionAdd = () => {
        props.subsectionAdded(sectionData._id);
    }

    const onSectionDelete = () => {
        props.sectionDeleted(sectionData._id);
    }

    const onSubSectionEdited = (subsectionId) => {
        props.subsectionEdited({
            section: sectionData._id,
            subsection: subsectionId
        });
    }

    return (
        <li className={classes.SectionItem}>
            <div className={classes.SectionItem__Name}>
                {sectionData.name}
                
                <button className={classes.SectionItem__Add} onClick={onSubSectionAdd}>Add</button>

                <button className={classes.SectionItem__Add} onClick={onSectionDelete}>Delete</button>
            </div>

            <ul className={classes.SectionItem__List}>
                {sectionData.subsections.map(subsection => {
                    return <SubSectionItem
                        key={subsection._id}
                        name={subsection.name}
                        subsectionEdited={() => onSubSectionEdited(subsection._id)}
                        subsectionDeleted={() => props.subsectionDeleted(subsection._id)}
                    />;
                })}
            </ul>
        </li>
    )
}

export default SectionItem;