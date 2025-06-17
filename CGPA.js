// Theme Toggle Functionality
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check if user has a saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        
        // Save theme preference
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });
}

// Toggle CGPA option
function toggleCGPAOption() {
    const option = document.getElementById("cgpaOption").value;
    document.getElementById("autoFillSection").style.display = option === "auto" ? "block" : "none";
    document.getElementById("manualEntrySection").style.display = option === "manual" ? "block" : "none";
    
    // Generate default subject inputs
    if (option === "manual") {
        generateSubjectInputs();
    } else {
        document.getElementById("semesterSelect").selectedIndex = 0;
        document.getElementById("subjectInputsBody").innerHTML = '';
    }
}

// Define semester credits
const semesterCredits = {
    "1": [
        { subject: "Subject 1", credits: 2 },
        { subject: "Subject 2", credits: 2 },
        { subject: "Subject 3", credits: 2 },
        { subject: "Subject 4", credits: 4 },
        { subject: "Subject 5", credits: 1 },
        { subject: "Subject 6", credits: 4 },
        { subject: "Subject 7", credits: 4 },
        { subject: "Subject 8", credits: 3 }
    ],
    "2": [
        { subject: "Subject 1", credits: 4 },
        { subject: "Subject 2", credits: 2 },
        { subject: "Subject 3", credits: 3 },
        { subject: "Subject 4", credits: 4 },
        { subject: "Subject 5", credits: 4 },
        { subject: "Subject 6", credits: 3 },
        { subject: "Subject 7", credits: 3 },
        { subject: "Subject 8", credits: 3 }
    ],
    "3": [
        { subject: "Subject 1", credits: 4 },
        { subject: "Subject 2", credits: 4 },
        { subject: "Subject 3", credits: 4 },
        { subject: "Subject 4", credits: 3 },
        { subject: "Subject 5", credits: 1 },
        { subject: "Subject 6", credits: 2 },
        { subject: "Subject 7", credits: 4 },
        { subject: "Subject 8", credits: 3 }
    ],
    "4": [
        { subject: "Subject 1", credits: 4 },
        { subject: "Subject 2", credits: 3 },
        { subject: "Subject 3", credits: 1 },
        { subject: "Subject 4", credits: 3 },
        { subject: "Subject 5", credits: 3 },
        { subject: "Subject 6", credits: 3 },
        { subject: "Subject 7", credits: 4 },
        { subject: "Subject 8", credits: 3 }
    ]
};

// Load semester credits
function loadSemesterCredits() {
    const semester = document.getElementById("semesterSelect").value;
    if (semester) {
        const tbody = document.getElementById("subjectInputsBody");
        tbody.innerHTML = '';
        
        semesterCredits[semester].forEach((subject, index) => {
            const row = document.createElement("tr");
            row.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700";
            row.innerHTML = `
                <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${subject.subject}</td>
                <td class="p-3 border border-gray-200 dark:border-gray-600">
                    <input type="number" id="credit_${index}" value="${subject.credits}" readonly 
                    class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                </td>
                <td class="p-3 border border-gray-200 dark:border-gray-600">
                    <select id="grade_${index}" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        <option value="">Select Grade</option>
                        <option value="10">O</option>
                        <option value="9">A+</option>
                        <option value="8">A</option>
                        <option value="7">B+</option>
                        <option value="6">B</option>
                        <option value="5">C</option>
                        <option value="4">D</option>
                        <option value="0">E</option>
                    </select>
                </td>
            `;
            tbody.appendChild(row);
        });
    }
}

