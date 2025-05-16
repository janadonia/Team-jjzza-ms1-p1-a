// scad-dashboard.js
// JS logic specifically for the SCAD Office Dashboard page

// Define global data (or import from data.js)
window.companyApplications = window.companyApplications || [];
window.allInternships = [
  { company: 'Microsoft', title: 'Programmer', industry: 'Engineering', duration: '3 months', paid: "yes", status: 'pending' },
  { company: 'Amazon', title: 'Marketeer', industry: 'Business', duration: '2 months',paid: "yes", status: 'accepted' },
  { company: 'Hany Saad Innovations', title: 'Interior Designer', industry: 'Architecture', duration: '2 weeks',paid: "no", status: 'pending' }
];
window.allStudents = [
  {
    name: 'Jana Donia',
    major: 'Business Informatics',
    semester: 6,
    internshipStatus: 'Current Intern'
  },
  {
    name: 'Jay Zaki',
    major: 'Engineering',
    semester: 8,
    internshipStatus: 'Past Intern'
  },
  {
    name: 'Ahmed',
    major: 'Architecture',
    semester: 2,
    internshipStatus: 'Current Intern'
  }
];
document.addEventListener('DOMContentLoaded', () => {
    const applicationsList = document.getElementById('company-applications-list');

    // Sample data
    const pendingCompanies = [
        {
            id: 1,
            name: "TechVerse Inc.",
            industry: "Technology",
            email: "hr@techverse.com",
            description: "A leading software development firm specializing in AI solutions."
        },
        {
            id: 2,
            name: "FinancePlus Ltd.",
            industry: "Finance",
            email: "contact@financeplus.com",
            description: "Offers innovative banking and investment services."
        }
    ];

    if (pendingCompanies.length === 0) {
        applicationsList.innerHTML = "<p>No pending applications.</p>";
    } else {
        applicationsList.innerHTML = ""; // clear loading text
        pendingCompanies.forEach(company => {
            const card = document.createElement('div');
            card.classList.add('company-card');
            card.style.border = "1px solid #ccc";
            card.style.padding = "15px";
            card.style.marginBottom = "10px";
            card.style.borderRadius = "8px";

            card.innerHTML = `
                <h4>${company.name}</h4>
                <p><strong>Industry:</strong> ${company.industry}</p>
                <p><strong>Email:</strong> ${company.email}</p>
                <p><strong>Description:</strong> ${company.description}</p>
                <div style="margin-top: 10px;">
                    <button class="accept-btn action-btn" data-id="${company.id}">Accept</button>
                    <button class="reject-btn action-btn cancel-btn" data-id="${company.id}">Reject</button>
                </div>
            `;

            applicationsList.appendChild(card);
        });

        // Add event listeners for Accept/Reject buttons
        applicationsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('accept-btn')) {
                const id = e.target.dataset.id;
                alert(`Accepted company ID ${id}`);
                // TODO: call backend or remove from UI
            } else if (e.target.classList.contains('reject-btn')) {
                const id = e.target.dataset.id;
                alert(`Rejected company ID ${id}`);
                // TODO: call backend or remove from UI
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const postCycleBtn = document.getElementById("post-internship-cycle-btn");

    if (postCycleBtn) {
        postCycleBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent form from submitting immediately if needed
            alert("Internship cycle posted");
            
            // If you're submitting a form, you can trigger it manually after the alert:
            // document.getElementById("your-form-id").submit();
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const videoCallBtn = document.getElementById("start-video-call-btn");
    if (videoCallBtn) {
        videoCallBtn.addEventListener("click", () => {
            window.location.href = "video-call.html";
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.id !== 'scad-dashboard-page') return;

  // DOM elements
  const logoutBtn            = document.getElementById('logout-btn');
  const pendingContainer     = document.getElementById('company-applications-container');
  const internshipsContainer = document.getElementById('all-companies-container');
  const studentsContainer    = document.getElementById('all-students-container');

  const searchPendingInput   = document.getElementById('search-pending-company');
  const filterPendingBtn     = document.getElementById('filter-pending-company-btn');

  const filterInternsBtn     = document.getElementById('filter-all-companies-btn');
  

  const searchStudentName    = document.getElementById('search-student-name');
  const filterStatusSelect   = document.getElementById('filter-student-status');

  const searchStudentMajor   = document.getElementById('search-student-major');
  const filterStudentsBtn    = document.getElementById('filter-students-btn');

  const searchInternCompany  = document.getElementById('search-all-company-name');
const searchInternTitle    = document.getElementById('search-internship-title');
const filterIndustrySelect = document.getElementById('filter-industry');
const filterDurationSelect = document.getElementById('filter-duration');
const filterPaidSelect     = document.getElementById('filter-paid');

  filterStudentsBtn.addEventListener('click', () => {
    let list = window.allStudents;
    const nameTerm   = searchStudentName.value.trim().toLowerCase();
    const majorTerm  = searchStudentMajor.value.trim().toLowerCase();
    const filterStatusSelect = document.getElementById('filter-student-status');

    if (nameTerm)  list = list.filter(s => s.name.toLowerCase().includes(nameTerm));
    if (majorTerm) list = list.filter(s => s.major.toLowerCase().includes(majorTerm));
    if (statusTerm !== 'all') {
      list = list.filter(s => s.internshipStatus === statusTerm);
    }

    renderStudents(list);
  });
  const reportsBtn = document.getElementById('reports-btn');
const reportsPopup = document.getElementById('reports-popup');
const closeReportsPopup = document.getElementById('close-reports-popup');
const popupOverlay = document.getElementById('popup-overlay');

reportsBtn.addEventListener('click', () => {
  reportsPopup.style.display = 'block';
  popupOverlay.style.display = 'block';
});

closeReportsPopup.addEventListener('click', () => {
  reportsPopup.style.display = 'none';
  popupOverlay.style.display = 'none';
});

popupOverlay.addEventListener('click', () => {
  reportsPopup.style.display = 'none';
  popupOverlay.style.display = 'none';
});

  // Logout handler
  logoutBtn.addEventListener('click', () => {
    alert('Logging out...');
    window.location.href = '/login.html';
  });

  // Filter pending companies
  filterPendingBtn.addEventListener('click', () => {
    const term = searchPendingInput.value.trim().toLowerCase();
    const filtered = window.companyApplications.filter(app =>
      app.name.toLowerCase().includes(term)
    );
    renderCompanyApplications(filtered);
  });

  // Filter internships
  filterInternsBtn.addEventListener('click', () => {
  const companyTerm = searchInternCompany.value.trim().toLowerCase();
  const titleTerm   = searchInternTitle.value.trim().toLowerCase();
  const industryVal = filterIndustrySelect.value.toLowerCase();
  const durationVal = filterDurationSelect.value.toLowerCase();
  const paidVal     = filterPaidSelect.value.toLowerCase();

  let list = window.allInternships;

  if (companyTerm) {
    list = list.filter(i => i.company.toLowerCase().includes(companyTerm));
  }

  if (titleTerm) {
    list = list.filter(i => i.title.toLowerCase().includes(titleTerm));
  }

  if (industryVal && industryVal !== "all") {
    list = list.filter(i => i.industry.toLowerCase() === industryVal);
  }

  if (durationVal && durationVal !== "all") {
    list = list.filter(i => i.duration.toLowerCase() === durationVal);
  }

  if (paidVal && paidVal !== "all") {
    list = list.filter(i => i.paid.toLowerCase() === paidVal);
  }

  renderInternshipsList(list);
});


  // Filter students
  filterStudentsBtn.addEventListener('click', () => {
    let list = window.allStudents;
    const nameTerm = searchStudentName.value.trim().toLowerCase();
    const majorTerm = searchStudentMajor.value.trim().toLowerCase();
    if (nameTerm) list = list.filter(s => s.name.toLowerCase().includes(nameTerm));
    if (majorTerm) list = list.filter(s => s.major.toLowerCase().includes(majorTerm));
    renderStudents(list);
  });

  // Render pending applications
  function renderCompanyApplications(list) {
    if (!list.length) {
      pendingContainer.innerHTML = '<p>No pending applications.</p>';
      return;
    }
    pendingContainer.innerHTML = list.map(app => `
      <div style="border:1px solid #ccc; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); padding:16px; margin-bottom:16px;">
        <h4 style="margin:0 0 8px; font-size:1.125rem; font-weight:600;">${app.name}</h4>
        <p style="margin:4px 0;"><strong>Contact:</strong> ${app.contactEmail}</p>
        <button onclick="approveCompany('${app.id}')">Approve</button>
        <button onclick="rejectCompany('${app.id}')">Reject</button>
      </div>
    `).join('');
  }

  // Render internships list
  function renderInternshipsList(list) {
    if (!list.length) {
      internshipsContainer.innerHTML = '<p>No internships found.</p>';
      return;
    }
    internshipsContainer.innerHTML = list.map(i => `
      <div style="border:1px solid #ccc; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1); padding:16px; margin-bottom:16px;">
        <h4>${i.company} - ${i.title}</h4>
        <p><strong>Industry:</strong> ${i.industry}</p>
        <p><strong>Duration:</strong> ${i.duration}</p>
        <p><strong>Paid:</strong> ${i.paid ? 'Yes' : 'No'}</p>
        <p><strong>Status:</strong> ${i.status}</p>
      </div>
    `).join('');
   
  }

  // Render students
 function renderStudents(list) {
    if (!list.length) {
      studentsContainer.innerHTML = '<p>No students found.</p>';
      return;
    }

    studentsContainer.innerHTML = list.map(s => `
      <div style="
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 16px;
        margin-bottom: 16px;
      ">
        <h4 style="margin:0 0 8px; font-size:1.125rem; font-weight:600;">${s.name}</h4>
        <p style="margin:4px 0;"><strong>Major:</strong> ${s.major}</p>
        <p style="margin:4px 0;"><strong>Semester:</strong> ${s.semester}</p>
        <p style="margin:4px 0;"><strong>Internship Status:</strong> ${s.internshipStatus}</p>
      </div>
    `).join('');
  }
  // Initial render of students
  renderStudents(window.allStudents);
  // Stub actions
  window.approveCompany = id => alert(`Company ${id} approved.`);
  window.rejectCompany  = id => alert(`Company ${id} rejected.`);

  // Initial render
  renderCompanyApplications(window.companyApplications);
  renderInternshipsList(window.allInternships);
  renderStudents(window.allStudents);
});
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll(".dashboard-section");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const targetId = link.getAttribute("href").substring(1);

      sections.forEach(sec => {
        sec.style.display = sec.id === targetId ? "block" : "none";
      });
    });
  });

  // Show default section
  document.querySelector("#current-internship-cycle").style.display = "block";
});
document.addEventListener("DOMContentLoaded", () => {
  const { jsPDF } = window.jspdf;

  document.getElementById("generate-report-btn")?.addEventListener("click", () => {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(14);
    doc.text("Internship Statistics Report", 10, y);
    y += 10;

    doc.setFontSize(11);
    doc.text("Reports per Cycle:", 10, y);
    y += 7;
    doc.text("• Cycle 1: Accepted – 15, Rejected – 3, Flagged – 2", 12, y);
    y += 6;
    doc.text("• Cycle 2: Accepted – 18, Rejected – 1, Flagged – 0", 12, y);
    y += 6;
    doc.text("• Cycle 3: Accepted – 10, Rejected – 4, Flagged – 1", 12, y);
    y += 10;

    doc.text("Average Review Time: 3.5 days", 10, y);
    y += 10;

    doc.text("Most Frequently Used Courses:", 10, y);
    y += 7;
    doc.text("1. Introduction to Marketing", 12, y);
    y += 6;
    doc.text("2. Software Engineering", 12, y);
    y += 6;
    doc.text("3. Business Communication", 12, y);
    y += 6;
    doc.text("4. UX/UI Design Fundamentals", 12, y);
    y += 10;

    doc.text("Top Rated Companies:", 10, y);
    y += 7;
    doc.text("1. Microsoft – 4.9/5", 12, y);
    y += 6;
    doc.text("2. Amazon – 4.7/5", 12, y);
    y += 6;
    doc.text("3. Hany Saad Innovations – 4.5/5", 12, y);
    y += 10;

    doc.text("Top Companies by Internship Count:", 10, y);
    y += 7;
    doc.text("1. Amazon – 12 interns", 12, y);
    y += 6;
    doc.text("2. Microsoft – 10 interns", 12, y);
    y += 6;
    doc.text("3. PwC – 8 interns", 12, y);

    doc.save("Internship_Statistics_Report.pdf");
  });
});

