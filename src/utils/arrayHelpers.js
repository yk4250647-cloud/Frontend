/**
 * Array Helper Utilities
 * Demonstrates explicitly specified JS Array constructs:
 * forEach, filter, map, reduce, find, some, every, arrow functions, and ES9 features.
 */

// UC 7a: Calculate Total Wage using Array forEach or reduce
export const calculateTotalWageReduce = (wagesArray) => {
    return wagesArray.reduce((total, dailyWage) => total + dailyWage, 0);
};

export const calculateTotalWageForEach = (wagesArray) => {
    let totalWage = 0;
    wagesArray.forEach(dailyWage => {
        totalWage += dailyWage;
    });
    return totalWage;
};

// UC 7b: Map Day to Daily Wage String using Array map
export const mapDayWithWage = (wagesArray) => {
    return wagesArray.map((dailyWage, index) => `Day ${index + 1}: $${dailyWage}`);
};

// UC 7c: Filter Full-Time Work Days using Array filter
export const filterFullTimeDays = (dailyRecords, fullTimeHours = 8) => {
    return dailyRecords.filter(record => record.hoursWorked === fullTimeHours);
};

// UC 7d: Find First Occurrence of Full Time Wage using Array find
export const findFirstFullTimeDay = (dailyRecords, fullTimeHours = 8) => {
    return dailyRecords.find(record => record.hoursWorked === fullTimeHours);
};

// UC 7e: Check if Every Element Holds Full Time Hours using Array every
export const isEveryDayFullTime = (dailyRecords, fullTimeHours = 8) => {
    return dailyRecords.every(record => record.hoursWorked === fullTimeHours);
};

// UC 7f: Check if There is Any Part Time Hours using Array some
export const isAnyDayPartTime = (dailyRecords, partTimeHours = 4) => {
    return dailyRecords.some(record => record.hoursWorked === partTimeHours);
};

// UC 7g: Calculate Total Days Worked using Array filter & reduce
export const countDaysWorked = (dailyRecords) => {
    return dailyRecords.filter(record => record.hoursWorked > 0).length;
};

/**
 * Executes array helper suite and returns formatted diagnostic report
 */
export const runArrayDiagnostics = (simulationResult) => {
    const { dailyWageArray, dailyRecords } = simulationResult;

    const totalWageReduce = calculateTotalWageReduce(dailyWageArray);
    const totalWageForEach = calculateTotalWageForEach(dailyWageArray);
    const dayWageMapStrings = mapDayWithWage(dailyWageArray);
    const fullTimeDays = filterFullTimeDays(dailyRecords);
    const firstFullTime = findFirstFullTimeDay(dailyRecords);
    const everyFullTime = isEveryDayFullTime(dailyRecords);
    const anyPartTime = isAnyDayPartTime(dailyRecords);
    const daysWorkedCount = countDaysWorked(dailyRecords);

    return {
        totalWageReduce,
        totalWageForEach,
        dayWageMapStrings,
        fullTimeDaysCount: fullTimeDays.length,
        fullTimeDays,
        firstFullTimeDay: firstFullTime ? `Day ${firstFullTime.day}` : 'None',
        everyFullTime,
        anyPartTime,
        daysWorkedCount
    };
};
