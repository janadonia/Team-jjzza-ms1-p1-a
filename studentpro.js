document.addEventListener("DOMContentLoaded", () => {
 if (!localStorage.getItem("careerWorkshops")) {
 const initialWorkshops = [
 {
 id: "bf3d1a13-d5e2-4b39-94b4-65f6b386d0e0",
 name: "Career Workshop 1",
 startDate: "2025-05-16 14:34",
 endDate: "2025-05-16 16:34",
 description: "This is a short description of Workshop 1.",
 speakerBio: "Speaker 1 is an industry leader with over 10 years of experience.",
 agenda: "Agenda for Workshop 1: Introduction, Keynote, Q&A.",
 isLive: true,
 registeredStudents: [],
 feedback: []
 },
 {
 id: "c443d5c5-d87a-4fa4-aeb5-9cb0696006b7",
 name: "Career Workshop 2",
 startDate: "2025-05-17 14:34",
 endDate: "2025-05-17 16:34",
 description: "This is a short description of Workshop 2.",
 speakerBio: "Speaker 2 is an industry leader with over 10 years of experience.",
 agenda: "Agenda for Workshop 2: Introduction, Keynote, Q&A.",
 isLive: true,
 registeredStudents: [],
 feedback: []
 },
 {
 id: "7d83419d-b652-4b06-9c4b-2523ada32ccd",
 name: "Career Workshop 3",
 startDate: "2025-05-18 14:34",
 endDate: "2025-05-18 16:34",
 description: "This is a short description of Workshop 3.",
 speakerBio: "Speaker 3 is an industry leader with over 10 years of experience.",
 agenda: "Agenda for Workshop 3: Introduction, Keynote, Q&A.",
 isLive: false,
 registeredStudents: [],
 feedback: []
 }
];
 localStorage.setItem("careerWorkshops", JSON.stringify(initialWorkshops));
 }

 const workshops = JSON.parse(localStorage.getItem("careerWorkshops")) || [];

 function renderWorkshops() {
 const container = document.getElementById("workshop-list");
 if (!container) return;

 container.innerHTML = "";

 workshops.forEach(ws => {
 const div = document.createElement("div");
 div.className = "workshop-card";
 let html = `
 <h4>${ws.name}</h4>
 <p>${ws.description}</p>
 <p><strong>Speaker:</strong> ${ws.speakerBio}</p>
 <p><strong>Start:</strong> ${ws.startDate}</p>
 <p><strong>End:</strong> ${ws.endDate}</p>
 <p><strong>Agenda:</strong> ${ws.agenda}</p>
 <p><strong>Type:</strong> ${ws.isLive ? "Live" : "Pre-recorded"}</p>
 <button onclick="registerWorkshop('${ws.id}')">Register</button>
`;

if (ws.isLive) {
 html += `<button onclick="joinLiveWorkshop('${ws.id}')">Join Live</button>`;
}

div.innerHTML = html;
 container.appendChild(div);
 });
 }

 window.registerWorkshop = function(id) {
 const profile = JSON.parse(localStorage.getItem("studentProfile"));
 if (!profile?.email) return alert("You must be logged in!");

 const workshop = workshops.find(w => w.id === id);
 if (!workshop) return alert("Workshop not found.");

 if (!workshop.registeredStudents.includes(profile.email)) {
 workshop.registeredStudents.push(profile.email);
 alert(`You are registered for "${workshop.name}".`);
 localStorage.setItem("careerWorkshops", JSON.stringify(workshops)); // update storage
 } else {
 alert(`You are already registered for "${workshop.name}".`);
 }
 };

 renderWorkshops();
});

