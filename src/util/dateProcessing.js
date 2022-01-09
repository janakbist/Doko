import moment from 'moment';

function formatDate(date, format = "YYYY/MM/DD") {
    return moment(date).format(format)
}

function formatTime(date, format = "hh:mm a") {
    return moment(date).format(format)
}

export default {
    formatDate,
    formatTime
}