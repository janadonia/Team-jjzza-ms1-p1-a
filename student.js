document.addEventListener("DOMContentLoaded", () => {
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
    const appliedIds = JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    const type = filterType.value;
    const value = filterValue.value;
    const filtered = internshipData.filter(internship => {
      if (type === "company") return internship.company === value;
      if (type === "title") return internship.title === value;
      return true;
    });

    filtered.forEach(internship => {
      const li = document.createElement("li");
      li.textContent =  `${internship.company} ${internship.title}`  ;

      const applyBtn = document.createElement("button");
      applyBtn.textContent = appliedIds.includes(internship.id) ? "Applied" : "Apply";
      applyBtn.disabled = appliedIds.includes(internship.id);
      applyBtn.className = "action-btn";
      applyBtn.style.marginLeft = "15px";

      applyBtn.addEventListener("click", () => {
        appliedIds.push(internship.id);
        localStorage.setItem("appliedInternships", JSON.stringify(appliedIds));
        renderInternships();
        renderAppliedInternships();
      });

      li.appendChild(applyBtn);
      internshipList.appendChild(li);
    });
  }

  function renderAppliedInternships() {
    appliedList.innerHTML = "";
    const appliedIds = JSON.parse(localStorage.getItem("appliedInternships") || "[]");

    internshipData.forEach(internship => {
      if (appliedIds.includes(internship.id)) {
        const li = document.createElement("li");
        li.textContent = `${internship.company}${internship.title}`    ;
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
});
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          

            // Redirect to login page
            window.location.href = 'login.html'; // change this path if your login page has a different name or location
        });
    }
})
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear any session or profile data (optional)
      localStorage.removeItem("studentProfile");
      localStorage.removeItem("appliedInternships");
      localStorage.removeItem("internshipReport");
      localStorage.removeItem("studentAppointment");
      localStorage.removeItem("lastAssessment");

      // Redirect to login.html (must exist in same folder)
      window.location.href = 'login.html';
    });
  }
});