window.joinLiveWorkshop = function(id) {
 const workshops = JSON.parse(localStorage.getItem("careerWorkshops")) || [];
 const selected = workshops.find(w => w.id === id);
 if (selected && selected.isLive) {
 window.location.href = "live-workshop.html";
 } else {
 alert("This workshop is not live.");
 }
};


 const form = document.getElementById("profile-form");
 const display = document.getElementById("profile-display");
 const editBtn = document.getElementById("edit-profile-btn");
 const reportForm = document.getElementById("report-form");
 const reportDisplay = document.getElementById("report-display");
 const titleField = document.getElementById("report-title");
 const introField = document.getElementById("report-intro");
 const bodyField = document.getElementById("report-body");
 const displayTitle = document.getElementById("display-report-title");
 const displayIntro = document.getElementById("display-report-intro");
 const displayBody = document.getElementById("display-report-body");
 const editReportBtn = document.getElementById("edit-report-btn");
 const deleteReportBtn = document.getElementById("delete-report-btn");
 const submitReportBtn = document.getElementById("submit-report-btn");
 const appointmentForm = document.getElementById("appointment-form");
 const appointmentStatus = document.getElementById("appointment-status");
 const startCallBtn = document.getElementById("start-call-btn");

 appointmentForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const reason = document.getElementById("appointment-reason").value;
 const date = document.getElementById("appointment-date").value;
 const appointment = {
 reason,
 date,
 approved: false,
 rejected: false
 };
 localStorage.setItem("studentAppointment", JSON.stringify(appointment));
 checkAppointmentStatus();
 alert("Appointment request submitted!");
 });

 function checkAppointmentStatus() {
 const appointment = JSON.parse(localStorage.getItem("studentAppointment"));
 if (!appointment) return;
 if (appointment.rejected) {
 appointmentStatus.innerHTML = "<p style='color:red;'>Your appointment was rejected.</p>";
 startCallBtn.style.display = "none";
 } else if (appointment.approved) {
 appointmentStatus.innerHTML = "<p style='color:green;'>Your appointment was approved.</p>";
 startCallBtn.style.display = "inline-block";
 } else {
 appointmentStatus.innerHTML = "<p style='color:orange;'>Your appointment is still pending.</p>";
 startCallBtn.style.display = "none";
 }
 }

 window.approveAppointmentManually = function () {
 const appointment = JSON.parse(localStorage.getItem("studentAppointment"));
 if (appointment) {
 appointment.approved = true;
 appointment.rejected = false;
 localStorage.setItem("studentAppointment", JSON.stringify(appointment));
 checkAppointmentStatus();
 alert("Appointment approved.");
 }
 }

 window.rejectAppointmentManually = function () {
 const appointment = JSON.parse(localStorage.getItem("studentAppointment"));
 if (appointment) {
 appointment.approved = false;
 appointment.rejected = true;
 localStorage.setItem("studentAppointment", JSON.stringify(appointment));
 checkAppointmentStatus();
 alert("Appointment rejected.");
 }
 }

 startCallBtn.addEventListener("click", () => {
 window.open('video-call.html', '_blank');
});

 // Show SCAD Officer online status (hardcoded)
const scadOnline = true; // Set to false if needed
const scadStatusEl = document.getElementById("scad-status");
if (scadStatusEl) {
 scadStatusEl.innerHTML = scadOnline
 ? "<p style='color:green;'>SCAD Officer is online</p>"
 : "<p style='color:red;'>SCAD Officer is offline</p>";
}

// Notify the student once when appointment is approved
const appointment = JSON.parse(localStorage.getItem("studentAppointment"));
if (appointment?.approved && !appointment.notified) {
 alert("Your appointment was accepted!");
 appointment.notified = true; // prevents repeated alerts
 localStorage.setItem("studentAppointment", JSON.stringify(appointment));
}

 checkAppointmentStatus();

