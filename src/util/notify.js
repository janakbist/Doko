import { toast } from 'react-toastify'

function showSuccess(msg) {
    toast.success(msg);
}

function showInfo(msg) {
    toast.info(msg);
}

function showWarning(msg) {
    toast.warning(msg);
}

function showError(msg) {
    toast.error(msg);
}

function handleError(error) {
    let errMsg = 'Something Went Wrong';
    debugger;
    const err = error.response;
    if (err && err.data) {
        errMsg = err.data.msg
    }
    // this is an error hanlding block
    // steps
    // check error, 
    // parse error
    // prepare appropriate error message
    // show them in UI
    showError(errMsg)

}
export default {
    showInfo,
    showSuccess,
    showWarning,
    handleError
}