document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Login successful!");
      // You can redirect to dashboard/home page here
      // window.location.href = "../Dashboard/dashboard.html";
    } else {
      document.getElementById("errorMsg").innerText = data.message;
    }

  } catch (err) {
    document.getElementById("errorMsg").innerText = "Network error";
  }
});
