document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profile-form");
  const display = document.getElementById("profile-display");
  const editBtn = document.getElementById("edit-profile-btn");
  const suggestionBtn = document.getElementById("company-suggestions-btn");
  const suggestionOutput = document.getElementById("company-suggestions-output");

  function showProfile(data) {
    document.getElementById("display-name").textContent = data.name;
    document.getElementById("display-email").textContent = data.email;
    document.getElementById("display-major").textContent = data.major;
    document.getElementById("display-semester").textContent = data.semester;
    document.getElementById("display-jobInterests").textContent = data.jobInterests;
    document.getElementById("display-collegeActivities").textContent = data.collegeActivities;
    document.getElementById("display-cv").href = data.cv;

    form.style.display = "none";
    display.style.display = "block";
  }

  function showForm(data = {}) {
    form.elements.name.value = data.name || "";
    form.elements.email.value = data.email || "";
    form.elements.major.value = data.major || "";
    form.elements.semester.value = data.semester || "";
    form.elements.jobInterests.value = data.jobInterests || "";
    form.elements.collegeActivities.value = data.collegeActivities || "";
    form.elements.cv.value = data.cv || "";

    form.style.display = "block";
    display.style.display = "none";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const profile = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      major: form.elements.major.value,
      semester: form.elements.semester.value,
      jobInterests: form.elements.jobInterests.value,
      collegeActivities: form.elements.collegeActivities.value,
      cv: form.elements.cv.value
    };
    localStorage.setItem("studentProfile", JSON.stringify(profile));
    showProfile(profile);
  });

  editBtn.addEventListener("click", () => {
    const profile = JSON.parse(localStorage.getItem("studentProfile"));
    showForm(profile);
  });

  suggestionBtn.addEventListener("click", () => {
    const profile = JSON.parse(localStorage.getItem("studentProfile"));
    const major = profile?.major?.toLowerCase() || "";

    const companyMap = {
      business: ["Vodafone", "P&G", "Nestlé"],
      engineering: ["SDG", "Valeo", "Schneider Electric"],
      cs: ["Microsoft", "Google", "Amazon"],
      pharmacy: ["Eva Pharma", "GSK", "Sanofi"]
    };

    const suggestions = [];

    for (const [key, companies] of Object.entries(companyMap)) {
      if (major.includes(key)) {
        suggestions.push(...companies);
      }
    }

    suggestionOutput.innerHTML = suggestions.length
      ?  <p><strong>Suggested Companies:</strong> ${suggestions.join(", ")}</p> 
      : "<p><strong>No suggestions found for this major.</strong></p>";
  });

  const saved = localStorage.getItem("studentProfile");
  if (saved) {
    showProfile(JSON.parse(saved));
  } else {
    showForm();
  }
});