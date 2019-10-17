function employeeNumberGenerator(name, usedNumbers) {
    const currDate = new Date();
    // Sunday - Saturday :: 0 - 6
    const weekdayNumber = currDate.getDay();
    // Day Date of the Month :: 1 - 31
    const dayOfTheMonth = currDate.getDate();
    // Month Number :: 1 - 12
    const monthOfTheYear = currDate.getMonth();
    // Four Digit Year :: YYYY
    const year = currDate.getFullYear();
    const dateVals = [
        weekdayNumber,
        dayOfTheMonth,
        monthOfTheYear,
        year,
    ];

    let employeeNum = '';

    for (let i = 0; i < dateVals.length; i++) {
        const dateValue = dateVals[i];

        if (dateValue < 10) {
            employeeNum = `${employeeNum}0${dateValue}`;
        } else {
            employeeNum = `${employeeNum}${dateValue}`;
        }
    }

    const nameAsNumberStr = makeNameIntoNumber(name);

    return `${nameAsNumberStr}${employeeNum}`;
}

/**
 * Alters a name string into a number representing the name.
 * @param {string} name
 * @returns {string} - number string  
 */
function makeNameIntoNumber(name) {
    if (name == null) {
        return '00';
    }
    const noSpaceName = name.replace(/\s/g, '');
    const nameCharCode = [];

    for (let i = 0; i < noSpaceName.length; i++) {
        nameCharCode.push(noSpaceName.charCodeAt(i));
    }

    return nameCharCode.join('');
}

export default employeeNumberGenerator;