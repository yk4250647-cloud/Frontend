/**
 * Web Application Controller
 * Handles UI interactions, DOM updates, basic theme toggling, and integrates models/helpers.
 */

import { EmployeePayroll } from './models/EmployeePayroll.js';
import { runWageSimulation } from './models/WageCalculator.js';
import { runArrayDiagnostics } from './utils/arrayHelpers.js';

// State
let currentSimulation = null;
let registeredEmployees = [];
let activeFilter = 'all';

// DOM Elements
const kpiTotalWage = document.getElementById('kpiTotalWage');
const kpiTotalHours = document.getElementById('kpiTotalHours');
const kpiTotalDays = document.getElementById('kpiTotalDays');
const kpiFullTimeDays = document.getElementById('kpiFullTimeDays');
const recordsTableBody = document.getElementById('recordsTableBody');
const btnRunSimulation = document.getElementById('btnRunSimulation');
const employeeForm = document.getElementById('employeeForm');
const formAlert = document.getElementById('formAlert');
const themeToggleBtn = document.getElementById('themeToggleBtn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to soft black dark
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        setTheme(currentTheme);
    });

    // Set default date picker to today
    document.getElementById('empStartDate').valueAsDate = new Date();
    
    // Add initial demo employee
    try {
        const demoEmp = new EmployeePayroll(101, 'Alex Smith', 5000, 'M', '2025-01-15');
        registeredEmployees.push(demoEmp);
    } catch (e) {
        console.error('Demo emp error:', e);
    }

    // Run initial simulation
    executeSimulation();

    // Event Listeners
    btnRunSimulation.addEventListener('click', executeSimulation);
    employeeForm.addEventListener('submit', handleAddEmployee);

    // Filter Buttons Event Listeners
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.dataset.filter;
            renderTable();
        });
    });
});

function setTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        document.documentElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
    localStorage.setItem('theme', theme);
}

// Run Wage Simulation based on form config
function executeSimulation() {
    const wagePerHour = Number(document.getElementById('wagePerHour').value) || 20;
    const maxDays = Number(document.getElementById('maxDays').value) || 20;
    const maxHours = Number(document.getElementById('maxHours').value) || 160;

    currentSimulation = runWageSimulation({
        WAGE_PER_HOUR: wagePerHour,
        NUM_OF_WORKING_DAYS: maxDays,
        MAX_HRS_IN_MONTH: maxHours
    });

    updateKPIs();
    renderTable();
}

// Update KPI Header Cards
function updateKPIs() {
    if (!currentSimulation) return;
    
    const diagnostics = runArrayDiagnostics(currentSimulation);

    kpiTotalWage.textContent = `$${currentSimulation.totalWage.toLocaleString()}`;
    kpiTotalHours.textContent = `${currentSimulation.totalEmpHours} hrs`;
    kpiTotalDays.textContent = `${currentSimulation.totalWorkingDays} / ${currentSimulation.config.NUM_OF_WORKING_DAYS}`;
    kpiFullTimeDays.textContent = `${diagnostics.fullTimeDaysCount} days`;
}

// Render Daily Records Table with Filter applied
function renderTable() {
    if (!currentSimulation) return;

    let records = [...currentSimulation.dailyRecords];

    if (activeFilter === 'fulltime') {
        records = records.filter(r => r.hoursWorked === currentSimulation.config.FULL_TIME_HOURS);
    } else if (activeFilter === 'parttime') {
        records = records.filter(r => r.hoursWorked > 0 && r.hoursWorked < currentSimulation.config.FULL_TIME_HOURS);
    } else if (activeFilter === 'worked') {
        records = records.filter(r => r.hoursWorked > 0);
    }

    recordsTableBody.innerHTML = '';

    if (records.length === 0) {
        recordsTableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-secondary); padding: 16px;">No records match the selected filter.</td></tr>`;
        return;
    }

    records.forEach(record => {
        const row = document.createElement('tr');
        let badgeClass = 'badge-absent';
        if (record.type === 'Full-Time') badgeClass = 'badge-full';
        else if (record.type === 'Part-Time') badgeClass = 'badge-part';

        row.innerHTML = `
            <td>Day ${record.day}</td>
            <td>${record.hoursWorked} hrs</td>
            <td><span class="badge ${badgeClass}">${record.type}</span></td>
            <td>$${record.dailyWage}</td>
            <td>${record.totalHoursToDate} hrs</td>
        `;
        recordsTableBody.appendChild(row);
    });
}

// Handle Add Employee Form Submit with Regex Validation Error Handling
function handleAddEmployee(e) {
    e.preventDefault();

    const id = document.getElementById('empId').value.trim();
    const name = document.getElementById('empName').value.trim();
    const salary = document.getElementById('empSalary').value.trim();
    const gender = document.getElementById('empGender').value;
    const startDate = document.getElementById('empStartDate').value;

    try {
        const newEmp = new EmployeePayroll(id, name, salary, gender, startDate);
        registeredEmployees.push(newEmp);
        
        showAlert(`✓ Employee "${newEmp.name}" successfully added!`, 'success');
        employeeForm.reset();
        document.getElementById('empStartDate').valueAsDate = new Date();
    } catch (error) {
        showAlert(`❌ Validation Failed: ${error.message}`, 'error');
    }
}

function showAlert(message, type) {
    formAlert.style.display = 'block';
    formAlert.className = `alert alert-${type}`;
    formAlert.textContent = message;
    
    setTimeout(() => {
        formAlert.style.display = 'none';
    }, 5000);
}