document.addEventListener("DOMContentLoaded", () => {
 const profile = JSON.parse(localStorage.getItem("studentProfile"));
 const resultSection = document.getElementById("assessment-result");
 const postedDisplay = document.getElementById("posted-score-display");

 if (profile?.email) {
 const key = "assessment_" + profile.email;
 const data = JSON.parse(localStorage.getItem(key));

 if (data) {
 document.getElementById("completed-assessment-name").textContent = data.name;
 document.getElementById("assessment-score").textContent = data.score;
 resultSection.style.display = "block";

 if (data.posted) {
 postedDisplay.style.display = "block";
 postedDisplay.innerHTML = `<strong>Posted Score:</strong> ${data.name} – ${data.score}/100`;
 } else {
 postedDisplay.style.display = "none";
 }
 } else {
 // No assessment taken yet, show only the available list
 resultSection.style.display = "none";
 postedDisplay.style.display = "none";
 }
 }

 window.saveAssessmentResult = function () {
 const publish = document.getElementById("publish-score-checkbox").checked;
 const key = "assessment_" + profile.email;
 const data = JSON.parse(localStorage.getItem(key));
 if (!data) return;

 data.posted = publish;
 localStorage.setItem(key, JSON.stringify(data));

 if (publish) {
 postedDisplay.style.display = "block";
 postedDisplay.innerHTML = `<strong>Posted Score:</strong> ${data.name} – ${data.score}/100`;
 } else {
 postedDisplay.style.display = "none";
 }

 alert("Assessment result saved" + (publish ? " and posted to your profile." : "."));
 };
});
 function populateDisplay(data) {
 document.getElementById("display-name").textContent = data.name;
 document.getElementById("display-email").textContent = data.email;
 document.getElementById("display-major").textContent = data.major;
 document.getElementById("display-semester").textContent = data.semester;
 document.getElementById("display-jobInterests").textContent = data.jobInterests;
 document.getElementById("display-internshipExperience").textContent = data.internshipExperience;
 document.getElementById("display-collegeActivitiesDetails").textContent = data.collegeActivitiesDetails;
 document.getElementById("display-cv").textContent = data.cv;
 document.getElementById("display-cv").href = data.cv;
 document.getElementById("display-coverLetter").textContent = data.coverLetter;
 document.getElementById("display-coverLetter").href = data.coverLetter;
 document.getElementById("display-certificates").textContent = data.certificates;
 document.getElementById("display-certificates").href = data.certificates;
 }

 form.addEventListener("submit", (e) => {
 e.preventDefault();

 const profile = {
 name: form.elements.name.value,
 email: form.elements.email.value,
 major: form.elements.major.value,
 semester: form.elements.semester.value,
 jobInterests: form.elements.jobInterests.value,
 internshipExperience: form.elements.internshipExperience.value,
 collegeActivitiesDetails: form.elements.collegeActivitiesDetails.value,
 cv: form.elements.cv.value,
 coverLetter: form.elements.coverLetter.value,
 certificates: form.elements.certificates.value,
 };

 // Reset applications if email changed
 const oldProfile = JSON.parse(localStorage.getItem("studentProfile"));
 if (oldProfile?.email !== profile.email) {
 localStorage.removeItem("appliedInternships");
 localStorage.removeItem("internshipReport");
 }

 localStorage.setItem("studentProfile", JSON.stringify(profile));
 populateDisplay(profile);
 form.style.display = "none";
 display.style.display = "block";
 renderInternships(); // Refresh Apply buttons
 renderAppliedInternships();
 loadReport();
});

 editBtn.addEventListener("click", () => {
 const saved = JSON.parse(localStorage.getItem("studentProfile"));
 if (saved) {
 form.elements.name.value = saved.name;
 form.elements.email.value = saved.email;
 form.elements.major.value = saved.major;
 form.elements.semester.value = saved.semester;
 form.elements.jobInterests.value = saved.jobInterests;
 form.elements.internshipExperience.value = saved.internshipExperience;
 form.elements.collegeActivitiesDetails.value = saved.collegeActivitiesDetails;
 form.elements.cv.value = saved.cv;
 form.elements.coverLetter.value = saved.coverLetter;
 form.elements.certificates.value = saved.certificates;
 display.style.display = "none";
 form.style.display = "block";
 }
 });

 const saved = localStorage.getItem("studentProfile");
 if (saved) {
 const profile = JSON.parse(saved);
 if (profile.name && profile.email && profile.major) {
 populateDisplay(profile);
 form.style.display = "none";
 display.style.display = "block";
 } else {
 form.style.display = "block";
 display.style.display = "none";
 }
 } else {
 form.style.display = "block";
 display.style.display = "none";
 }

 const internshipData = [
 { id: 1, company: "Vodafone", title: "Marketing Intern", startDate: "2025-06-01", endDate: "2025-08-31" },
 { id: 2, company: "Microsoft Egypt", title: "Software Engineering Intern", startDate: "2025-03-01", endDate: "2025-05-30" },
 { id: 3, company: "Orange", title: "Network Support Intern", startDate: "2025-01-10", endDate: "2025-03-30" }
 ];

 const internshipList = document.getElementById("internship-list");
 const appliedList = document.getElementById("applied-list");

 const filterType = document.getElementById("filter-type");
 const filterValue = document.getElementById("filter-value");

 filterType.addEventListener("change", () => {
 const type = filterType.value;
 filterValue.innerHTML = "";
 filterValue.style.display = (type === "all") ? "none" : "inline-block";

 if (type === "company") {
 const companies = [...new Set(internshipData.map(i => i.company))];
 companies.forEach(c => {
 const opt = document.createElement("option");
 opt.value = c;
 opt.textContent = c;
 filterValue.appendChild(opt);
 });
 } else if (type === "title") {
 const titles = [...new Set(internshipData.map(i => i.title))];
 titles.forEach(t => {
 const opt = document.createElement("option");
 opt.value = t;
 opt.textContent = t;
 filterValue.appendChild(opt);
 });
 }

 renderInternships();
 });

 filterValue.addEventListener("change", () => {
 renderInternships();
 });

 function renderInternships() {
 internshipList.innerHTML = "";

 const appliedApps = JSON.parse(localStorage.getItem("appliedInternships") || "[]");

 const type = filterType.value;
 const value = filterValue.value;
 const filtered = internshipData.filter(internship => {
 if (type === "company") return internship.company === value;
 if (type === "title") return internship.title === value;
 return true;
 });

 filtered.forEach(internship => {
 const li = document.createElement("li");
 li.textContent = `${internship.company} ${internship.title}`;

 const isApplied = appliedApps.some(app => app.id === internship.id);

 const applyBtn = document.createElement("button");
 applyBtn.textContent = isApplied ? "Applied" : "Apply";
 applyBtn.disabled = isApplied;
 applyBtn.className = "action-btn";
 applyBtn.style.marginLeft = "15px";

 applyBtn.addEventListener("click", () => {
 appliedApps.push({ id: internship.id, status: "pending" });
 localStorage.setItem("appliedInternships", JSON.stringify(appliedApps));
 renderInternships();
 renderAppliedInternships();
 });

 li.appendChild(applyBtn);
 internshipList.appendChild(li);
 });
}

 function renderAppliedInternships() {
 appliedList.innerHTML = "";
 const appliedApps = JSON.parse(localStorage.getItem("appliedInternships") || "[]");

 internshipData.forEach(internship => {
 const match = appliedApps.find(app => app.id === internship.id);
 if (match) {
 const li = document.createElement("li");
 li.innerHTML = `${internship.company} - ${internship.title} <span class="status">(${match.status})</span>`;
 appliedList.appendChild(li);
 }
 });
}

 //renderInternships();
 //renderAppliedInternships();

 const suggestionsBtn = document.getElementById("suggestions-btn");
 const suggestionsList = document.getElementById("suggestions-list");

 if (suggestionsBtn && suggestionsList) {
 suggestionsBtn.addEventListener("click", () => {
 const profile = JSON.parse(localStorage.getItem("studentProfile"));
 suggestionsList.innerHTML = "";

 if (!profile || !profile.major) {
 suggestionsList.innerHTML = "<li>No major found in profile</li>";
 suggestionsList.style.display = "block";
 return;
 }

 const major = profile.major.toLowerCase();
 let companies = [];

 if (major.includes("business") || major.includes("bi") || major.includes("engineering")) {
 companies = ["Vodafone", "SDG"];
 } else if (major.includes("applied arts") || major.includes("architecture")) {
 companies = ["Azza Fahmy", "El Gouna Design Studio"];
 } else {
 companies = ["No suggestions available"];
 }

 companies.forEach(company => {
 const li = document.createElement("li");
 li.textContent = company;
 suggestionsList.appendChild(li);
 });

 suggestionsList.style.display =
 suggestionsList.style.display === "block" ? "none" : "block";
 });

 document.addEventListener("click", (e) => {
 if (
 !suggestionsBtn.contains(e.target) &&
 !suggestionsList.contains(e.target)
 ) {
 suggestionsList.style.display = "none";
 }
 });
 }
 const evaluationForm = document.getElementById("evaluation-form");
