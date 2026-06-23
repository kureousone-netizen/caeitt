const API = "http://127.0.0.1:8000";

const form = document.getElementById("signup-form");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;
    const room = document.getElementById("signup-room").value.trim();
    // 2. CRITICAL: Gather the new mandatory database parameters
    const matricNo = document.getElementById("signup-matric").value.trim();
    const phoneNo = document.getElementById("signup-phone").value.trim();

    // 3. Construct the perfect structural payload matching your Python Pydantic Schema
    const payload = {
      full_name: name,
      email_address: email,
      password: password,
      room_number: room,
      matric_no: matricNo, 
      phone_no: phoneNo 
    };

    try {
      const response = await fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        // Capture FastAPI detail errors, fallback to a standard error string
        const errorMessage = data.detail ? (typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail)) : "Signup failed.";
        alert(errorMessage);
        return;
      }

      alert("Signup successful! 🎉");
      window.location.href = "login.html";

    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Make sure the API is running.");
    }
  });
}