// GUC_Internship_System/data.js

console.log("data.js loaded");



const dummyUsers = [

{ email: "student@student.guc.edu.eg", password: "password", role: "student", name: "Normal Student", id: "S101" },

{ email: "companyrep@company.com", password: "password", role: "company", name: "Example Company Inc.", id: "C1" },

{ email: "hr@techsolutions.com", password: "password", role: "company", name: "Tech Solutions Inc.", id: "C2" },

{ email: "admin@scad.guc.edu.eg", password: "password", role: "scad_office", name: "SCAD Administrator", id: "SCAD01" },

{ email: "pro@prostudent.guc.edu.eg", password: "password", role: "pro_student", name: "PRO Student User", id: "PS201"},

{ email: "lecturer@faculty.guc.edu.eg", password: "password", role: "faculty", name: "Dr. Faculty Member", id: "F301"}

];



const dummyCompanies = [
{
id: "C1", // Linked to companyrep@company.com
name: "Example Company Inc.",
industry: "", // To be filled during registration
size: "", // To be filled during registration
email: "companyrep@company.com",
logo: "",
documents: [],
status: "pending_profile_completion",
profileDescription: "",
profileNeedsCompletion: true // <<< IMPORTANT FLAG
},
{
id: "C2",
name: "Tech Solutions Inc.",
industry: "Technology",
size: "large",
email: "hr@techsolutions.com",
logo: "https://via.placeholder.com/100?text=TechSol",
documents: [{ name: "registration.pdf", url: "#" }],
status: "approved",
profileDescription: "Solving tech problems.",
profileNeedsCompletion: false
},

{ id: "C1", name: "Example Company Inc.", industry: "Tech", /* ... */ },

{ id: "C2", name: "Tech Solutions Inc.", industry: "Technology", /* ... */ },

{ id: "C3", name: "Microsoft", industry: "Technology", /* ... */ },

{ id: "C4", name: "Amazon", industry: "E-commerce", /* ... */ },

{ id: "C5", name: "Vodafone", industry: "Telecommunications", /* ... */ },

{ id: "C6", name: "PMG", industry: "Digital Agency", /* ... */ },

{ id: "C7", name: "SDG", industry: "Consulting", /* ... */ }

];


const dummyInternships = [ // Ensure these have startDate and endDate

{

id: "INT1001", companyId: "C1", companyName: "Example Company Inc.", jobTitle: "Frontend Developer Intern",

duration: "3 months", paid: true, salary: "3000 EGP",

skillsRequired: ["HTML", "CSS", "JavaScript", "React"],

description: "Work on exciting web projects...", industry: "Technology", applications: [],

startDate: "2024-01-15", endDate: "2024-04-14" // Past

},

{

id: "INTNEW001", companyId: "C7", companyName: "SDG", jobTitle: "Data Analyst",

duration: "3 months", paid: true, salary: "Competitive Stipend",

skillsRequired: ["SQL", "Python", "Excel"],

description: "Analyze complex datasets...", industry: "Consulting", applications: [],

startDate: "2025-06-01", endDate: "2025-08-31" // Future (assuming today is May 12, 2025)

},

{

id: "INTNEW002", companyId: "C3", companyName: "Microsoft", jobTitle: "Programmer",

duration: "2 months", paid: true, salary: "Generous Stipend",

skillsRequired: ["C#", ".NET", "Azure"],

description: "Join a dynamic team...", industry: "Technology", applications: [],

startDate: "2025-07-01", endDate: "2025-08-31" // Future

},

{

id: "INTNEW003", companyId: "C5", companyName: "Vodafone", jobTitle: "Marketeer",

duration: "2 months", paid: true, salary: "Monthly Stipend",

skillsRequired: ["Marketing Strategy", "Social Media"],

description: "Support the marketing team...", industry: "Telecommunications", applications: [],

startDate: "2025-05-01", endDate: "2025-06-30" // Current (as of May 12, 2025)

},

{

id: "INTNEW004", companyId: "C6", companyName: "PMG", jobTitle: "Software Engineer",

duration: "2 weeks", paid: true, salary: "Project Stipend",

skillsRequired: ["JavaScript", "React", "Node.js"],

description: "A short, intensive project...", industry: "Digital Agency", applications: [],

startDate: "2024-03-01", endDate: "2024-03-14" // Past

}

];



