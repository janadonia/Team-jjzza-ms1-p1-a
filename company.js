console.log("company.js loaded");

if (document.body.id === 'company-dashboard-page') {
  console.log("Company Dashboard JS Active");

  const form = document.getElementById("post-internship-form");
  const internshipsList = document.getElementById("company-internships-list");
  const searchInput = document.getElementById("internship-search");
  const internshipIdField = document.getElementById("internshipIdToEdit");

  // ─── Helpers ─────────────────────────────
  function getCompanyInternships() {
    return JSON.parse(localStorage.getItem("companyInternships") || "[]");
  }

  function saveCompanyInternships(internships) {
    localStorage.setItem("companyInternships", JSON.stringify(internships));
  }

  function updateInternshipsUI(searchTerm = "") {
    const internships = getCompanyInternships();
    internshipsList.innerHTML = "";

    const industryFilter = document.getElementById("filter-industry")?.value || "";
    const durationFilter = document.getElementById("filter-duration")?.value || "";
    const paidFilter = document.getElementById("filter-paid")?.value || "";

    const filtered = internships.filter(i =>
      i.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (industryFilter === "" || i.industry === industryFilter) &&
      (durationFilter === "" || i.duration === durationFilter) &&
      (paidFilter === "" || i.paid === paidFilter)
    );

    if (filtered.length === 0) {
      internshipsList.innerHTML = "<p>No internships found.</p>";
      return;
    }

    filtered.forEach((i, index) => {
      const div = document.createElement("div");
      div.className = "internship-card";
      div.innerHTML = `
        <h4>${i.jobTitle}</h4>
        <p><strong>Duration:</strong> ${i.duration}</p>
        <p><strong>Industry:</strong> ${i.industry}</p>
        <p><strong>Paid:</strong> ${i.paid}</p>
        <p><strong>Salary:</strong> ${i.salary || 'N/A'}</p>
        <p><strong>Skills:</strong> ${i.skillsRequired}</p>
        <p><strong>Description:</strong> ${i.description}</p>
        <p><strong>Deadline:</strong> ${i.applicationDeadline || 'N/A'}</p>
        <p><strong>Status:</strong> ${i.status || 'Pending'}</p>
        <button class="action-btn view-applicant-btn" data-index="${index}">View Applicant</button>
        <button class="action-btn edit-btn" data-index="${index}">Edit</button>
        <button class="action-btn reject-btn delete-btn" data-index="${index}">Delete</button>
      `;
      internshipsList.appendChild(div);
    });

    // Re-attach events for View Applicant button
    document.querySelectorAll(".view-applicant-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        viewApplicantDetails(index);  // Trigger the function to show applicant details
      });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const internship = getCompanyInternships()[index];
        form.jobTitle.value = internship.jobTitle;
        form.duration.value = internship.duration;
        form.industry.value = internship.industry;
        form.paid.value = internship.paid;
        form.salary.value = internship.salary;
        form.skillsRequired.value = internship.skillsRequired;
        form.description.value = internship.description;
        form.applicationDeadline.value = internship.applicationDeadline;
        document.getElementById("internshipIdToEdit").value = index;
      });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        const internships = getCompanyInternships();
        internships.splice(index, 1);
        saveCompanyInternships(internships);
        updateInternshipsUI(document.getElementById("internship-search")?.value || "");
      });
    });
  }

  // Function to handle View Applicant button click
  function viewApplicantDetails(internshipIndex) {
    const internships = getCompanyInternships();
    const internship = internships[internshipIndex];

    // Hardcoded applicant details
    const applicant = {
      name: "Jana Zaky",  // Hardcoded applicant name
      email: "jana.zaky@example.com",  // Hardcoded email
      phone: "+201234567890",  // Hardcoded phone number
      resumeUrl: "http://example.com/resume.pdf",  // Hardcoded resume URL
      coverLetter: "I am very interested in this internship because I have a passion for technology...",  // Hardcoded cover letter
    };
    

    // Displaying applicant details (this could be a modal, or an alert)
    alert(`
      Name: ${applicant.name}
      Email: ${applicant.email}
      Phone: ${applicant.phone}
      Resume: ${applicant.resumeUrl}
      Cover Letter: ${applicant.coverLetter}
    `);
  }

  // Function to submit internship form
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const editedIndex = internshipIdField.value;
    const internships = getCompanyInternships();

    const newInternship = {
      jobTitle: form.jobTitle.value.trim(),
      duration: form.duration.value.trim(),
      industry: form.industry.value.trim(),
      paid: form.paid.value,
      salary: form.salary.value.trim(),
      skillsRequired: form.skillsRequired.value.trim(),
      description: form.description.value.trim(),
      applicationDeadline: form.applicationDeadline.value,
      status: "pending",
      applicants: []  // Start with no applicants
    };

    if (editedIndex === "") {
      internships.push(newInternship);
    } else {
      internships[parseInt(editedIndex)] = newInternship;
    }

    saveCompanyInternships(internships);
    updateInternshipsUI(searchInput.value);
    form.reset();
    internshipIdField.value = "";
  });

  // Event listener for filters
  document.getElementById("apply-filters-btn")?.addEventListener("click", () => {
    updateInternshipsUI(document.getElementById("internship-search")?.value || "");
  });

  document.getElementById("reset-filters-btn")?.addEventListener("click", () => {
    document.getElementById("filter-industry").value = "";
    document.getElementById("filter-duration").value = "";
    document.getElementById("filter-paid").value = "";
    updateInternshipsUI(document.getElementById("internship-search")?.value || "");
  });

  // ─── Search Bar ─────────────────────────────
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      updateInternshipsUI(e.target.value);
    });
  }

  // ─── Initial Load ─────────────────────────────
  updateInternshipsUI();
}
document.addEventListener('DOMContentLoaded', function() {
    // Get all status buttons
    const statusButtons = document.querySelectorAll('.status-btn');

    // Add event listeners to each status button
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const applicantName = this.getAttribute('data-applicant');
            const newStatus = this.getAttribute('data-status');

            // Update the status of the applicant (displayed in the console for now)
            console.log(`${applicantName} is now ${newStatus}`);
            
            // Here, you could save the status to localStorage or handle the change accordingly
            // For now, we will simply alert the change
            alert(`${applicantName} has been marked as ${newStatus}`);
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Get all status buttons
    const statusButtons = document.querySelectorAll('.status-btn');

    // Add event listeners to each status button
    statusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const applicantName = this.getAttribute('data-applicant');
            const newStatus = this.getAttribute('data-status');

            // Remove selected class from all buttons
            statusButtons.forEach(btn => btn.classList.remove('selected'));

            // Add the selected class to the clicked button
            this.classList.add('selected');

            // Log the selected status (you can replace this with actual functionality)
            console.log(`${applicantName} has been marked as ${newStatus}`);
            
            // Optionally, alert the status change
            alert(`${applicantName} has been marked as ${newStatus}`);
        });
    });
});
// Function to handle the status change
function setStatus(applicantId, status) {
    // Change the status button color
    const statusBtns = document.querySelectorAll(`#${applicantId} .status-btn`);
    statusBtns.forEach(btn => btn.classList.remove('selected'));  // Remove 'selected' class from all buttons
    const selectedBtn = document.querySelector(`#${applicantId} .status-btn:contains('${status}')`);
    selectedBtn.classList.add('selected');  // Add 'selected' class to clicked button

    // Update the applicant's status (could be a variable or database update)
    alert(`${applicantId} has been marked as "${status}"`);
}

