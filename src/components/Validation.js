export const validate = (values) => {
    const error = {};

    if (!values.book_name ) {
        error.book_nameErr = "Please fill session name";
    } else {
        error.book_nameErr = "";
    }

    if (!values.issue_date) {
        error.issue_dateErr = "Please enter issue date";
    } else {
        error.issue_dateErr = "";
    }


    if (!values.author_name) {
        error.author_nameErr = "Please enter author name";
    } else {
        error.author_nameErr = "";
    }


    return error;
};
