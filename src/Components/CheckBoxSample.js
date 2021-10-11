import { React } from 'react'
import {
    Checkbox,
    FormControl,
    FormLabel
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Form, ErrorMessage, useField, FieldArray } from 'formik';

const useStyles = makeStyles({
    label: {
        color: 'black',
    },

    checkboxOptions: {
        flexDirection: 'row',
        color: 'red',
    },

    checkboxBox: {
        marginLeft: '0px',
        borderStyle: 'solid 2px',
        padding: '1px 14px 1px 1px',
        borderRadius: '4px',
        backgroundColor: 'rgb(194 14 9 / 10%)',
        boxShadow: 'rgb(194 14 9 / 60%) 0px 0px 0px 1px inset',
        color: 'rgb(194, 14, 9)',
        maxWidth: '100%',
        minWidth: '75px',
        minHeight: '40px',
        outline: '0px',
        transitionDuration: '0.1s',
        transitionProperty: 'background-color, color, border-color, opacity, box-shadow',
        transitionTimingFunction: 'ease-out',
        cursor: 'pointer',
        opacity: 1,
    },
    checkboxSmallBox: {
        color: 'red',
    }

});

const CheckBoxSample = ({ questions, question, name, values, ...props }) => {
    console.log("Incheckbox: ", values)
    const styles = useStyles();
    const questionOptions = question.answerOptions;
    // console.log("questionOptions: ", questionOptions)
    const [field, meta] = useField(name);

    const configFormControl = {};
    if (meta && meta.touched && meta.error) {
        configFormControl.error = false;
    }
    {
        return (
            <div className="question-container">
                <FormControl  {...configFormControl}>
                    <FormLabel component="legend"
                        className={styles.label}
                    >{question.questionText}</FormLabel>
                    <FieldArray
                        // className={styles.checkboxOptions}
                        name={question.name}
                        render={arrayHelpers => (
                            <div className="checkboxOptions">
                                {questionOptions.map((option, index) => (
                                    <div key={index} className="checkboxLabel">
                                        <Checkbox
                                            className={styles.checkboxSmallBox}
                                            variant="checkbox"
                                            name={question.name}
                                            type="checkbox"
                                            value={option}
                                            checked={values.name}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    console.log(props.values)
                                                    console.log(option)
                                                    arrayHelpers.push(option);
                                                } else {
                                                    const idx = option.index;
                                                    console.log(idx)
                                                    arrayHelpers.remove(idx);
                                                }
                                            }}

                                        // onChange={(e) => { 
                                        // form.setFieldValue(name, e.target.checked) 
                                        // }}
                                        />
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    <ErrorMessage component="div" name={field.name} className="error" />
                </FormControl>
            </div>
        )
    }
}


export default CheckBoxSample
