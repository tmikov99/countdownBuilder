document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("countdown-title");
  const mediaEl = document.getElementById("media-container");
  const openBtn = document.getElementById("open-settings");
  const dialog = document.getElementById("settings-dialog");

  const savedTitle = localStorage.getItem("countdownTitle") || "No Current Countdown";
  const savedDate = localStorage.getItem("countdownDate") || null;
  const savedBg = localStorage.getItem("countdownBg") || "";
  

  titleEl.textContent = savedTitle;
  if (savedBg) {
    if (/\.(mp4|webm|ogg)$/i.test(savedBg)) {
      mediaEl.innerHTML = `<source src="${savedBg}" type="video/mp4">`;
      mediaEl.setAttribute("autoplay", true);
      mediaEl.setAttribute("loop", true);
      mediaEl.setAttribute("muted", true);
      mediaEl.load();
    } else {
      mediaEl.style.background = `url(${savedBg}) no-repeat center center/cover`;
    }
  }

  let date_future = new Date(savedDate);
  let intervalId;

  if (savedDate) {
    calculateTimer();
    intervalId = setInterval(() => {
      calculateTimer();
    }, 1000);
  }

  function calculateTimer() {
    const date_now = new Date();
    if (date_now >= date_future) {
      clearInterval(intervalId); 
      document.getElementById("days").innerHTML = 0;
      document.getElementById("hours").innerHTML = 0;
      document.getElementById("minutes").innerHTML = 0;
      document.getElementById("seconds").innerHTML = 0;
      document.getElementById("countdown-completed").style.display = "block";
      return;
    }
    let delta = Math.abs(date_future - date_now) / 1000;

    const days = Math.floor(delta / 86400);
    delta -= days * 86400;

    const hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    const minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    const seconds = Math.floor(delta % 60); 

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  }

  openBtn.addEventListener("click", () => {
    document.getElementById("title-input").value = savedTitle;
    document.getElementById("bg-input").value = savedBg;

    if (savedDate) {
      const dateInput = document.getElementById("date-input");
      const date = new Date(savedDate);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
      dateInput.value = formatted;
    }

    dialog.classList.remove("hidden");
  });

  document.getElementById("save-settings").addEventListener("click", () => {
    const newTitle = document.getElementById("title-input").value;
    const newBg = document.getElementById("bg-input").value;
    const newDate = document.getElementById("date-input").value;

    localStorage.setItem("countdownTitle", newTitle);
    localStorage.setItem("countdownBg", newBg);
    localStorage.setItem("countdownDate", newDate);

    location.reload();
  });

  document.getElementById("discard-settings").addEventListener("click", () => {
    dialog.classList.add("hidden");
  })
});