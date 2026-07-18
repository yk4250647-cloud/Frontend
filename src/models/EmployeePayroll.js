/**
 * EmployeePayroll Class representing employee payroll data with validation.
 * Demonstrates ES6/ES9 Classes, Getters/Setters, Rest/Spread, and RegEx Validations.
 */
export class EmployeePayroll {
    // Private fields (ES2019/ES9 class features)
    #id;
    #name;
    #salary;
    #gender;
    #startDate;

    constructor(...args) {
        if (args.length === 5) {
            this.id = args[0];
            this.name = args[1];
            this.salary = args[2];
            this.gender = args[3];
            this.startDate = args[4];
        } else if (args.length === 1 && typeof args[0] === 'object') {
            const { id, name, salary, gender, startDate } = args[0];
            this.id = id;
            this.name = name;
            this.salary = salary;
            this.gender = gender;
            this.startDate = startDate;
        }
    }

    // Getters and Setters with Regex Validation
    get id() { return this.#id; }
    set id(id) {
        const idRegex = RegExp('^[1-9][0-9]*$');
        if (idRegex.test(id)) {
            this.#id = id;
        } else {
            throw new Error('Invalid ID! Must be a positive non-zero integer.');
        }
    }

    get name() { return this.#name; }
    set name(name) {
        // Name starts with capital letter, min 3 characters
        const nameRegex = RegExp('^[A-Z][a-zA-Z\\s]{2,}$');
        if (nameRegex.test(name)) {
            this.#name = name;
        } else {
            throw new Error('Invalid Name! Must start with a Capital letter and have at least 3 characters.');
        }
    }

    get salary() { return this.#salary; }
    set salary(salary) {
        const salaryNum = Number(salary);
        if (!isNaN(salaryNum) && salaryNum > 0) {
            this.#salary = salaryNum;
        } else {
            throw new Error('Invalid Salary! Must be a positive number.');
        }
    }

    get gender() { return this.#gender; }
    set gender(gender) {
        const genderRegex = RegExp('^[MFmf]$');
        if (genderRegex.test(gender)) {
            this.#gender = gender.toUpperCase();
        } else {
            throw new Error('Invalid Gender! Must be M or F.');
        }
    }

    get startDate() { return this.#startDate; }
    set startDate(startDate) {
        const dateObj = new Date(startDate);
        const today = new Date();
        if (!isNaN(dateObj.getTime()) && dateObj <= today) {
            this.#startDate = dateObj;
        } else {
            throw new Error('Invalid Start Date! Must be a valid date and not in the future.');
        }
    }

    // Formatted String Representation using Template Literals & Rest/Spread
    toString() {
        const formattedDate = this.#startDate 
            ? this.#startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            : 'N/A';
        return `ID: ${this.#id} | Name: ${this.#name} | Salary: $${this.#salary} | Gender: ${this.#gender} | Start Date: ${formattedDate}`;
    }

    // Return as plain JSON object for UI / API consumption
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            salary: this.#salary,
            gender: this.#gender,
            startDate: this.#startDate ? this.#startDate.toISOString().split('T')[0] : null
        };
    }
}