const companySelect = document.getElementById("evaluation-company");
const evaluationsList = document.getElementById("evaluations-list");

// Populate dropdown with applied companies
function populateEvaluationCompanies() {
 const appliedIds = JSON.parse(localStorage.getItem("appliedInternships") || "[]");
 companySelect.innerHTML = ""; // Clear old options
 internshipData.forEach(i => {
 if (appliedIds.includes(i.id)) {
 const opt = document.createElement("option");
 opt.value = i.company;
 opt.textContent = i.company;
 companySelect.appendChild(opt);
 }
 });
}

// Render all saved evaluations
function renderEvaluations() {
 const evaluations = JSON.parse(localStorage.getItem("companyEvaluations") || "[]");
 evaluationsList.innerHTML = "";

 evaluations.forEach((ev, index) => {
 const li = document.createElement("li");
 li.innerHTML = `
 <strong>${ev.company}</strong> – ${ev.text}<br>
 Recommendation: ${ev.recommend ? "Yes" : "No"}<br>
 <button data-index="${index}" class="edit-eval">Edit</button>
 <button data-index="${index}" class="delete-eval">Delete</button>
 `;
 evaluationsList.appendChild(li);
 });
}

// Save evaluation
evaluationForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const evaluations = JSON.parse(localStorage.getItem("companyEvaluations") || "[]");
 const newEval = {
 company: companySelect.value,
 text: document.getElementById("evaluation-text").value,
 recommend: document.getElementById("evaluation-recommend").checked
 };
 evaluations.push(newEval);
 localStorage.setItem("companyEvaluations", JSON.stringify(evaluations));
 renderEvaluations();
 evaluationForm.reset();
});