const dummyStudents = [

{ id: "S101", name: "Normal Student", major: "Engineering", semester: 7, email: "student@student.guc.edu.eg", jobInterests: ["Web Development", "AI"]},

{ id: "PS201", name: "PRO Student User", major: "Business", semester: 8, email: "pro@prostudent.guc.edu.eg", jobInterests: ["Project Management", "Consulting"]}

];



let dummyStudentApplications = [ // Sample applications

{ applicationId: "APP001", studentId: "S101", internshipId: "INT1001", internshipTitle: "Frontend Developer Intern", companyName: "Example Company Inc.", dateApplied: "2023-12-01", status: "Accepted" },

{ applicationId: "APP002", studentId: "S101", internshipId: "INTNEW003", internshipTitle: "Marketeer", companyName: "Vodafone", dateApplied: "2025-04-15", status: "Accepted" },

{ applicationId: "APP003", studentId: "S101", internshipId: "INTNEW001", internshipTitle: "Data Analyst", companyName: "SDG", dateApplied: "2025-05-10", status: "Pending" },

{ applicationId: "APP004", studentId: "S101", internshipId: "INTNEW002", internshipTitle: "Programmer", companyName: "Microsoft", dateApplied: "2025-05-01", status: "Rejected" }

];



const dummyAvailableMajors = ["Business", "Engineering", "Law", "Applied Arts", "Architecture"];

// ... (rest of data.js including initializeData, get/save functions, addStudentApplication)



function initializeData() {

localStorage.setItem('gucInternshipUsers', JSON.stringify(dummyUsers));

localStorage.setItem('gucInternshipCompanies', JSON.stringify(dummyCompanies));

localStorage.setItem('gucInternshipInternships', JSON.stringify(dummyInternships));


if (!localStorage.getItem('gucInternshipStudents')) {

localStorage.setItem('gucInternshipStudents', JSON.stringify(dummyStudents));

}

// Overwrite applications for testing the new combined view with sample data

localStorage.setItem('gucInternshipStudentApplications', JSON.stringify(dummyStudentApplications));


if (!localStorage.getItem('gucInternshipAvailableMajors')) {

localStorage.setItem('gucInternshipAvailableMajors', JSON.stringify(dummyAvailableMajors));

}

console.log("Data re-initialized in localStorage (internships & applications potentially overwritten).");

}



initializeData();



function getUsersFromStorage() { return JSON.parse(localStorage.getItem('gucInternshipUsers')) || []; }

function getCompaniesFromStorage() { return JSON.parse(localStorage.getItem('gucInternshipCompanies')) || []; }

function saveCompaniesToStorage(companies) { localStorage.setItem('gucInternshipCompanies', JSON.stringify(companies)); }

function getInternshipsFromStorage() { return JSON.parse(localStorage.getItem('gucInternshipInternships')) || []; }

function saveInternshipsToStorage(internships) { localStorage.setItem('gucInternshipInternships', JSON.stringify(internships)); }

function getStudentApplicationsFromStorage() { return JSON.parse(localStorage.getItem('gucInternshipStudentApplications')) || []; }

function saveStudentApplicationsToStorage(applications) { localStorage.setItem('gucInternshipStudentApplications', JSON.stringify(applications)); }

function addStudentApplication(studentId, internshipId, internshipTitle, companyName) {

let applications = getStudentApplicationsFromStorage();

const existingApplication = applications.find(app => app.studentId === studentId && app.internshipId === internshipId);

if (existingApplication) {

alert(`You have already applied for "${internshipTitle}" at ${companyName}.`);

return false;

}

const newApplication = {

applicationId: "APP" + Date.now() + Math.floor(Math.random() * 1000),

studentId: studentId, internshipId: internshipId, internshipTitle: internshipTitle,

companyName: companyName, dateApplied: new Date().toLocaleDateString(), status: "Pending"

};

applications.push(newApplication);

saveStudentApplicationsToStorage(applications);

return true;

}

