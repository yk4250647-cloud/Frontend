/**
 * Main Terminal Execution Entrypoint for Node.js
 * Run with: `node src/index.js` or `npm start`
 */

import { EmployeePayroll } from './models/EmployeePayroll.js';
import { runWageSimulation } from './models/WageCalculator.js';
import { runArrayDiagnostics } from './utils/arrayHelpers.js';

console.log('====================================================');
console.log('       EMPLOYEE WAGE COMPUTATION SYSTEM (CLI)       ');
console.log('====================================================\n');

// 1. Employee Payroll Validation Demo (UC10)
console.log('--- 1. Employee Payroll Model & RegEx Validation ---');
try {
    const emp1 = new EmployeePayroll(101, 'Terence', 4500, 'M', '2025-01-15');
    console.log('✓ Created Valid Employee:', emp1.toString());
} catch (error) {
    console.error('❌ Validation Error:', error.message);
}

try {
    console.log('Testing invalid name validation ("john"):');
    const empInvalid = new EmployeePayroll(102, 'john', 3000, 'M', '2025-01-01');
} catch (error) {
    console.log('✓ Caught Expected Regex Error:', error.message);
}

console.log('\n--- 2. Employee Wage Computation Simulation (UC1 - UC6) ---');
const simulationResult = runWageSimulation();

console.log(`Total Days Worked: ${simulationResult.totalWorkingDays}`);
console.log(`Total Hours Accumulated: ${simulationResult.totalEmpHours} hrs`);
console.log(`Total Computed Monthly Wage: $${simulationResult.totalWage}\n`);

console.log('Daily Breakdowns (First 5 Days Sample):');
simulationResult.dailyRecords.slice(0, 5).forEach(record => {
    console.log(`  Day ${record.day}: ${record.hoursWorked} hrs (${record.type}) -> Wage: $${record.dailyWage}`);
});

console.log('\n--- 3. Array Operations & Helper Functions (UC7 - UC9) ---');
const diagnostics = runArrayDiagnostics(simulationResult);

console.log(`Total Wage (via Array reduce) : $${diagnostics.totalWageReduce}`);
console.log(`Total Wage (via Array forEach): $${diagnostics.totalWageForEach}`);
console.log(`Full-Time Days Count           : ${diagnostics.fullTimeDaysCount} days`);
console.log(`First Full-Time Day            : ${diagnostics.firstFullTimeDay}`);
console.log(`Is Every Day Full-Time?        : ${diagnostics.everyFullTime}`);
console.log(`Is Any Day Part-Time?          : ${diagnostics.anyPartTime}`);
console.log(`Actual Days Worked (Hours > 0) : ${diagnostics.daysWorkedCount} days`);

console.log('\n====================================================');
console.log(' ✓ CLI Simulation Completed Successfully!');
console.log('   To view the Interactive Web Dashboard, open index.html');
console.log('====================================================\n');
