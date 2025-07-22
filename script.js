const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("errorMsg").innerText = data.message || "Signup failed";
    } else {
      alert("Signup successful!");
      window.location.href = "../Login/login.html";
    }
  } catch (err) {
    document.getElementById("errorMsg").innerText = "Network Error";
  }
});
