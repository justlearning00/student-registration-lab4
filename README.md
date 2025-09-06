# Student Registration System - Lab 4

**Student Name:** Alicia Sasamba 

**Student Number:** 224081772

**Course:** WAD621S  

**Assignment:** Lab 4 - Registration → Profile Cards  

## Project Description
This is a complete student registration system built with HTML, CSS, and JavaScript. It allows users to register students through a form, displays their information as profile cards, and maintains a summary table.

##  Features Implemented

### Core Requirements (30 marks):
- **Form completeness + accessibility (6 marks):** Complete registration form with proper labels, input types, and accessibility features
- **Validation & error handling (6 marks):** Real-time validation with inline error messages and ARIA-live feedback
- **Profile card creation (8 marks):** Dynamic profile cards with remove functionality
- **Summary table integration (6 marks):** Synchronized table that updates with form submissions and removals
- **Code quality (4 marks):** Clean, semantic HTML, organized CSS, and well-commented JavaScript

### Stretch Goals Implemented:
- **LocalStorage Persistence:** All student data is automatically saved to browser storage and restored when the page reloads
- **Search and edit**

## How to Run
1. Extract all files from the ZIP
2. Double-click on `index.html`
3. The application will open in your default browser
4. No additional setup required!

## File Structure
- `index.html` - Main HTML structure and form
- `style.css` - All styling and responsive design
- `script.js` - JavaScript functionality and validation
- `README.md` - This documentation file

## How to Use
1. Fill out the registration form with student details
2. Profile URL is option if left empty a default URL is used
3. Click "Add Student" to create a profile card and table entry
4. Use "Remove Student" buttons to delete entries
5. Data automatically saves and will be restored when you reload the page
6. Search for student by name , email or programme
7. Edit students by clicking the "Edit" button and then the "Update Student" button, data will automatically be updated in profile cards and table 

## Technical Features
- Responsive design that works on all devices
- Full keyboard navigation support
- Screen reader compatibility with ARIA attributes
- Real-time form validation
- Data persistence with LocalStorage
- Modern UI with smooth animations

## Notes
- The application uses modern JavaScript  features
- All form validation happens on both client-side for UX and prevents invalid submissions
- Profile photos use fallback placeholder images if URLs are invalid
- The design follows modern web accessibility standards
