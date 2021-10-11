import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    FirstName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .test('length', 'First Name must have more than 1 character', (value) => {
            return value && value.length > 2;
        })
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .required("Required"),
    // LastName: Yup.string()
    //     .max(20, "Must be 20 characters or less")
    //     .test('length', 'First Name must have more than 1 character', (value) => {
    //         return value && value.length > 2;
    //     })
    //     .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    //     .required("Required"),
    // TherapistName: Yup.string()
    //     .max(30, "Must be 15 characters or less")
    //     .test('length', 'Name must have more than 1 character', (value) => {
    //         return value && value.length > 2;
    //     })
    //     .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
    //     .required("Required"),
    // SatisfiedByTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     // .test('this.array.length', 'You have selected more than one value', (array) => {
    //     //     return array && array.length > 0;
    //     // })
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // OverallExperience: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // FeelHeardByTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // FeelSeenByTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // FeelUnderstoodByTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // FeelSafeByTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // FeelComfortableWithTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // HowlongTofeelComfortableWithTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // ConfidenceInTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // ClickingWithTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // TherapistMatchesYourPreferences: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // EnjoyingMostAboutTherapist: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // EnjoyingMostAboutTherapy: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // EnjoyingLeastAboutTherapist: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // EnjoyingLeastAboutTherapy: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // WhyChooseThisTherapist: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
    // HowLongHaveYouBeenThinkingAboutTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // ActivelyLookingForTherapist: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // TherapistHaveProfilePicture: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // TherapistToHaveOwnWebsite: Yup.array()
    //     .min(1, "You must select one option.")
    //     .max(1, "You cannot select more than one option.")
    //     .required("You can't leave this blank.")
    //     .nullable(),
    // AnythingWeMissed: Yup.string()
    //     .min(100, "Must be 100 characters or more.")
    //     .max(500, "Must be less than 500 characters.")
    //     .test('length', 'Your answer must have more than 100 characters', (value) => {
    //         return value && value.length < 500;
    //     })
    //     .required("Required"),
});

export default validationSchema;
