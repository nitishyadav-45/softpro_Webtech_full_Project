
    function calculateAge() {
      const dob = document.getElementById("dob").value;
      if (!dob) {
        document.getElementById("result").innerText = "⚠️ Please select your date of birth.";
        return;
      }

      const dobDate = new Date(dob);
      const today = new Date();

      // Difference in milliseconds
      let diff = today - dobDate;

      let years = today.getFullYear() - dobDate.getFullYear();
      let months = today.getMonth() - dobDate.getMonth();
      let days = today.getDate() - dobDate.getDate();

      if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      // Other properties
      let totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      let totalHours = Math.floor(diff / (1000 * 60 * 60));
      let totalMinutes = Math.floor(diff / (1000 * 60));
      let totalSeconds = Math.floor(diff / 1000);

      document.getElementById("result").innerHTML = `
        <p><strong>🎂 Exact Age:</strong> ${years} years, ${months} months, ${days} days</p>
        <p><strong>📅 Age in Months:</strong> ${years * 12 + months} months</p>
        <p><strong>📆 Age in Days:</strong> ${totalDays} days</p>
        <p><strong>⏳ Age in Hours:</strong> ${totalHours} hours</p>
        <p><strong>⌛ Age in Minutes:</strong> ${totalMinutes} minutes</p>
        <p><strong>⏱️ Age in Seconds:</strong> ${totalSeconds} seconds</p>
      `;
    }

    function resetCalc() {
      document.getElementById("dob").value = "";
      document.getElementById("result").innerHTML = "";
    }
  