function getStudentsFromStorage() { return JSON.parse(localStorage.getItem('gucInternshipStudents')) || []; }

function saveStudentsToStorage(students) { localStorage.setItem('gucInternshipStudents', JSON.stringify(students)); }

// ... (other helper functions)
// GUC_Internship_System/data.js
// ... (dummyUsers, dummyCompanies, dummyInternships, dummyStudents, dummyStudentApplications, dummyAvailableMajors, etc. as before) ...

// NEW: Dummy data for company evaluations
let dummyCompanyEvaluations = [
// Example:
// {
// evaluationId: "EVAL" + Date.now(),
// studentId: "S101",
// companyId: "C1", // From dummyCompanies
// companyName: "Example Company Inc.",
// rating: 5, // 1-5
// comments: "Great learning experience, very supportive team!",
// recommendStatus: "recommend", // "recommend", "neutral", "not_recommend"
// dateSubmitted: new Date().toLocaleDateString()
// }
];


function initializeData() {
// ... (existing initializations for users, companies, internships, students, applications, etc.)
localStorage.setItem('gucInternshipUsers', JSON.stringify(dummyUsers));
localStorage.setItem('gucInternshipCompanies', JSON.stringify(dummyCompanies));
localStorage.setItem('gucInternshipInternships', JSON.stringify(dummyInternships));

if (!localStorage.getItem('gucInternshipStudents')) {
localStorage.setItem('gucInternshipStudents', JSON.stringify(dummyStudents));
}
localStorage.setItem('gucInternshipStudentApplications', JSON.stringify(dummyStudentApplications));

if (!localStorage.getItem('gucInternshipAvailableMajors')) {
localStorage.setItem('gucInternshipAvailableMajors', JSON.stringify(dummyAvailableMajors));
}
// NEW: Initialize company evaluations
if (!localStorage.getItem('gucCompanyEvaluations')) {
localStorage.setItem('gucCompanyEvaluations', JSON.stringify(dummyCompanyEvaluations));
}
console.log("Data re-initialized/verified in localStorage.");
}

initializeData();

// ... (getUsersFromStorage, getCompaniesFromStorage, etc. as before) ...
// ... (getStudentApplicationsFromStorage, saveStudentApplicationsToStorage, addStudentApplication as before) ...

// --- NEW Helper functions for Company Evaluations ---
function getCompanyEvaluationsFromStorage() {
return JSON.parse(localStorage.getItem('gucCompanyEvaluations')) || [];
}

function saveCompanyEvaluationsToStorage(evaluations) {
localStorage.setItem('gucCompanyEvaluations', JSON.stringify(evaluations));
}

function addOrUpdateCompanyEvaluation(evaluationData) {
let evaluations = getCompanyEvaluationsFromStorage();
const existingEvalIndex = evaluations.findIndex(ev => ev.evaluationId === evaluationData.evaluationId || (ev.studentId === evaluationData.studentId && ev.companyId === evaluationData.companyId));

if (evaluationData.evaluationId && existingEvalIndex > -1) { // Update by evaluationId
evaluations[existingEvalIndex] = { ...evaluations[existingEvalIndex], ...evaluationData, dateSubmitted: new Date().toLocaleDateString() };
} else if (!evaluationData.evaluationId && existingEvalIndex > -1) { // Update by studentId & companyId (if no explicit evalId was given but one exists)
evaluations[existingEvalIndex] = { ...evaluations[existingEvalIndex], ...evaluationData, evaluationId: evaluations[existingEvalIndex].evaluationId, dateSubmitted: new Date().toLocaleDateString() };
} else { // Create new
evaluationData.evaluationId = "EVAL" + Date.now() + Math.floor(Math.random() * 1000);
evaluationData.dateSubmitted = new Date().toLocaleDateString();
evaluations.push(evaluationData);
}
saveCompanyEvaluationsToStorage(evaluations);
return evaluationData.evaluationId; // Return ID of saved/updated eval
}

function deleteCompanyEvaluationFromStorage(evaluationId) {
let evaluations = getCompanyEvaluationsFromStorage();
evaluations = evaluations.filter(ev => ev.evaluationId !== evaluationId);
saveCompanyEvaluationsToStorage(evaluations);
}
// --- END NEW Helper functions for Company Evaluations ---

