import React, { useState, useEffect } from 'react'
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import validationSchema from '../Validation/Validation';
import TextQuestions from './TextQuestions'
import CheckboxQuestions from './CheckboxQuestions'
import TextFieldQuestions from './TextFieldQuestions'
import PrimaryButton from './PrimaryButton';


const sendDataToDatabase = async (value) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
    };
    const response = await fetch('http://localhost:8000/answers', requestOptions);
    const data = await response.json()
    // this.data({ postId: data.id })
}

//function with switch statement. recieves the question object and current question index
const theSwitchStatment = (questions, index) => {

    if (questions.length > 0) {
        {
            switch (questions[index].format) {
                case 'text':
                    return <TextQuestions
                        key={index}
                        question={questions[index]}
                        label={questions[index].questionText}
                        type={questions[index].format}
                        name={questions[index].name}
                    />
                case 'checkbox':
                    return <CheckboxQuestions
                        key={index}
                        question={questions[index]}
                        label={questions[index].questionText}
                        type={questions[index].format}
                        name={questions[index].name}
                        answercheck={questions[index].answer}
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

const Questions = () => {
    const [questions, setQuestions] = useState(null)

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

    //manages the previous question index via the previous button. 
    const [previousQuestion, setPreviousQuestion] = useState(0);

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
            setButtonLabel('Next');
            setButtonType('next');
        } else {
            setButtonLabel('Submit');
            setButtonType('submit');
        }
    };

    const initialValues = {
        FirstName: '',
        OverallExperience: '',
        answerOptions: '',
        TherapistMatchesYourPreferences: '',
    }

    return (
        <Formik
            initialValues={
                {
                    initialValues
                }}

            validationSchema={validationSchema}

            onSubmit={values => {
                console.log("On submit: ", values)
                sendDataToDatabase(values);
                alert('Your form is submmitted succesfully.')
                // resetForm();
                // setSubmitting(false);
            }}
        >
            <Form autoComplete="off">
                <div className="question-section">
                    <div>
                        {questions && (theSwitchStatment(questions, currentQuestion))}
                    </div>
                    <div className='button-section'>
                        <PrimaryButton
                            onClick={() => handleNextButtonClick(questions)}
                            count={currentQuestion}
                            length={questions && questions.length}
                            label={buttonlabel}
                            type={buttonType}
                        />

                    </div>
                </div>
                {/* <button className="button" type="submit">Submit</button> */}

            </Form>

        </Formik >
    )

}

export default Questions
//disable submit button
// disabled={!(formik.isValid && formik.dirty)}

//CHECK TRAVERSY FOR MUI SUCCESS PAGE.