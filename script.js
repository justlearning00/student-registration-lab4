// Global array to store student data
let students = [];
let studentIdCounter = 0;

// Field Validation 
function validateRequired(value, fieldName) {
    const errorElement = document.getElementById(`err-${fieldName}`);
    if (!value.trim()) {
        errorElement.textContent = "This field is required.";
        return false;
    }
    errorElement.textContent = "";
    return true;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById("err-email");

    if (!value.trim()) {
        errorElement.textContent = "Email is required.";
        return false;
    }
    if (!emailRegex.test(value)) {
        errorElement.textContent = "Please enter a valid email address.";
        return false;
    }
    errorElement.textContent = "";
    return true;
}

function validateUrl(value) {
    if (!value.trim()) return true; // optional field

    try {
        new URL(value);
        return true;
    } catch {
        alert("Please enter a valid URL."); // or ignore completely
        return false;
    }
}


function validateYear() {
    const yearInputs = document.querySelectorAll('input[name="year"]');
    const errorElement = document.getElementById("err-year");
    const isSelected = Array.from(yearInputs).some(input => input.checked);

    if (!isSelected) {
        errorElement.textContent = "Please select a year of study.";
        return false;
    }
    errorElement.textContent = "";
    return true;
}

//Card + Summary Table 
function createProfileCard(data) {
    const card = document.createElement("div");
    card.className = "card-person";
    card.dataset.studentId = data.id;

    
    // Create initials placeholder URL
    const initials = data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase();
 const placeholderUrl = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    card.innerHTML = `
        <img src="${data.photoUrl || placeholderUrl}" 
             alt="Profile photo of ${data.firstName} ${data.lastName}" 
             onerror="this.onerror=null; this.src='${placeholderUrl}'">
        <div class="info">
            <h3>${data.firstName} ${data.lastName}</h3>
            <div>
                <span class="badge">${data.programme}</span>
                <span class="badge">Year ${data.year}</span>
            </div>
            <p><strong>Email:</strong> ${data.email}</p>
            ${data.interests ? `<div class="interests"><strong>Interests:</strong> ${data.interests}</div>` : ''}
        </div>
        <button class="remove-btn" onclick="removeStudent(${data.id})">Remove Student</button>
    `;
    return card;
}

function createTableRow(data) {
    const row = document.createElement("tr");
    row.dataset.studentId = data.id;

    row.innerHTML = `
        <td>${data.firstName} ${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.programme}</td>
        <td>Year ${data.year}</td>
        <td>${data.interests || 'Not specified'}</td>
    `;

    return row;
}

//Add/Remove 
function addStudent(data) {
    data.id = ++studentIdCounter;
    students.push(data);

    // Add card + row
    const card = createProfileCard(data);
    document.getElementById("cards").prepend(card);

    const row = createTableRow(data);
    document.querySelector("#summary tbody").prepend(row);

    saveToStorage();
    toggleEmptyState();

    // Feedback
    document.getElementById("live").textContent =
        `Student ${data.firstName} ${data.lastName} has been added successfully.`;
}

function removeStudent(studentId) {
    students = students.filter(student => student.id !== studentId);

    // Remove card
    const card = document.querySelector(`[data-student-id="${studentId}"].card-person`);
    if (card) card.remove();

    // Remove table row
    const row = document.querySelector(`[data-student-id="${studentId}"]`);
    if (row && row.tagName === "TR") row.remove();

    // Save + toggle empty state
    saveToStorage();
    toggleEmptyState();

    // Feedback
    document.getElementById("live").textContent =
        "Student has been removed successfully.";
}

// Empty State 
function toggleEmptyState() {
    const emptyState = document.querySelector(".empty-state");
    emptyState.style.display = students.length === 0 ? "block" : "none";
}

// Storage
function saveToStorage() {
    localStorage.setItem("students", JSON.stringify(students));
    localStorage.setItem("studentIdCounter", studentIdCounter);
}

function loadFromStorage() {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    const counter = parseInt(localStorage.getItem("studentIdCounter")) || 0;

    students = stored;
    studentIdCounter = counter;

    students.forEach(s => {
        const card = createProfileCard(s);
        document.getElementById("cards").appendChild(card);

        const row = createTableRow(s);
        document.querySelector("#summary tbody").appendChild(row);
    });

    toggleEmptyState();
}

// Form Handler
document.getElementById("regForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        programme: formData.get("programme"),
        year: formData.get("year"),
        photoUrl: formData.get("photoUrl"),
        interests: formData.get("interests")
    };

    let isValid = true;
    isValid = validateRequired(data.firstName, "firstName") && isValid;
    isValid = validateRequired(data.lastName, "lastName") && isValid;
    isValid = validateEmail(data.email) && isValid;
    isValid = validateRequired(data.programme, "programme") && isValid;
    isValid = validateYear() && isValid;
    isValid = validateUrl(data.photoUrl) && isValid;

    if (isValid) {
        addStudent(data);
        this.reset();
        document.getElementById("live").textContent = "";
    } else {
        document.getElementById("live").textContent =
            "Please fix the errors before submitting.";
    }
});

//Real time Validation
document.getElementById("firstName").addEventListener("blur", function () {
    validateRequired(this.value, "firstName");
});

document.getElementById("lastName").addEventListener("blur", function () {
    validateRequired(this.value, "lastName");
});

document.getElementById("email").addEventListener("blur", function () {
    validateEmail(this.value);
});

document.getElementById("programme").addEventListener("blur", function () {
    validateRequired(this.value, "programme");
});

document.getElementById("photoUrl").addEventListener("blur", function () {
    validateUrl(this.value);
});

document.querySelectorAll('input[name="year"]').forEach(radio => {
    radio.addEventListener("change", validateYear);
});

// Keyboard Navigation
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.type === "radio") {
        e.target.checked = true;
        validateYear();
    }
});

//On Load 
document.addEventListener("DOMContentLoaded", function () {
    loadFromStorage();
});