// ... (other existing helper functions like getStudentsFromStorage, etc.)
 // GUC_Internship_System/script.js

document.addEventListener('DOMContentLoaded', () => {

const currentUserData = localStorage.getItem('currentUser');

let currentUser = null;

if (currentUserData) {

currentUser = JSON.parse(currentUserData);

const userNameElement = document.getElementById('user-name');

if (userNameElement) {

userNameElement.textContent = currentUser.name || 'User';

}

}



const logoutButton = document.getElementById('logout-btn');

if (logoutButton) {

logoutButton.addEventListener('click', () => {

localStorage.removeItem('currentUser');

window.location.href = 'index.html';

});

}



const internshipDetailsModal = document.getElementById('internship-details-modal');

const closeModalBtn = document.querySelector('#internship-details-modal .close-modal-btn');



if (closeModalBtn && internshipDetailsModal) {

closeModalBtn.addEventListener('click', () => {

internshipDetailsModal.style.display = 'none';

});

}

window.onclick = function(event) {

if (internshipDetailsModal && event.target == internshipDetailsModal) {

internshipDetailsModal.style.display = "none";

}

}



function openInternshipDetailsModal(internshipId) {

if (typeof getInternshipsFromStorage !== 'function') {

alert('Error: Internship data service is not available.'); return;

}

const internships = getInternshipsFromStorage();

const internship = internships.find(i => i.id === internshipId);


if (!internship || !internshipDetailsModal) {

alert('Internship details not found or modal error.'); return;

}



document.getElementById('modal-job-title').textContent = internship.jobTitle || "Not specified";

document.getElementById('modal-company-name').textContent = internship.companyName || "Not specified";

document.getElementById('modal-industry').textContent = internship.industry || 'N/A';

document.getElementById('modal-duration').textContent = internship.duration || "Not specified";

document.getElementById('modal-paid').textContent = internship.paid ? 'Yes' : 'No';

document.getElementById('modal-salary').textContent = internship.paid && internship.salary ? internship.salary : (internship.paid ? 'Stipend (details not specified)' : 'N/A');

document.getElementById('modal-skills').textContent = internship.skillsRequired ? internship.skillsRequired.join(', ') : 'N/A';

document.getElementById('modal-description').textContent = internship.description || "No further description available.";



const modalApplyBtn = document.getElementById('modal-apply-btn');

if (modalApplyBtn) {

modalApplyBtn.dataset.internshipId = internshipId;


modalApplyBtn.onclick = () => {

if (currentUser && typeof addStudentApplication === 'function') {

const success = addStudentApplication(

currentUser.id,

internship.id,

internship.jobTitle,

internship.companyName

);

if (success) {

alert("Applied Successfully");

if (typeof displayMyApplications === 'function') {

displayMyApplications(currentUser.id); // Refresh the applications list

}

}

// If addStudentApplication returned false, an alert was already shown by it.

} else {

alert("Could not process application. User not logged in or application service unavailable.");

console.warn("Cannot record application: currentUser or addStudentApplication function missing.");

}

internshipDetailsModal.style.display = 'none';

};

}

internshipDetailsModal.style.display = 'block';

}



if (document.body.id === 'student-dashboard-page') {

if (!currentUser || currentUser.role !== 'student') {

console.warn("Student dashboard loaded without valid student user.");

const studentProfileView = document.getElementById('student-profile-view');

if(studentProfileView) studentProfileView.innerHTML = "<p>Please log in as a student to view your profile.</p>";

const editProfileBtn = document.getElementById('edit-profile-btn');

if(editProfileBtn) editProfileBtn.style.display = 'none';

const suggestedCompaniesSection = document.getElementById('suggested-companies-section');

if(suggestedCompaniesSection) suggestedCompaniesSection.style.display = 'none';

const viewInternshipsSection = document.getElementById('view-internships');

if(viewInternshipsSection) viewInternshipsSection.style.display = 'none';

const myApplicationsSection = document.getElementById('my-applications');

if(myApplicationsSection) myApplicationsSection.style.display = 'none';

return;

}


const studentProfileView = document.getElementById('student-profile-view');

const editProfileBtn = document.getElementById('edit-profile-btn');

const studentProfileEditFormContainer = document.getElementById('student-profile-edit-form-container');

const studentProfileEditForm = document.getElementById('student-profile-edit-form');

const cancelEditProfileBtn = document.getElementById('cancel-edit-profile-btn');



function loadStudentProfileData(studentId) { /* ... remains the same ... */

if (typeof getStudentsFromStorage !== 'function') {

console.error("getStudentsFromStorage is not defined. Cannot load student profile.");

if(studentProfileView) studentProfileView.innerHTML = "<p>Error loading profile data.</p>";

return;

}

const student = getStudentsFromStorage().find(s => s.id === studentId);

const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));



if (studentProfileView && student) {

document.getElementById('profile-view-name').textContent = student.name || 'N/A';

document.getElementById('profile-view-email').textContent = student.email || (loggedInUser ? loggedInUser.email : 'N/A');

document.getElementById('profile-view-major').textContent = student.major || 'Not Set';

document.getElementById('profile-view-semester').textContent = student.semester || 'Not Set';

document.getElementById('profile-view-jobInterests').textContent = student.jobInterests && student.jobInterests.length > 0 ? student.jobInterests.join(', ') : 'Not Set';

document.getElementById('profile-view-collegeActivities').textContent = student.collegeActivities || 'Not Set';

const cvDisplay = document.getElementById('profile-view-cv');

if (student.cvUrl) {

cvDisplay.innerHTML = `<a href="${student.cvUrl}" target="_blank" class="text-blue-500 hover:underline">View CV</a>`;

} else {

cvDisplay.textContent = 'Not Set';

}

} else if (studentProfileView) {

studentProfileView.innerHTML = '<p>Could not load profile details. Please try again later.</p>';

if(loggedInUser && loggedInUser.email) {

document.getElementById('profile-view-name').textContent = loggedInUser.name || 'N/A';

document.getElementById('profile-view-email').textContent = loggedInUser.email;

}

}

}

function populateStudentEditForm(studentId) { /* ... remains the same ... */

if (typeof getStudentsFromStorage !== 'function') {

console.error("getStudentsFromStorage is not defined. Cannot populate edit form.");

return;

}

const student = getStudentsFromStorage().find(s => s.id === studentId);

if (studentProfileEditForm) {

if (student) {

studentProfileEditForm.studentName.value = student.name || '';

studentProfileEditForm.studentEditSemester.value = student.semester || '';

studentProfileEditForm.studentJobInterests.value = student.jobInterests ? student.jobInterests.join(', ') : '';

studentProfileEditForm.studentCollegeActivities.value = student.collegeActivities || '';

studentProfileEditForm.studentCV.value = student.cvUrl || '';

} else if(currentUser) {

studentProfileEditForm.studentName.value = currentUser.name || '';

}

const majorSelect = studentProfileEditForm.studentEditMajor;

if (student && student.major) {

majorSelect.value = student.major;

} else {

majorSelect.value = "";

}

} else {

console.error("studentProfileEditForm not found in populateStudentEditForm");

}

}



if (editProfileBtn) { /* ... remains the same ... */

editProfileBtn.addEventListener('click', () => {

populateStudentEditForm(currentUser.id);

if (studentProfileView) studentProfileView.style.display = 'none';

if (studentProfileEditFormContainer) studentProfileEditFormContainer.style.display = 'block';

editProfileBtn.style.display = 'none';

});

}

if (cancelEditProfileBtn) { /* ... remains the same ... */

cancelEditProfileBtn.addEventListener('click', () => {

if (studentProfileEditFormContainer) studentProfileEditFormContainer.style.display = 'none';

if (studentProfileView) studentProfileView.style.display = 'block';

if (editProfileBtn) editProfileBtn.style.display = 'inline-block';

});

}

if (studentProfileEditForm) { /* ... remains the same, ensure loadSuggestedCompanies is called ... */

studentProfileEditForm.addEventListener('submit', (e) => {

e.preventDefault();

if (typeof getStudentsFromStorage !== 'function' || typeof saveStudentsToStorage !== 'function') {

alert("Error: Student data service not available."); return;

}

let students = getStudentsFromStorage();

const studentIndex = students.findIndex(s => s.id === currentUser.id);

if (studentIndex > -1) {

students[studentIndex].name = studentProfileEditForm.studentName.value.trim();

students[studentIndex].major = studentProfileEditForm.studentEditMajor.value;

students[studentIndex].semester = studentProfileEditForm.studentEditSemester.value ? parseInt(studentProfileEditForm.studentEditSemester.value, 10) : null;

students[studentIndex].jobInterests = studentProfileEditForm.studentJobInterests.value.split(',').map(s => s.trim()).filter(s => s);

students[studentIndex].collegeActivities = studentProfileEditForm.studentCollegeActivities.value.trim();

students[studentIndex].cvUrl = studentProfileEditForm.studentCV.value.trim();

if (currentUser.name !== students[studentIndex].name) {

currentUser.name = students[studentIndex].name;

localStorage.setItem('currentUser', JSON.stringify(currentUser));

const userNameElement = document.getElementById('user-name');

if (userNameElement) userNameElement.textContent = currentUser.name;

}

saveStudentsToStorage(students);

alert('Profile updated successfully!');

loadStudentProfileData(currentUser.id);

if (typeof loadSuggestedCompanies === 'function') loadSuggestedCompanies(currentUser.id);

if (studentProfileEditFormContainer) studentProfileEditFormContainer.style.display = 'none';

if (studentProfileView) studentProfileView.style.display = 'block';

if (editProfileBtn) editProfileBtn.style.display = 'inline-block';

} else {

alert('Error: Could not find student profile to update.');

}

});

}


function loadSuggestedCompanies(studentId) { /* ... remains the same ... */

if (typeof getStudentsFromStorage !== 'function') {

console.error("getStudentsFromStorage is not defined. Cannot load suggested companies.");

const suggestedCompaniesSection = document.getElementById('suggested-companies-section');

if(suggestedCompaniesSection) suggestedCompaniesSection.style.display = 'none';

return;

}

const student = getStudentsFromStorage().find(s => s.id === studentId);

const suggestedCompaniesDropdown = document.getElementById('suggested-companies-dropdown');

const suggestionInfoMessage = document.getElementById('suggested-companies-info-message');

const noSuggestionMessage = document.getElementById('no-suggested-companies-message');

const dropdownContainer = document.getElementById('suggested-companies-dropdown-container');

if (!student || !suggestedCompaniesDropdown || !suggestionInfoMessage || !noSuggestionMessage || !dropdownContainer) {

console.error("Missing student data or DOM elements for suggested companies feature.");

const suggestedCompaniesSection = document.getElementById('suggested-companies-section');

if(suggestedCompaniesSection) suggestedCompaniesSection.style.display = 'none';

return;

}

const studentMajorLower = student.major ? student.major.toLowerCase() : "";

const studentJobInterestsLower = student.jobInterests ? student.jobInterests.map(interest => interest.toLowerCase().trim()) : [];

let recommendedCompanies = []; let ruleMatched = false;

const rule1TargetMajors = ["business", "engineering"];

const rule1TargetJobInterests = ["sales", "ai", "software engineering", "marketing", "web development", "finance", "programming", "operations", "data analyst"];

const rule1RecommendedCompanies = ["Microsoft", "Amazon", "PMG", "Vodafone", "Orange", "SDG"];

if (rule1TargetMajors.includes(studentMajorLower) && studentJobInterestsLower.some(interest => rule1TargetJobInterests.includes(interest))) {

recommendedCompanies = rule1RecommendedCompanies; ruleMatched = true;

}

if (!ruleMatched) {

const rule2TargetMajors = ["law"]; const rule2TargetJobInterests = ["governmental work"]; const rule2RecommendedCompanies = ["Abbas Law Firm", "Suits Law Comp"];

if (rule2TargetMajors.includes(studentMajorLower) && studentJobInterestsLower.some(interest => rule2TargetJobInterests.includes(interest))) {

recommendedCompanies = rule2RecommendedCompanies; ruleMatched = true;

}

}

if (!ruleMatched) {

const rule3TargetMajors = ["applied arts", "architecture engineering", "architecture"]; const rule3TargetJobInterests = ["design", "arts"]; const rule3RecommendedCompanies = ["Hany Saad Innovations", "Azza Fahmy"];

if (rule3TargetMajors.includes(studentMajorLower) && studentJobInterestsLower.some(interest => rule3TargetJobInterests.includes(interest))) {

recommendedCompanies = rule3RecommendedCompanies; ruleMatched = true;

}

}

suggestedCompaniesDropdown.innerHTML = '<option value="">-- View Suggestions --</option>';

if (ruleMatched && recommendedCompanies.length > 0) {

suggestionInfoMessage.style.display = 'block'; noSuggestionMessage.style.display = 'none'; dropdownContainer.style.display = 'block';

recommendedCompanies.forEach(companyName => {

const option = document.createElement('option'); option.value = companyName; option.textContent = companyName; suggestedCompaniesDropdown.appendChild(option);

});

} else {

suggestionInfoMessage.style.display = 'none'; noSuggestionMessage.style.display = 'block'; dropdownContainer.style.display = 'none';

}

}

function displayAvailableInternships(internshipsToDisplay) { /* ... remains the same ... */

const container = document.getElementById('available-internships-container');

if (!container) { console.error("Available internships container not found!"); return; }

container.innerHTML = '';

if (typeof getInternshipsFromStorage !== 'function') {

console.error("getInternshipsFromStorage is not defined. Cannot display internships.");

container.innerHTML = '<p>Error loading internships data.</p>'; return;

}

const internships = internshipsToDisplay || getInternshipsFromStorage();

if (!internships || internships.length === 0) {

container.innerHTML = '<p>No internships currently available that match your criteria.</p>'; return;

}

internships.forEach(internship => {

const card = document.createElement('div'); card.className = 'internship-card';

const title = document.createElement('h3'); title.textContent = internship.jobTitle || 'N/A';

const company = document.createElement('p'); company.innerHTML = `<strong>Company:</strong> ${internship.companyName || 'N/A'}`;

const duration = document.createElement('p'); duration.innerHTML = `<strong>Duration:</strong> ${internship.duration || 'N/A'}`;

const viewDetailsButton = document.createElement('button'); viewDetailsButton.className = 'action-btn';

viewDetailsButton.textContent = 'View Details'; viewDetailsButton.dataset.internshipId = internship.id;

viewDetailsButton.onclick = function() { openInternshipDetailsModal(this.dataset.internshipId); };

card.appendChild(title); card.appendChild(company); card.appendChild(duration);

card.appendChild(viewDetailsButton);

container.appendChild(card);

});

}


// --- NEW: Function to Display "My Submitted Applications" ---

function displayMyApplications(studentId) {

const container = document.getElementById('my-applications-container');

if (!container) {

console.error("My Applications container not found!");

return;

}

container.innerHTML = ''; // Clear previous content



if (typeof getStudentApplicationsFromStorage !== 'function') {

console.error("getStudentApplicationsFromStorage is not defined.");

container.innerHTML = '<p>Error loading applications.</p>';

return;

}



const allApplications = getStudentApplicationsFromStorage();

const myApplications = allApplications.filter(app => app.studentId === studentId);



if (myApplications.length === 0) {

container.innerHTML = '<p>You have not submitted any applications yet.</p>';

return;

}



myApplications.forEach(app => {

const appCard = document.createElement('div');

appCard.className = 'list-item'; // Using 'list-item' for a compact view, or use 'internship-card'



let statusColor = '';

switch (app.status.toLowerCase()) {

case 'accepted': statusColor = 'text-green-600'; break;

case 'rejected': statusColor = 'text-red-600'; break;

case 'finalized': statusColor = 'text-blue-600'; break;

case 'pending':

default: statusColor = 'text-gray-600'; break;

}



appCard.innerHTML = `

<div>

<h4>${app.internshipTitle || 'N/A'}</h4>

<p><small>Company: ${app.companyName || 'N/A'} | Applied on: ${app.dateApplied || 'N/A'}</small></p>

</div>

<div>

<p class="font-semibold ${statusColor}">${app.status || 'N/A'}</p>

</div>

`;

// Add more details or actions if needed, e.g., withdraw application

container.appendChild(appCard);

});

}





const applyFiltersBtn = document.getElementById('apply-filters-btn'); /* ... remains the same ... */

const resetFiltersBtn = document.getElementById('reset-filters-btn'); /* ... remains the same ... */

// ... (filter input variables remain the same) ...

const searchJobTitleInput = document.getElementById('search-job-title');

const searchCompanyNameInput = document.getElementById('search-company-name');

const filterIndustrySelect = document.getElementById('filter-industry');

const filterDurationSelect = document.getElementById('filter-duration');

const filterPaidSelect = document.getElementById('filter-paid');



if (applyFiltersBtn) { /* ... remains the same ... */

applyFiltersBtn.addEventListener('click', () => {

if (typeof getInternshipsFromStorage !== 'function') {

alert("Error: Internship data service not available for filtering."); return;

}

const allInternships = getInternshipsFromStorage();

const jobTitleQuery = searchJobTitleInput.value.toLowerCase();

const companyNameQuery = searchCompanyNameInput.value.toLowerCase();

const industryQuery = filterIndustrySelect.value.toLowerCase();

const durationQuery = filterDurationSelect.value.toLowerCase();

const paidQuery = filterPaidSelect.value;

const filteredInternships = allInternships.filter(internship => {

let matches = true;

if (jobTitleQuery && !(internship.jobTitle || '').toLowerCase().includes(jobTitleQuery)) matches = false;

if (companyNameQuery && !(internship.companyName || '').toLowerCase().includes(companyNameQuery)) matches = false;

if (industryQuery && internship.industry && !(internship.industry || '').toLowerCase().includes(industryQuery)) matches = false;

if (durationQuery && internship.duration && !(internship.duration || '').toLowerCase().includes(durationQuery)) matches = false;

if (paidQuery === "paid" && !internship.paid) matches = false;

if (paidQuery === "unpaid" && internship.paid) matches = false;

return matches;

});

displayAvailableInternships(filteredInternships);

});

}

if (resetFiltersBtn) { /* ... remains the same ... */

resetFiltersBtn.addEventListener('click', () => {

if(searchJobTitleInput) searchJobTitleInput.value = '';

if(searchCompanyNameInput) searchCompanyNameInput.value = '';

if(filterIndustrySelect) filterIndustrySelect.value = '';

if(filterDurationSelect) filterDurationSelect.value = '';

if(filterPaidSelect) filterPaidSelect.value = '';

if (typeof getInternshipsFromStorage === 'function') displayAvailableInternships();

});

}

function populateFilterOptions() { /* ... remains the same ... */

if (typeof getInternshipsFromStorage !== 'function' || !filterIndustrySelect || !filterDurationSelect) {

console.error("Cannot populate filters: Internship data service or select elements missing."); return;

}

const internships = getInternshipsFromStorage();

const industries = [...new Set(internships.map(i => i.industry).filter(Boolean))];

const durations = [...new Set(internships.map(i => i.duration).filter(Boolean))];

filterIndustrySelect.innerHTML = '<option value="">All Industries</option>';

filterDurationSelect.innerHTML = '<option value="">All Durations</option>';

industries.forEach(industry => {

const option = document.createElement('option'); option.value = industry; option.textContent = industry; filterIndustrySelect.appendChild(option);

});

durations.forEach(duration => {

const option = document.createElement('option'); option.value = duration; option.textContent = duration; filterDurationSelect.appendChild(option);

});

}



// Initial loads

loadStudentProfileData(currentUser.id);

if (typeof loadSuggestedCompanies === 'function') loadSuggestedCompanies(currentUser.id);

if (typeof displayAvailableInternships === 'function') displayAvailableInternships();

if (typeof populateFilterOptions === 'function') populateFilterOptions();

if (typeof displayMyApplications === 'function') displayMyApplications(currentUser.id); // NEW: Load submitted applications
}
if (document.body.id === 'pro-student-dashboard-page') { /* ... */ }
});


