import React, { useState } from 'react';

import svg from '../../assets/images/sprite.svg';
import classes from './CourseSection.module.scss';
import CourseSubSection from './CourseSubSection/CourseSubSection';

const CourseSection = (props) => {
    const [isAtIntro, setIsAtIntro] = useState(true);
    const [subSectionIndex, setSubSectionIndex] = useState(0);
    const [subSectionPageIndex, setSubSectionPageIndex] = useState(0); // Signifies where we are in the subsection

    let sectionData = props.sectionData;
    let totalSectionCount = (sectionData.sections || []).length;
    let currentSectionLength = (((sectionData.sections || [])[subSectionIndex] || {}).content || []).length;

    const resetToSectionMenu = () => {
        setIsAtIntro(true);
        setSubSectionIndex(0);
        setSubSectionPageIndex(0);
    }

    const goToNextSubSection = () => {
        if (subSectionIndex + 1 >= totalSectionCount) {
            return;
        } else {
            setSubSectionIndex(subSectionIndex + 1);
            setSubSectionPageIndex(0);
        }
    }

    const goToPrevSubSection = () => {
        if (subSectionIndex - 1 < 0) {
            resetToSectionMenu();
        } else {
            let prevSubSectionLength = (((sectionData.sections || [])[subSectionIndex - 1] || {}).content || []).length;

            setSubSectionIndex(subSectionIndex - 1);
            setSubSectionPageIndex(prevSubSectionLength - 1);
        }
    }

    const onSubSectionSelectedHandler = (key) => {
        setIsAtIntro(false);
        setSubSectionIndex(key);
        setSubSectionPageIndex(0);
    }

    // Method to handle when back button in the sub-section is clicked
    const onBackClickedHandler = () => {
        if(subSectionPageIndex <= 0) {
            goToPrevSubSection();
        } else {
            setSubSectionPageIndex(subSectionPageIndex - 1);
        }
    }

    // Method to handle when next button in the sub-section is clicked
    const onNextClickedHandler = () => {
        if(subSectionPageIndex + 1 >= currentSectionLength) {
            // GO TO NEXT SUB SECTION
            goToNextSubSection();
        } else {
            // GO TO NEXT PAGE IN THE SAME SUB SECTION
            setSubSectionPageIndex(subSectionPageIndex + 1);
        }
    }

    return (
        <div className={classes.Section}>
            <button className={classes.BackMenu__Button} onClick={props.onBackToMainMenu}>
                <svg className={classes.BackMenu__Icon}>
                    <use xlinkHref={`${svg}#icon-list`}></use>
                </svg>
            </button>
            
            <div className={classes.Section__Container}>
                <header className={classes.Section__Title}>
                    <h1>{sectionData.name}</h1>
                </header>

                {isAtIntro ? <section className={classes.Section__Content}>
                    <h3>Konu Dağılımı</h3>
                    
                    <ul className={classes.Section__List}>
                        {sectionData.sections.map((section, i) => {
                            return <li key={i} className={classes.Section__ListItem}>
                                <span>
                                    {section.title}
                                </span>
                                
                                <button className={classes.Section__ListButton} onClick={() => onSubSectionSelectedHandler(i)}>
                                    <svg className={classes.Section__ListIcon}>
                                        <use xlinkHref={`${svg}#icon-play`}></use>
                                    </svg>
                                </button>
                            </li>;
                        })}
                    </ul>
                </section> : <CourseSubSection 
                    subSectionData={sectionData.sections[subSectionIndex] || {}}
                    subSectionPageIndex={subSectionPageIndex}
                    onBackClicked={onBackClickedHandler}
                    onNextClicked={onNextClickedHandler}
                    showNext={!(subSectionIndex + 1 >= totalSectionCount && subSectionPageIndex + 1 >= currentSectionLength)}
                />}
            </div>
        </div>
    );
}

export default CourseSection;