// Example: call the function when a button is clicked (already set up in HTML above)
// Function to handle the dropdown change
function handleStatusChange(studentId, status) {
    if (status === "current-intern") {
        alert(`${studentId} is currently in an internship.`);
    } else if (status === "internship-complete") {
        alert(`${studentId} has completed their internship successfully.`);
    }
}
function handleStatusChange(studentId, newStatus) {
    // Create messages for different statuses
    let message = "";
    if (newStatus === "current-intern") {
        message = `${studentId} is currently in the internship.`;
    } else if (newStatus === "internship-complete") {
        message = `${studentId} has successfully completed the internship.`;
    }

    // Show the status update message
    alert(message);
}

function filterByName() {
    const filterValue = document.getElementById("filter-name").value;
    
    // Show all student elements first
    const students = document.querySelectorAll('.student-status-item');
    students.forEach(student => {
        student.style.display = 'block';
    });
    
    // Hide students that do not match the filter
    if (filterValue) {
        const selectedStudent = document.getElementById(filterValue);
        if (selectedStudent) {
            selectedStudent.style.display = 'block'; // Ensure the selected student is visible
        }

        students.forEach(student => {
            if (student.id !== filterValue) {
                student.style.display = 'none'; // Hide other students
            }
        });
    }
}
function handleStatusChange(studentId, newStatus) {
    // Create messages for different statuses
    let message = "";
    if (newStatus === "current-intern") {
        message = `${studentId} is currently in the internship.`;
    } else if (newStatus === "internship-complete") {
        message = `${studentId} has successfully completed the internship.`;
    }

    // Show the status update message
    alert(message);
}

