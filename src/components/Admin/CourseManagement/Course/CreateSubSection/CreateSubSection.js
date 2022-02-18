import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router';

import firstLetterUpper from '../../../../../utility/firstLetterUpper';
import addInputField from '../../../../../utility/addInputField';
import checkValidity from '../../../../../utility/formValidation';
import classes from './CreateSubSection.module.scss';
import Button from '../../../../UI/Button/Button';
import Menu from '../../../../UI/Menu/Menu';
import SectionFormControl from './SectionFormControl/SectionFormControl';

const SECTION_ELEMENTS = ['Title', 'Index', 'Pagebreak'];

const CreateSubSection = props => {
    const params = useParams();
    const [isEditMode, setIsEditMode] = useState(false);
    const [formValid, setFormValid] = useState(false);
    const [sectionFormControls, setSectionFormControls] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Sub Section Name'
            },
            label: "Sub Section Name",
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            value: ''
        }
    });

    // TODO: Revisit this function
    const populateFormFields = useCallback(() => {
        const subsectionToEdit = props.savedSubSectionData || {};
        const subsectionContent = subsectionToEdit.content || [];

        // Set the name of the subsection
        let  copiedFormControls = { ...sectionFormControls };
        const copiedNameFormCtrl = { ...copiedFormControls.name };

        copiedNameFormCtrl.value = subsectionToEdit.name || '';
        copiedNameFormCtrl.valid = true;
        copiedNameFormCtrl.touched = true;
        copiedFormControls.name = { ...copiedNameFormCtrl };

        let pageBreakCount = subsectionContent.length - 1;
        let currPageBreakIndex = 0;
        for (let i = 0; i < subsectionContent.length; i++) {
            if (i > 0 && currPageBreakIndex < pageBreakCount) {
                copiedFormControls[`Pagebreak${currPageBreakIndex}`] = true;

                currPageBreakIndex++;
            }

            let contentKeyArr = Object.keys(subsectionContent[i]);

            for (let j = 0; j < contentKeyArr.length; j++) {
                let formControlKeyArr = Object.keys(copiedFormControls);
                let agent = contentKeyArr[j];
                let formControlValue = subsectionContent[i][agent];
                let agentIndex = formControlKeyArr.filter(frmCtrller => frmCtrller.toLowerCase()
                    .indexOf(agent.replace(/[0-9]/g, '')) !== -1).length;
                let formKeyName = firstLetterUpper(agent);

                copiedFormControls = addInputField(copiedFormControls, {
                    type: agent !== 'index' ? 'input' : 'textarea',
                    inputKey: `${formKeyName + agentIndex}`,
                    placeholder: `${formKeyName + ' ' + (agentIndex + 1)}`,
                    label: `${formKeyName + ' ' + (agentIndex + 1)}`,
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: true,
                    value: formControlValue
                });
            }
        }
        
        setSectionFormControls(copiedFormControls);
        setFormValid(true);
        
        // eslint-disable-next-line
    }, [props.savedSubSectionData]);

    useEffect(() => {
        if (params.subsectionId && params.subsectionId !== '') {
            setIsEditMode(true);
        }

        populateFormFields();
    }, [params, populateFormFields]);

    const onMenuItemClickedHandler = (item) => {
        let copiedSectionFormControls = { ...sectionFormControls };
        let formControlArr = Object.keys(copiedSectionFormControls);
        
        let formControllerNumbers = formControlArr.filter(frmCtrller => frmCtrller.indexOf(item) !== -1)
            .map(ctrller => parseInt(ctrller.replace(/[^0-9]/g, '')));

        let index = 0;

        while (formControllerNumbers.indexOf(index) !== -1) {
            index++;
        }

        if (item !== 'Pagebreak') {
            copiedSectionFormControls = addInputField(copiedSectionFormControls, {
                type: item !== 'Index' ? 'input' : 'textarea',
                inputKey: `${item + index}`,
                placeholder: `${item + ' ' + (index + 1)}`,
                label: `${item + ' ' + (index + 1)}`,
                validation: {
                    required: true
                }
            });

            setSectionFormControls(copiedSectionFormControls);

            setFormValid(false)
        } else {
            if (formControlArr.slice(1).length > 0) {
                if (formControlArr.pop().indexOf('Pagebreak') === -1) {
                    copiedSectionFormControls[`${item + index}`] = true;

                    setSectionFormControls(copiedSectionFormControls);
                }
            }
        }
    }

    const checkFormValidity = (wholeForm) => {
        let isValid = true;

        wholeForm.forEach(formCtrl => {
            isValid = isValid && formCtrl.valid;
        });

        setFormValid(isValid && wholeForm.length > 1);
    }

    const onFormInputChangedHandler = (value, formControl) => {
        let copiedSectionFormControls = { ...sectionFormControls };
        let copiedFormControl = { ...copiedSectionFormControls[formControl] };

        copiedFormControl.touched = true;
        copiedFormControl.value = value;
        copiedFormControl.valid = checkValidity(value, copiedFormControl.validation);

        copiedSectionFormControls[formControl] = copiedFormControl;

        setSectionFormControls(copiedSectionFormControls);

        checkFormValidity(Object.values(copiedSectionFormControls).filter(obj => typeof obj.valid !== 'undefined'));
    }

    const onFormControlRemovedHandler = frmCtrl => {
        let copiedSectionFormControls = { ...sectionFormControls };
        
        delete copiedSectionFormControls[`${frmCtrl}`];

        // We need to handle pagebreaks here. No two consecutive page breaks should be present.
        let frmCtrlArr = Object.keys(copiedSectionFormControls).slice(1);

        if (frmCtrlArr.length > 0) {
            if (frmCtrlArr[0].indexOf('Pagebreak') !== -1) {
                delete copiedSectionFormControls[`${frmCtrlArr[0]}`];
            }
    
            let dupIndex = 0;
            for (let i = 0; i < frmCtrlArr.length - 1; i++) {
                if (frmCtrlArr[i].indexOf('Pagebreak') !== -1) {
                    if (frmCtrlArr[i+1].indexOf('Pagebreak') !== -1) {
                        dupIndex = i;
                    }
                }
            }
    
            if(dupIndex !== 0) {
                delete copiedSectionFormControls[`${frmCtrlArr[dupIndex]}`];
            }
        }

        setSectionFormControls(copiedSectionFormControls);

        let formControlArr = Object.values(copiedSectionFormControls);
        if (formControlArr.length === 0) {
            setFormValid(false);
        } else {
            checkFormValidity(Object.values(copiedSectionFormControls)
                .filter(obj => typeof obj.valid !== 'undefined'));
        }
    }

    // TODO: If the last agent is a pagebreak, handle it.
    const onSubSectionCreatedHandler = () => {
        // Subsections
        let formControlArr = Object.keys(sectionFormControls).slice(1);
        let sectionCount = formControlArr.filter(item => item.toLowerCase().indexOf('pagebreak') !== -1).length + 1;

        let activeIndex = 0;
        let subSections = new Array(sectionCount).fill({});

        let index = 0;

        while (index < formControlArr.length) {
            let currentFormCtrl = formControlArr[index].toLowerCase().replace(/[^A-Za-z]/g, '');
            let formCtrlValue = sectionFormControls[formControlArr[index]].value;
            let copiedSubSection = {
                ...subSections[activeIndex]
            };

            index++;

            if (currentFormCtrl.indexOf('pagebreak') === -1) {
                copiedSubSection[currentFormCtrl] = formCtrlValue;

                subSections[activeIndex] = {...copiedSubSection};
            } else {
                activeIndex++;
            }
        }

        if (!isEditMode) {
            props.createdSubSection({
                section: ((props.match || {}).params || {}).sectionId || '',
                name: sectionFormControls['name'].value,
                content: subSections
            });
        } else {
            props.editedSubSection({
                subsection: ((props.match || {}).params || {}).subsectionId || '',
                section: ((props.match || {}).params || {}).sectionId || '',
                name: sectionFormControls['name'].value,
                content: subSections
            });
        }
    }

    // Exclude the first form control
    let content = Object.keys(sectionFormControls).slice(1).map(frmCtrl => {
        return <SectionFormControl
            key={frmCtrl}
            label={frmCtrl}
            isPageBreak={frmCtrl.indexOf('Pagebreak') !== -1}
            showRemove={true}
            formControl={sectionFormControls[frmCtrl]}
            inputChanged={(value) => onFormInputChangedHandler(value, frmCtrl)}
            removed={() => onFormControlRemovedHandler(frmCtrl)}
        />;
    });

    // Pick up the first element
    let nameField = sectionFormControls.name;

    return (
        <section className={classes.CreateSection}>
            <header className={classes.CreateSection__Header}>
                <h1>{!isEditMode ? 'Create a subsection' : 'Edit the subsection'}</h1>

                <SectionFormControl
                    label={'Section Name'}
                    isPageBreak={false}
                    showRemove={false}
                    formControl={nameField}
                    inputChanged={(value) => onFormInputChangedHandler(value, 'name')}
                />
            </header>

            <div className={classes.CreateSection__Body}>
                <div className={classes.CreateSection__Body__FormField}>
                    {content}
                </div>

                <div className={classes.CreateSection__Body__Menu}>
                    <Menu
                        items={SECTION_ELEMENTS}
                        menuItemClicked={onMenuItemClickedHandler} />
                </div>
            </div>

            <div className={classes.CreateSection__Cta}>
                <Button
                    disabled={!formValid}
                    clicked={onSubSectionCreatedHandler}>{!isEditMode ? 'Create' : 'Edit'}</Button>
            </div>
        </section>
    )
}

export default withRouter(CreateSubSection);