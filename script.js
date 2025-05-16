// GUC_Internship_System/script.js

document.addEventListener('DOMContentLoaded', () => {

const currentUserData = localStorage.getItem('currentUser');

let currentUser = null;

if (currentUserData) {

currentUser = JSON.parse(currentUserData);

const userNameElement = document.getElementById('user-name');

if (userNameElement) userNameElement.textContent = currentUser.name || 'User';

}



const logoutButton = document.getElementById('logout-btn');

if (logoutButton) { /* ... logout logic ... */

logoutButton.addEventListener('click', () => {

localStorage.removeItem('currentUser');

window.location.href = 'index.html';

});

}



const internshipDetailsModal = document.getElementById('internship-details-modal');

const closeModalBtn = document.querySelector('#internship-details-modal .close-modal-btn');

if (closeModalBtn && internshipDetailsModal) { /* ... modal close logic ... */

closeModalBtn.addEventListener('click', () => {

internshipDetailsModal.style.display = 'none';

});

}

window.onclick = function(event) { /* ... modal outside click close logic ... */

if (internshipDetailsModal && event.target == internshipDetailsModal) {

internshipDetailsModal.style.display = "none";

}

};



function openInternshipDetailsModal(internshipId) { /* ... remains the same, ensure it calls displayMyApplications on successful apply ... */

if (typeof getInternshipsFromStorage !== 'function') { alert('Error: Internship data service unavailable.'); return; }

const internships = getInternshipsFromStorage();

const internship = internships.find(i => i.id === internshipId);

if (!internship || !internshipDetailsModal) { alert('Internship details not found or modal error.'); return; }

// ... (populate modal fields)

document.getElementById('modal-job-title').textContent = internship.jobTitle || "N/A";

document.getElementById('modal-company-name').textContent = internship.companyName || "N/A";

document.getElementById('modal-industry').textContent = internship.industry || 'N/A';

document.getElementById('modal-duration').textContent = internship.duration || "N/A";

document.getElementById('modal-paid').textContent = internship.paid ? 'Yes' : 'No';

document.getElementById('modal-salary').textContent = internship.paid && internship.salary ? internship.salary : (internship.paid ? 'Stipend N/A' : 'N/A');

document.getElementById('modal-skills').textContent = internship.skillsRequired ? internship.skillsRequired.join(', ') : 'N/A';

document.getElementById('modal-description').textContent = internship.description || "N/A";



const modalApplyBtn = document.getElementById('modal-apply-btn');

if (modalApplyBtn) {

modalApplyBtn.dataset.internshipId = internshipId;

modalApplyBtn.onclick = () => {

if (currentUser && typeof addStudentApplication === 'function') {

const success = addStudentApplication(currentUser.id, internship.id, internship.jobTitle, internship.companyName);

if (success) {

alert("Applied Successfully");

if (typeof displayMyApplications === 'function') displayMyApplications(currentUser.id); // Refresh list

}

} else {

alert("Could not process application. Login or service issue.");

}

internshipDetailsModal.style.display = 'none';

};

}

internshipDetailsModal.style.display = 'block';

}



if (document.body.id === 'student-dashboard-page') {

if (!currentUser || currentUser.role !== 'student') {

// ... (access denied logic as before, ensure #my-applications is also hidden)

console.warn("Student dashboard: No valid student user.");

const sectionsToHide = ['my-profile', 'suggested-companies-section', 'view-internships', 'my-applications'];

sectionsToHide.forEach(id => {

const section = document.getElementById(id);

if (section) section.style.display = 'none';

});

const mainDash = document.querySelector('main.dashboard-main h2#page-title');

if (mainDash) mainDash.insertAdjacentHTML('afterend', "<p>Please log in as a student to view dashboard features.</p>");

return;

}



// ... (loadStudentProfileData, populateStudentEditForm, their event listeners as before) ...

// ... (loadSuggestedCompanies, displayAvailableInternships, their filter logic as before) ...

function loadStudentProfileData(studentId) { /* ... as before ... */ }

function populateStudentEditForm(studentId) { /* ... as before ... */ }

// ... edit/cancel profile button listeners ...

// ... studentProfileEditForm submit listener ...

function loadSuggestedCompanies(studentId) { /* ... as before ... */ }

function displayAvailableInternships(internshipsToDisplay) { /* ... as before ... */ }

// ... available internships filter button listeners and populateFilterOptions ...





// --- MODIFIED/ENHANCED: Function to Display "My Submitted Applications" with History Filters ---

function displayMyApplications(studentId, filter = "all_submitted") {

const container = document.getElementById('my-applications-container');

if (!container) { console.error("My Applications container not found!"); return; }

container.innerHTML = '';



if (typeof getStudentApplicationsFromStorage !== 'function' || typeof getInternshipsFromStorage !== 'function') {

console.error("Data service functions for applications or internships are not defined.");

container.innerHTML = '<p>Error loading applications.</p>'; return;

}



const allStudentApps = getStudentApplicationsFromStorage().filter(app => app.studentId === studentId);

const allInternships = getInternshipsFromStorage();

const today = new Date();

today.setHours(0, 0, 0, 0);



let filteredApplications = [];



if (filter === "all_submitted") {

filteredApplications = allStudentApps;

} else if (filter === "current_internships" || filter === "completed_internships") {

allStudentApps.forEach(app => {

if (app.status === "Accepted") {

const internshipDetails = allInternships.find(internship => internship.id === app.internshipId);

if (internshipDetails && internshipDetails.endDate) {

const endDate = new Date(internshipDetails.endDate);

endDate.setHours(0, 0, 0, 0);

const startDate = internshipDetails.startDate ? new Date(internshipDetails.startDate) : null;

if(startDate) startDate.setHours(0,0,0,0);



let isCurrent = false;

if (startDate && startDate <= today && endDate >= today) {

isCurrent = true;

}

let isCompleted = endDate < today;



if (filter === "current_internships" && isCurrent) {

filteredApplications.push({...app, derivedStatus: "Current Intern"});

} else if (filter === "completed_internships" && isCompleted) {

filteredApplications.push({...app, derivedStatus: "Internship Complete"});

}

}

}

});

} else { // Filtering by raw status: pending, finalized, accepted_raw, rejected

const rawStatusFilter = filter === "accepted_raw" ? "Accepted" : filter.charAt(0).toUpperCase() + filter.slice(1);

filteredApplications = allStudentApps.filter(app => app.status === rawStatusFilter);

}





if (filteredApplications.length === 0) {

if (filter === "current_internships") container.innerHTML = '<p>You have no current internships.</p>';

else if (filter === "completed_internships") container.innerHTML = '<p>You have no completed internships in your history.</p>';

else container.innerHTML = '<p>No applications match this filter.</p>';

return;

}



filteredApplications.forEach(app => {

const appCard = document.createElement('div');

appCard.className = 'list-item';



let displayStatus = app.derivedStatus || app.status; // Use derived if available

let statusColor = 'text-gray-600'; // Default for pending



switch (displayStatus.toLowerCase()) {

case 'accepted': case 'accepted (raw)': statusColor = 'text-green-700 font-bold'; break; // Darker green for accepted

case 'rejected': statusColor = 'text-red-600'; break;

case 'finalized': statusColor = 'text-blue-600'; break;

case 'current intern': statusColor = 'text-teal-600 font-semibold'; displayStatus = "Current Intern"; break;

case 'internship complete': statusColor = 'text-purple-600 font-semibold'; displayStatus = "Internship Complete"; break;

case 'pending': default: statusColor = 'text-gray-600'; break;

}

// For raw "Accepted" status from "accepted_raw" filter

if (filter === "accepted_raw" && app.status === "Accepted" && !app.derivedStatus) {

displayStatus = "Accepted"; // Ensure it shows 'Accepted' not potentially undefined

statusColor = 'text-green-700 font-bold';

}





appCard.innerHTML = `

<div>

<h4>${app.internshipTitle || 'N/A'}</h4>

<p><small>Company: ${app.companyName || 'N/A'} | Applied on: ${app.dateApplied || 'N/A'}</small></p>

</div>

<div>

<p class="${statusColor}">${displayStatus}</p>

</div>

`;

container.appendChild(appCard);

});

}



// Event listener for the new application status filter

const applicationStatusFilter = document.getElementById('filter-application-status');

if (applicationStatusFilter) {

applicationStatusFilter.addEventListener('change', (event) => {

if (currentUser && typeof displayMyApplications === 'function') {

displayMyApplications(currentUser.id, event.target.value);

}

});

}



// Initial loads

if (typeof loadStudentProfileData === 'function') loadStudentProfileData(currentUser.id);

if (typeof loadSuggestedCompanies === 'function') loadSuggestedCompanies(currentUser.id);

if (typeof displayAvailableInternships === 'function') displayAvailableInternships();

// populateFilterOptions for available internships (if it exists and is different from application filter)

const availableInternshipFilterIndustry = document.getElementById('filter-industry');

const availableInternshipFilterDuration = document.getElementById('filter-duration');

function populateAvailableInternshipFilterOptions() {

if (typeof getInternshipsFromStorage !== 'function' || !availableInternshipFilterIndustry || !availableInternshipFilterDuration) {

console.error("Cannot populate available internship filters."); return;

}

const internships = getInternshipsFromStorage();

const industries = [...new Set(internships.map(i => i.industry).filter(Boolean))];

const durations = [...new Set(internships.map(i => i.duration).filter(Boolean))];

availableInternshipFilterIndustry.innerHTML = '<option value="">All Industries</option>';

availableInternshipFilterDuration.innerHTML = '<option value="">All Durations</option>';

industries.forEach(industry => { const option = document.createElement('option'); option.value = industry; option.textContent = industry; availableInternshipFilterIndustry.appendChild(option); });

durations.forEach(duration => { const option = document.createElement('option'); option.value = duration; option.textContent = duration; availableInternshipFilterDuration.appendChild(option); });

}

if (typeof populateAvailableInternshipFilterOptions === 'function') populateAvailableInternshipFilterOptions();



if (typeof displayMyApplications === 'function') displayMyApplications(currentUser.id); // Load with default "all_submitted"



}

});
// GUC_Internship_System/script.js
document.addEventListener('DOMContentLoaded', () => {
const currentUserData = localStorage.getItem('currentUser');
let currentUser = null;
if (currentUserData) {
currentUser = JSON.parse(currentUserData);
const userNameElement = document.getElementById('user-name');
if (userNameElement) userNameElement.textContent = currentUser.name || 'User';
}

const logoutButton = document.getElementById('logout-btn');
if (logoutButton) { /* ... logout logic ... */ }

const internshipDetailsModal = document.getElementById('internship-details-modal');
const closeModalBtn = document.querySelector('#internship-details-modal .close-modal-btn');
if (closeModalBtn && internshipDetailsModal) { /* ... modal close logic ... */ }
window.onclick = function(event) { /* ... modal outside click close logic ... */ };
function openInternshipDetailsModal(internshipId) { /* ... as previously defined ... */ }

// --- NEW: Company Evaluation Panel Functionality ---
const evaluationPanelToggleBtn = document.getElementById('evaluation-panel-toggle-btn');
const companyEvaluationPanel = document.getElementById('company-evaluation-panel');
const closeEvaluationPanelBtn = document.getElementById('close-evaluation-panel-btn');
const evalCompanySelect = document.getElementById('eval-company-select');
const companyEvaluationForm = document.getElementById('company-evaluation-form');
const myEvaluationsListContainer = document.getElementById('my-evaluations-list-container');
const deleteEvaluationBtn = document.getElementById('delete-evaluation-btn');


if (evaluationPanelToggleBtn && companyEvaluationPanel) {
evaluationPanelToggleBtn.addEventListener('click', () => {
const isVisible = companyEvaluationPanel.style.display === 'block';
companyEvaluationPanel.style.display = isVisible ? 'none' : 'block';
if (!isVisible && currentUser) { // If opening
populateCompaniesForEvaluation(currentUser.id);
displayMyCompanyEvaluations(currentUser.id);
resetEvaluationForm();
}
});
}

if (closeEvaluationPanelBtn && companyEvaluationPanel) {
closeEvaluationPanelBtn.addEventListener('click', () => {
companyEvaluationPanel.style.display = 'none';
});
}
// Close panel if clicked outside its content
if (companyEvaluationPanel) {
companyEvaluationPanel.addEventListener('click', function(event) {
if (event.target === companyEvaluationPanel) { // Clicked on the backdrop
companyEvaluationPanel.style.display = 'none';
}
});
}


function populateCompaniesForEvaluation(studentId) {
if (!evalCompanySelect || typeof getStudentApplicationsFromStorage !== 'function' || typeof getInternshipsFromStorage !== 'function') return;

const studentApplications = getStudentApplicationsFromStorage().filter(app => app.studentId === studentId && app.status === "Accepted");
const allInternships = getInternshipsFromStorage();
const allCompanies = getCompaniesFromStorage(); // Get all registered companies

const interactedCompanyIds = new Set();

// Add companies from accepted internships
studentApplications.forEach(app => {
const internship = allInternships.find(i => i.id === app.internshipId);
if (internship && internship.companyId) {
interactedCompanyIds.add(internship.companyId);
} else if (app.companyName) { // Fallback if companyId is not in internship but name is in application
const company = allCompanies.find(c => c.name === app.companyName);
if(company) interactedCompanyIds.add(company.id);
}
});

// For now, let's also allow evaluating any company the student might know, not just from accepted internships
// This can be refined later. For now, we'll populate with ALL companies from dummyCompanies.
// Or, more realistically, companies they've had internships with (completed/current from applications)

evalCompanySelect.innerHTML = '<option value="">-- Select a Company --</option>';
const companiesToEvaluate = []; // Store {id, name}

interactedCompanyIds.forEach(companyId => {
const company = allCompanies.find(c => c.id === companyId);
if (company && !companiesToEvaluate.some(c => c.id === company.id)) {
companiesToEvaluate.push({ id: company.id, name: company.name });
}
});

// If no interacted companies, or to allow evaluating any, list all. For now, only interacted.
if (companiesToEvaluate.length === 0) {
// Option: List all companies if no specific interactions.
// allCompanies.forEach(company => companiesToEvaluate.push({id: company.id, name: company.name}));
evalCompanySelect.innerHTML = '<option value="">-- No companies from past/current internships --</option>';
}


companiesToEvaluate.sort((a, b) => a.name.localeCompare(b.name)).forEach(company => {
const option = document.createElement('option');
option.value = company.id;
option.textContent = company.name;
evalCompanySelect.appendChild(option);
});
}

if (evalCompanySelect && companyEvaluationForm) {
evalCompanySelect.addEventListener('change', function() {
const companyId = this.value;
const companyName = this.options[this.selectedIndex].text;
if (companyId && currentUser) {
companyEvaluationForm.style.display = 'block';
// Load existing evaluation if any
const evaluations = getCompanyEvaluationsFromStorage();
const existingEval = evaluations.find(ev => ev.studentId === currentUser.id && ev.companyId === companyId);
if (existingEval) {
companyEvaluationForm.evaluationId.value = existingEval.evaluationId;
companyEvaluationForm.evalCompanyId.value = existingEval.companyId;
companyEvaluationForm.evalCompanyName.value = existingEval.companyName;
companyEvaluationForm['eval-rating'].value = existingEval.rating;
companyEvaluationForm['eval-comments'].value = existingEval.comments;
const recommendStatusRadio = companyEvaluationForm.querySelector(`input[name="eval-recommend-status"][value="${existingEval.recommendStatus}"]`);
if (recommendStatusRadio) recommendStatusRadio.checked = true;
deleteEvaluationBtn.style.display = 'inline-block';
} else {
resetEvaluationForm(companyId, companyName);
}
} else {
companyEvaluationForm.style.display = 'none';
resetEvaluationForm();
}
});
}

function resetEvaluationForm(companyId = '', companyName = '') {
if (!companyEvaluationForm) return;
companyEvaluationForm.reset();
companyEvaluationForm.evaluationId.value = '';
companyEvaluationForm.evalCompanyId.value = companyId;
companyEvaluationForm.evalCompanyName.value = companyName;
deleteEvaluationBtn.style.display = 'none';
if (!companyId) { // If no company is selected, hide form.
companyEvaluationForm.style.display = 'none';
if(evalCompanySelect) evalCompanySelect.value = '';
}
}

if (companyEvaluationForm) {
companyEvaluationForm.addEventListener('submit', function(event) {
event.preventDefault();
if (!currentUser) {
alert("You must be logged in to submit an evaluation.");
return;
}
const selectedCompanyId = document.getElementById('evalCompanyId').value;
const selectedCompanyName = document.getElementById('evalCompanyName').value;

if (!selectedCompanyId) {
alert("Please select a company to evaluate.");
return;
}

const evaluationData = {
evaluationId: this.evaluationId.value, // Will be empty for new, populated for update
studentId: currentUser.id,
companyId: selectedCompanyId,
companyName: selectedCompanyName,
rating: parseInt(this['eval-rating'].value),
comments: this['eval-comments'].value.trim(),
recommendStatus: this.querySelector('input[name="eval-recommend-status"]:checked')?.value
};

if (!evaluationData.recommendStatus) {
alert("Please select a recommendation status.");
return;
}
if (!evaluationData.comments) {
alert("Please provide comments for your evaluation.");
return;
}
if (!evaluationData.rating) {
alert("Please provide a star rating.");
return;
}


addOrUpdateCompanyEvaluation(evaluationData);
alert("Evaluation saved successfully!");
displayMyCompanyEvaluations(currentUser.id);
resetEvaluationForm(); // Reset form and hide it
if(evalCompanySelect) evalCompanySelect.value = ""; // Deselect company
});
}

if(deleteEvaluationBtn) {
deleteEvaluationBtn.addEventListener('click', function() {
const evaluationId = companyEvaluationForm.evaluationId.value;
if (evaluationId && confirm("Are you sure you want to delete this evaluation?")) {
deleteCompanyEvaluationFromStorage(evaluationId);
alert("Evaluation deleted.");
displayMyCompanyEvaluations(currentUser.id);
resetEvaluationForm();
if(evalCompanySelect) evalCompanySelect.value = "";
}
});
}


function displayMyCompanyEvaluations(studentId) {
if (!myEvaluationsListContainer || typeof getCompanyEvaluationsFromStorage !== 'function') return;

const evaluations = getCompanyEvaluationsFromStorage().filter(ev => ev.studentId === studentId);
myEvaluationsListContainer.innerHTML = '';

if (evaluations.length === 0) {
myEvaluationsListContainer.innerHTML = '<p>You have not submitted any company evaluations yet.</p>';
return;
}

evaluations.forEach(ev => {
const card = document.createElement('div');
card.className = 'list-item evaluation-item'; // Add class for specific styling if needed
card.dataset.evaluationId = ev.evaluationId;
card.dataset.companyId = ev.companyId;


let recommendText = ev.recommendStatus;
if(ev.recommendStatus === 'recommend') recommendText = 'Recommended';
else if(ev.recommendStatus === 'not_recommend') recommendText = 'Not Recommended';
else if(ev.recommendStatus === 'neutral') recommendText = 'Neutral';


card.innerHTML = `
<div>
<h4>${ev.companyName} - Rating: ${'⭐'.repeat(ev.rating)}${'☆'.repeat(5-ev.rating)}</h4>
<p><small>Submitted: ${ev.dateSubmitted}</small> | <small>Recommendation: ${recommendText}</small></p>
<p class="description" style="white-space: pre-wrap; margin-top: 5px;">${ev.comments}</p>
</div>
<div>
<button class="action-btn edit-eval-btn text-xs" style="background-color: #ffc107; color: #212529; margin-bottom: 5px;">Edit</button>
</div>
`;
myEvaluationsListContainer.appendChild(card);

card.querySelector('.edit-eval-btn').addEventListener('click', function() {
const evalIdToEdit = ev.evaluationId;
const evalToEdit = getCompanyEvaluationsFromStorage().find(e => e.evaluationId === evalIdToEdit);
if (evalToEdit) {
// Set company in dropdown
if(evalCompanySelect) evalCompanySelect.value = evalToEdit.companyId;
// Trigger change to load form
if(evalCompanySelect) evalCompanySelect.dispatchEvent(new Event('change'));

// Then populate the form - evalCompanySelect 'change' listener should handle this
}
});
});
}


// --- Student Specific Functions (main dashboard logic) ---
if (document.body.id === 'student-dashboard-page') {
if (!currentUser || currentUser.role !== 'student') {
// ... (access denied logic)
return;
}

// ... (All your existing functions: loadStudentProfileData, populateStudentEditForm, etc.)
// ... (All your existing event listeners for profile, suggested companies, internships, applications)

// Initial loads
if (typeof loadStudentProfileData === 'function') loadStudentProfileData(currentUser.id);
if (typeof loadSuggestedCompanies === 'function') loadSuggestedCompanies(currentUser.id);
if (typeof displayAvailableInternships === 'function') displayAvailableInternships();
// ... (populateFilterOptions for available internships)
const availableInternshipFilterIndustry = document.getElementById('filter-industry');
const availableInternshipFilterDuration = document.getElementById('filter-duration');
function populateAvailableInternshipFilterOptions() {
if (typeof getInternshipsFromStorage !== 'function' || !availableInternshipFilterIndustry || !availableInternshipFilterDuration) { return; }
const internships = getInternshipsFromStorage();
const industries = [...new Set(internships.map(i => i.industry).filter(Boolean))];
const durations = [...new Set(internships.map(i => i.duration).filter(Boolean))];
availableInternshipFilterIndustry.innerHTML = '<option value="">All Industries</option>';
availableInternshipFilterDuration.innerHTML = '<option value="">All Durations</option>';
industries.forEach(industry => { const option = document.createElement('option'); option.value = industry; option.textContent = industry; availableInternshipFilterIndustry.appendChild(option); });
durations.forEach(duration => { const option = document.createElement('option'); option.value = duration; option.textContent = duration; availableInternshipFilterDuration.appendChild(option); });
}
if (typeof populateAvailableInternshipFilterOptions === 'function') populateAvailableInternshipFilterOptions();

if (typeof displayMyApplications === 'function') displayMyApplications(currentUser.id);

// Event listener for the application status filter
const applicationStatusFilter = document.getElementById('filter-application-status');
if (applicationStatusFilter) {
applicationStatusFilter.addEventListener('change', (event) => {
if (currentUser && typeof displayMyApplications === 'function') {
displayMyApplications(currentUser.id, event.target.value);
}
});
}

}
// ... (pro-student dashboard logic etc.)
}); 

