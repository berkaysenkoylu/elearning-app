import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, useParams } from 'react-router';

import firstLetterUpper from '../../../../../utility/firstLetterUpper';
import addInputField from '../../../../../utility/addInputField';
import checkValidity from '../../../../../utility/formValidation';
import classes from './CreateSubSection.module.scss';
import Button from '../../../../UI/Button/Button';
import Menu from '../../../../UI/Menu/Menu';
import SectionFormControl from './SectionFormControl/SectionFormControl';

const SECTION_ELEMENTS = ['Index'];

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
        const subsectionContent = subsectionToEdit.content ||[];

        // Set the name of the subsection
        let  copiedFormControls = { ...sectionFormControls };
        const copiedNameFormCtrl = { ...copiedFormControls.name };

        copiedNameFormCtrl.value = subsectionToEdit.name || '';
        copiedNameFormCtrl.valid = true;
        copiedNameFormCtrl.touched = true;
        copiedFormControls.name = { ...copiedNameFormCtrl };

        let index = 0;
        let currContent = [];
        let currItemValue = '';
        let formControlArr = Object.keys(copiedFormControls);
        let formControllerNumbers = [];

        console.log(subsectionContent)

        while (index < subsectionContent.length) {
            currContent = subsectionContent[index];

            let contentArr = Object.keys(currContent);
            let itemKey = '';

            for (let i = 0; i < contentArr.length; i++) {
                formControlArr = Object.keys(copiedFormControls);
                itemKey = contentArr[i];

                let currItem = firstLetterUpper(itemKey);

                formControllerNumbers = formControlArr.filter(frmCtrller => frmCtrller
                    .indexOf(currItem.replace(/[0-9]/g, '')) !== -1);

                currItemValue = currContent.index;

                let keyIndex = formControllerNumbers.length;

                currItem = currItem.replace(/\d+/g, '')

                copiedFormControls = addInputField(copiedFormControls, {
                    type: 'textarea',
                    inputKey: `${currItem + keyIndex}`,
                    placeholder: `${currItem + ' ' + (keyIndex + 1)}`,
                    label: `${currItem + ' ' + (keyIndex + 1)}`,
                    validation: {
                        required: true
                    },
                    valid: true,
                    touched: true,
                    value: currItemValue
                });
            }

            index++;
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

        copiedSectionFormControls = addInputField(copiedSectionFormControls, {
            type: 'textarea',
            inputKey: `${item + index}`,
            placeholder: `${item + ' ' + (index + 1)}`,
            label: `${item + ' ' + (index + 1)}`,
            validation: {
                required: true
            }
        });

        setSectionFormControls(copiedSectionFormControls);

        setFormValid(false)
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

    const onSubSectionCreatedHandler = () => {
        // Subsections
        let formControlArr = Object.keys(sectionFormControls).slice(1);
        let sectionCount = formControlArr.length;
        let subSections = new Array(sectionCount).fill({});

        for (let i = 0; i < formControlArr.length; i++) {
            subSections[i] = {
                index: sectionFormControls[formControlArr[i]].value
            };
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
            })
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