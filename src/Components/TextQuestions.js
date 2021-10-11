import React from 'react'
import { FormLabel, TextField } from "@material-ui/core";
import { useField } from 'formik';
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        color: 'black',
    },
    textInput: {
        color: 'red',
    }
});


const TextFieldQuestions = ({ questions, answercheck, question, ...props }) => {

    const classes = useStyles();
    const [field, meta] = useField(props);

    return (
        <Box
            sx={{
                '& .MuiInputBase-input': { width: '-webkit-fill-available', color: 'red', backgroundColor: 'rgb(194 14 9 / 10%)' },
            }}
            noValidate
            autoComplete="off">
            <div className="question-container">
                <div className="answer-section">
                    <FormLabel component="legend"
                        className={classes.root}>{question.questionText}</FormLabel>

                    <TextField
                        required
                        type="text"
                        className={classes.textInput}
                        variant="standard"
                        name={question.name}
                        {...field}
                    // {...props}
                    />
                    <>
                        {meta.touched && meta.error ? (
                            <div className="error">{meta.error}</div>
                        ) :
                            answercheck = true}</>

                </div>

                {/* <div className='question-count'>
                    <p>Question {question.questionId} out of {questions.length}</p>
                </div> */}
            </div>
        </Box>
    )
}

export default TextFieldQuestions
