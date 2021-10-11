import React, { useState, useEffect } from 'react'

require("dotenv").config()
const CryptoJS = require('crypto-js');

const REACT_APP_SECRET_KEY = process.env.REACT_APP_SECRET_KEY


const dcryptNames = (encryptedName) => {

    let dcryptedUserName = CryptoJS.AES.decrypt(encryptedName, REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    console.log("Dcrypted User Name: ", dcryptedUserName)

    return dcryptedUserName;
}

const showUsers = (answers) => {
    {
        answers.map((answer, index) => (
            // console.log(answer.value.FirstName, index)
            dcryptNames(answer.value.FirstName)
        ))
    }
}


const ShowUserData = () => {

    const [answers, setAnswers] = useState(null)

    const showData = () => {
        fetch('http://localhost:8000/answers'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setAnswers(myJson)
            });
    }
    useEffect(() => {
        showData()
    }, [])

    console.log("Answers: ", answers)

    { answers && showUsers(answers) }



    return (
        <div>

        </div>
    )
}

export default ShowUserData
