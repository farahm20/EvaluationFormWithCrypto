import { React } from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ErrorMessage, useField } from 'formik';

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

const CheckboxQuestions = ({ questions, question, name, ...props }) => {

    const styles = useStyles();
    const questionOptions = question.answerOptions;
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

                    <FormGroup className={styles.checkboxOptions} name="answerOptions.selected">
                        {
                            questionOptions.map((option, index) =>
                                <FormControlLabel
                                    required
                                    className={styles.checkboxBox}
                                    key={index}
                                    control={
                                        <Checkbox
                                            className={styles.checkboxSmallBox}
                                            name={question.name}
                                            value={option}
                                            {...props}
                                        />
                                    }
                                    label={option}
                                    {...field}
                                />
                            )}
                        <ErrorMessage component="div" name={field.name} className="error" />
                    </FormGroup>
                </FormControl>


                {/* <div className='question-count'>
                    <p>Question {question.questionId} out of {questions.length}</p>
                </div> */}
            </div>
        )
    }
}


export default CheckboxQuestions
