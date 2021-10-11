import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
// import Grid from '@mui/material-ui/core'
import validationSchema from '../Validation/Validation'
import TextQuestions from './TextQuestions'
import CheckboxQuestions from './CheckboxQuestions'
import TextFieldQuestions from './TextFieldQuestions'
import PrimaryButton from './PrimaryButton'
import CheckBoxSample from './CheckBoxSample'
import { ButtonGroup, Grid } from '@material-ui/core'
require("dotenv").config()
const CryptoJS = require('crypto-js');
// const crypto = require("crypto");
const REACT_APP_API_KEY = process.env.REACT_APP_SECRET_KEY
// var REACT_APP_SECRET_KEY = process.env.SECRET_KEY;


const encryptNames = (name) => {
    console.log("Inside encrypt func: ", name);
    console.log("REACT_APP_SECRET_KEY: ", REACT_APP_API_KEY)
    const encryptedUserName = CryptoJS.AES.encrypt(name, REACT_APP_API_KEY).toString();
    console.log("Encrypted User Name: ", encryptedUserName)

    return encryptedUserName;
    // let dcryptedUserName = CryptoJS.AES.decrypt(encryptedUserName, REACT_APP_API_KEY).toString(CryptoJS.enc.Utf8);
    // console.log("Dcrypted User Name: ", dcryptedUserName)
}


const getDate = () => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date
}

const getTime = () => {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time
}

const sendDataToDatabase = async (value) => {

    console.log("In sendDataFunction: ", value)

    console.log("First name: ", value.FirstName)
    console.log("Last name: ", value.LastName)

    const encryptedName = encryptNames(value.FirstName);


    value.FirstName = encryptedName;


    let date = getDate();
    let time = getTime();

    let newObj = Object.assign(value, { Date: date }, { Time: time });

    console.log(newObj);


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
    };
    const response = await fetch('http://localhost:8000/answers', requestOptions);
    const data = await response.json()
    console.log("data: ", data)
    // this.data({ postId: data.id })
}





//function with switch statement. recieves the question object and current question index
const theSwitchStatment = (questions, index, values) => {
    // console.log("Values in switch statment: ", values)
    if (questions.length > 0) {
        {
            switch (questions[index].format) {
                case 'text':
                    return <TextFieldQuestions
                        key={index}
                        question={questions[index]}
                        label={questions[index].questionText}
                        type={questions[index].format}
                        name={questions[index].name}
                    />
                case 'checkbox':
                    return <CheckBoxSample
                        key={index}
                        question={questions[index]}
                        label={questions[index].questionText}
                        type={questions[index].format}
                        name={questions[index].name}
                        answercheck={questions[index].answer}
                        values={values}
                    />;
                case 'textfield':
                    return <TextFieldQuestions
                        key={index}
                        question={questions[index]}
                        label={questions[index].questionText}
                        type={questions[index].format}
                        name={questions[index].name}
                    />;
                default:
                    return null;
            }
        }
    } else {
        console.log("Empty array")
    }
}

// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));


const Sample = () => {

    const [questions, setQuestions] = useState(null)
    const [formValues, setFormValues] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8000/questions')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setQuestions(data);
            });
    }, [])//dependency array

    //manages the next question index via the next button. 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    //manages the label of the buttons 
    const [buttonlabel, setButtonLabel] = useState('OK');
    //manages the type of buttons.  
    const [buttonType, setButtonType] = useState();
    //Changes the question index .Recieves the question object
    const handleNextButtonClick = (questions) => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            console.log("HandlenextButton - nextQuestion: ", nextQuestion)
            setCurrentQuestion(nextQuestion);
            setButtonLabel('Ok');
            setButtonType('ok');
        } else {
            setButtonLabel('Submit');
            setButtonType('submit');
        }
    };


    const handlePreviousButtonClick = (questions) => {
        console.log("Inside previous - current question ", currentQuestion)
        if (currentQuestion > 0) {
            const previousQuestion = currentQuestion - 1;
            console.log("Inside previous - current question ", previousQuestion)
            if (previousQuestion < questions.length) {
                console.log("HandlenextButton - nextQuestion: ", previousQuestion)
                setCurrentQuestion(previousQuestion);
                // setPreviousQuestion(previousQuestion)
            }
        }
    };

    const handleNextArrowButtonClick = (questions) => {
        console.log("Inside next - current question ", currentQuestion)
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            console.log("Inside next - current question ", nextQuestion)
            setCurrentQuestion(nextQuestion);
            // setNextQuestion(nextQuestion)
        }
    };

    const initialValues = {
        // isInitialValid: false,
        // FirstName: 'Enter your first name...',
        // OverallExperience: '',
        // TherapistMatchesYourPreferences: '',
        // OverallExperience: 'Enter your answer...',
    }

    const onSubmit = (values, submitProps) => {
        console.log("Values on Submit: ", values)
        // console.log('submitProps', submitProps)
        setFormValues(values)
        sendDataToDatabase(values);

        submitProps.setSubmitting(false)
        submitProps.resetForm()

        alert('Your form is submmitted succesfully.')

    };



    return (

        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
            handleNextButtonClick
        // validateOnChange={false}
        >
            {({ dirty, isValid, errors, values }) => (
                <Form>
                    <Grid container>
                        <Grid item xs={1}>
                            {currentQuestion + 1}:
                        </Grid>
                        <Grid item xs={11}>
                            {questions && (theSwitchStatment(questions, currentQuestion, values))}
                        </Grid>
                        <Grid item xs={12} className='button-section'>
                            <PrimaryButton
                                onClick={() => handleNextButtonClick(questions)}
                                count={currentQuestion}
                                length={questions && questions.length}
                                label={buttonlabel}
                                type={buttonType}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonGroup className="buttonGroup">
                                <PrimaryButton
                                    onClick={() => handlePreviousButtonClick(questions)}
                                    count={currentQuestion}
                                    length={questions && questions.length}
                                    label={'<'}
                                />
                                <PrimaryButton
                                    onClick={() => handleNextArrowButtonClick(questions)}
                                    count={currentQuestion}
                                    length={questions && questions.length}
                                    label={'>'}
                                />
                            </ButtonGroup>
                        </Grid>

                    </Grid>
                </Form>
            )
            }

        </Formik >


    )

}

export default Sample
//disable submit button
// disabled={!(formik.isValid && formik.dirty)}

//CHECK TRAVERSY FOR MUI SUCCESS PAGE.