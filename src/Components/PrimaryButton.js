import React, { useState } from 'react'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import validationSchema from '../Validation/Validation';
import { Formik } from 'formik';



const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'rgb(255 255 255)',
        borderRadius: '4px',
        position: 'relative',
        fontWeight: '700',
        cursor: 'pointer',
        transitionDuration: '0.1s',
        transitionProperty: 'grey, color, borderColor, opacity',
        transitionTimingFunction: 'ease- out',
        outline: 'none',
        boxShadow: 'rgb(0 0 0 / 10 %) 0px 3px 12px 0px',
        padding: '6px 14px',
        minHeight: '40px',
    }
}));

const PrimaryButton = ({ dirty, isValid, errors, children, length, count, label, validationSchema, ...props }) => {
    const styles = useStyles();
    return (
        <Button
            variant="contained"
            color="primary"
            className={styles.root}
            // disabled={!(dirty && isValid) || Object.keys(errors).length > 0}
            // disabled={!Formik.dirty}
            {...props}
        >
            {label}
            {children}
        </Button>
    );
};

export default PrimaryButton