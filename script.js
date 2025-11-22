// Tab Navigation
function showTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove active class from all buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show selected tab content
    document.getElementById(tabId).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Home Loan EMI Calculator
function calculateHomeLoanEMI() {
    const loanAmount = parseFloat(document.getElementById('home-loan-amount').value);
    const annualRate = parseFloat(document.getElementById('home-interest-rate').value);
    const tenureYears = parseFloat(document.getElementById('home-loan-tenure').value);

    if (!loanAmount || !annualRate || !tenureYears) {
        alert('Please fill in all fields');
        return;
    }

    // Convert annual rate to monthly rate and years to months
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = tenureYears * 12;

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loanAmount;

    // Display results
    document.getElementById('home-emi').textContent = formatCurrency(emi);
    document.getElementById('home-total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('home-total-amount').textContent = formatCurrency(totalAmount);
    document.getElementById('home-loan-result').classList.remove('hidden');
}

// Personal Loan Calculator
function calculatePersonalLoanEMI() {
    const loanAmount = parseFloat(document.getElementById('personal-loan-amount').value);
    const annualRate = parseFloat(document.getElementById('personal-interest-rate').value);
    const tenureMonths = parseFloat(document.getElementById('personal-loan-tenure').value);

    if (!loanAmount || !annualRate || !tenureMonths) {
        alert('Please fill in all fields');
        return;
    }

    // Convert annual rate to monthly rate
    const monthlyRate = annualRate / 12 / 100;

    // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths) / 
                (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loanAmount;

    // Display results
    document.getElementById('personal-emi').textContent = formatCurrency(emi);
    document.getElementById('personal-total-interest').textContent = formatCurrency(totalInterest);
    document.getElementById('personal-total-amount').textContent = formatCurrency(totalAmount);
    document.getElementById('personal-loan-result').classList.remove('hidden');
}

// Worksheet Generator
function generateWorksheet() {
    const type = document.getElementById('worksheet-type').value;
    const difficulty = document.getElementById('difficulty-level').value;
    const numProblems = parseInt(document.getElementById('num-problems').value);

    let maxNumber;
    switch (difficulty) {
        case 'easy':
            maxNumber = 10;
            break;
        case 'medium':
            maxNumber = 50;
            break;
        case 'hard':
            maxNumber = 100;
            break;
    }

    const problems = [];
    for (let i = 0; i < numProblems; i++) {
        const num1 = Math.floor(Math.random() * maxNumber) + 1;
        const num2 = Math.floor(Math.random() * maxNumber) + 1;
        
        let problem, answer;
        switch (type) {
            case 'addition':
                problem = `${num1} + ${num2} = ___`;
                answer = num1 + num2;
                break;
            case 'subtraction':
                // Ensure result is positive
                const larger = Math.max(num1, num2);
                const smaller = Math.min(num1, num2);
                problem = `${larger} - ${smaller} = ___`;
                answer = larger - smaller;
                break;
            case 'multiplication':
                // Use smaller numbers for multiplication
                const m1 = Math.floor(Math.random() * (maxNumber / 5)) + 1;
                const m2 = Math.floor(Math.random() * (maxNumber / 5)) + 1;
                problem = `${m1} × ${m2} = ___`;
                answer = m1 * m2;
                break;
            case 'division':
                // Create problems that divide evenly
                const divisor = Math.floor(Math.random() * (maxNumber / 5)) + 1;
                const quotient = Math.floor(Math.random() * (maxNumber / 5)) + 1;
                const dividend = divisor * quotient;
                problem = `${dividend} ÷ ${divisor} = ___`;
                answer = quotient;
                break;
        }
        
        problems.push({ problem, answer });
    }

    displayWorksheet(problems);
}

function displayWorksheet(problems) {
    const container = document.getElementById('worksheet-problems');
    container.innerHTML = '';

    problems.forEach((item, index) => {
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem';
        problemDiv.innerHTML = `
            <div class="problem-number">Problem ${index + 1}</div>
            <div class="problem-text">${item.problem}</div>
            <div class="problem-answer" data-answer="${item.answer}">Answer: ${item.answer}</div>
        `;
        container.appendChild(problemDiv);
    });

    document.getElementById('worksheet-output').classList.remove('hidden');
    
    // Reset show answers button
    const showAnswersBtn = document.querySelector('.show-answers-btn');
    showAnswersBtn.textContent = 'Show Answers';
    showAnswersBtn.onclick = toggleAnswers;
}

function toggleAnswers() {
    const answers = document.querySelectorAll('.problem-answer');
    const button = document.querySelector('.show-answers-btn');
    
    const isVisible = answers[0].classList.contains('visible');
    
    answers.forEach(answer => {
        if (isVisible) {
            answer.classList.remove('visible');
        } else {
            answer.classList.add('visible');
        }
    });
    
    button.textContent = isVisible ? 'Show Answers' : 'Hide Answers';
}

// Helper function to format currency
function formatCurrency(amount) {
    return '₹' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('TechTinker loaded successfully');
});
