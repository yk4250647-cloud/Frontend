# Employee Wage Computation System ⚡

A comprehensive JavaScript application built to practice **JS Programming Constructs**, **ES9+ Features**, **Array Helper Methods** (`forEach`, `filter`, `map`, `reduce`, `find`, `every`, `some`), **RegEx Validations**, and **Git Version Control Workflows**.

---

## 📁 Project Folder Structure

```
c:/Coding/Frontend/
├── index.html                 # Interactive Glassmorphic Web Dashboard
├── package.json               # Project manifest & npm scripts
├── .gitignore                 # Files ignored by Git tracking
├── README.md                  # Project documentation & run guide
├── css/
│   └── style.css              # Custom CSS styling (Tokens, dark theme, animations)
└── src/
    ├── models/
    │   ├── EmployeePayroll.js # ES6/ES9 Class for Employee Payroll with RegEx validation
    │   └── WageCalculator.js  # Core wage logic, simulation engine & switch constructs (UC1-UC10)
    ├── utils/
    │   └── arrayHelpers.js    # Specialized array operations (map, filter, reduce, forEach, find)
    ├── index.js               # Node.js CLI script for terminal testing
    └── app.js                 # Web dashboard interaction controller
```

---

## 🚀 How to Run and Test

### 1. Terminal / CLI Execution (Node.js)
To run and test the core logic directly in your terminal:

```bash
# Using Node directly
node src/index.js

# OR using npm scripts
npm start
# or
npm test
```

### 2. Interactive Web Dashboard
You can run and test the visual dashboard in two ways:
- **Directly**: Double-click `index.html` to open it in any web browser.
- **Local Server**: Right-click `index.html` in VS Code and select **Open with Live Server**, or use `npx serve .`

---

## 🛠️ Key Topics & Concepts Demonstrated

1. **JS Programming Constructs & ES9+**:
   - Class encapsulation, private fields (`#id`, `#name`, `#salary`, `#gender`, `#startDate`).
   - Rest/Spread operators (`...args`, `{ ...customConfig }`).
   - Object Destructuring and Template Literals.
2. **RegEx Validation**:
   - Name validation (`^[A-Z][a-zA-Z\\s]{2,}$`) - Capital start, min 3 chars.
   - Gender validation (`^[MFmf]$`).
   - ID validation (`^[1-9][0-9]*$`).
3. **Array Functions**:
   - `Array.reduce()`: Sum total wages.
   - `Array.forEach()`: Iterate daily wages.
   - `Array.map()`: Map days to wage strings.
   - `Array.filter()`: Filter full-time / part-time days.
   - `Array.find()`, `Array.every()`, `Array.some()`.

---

## 🐙 How to Push this Project to GitHub

Follow these steps when you are ready to push to your Git account:

### Step 1: Initialize Git Repository
In your terminal inside `c:\Coding\Frontend`:
```bash
git init
```

### Step 2: Stage and Commit Files
```bash
git add .
git commit -m "feat: Initial commit for Employee Wage Computation System"
```

### Step 3: Link to Remote Repository & Push
Create a new empty repository on [GitHub](https://github.com/new) (e.g. named `employee-wage-computation`), then run:
```bash
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git branch -M main
git push -u origin main
```

---

## 🧪 Git Practice Workflow (Branching & Merging)

To practice Git branching and PR workflow:
```bash
# Create feature branch
git checkout -b feature/array-helpers

# Make edits and commit
git add .
git commit -m "refactor: optimize array reduce implementation"

# Switch back to main and merge
git checkout main
git merge feature/array-helpers

# Push updated main branch
git push origin main
```