function filterByNameOrJob() {
    const filterValue = document.getElementById("filter-name-job").value;
    
    // Show all student elements first
    const students = document.querySelectorAll('.student-status-item');
    students.forEach(student => {
        student.style.display = 'block';
    });
    
    // Hide students that do not match the filter
    if (filterValue) {
        const selectedStudent = document.getElementById(filterValue);
        if (selectedStudent) {
            selectedStudent.style.display = 'block'; // Ensure the selected student is visible
        }

        students.forEach(student => {
            if (student.id !== filterValue) {
                student.style.display = 'none'; // Hide other students
            }
        });
    }
}
// Handle status change for the applicants
function handleStatusChange(studentId, newStatus) {
    let message = "";
    if (newStatus === "current-intern") {
        message = `${studentId} is currently in the internship.`;
    } else if (newStatus === "internship-complete") {
        message = `${studentId} has successfully completed the internship.`;
    }

    // Show the status update message
    alert(message);
}

// Search for students by name or job title
function searchInterns() {
    const searchTerm = document.getElementById("student-search").value.toLowerCase();
    const students = document.querySelectorAll('.student-status-item');

    students.forEach(student => {
        const studentName = student.querySelector('p').innerText.toLowerCase();
        const jobTitle = student.querySelectorAll('p')[1].innerText.toLowerCase();

        if (studentName.includes(searchTerm) || jobTitle.includes(searchTerm)) {
            student.style.display = 'block';  // Show if name or job title matches
        } else {
            student.style.display = 'none';  // Hide if neither matches
        }
    });
}
function changeStatus(applicantName, status) {
    // Log the status change in the console (simulating status update)
    console.log(`${applicantName} has been marked as ${status}`);
    
    // Simulate sending an email notification
    sendEmailNotification(applicantName, status);
}

function sendEmailNotification(applicantName, status) {
    // Simulate sending an email and show the notification UI
    const emailNotification = `Notification: Your application for ${applicantName} has been ${status}.`;
    
    // Display the notification on the page (you can use a modal or a simple div)
    alert(emailNotification); // You can replace this with a custom notification system.

    // For a more realistic UI feedback:
    const notificationPanel = document.getElementById('notification-center-panel');
    const notificationListContainer = document.getElementById('notifications-list-container');

    // Create a new notification item
    const notificationItem = document.createElement('div');
    notificationItem.classList.add('notification-item');
    notificationItem.innerHTML = `
        <p>${emailNotification}</p>
        <small class="notification-date">${new Date().toLocaleString()}</small>
    `;

    // Add the new notification to the list
    notificationListContainer.appendChild(notificationItem);

    // Update the unread notification count
    const unreadCount = document.getElementById('notification-unread-count');
    unreadCount.textContent = parseInt(unreadCount.textContent) + 1;
    
    // Optionally, make the notification panel visible
    notificationPanel.classList.add('open');
}
// Function to simulate sending an email notification
function sendEmailNotification(applicantName, status) {
    const emailNotificationSection = document.getElementById("email-notification");
    const emailMessage = document.getElementById("email-message");

    // Display the notification message
    emailNotificationSection.style.display = "block";

    // Hardcoded message
    emailMessage.innerHTML = `The application of <strong>${applicantName}</strong> has been ${status}.<br>You will receive an email notification shortly.`;
    
    // Simulate a delay like sending an email
    setTimeout(function() {
        alert(`Email sent to ${applicantName} regarding ${status} status.`);
    }, 2000); // Simulate email delay of 2 seconds
}

// Example function to change status and send email notification
function changeStatus(applicantId, status) {
    // Get the applicant's name (for simulation purposes)
    let applicantName = applicantId.replace("-", " "); // Convert "john-doe" to "John Doe"
    
    // Update the applicant's status (this part can be customized as per your logic)
    console.log(`${applicantName} status updated to ${status}`);
    
    // Call the function to simulate sending an email
    sendEmailNotification(applicantName, status);
}




