/**
 * WageCalculator Module
 * Encapsulates standard Employee Wage Use Cases (UC1 to UC10)
 * Uses Arrow Functions, ES9 Rest/Spread, Dynamic objects, and switch constructs.
 */

export const ATTENDANCE = Object.freeze({
    IS_ABSENT: 0,
    IS_PART_TIME: 1,
    IS_FULL_TIME: 2
});

export const DEFAULT_CONFIG = Object.freeze({
    WAGE_PER_HOUR: 20,
    PART_TIME_HOURS: 4,
    FULL_TIME_HOURS: 8,
    NUM_OF_WORKING_DAYS: 20,
    MAX_HRS_IN_MONTH: 160
});

// UC 1: Check Employee Attendance (Random 0, 1, or 2)
export const checkAttendance = () => Math.floor(Math.random() * 3);

// UC 2 & 3: Get Working Hours based on Attendance Type
export const getWorkingHours = (attendanceType) => {
    switch (attendanceType) {
        case ATTENDANCE.IS_PART_TIME:
            return DEFAULT_CONFIG.PART_TIME_HOURS;
        case ATTENDANCE.IS_FULL_TIME:
            return DEFAULT_CONFIG.FULL_TIME_HOURS;
        default:
            return 0;
    }
};

// Calculate Daily Wage
export const calcDailyWage = (empHours, wagePerHour = DEFAULT_CONFIG.WAGE_PER_HOUR) => {
    return empHours * wagePerHour;
};

/**
 * Runs full monthly wage computation simulation (UC5 to UC9)
 * Stores daily wages, daily hours, day numbers into structured objects and arrays.
 */
export const runWageSimulation = (customConfig = {}) => {
    const config = { ...DEFAULT_CONFIG, ...customConfig };
    
    let totalEmpHours = 0;
    let totalWorkingDays = 0;
    
    const dailyWageArray = [];
    const dailyWageMap = new Map();
    const dailyHoursMap = new Map();
    const dailyRecords = []; // List of objects: { day, hours, wage, type }

    while (totalEmpHours < config.MAX_HRS_IN_MONTH && totalWorkingDays < config.NUM_OF_WORKING_DAYS) {
        totalWorkingDays++;
        const empCheck = checkAttendance();
        const empHours = getWorkingHours(empCheck);
        
        // Prevent exceeding MAX_HRS_IN_MONTH
        const actualHours = (totalEmpHours + empHours > config.MAX_HRS_IN_MONTH)
            ? (config.MAX_HRS_IN_MONTH - totalEmpHours)
            : empHours;
            
        totalEmpHours += actualHours;
        const dailyWage = calcDailyWage(actualHours, config.WAGE_PER_HOUR);

        // Store data in structures (UC6, UC8, UC9)
        dailyWageArray.push(dailyWage);
        dailyWageMap.set(totalWorkingDays, dailyWage);
        dailyHoursMap.set(totalWorkingDays, actualHours);

        let typeStr = 'Absent';
        if (actualHours === config.FULL_TIME_HOURS) typeStr = 'Full-Time';
        else if (actualHours > 0) typeStr = 'Part-Time';

        dailyRecords.push({
            day: totalWorkingDays,
            hoursWorked: actualHours,
            dailyWage: dailyWage,
            totalHoursToDate: totalEmpHours,
            type: typeStr
        });
    }

    const totalWage = dailyWageArray.reduce((acc, curr) => acc + curr, 0);

    return {
        config,
        totalWorkingDays,
        totalEmpHours,
        totalWage,
        dailyWageArray,
        dailyWageMap,
        dailyHoursMap,
        dailyRecords
    };
};
