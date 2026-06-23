const API = "";

const form = document.getElementById("login-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {// 1. Send the login request payload to your FastAPI endpoint
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          // Ensure these keys exactly match your FastAPI OAuth2 / Pydantic login parameters
          email: email, 
          password: password 
        })
      });

      const data = await response.json();

      // 2. CRITICAL: Catch authentication failures or validation errors immediately
      if (!response.ok) {
        // Capture FastAPI's standard data.detail error format dynamically
        const errorMessage = data.detail ? (typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)) : "Invalid email or password.";
        alert(errorMessage);
        return;
      }

      // 3. Save your generated token & user info securely in local memory
      // Note: If your backend uses OAuth2 tokens, data.token might be named data.access_token
      localStorage.setItem("token", data.token || data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login successful! 🍰 Welcome back.");
      window.location.href = "index.html";

    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Make sure the API is running.");
    }
  });
}