// Generate subject inputs for manual entry
function generateSubjectInputs() {
    const count = parseInt(document.getElementById("subjectCount").value) || 5;
    const tbody = document.getElementById("subjectInputsBody");
    tbody.innerHTML = '';
    
    for (let i = 0; i < count; i++) {
        const row = document.createElement("tr");
        row.className = i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700";
        row.innerHTML = `
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">Subject ${i + 1}</td>
            <td class="p-3 border border-gray-200 dark:border-gray-600">
                <input type="number" id="credit_${i}" min="1" max="10" value="4"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            </td>
            <td class="p-3 border border-gray-200 dark:border-gray-600">
                <select id="grade_${i}" class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                    <option value="">Select Grade</option>
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C</option>
                    <option value="4">D</option>
                    <option value="0">E</option>
                </select>
            </td>
        `;
        tbody.appendChild(row);
    }
}

// Calculate CGPA
function calculateCGPA() {
    const option = document.getElementById("cgpaOption").value;
    let count;
    
    if (option === "auto") {
        const semester = document.getElementById("semesterSelect").value;
        if (!semester) {
            alert("Please select a semester");
            return;
        }
        count = semesterCredits[semester].length;
    } else {
        count = parseInt(document.getElementById("subjectCount").value) || 0;
    }
    
    // Validate if subjects are available
    if (count <= 0) {
        alert("Please add at least one subject");
        return;
    }
    
    let totalCredits = 0;
    let totalWeightedGP = 0;
    const detailsRows = [];
    
    for (let i = 0; i < count; i++) {
        const credits = parseFloat(document.getElementById(`credit_${i}`).value) || 0;
        const gradeValue = document.getElementById(`grade_${i}`).value;
        
        if (!gradeValue) {
            alert(`Please select a grade for Subject ${i + 1}`);
            return;
        }
        
        const gradePoint = parseFloat(gradeValue);
        const weightedGP = (gradePoint * credits);
        
        totalCredits += credits;
        totalWeightedGP += weightedGP;
        
        // Add details to rows
        detailsRows.push({
            subject: `Subject ${i + 1}`,
            credits: credits,
            grade: getGradeLabel(gradePoint),
            gradePoint: gradePoint,
            weightedGP: weightedGP.toFixed(2)
        });
    }
    
    // Calculate CGPA
    const cgpa = totalWeightedGP / totalCredits;
    
    // Display CGPA
    document.getElementById("resultCGPA").textContent = cgpa.toFixed(2);
    document.getElementById("totalCredits").textContent = totalCredits;
    document.getElementById("totalWeightedGP").textContent = totalWeightedGP.toFixed(2);
    
    // Generate CGPA details table
    const tbody = document.getElementById("cgpaDetailsBody");
    tbody.innerHTML = '';
    
    detailsRows.forEach((row, index) => {
        const tr = document.createElement("tr");
        tr.className = index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700";
        tr.innerHTML = `
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${row.subject}</td>
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${row.credits}</td>
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${row.grade}</td>
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${row.gradePoint}</td>
            <td class="p-3 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">${row.weightedGP}</td>
        `;
        tbody.appendChild(tr);
    });
    
    // Show result section
    document.getElementById("cgpaResult").classList.remove("hidden");
}

// Get grade label from grade point
function getGradeLabel(gradePoint) {
    switch (gradePoint) {
        case 10: return "O";
        case 9: return "A+";
        case 8: return "A";
        case 7: return "B+";
        case 6: return "B";
        case 5: return "C";
        case 4: return "D";
        case 0: return "E";
        default: return "";
    }
}

// Reset CGPA calculator
function resetCGPACalculator() {
    const option = document.getElementById("cgpaOption").value;
    
    if (option === "auto") {
        document.getElementById("semesterSelect").selectedIndex = 0;
        document.getElementById("subjectInputsBody").innerHTML = '';
    } else {
        generateSubjectInputs();
    }
    
    document.getElementById("cgpaResult").classList.add("hidden");
}

// Initialize the page
window.onload = function() {
    // Initialize theme
    initializeTheme();
    
    // Default to "Auto Fill" option
    document.getElementById("cgpaOption").value = "auto";
    
    // Hide manual entry section
    document.getElementById("manualEntrySection").classList.add("hidden");
    document.getElementById("autoFillSection").classList.remove("hidden");
};