// Edit/Delete evaluation
evaluationsList.addEventListener("click", (e) => {
 const evaluations = JSON.parse(localStorage.getItem("companyEvaluations") || "[]");
 const index = e.target.dataset.index;

 if (e.target.classList.contains("delete-eval")) {
 evaluations.splice(index, 1);
 } else if (e.target.classList.contains("edit-eval")) {
 const ev = evaluations[index];
 companySelect.value = ev.company;
 document.getElementById("evaluation-text").value = ev.text;
 document.getElementById("evaluation-recommend").checked = ev.recommend;
 evaluations.splice(index, 1); // Remove temporarily to allow resave
 }

 localStorage.setItem("companyEvaluations", JSON.stringify(evaluations));
 renderEvaluations();
});
renderInternships() ;
renderAppliedInternships();
populateEvaluationCompanies();
renderEvaluations();




function loadReport() {
 const report = JSON.parse(localStorage.getItem("internshipReport"));
 if (report) {
 displayTitle.textContent = report.title;
 displayIntro.textContent = report.intro;
 displayBody.textContent = report.body;

 reportDisplay.style.display = "block";
 reportForm.style.display = "none";

 if (report.finalized) {
 submitReportBtn.disabled = true;
 editReportBtn.style.display = "none";
 deleteReportBtn.style.display = "none";
 } else {
 submitReportBtn.disabled = false;
 editReportBtn.style.display = "inline-block";
 deleteReportBtn.style.display = "inline-block";
 }
 } else {
 reportForm.style.display = "block";
 reportDisplay.style.display = "none";
 }
}

function submitFeedback() {
 const rating = document.getElementById("rating").value;
 const feedback = document.getElementById("feedback").value;
 const profile = JSON.parse(localStorage.getItem("studentProfile"));
 const workshopId = "live_workshop_id"; // Replace this if dynamically passed

 if (!profile?.email) {
 alert("You must be logged in to submit feedback.");
 return;
 }

 if (!rating || rating < 1 || rating > 5) {
 alert("Please enter a rating between 1 and 5.");
 return;
 }

 const workshops = JSON.parse(localStorage.getItem("careerWorkshops")) || [];
 const workshop = workshops.find(w => w.id === workshopId);
 if (workshop) {
 workshop.feedback.push({
 student: profile.email,
 rating,
 comment: feedback
 });

 localStorage.setItem("careerWorkshops", JSON.stringify(workshops));

 // Simulate certificate generation
 document.getElementById("certificate-message").style.display = "block";
 document.getElementById("certificate-link").href = generateCertificateURL(profile.name, workshop.name);

 alert("Feedback submitted successfully!");
 } else {
 alert("Workshop not found.");
 }
}

function generateCertificateURL(studentName, workshopName) {
 // For now, simulate certificate with a simple downloadable text link
 const content = `Certificate of Attendance\n\nThis certifies that ${studentName} attended ${workshopName}.`;
 const blob = new Blob([content], { type: "text/plain" });
 return URL.createObjectURL(blob);
}

reportForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const report = {
 title: titleField.value,
 intro: introField.value,
 body: bodyField.value,
 finalized: false
 };
 localStorage.setItem("internshipReport", JSON.stringify(report));
 loadReport();
});

editReportBtn.addEventListener("click", () => {
 const report = JSON.parse(localStorage.getItem("internshipReport"));
 if (report) {
 titleField.value = report.title;
 introField.value = report.intro;
 bodyField.value = report.body;
 reportForm.style.display = "block";
 reportDisplay.style.display = "none";
 }
});

deleteReportBtn.addEventListener("click", () => {
 localStorage.removeItem("internshipReport");
 titleField.value = "";
 introField.value = "";
 bodyField.value = "";
 reportForm.style.display = "block";
 reportDisplay.style.display = "none";
});

submitReportBtn.addEventListener("click", () => {
 const report = JSON.parse(localStorage.getItem("internshipReport"));
 if (!report) return;
 report.finalized = true;
 localStorage.setItem("internshipReport", JSON.stringify(report));
 alert("Your report has been finalized and submitted.");
 submitReportBtn.disabled = true;
 editReportBtn.style.display = "none";
 deleteReportBtn.style.display = "none";

});
loadReport();
renderWorkshops();


document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("studentProfile");
  localStorage.removeItem("appliedInternships");
  localStorage.removeItem("internshipReport");
  localStorage.removeItem("lastAssessment");
  localStorage.removeItem("studentAppointment");
  // You can also use localStorage.clear() if you want to remove everything

  window.location.href = "login.html"; // This must point to your real login page
});


