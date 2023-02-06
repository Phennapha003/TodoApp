module.exports.getDateToday = getDateToday
function getDateToday() {
    const dateOption: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Date().toLocaleDateString('th-TH', dateOption)
}