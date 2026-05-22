import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Registration successful. Please login.");
      navigate("/users/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.heading}>Register</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onFocus={(e) => (e.target.style.borderBottom = "2px solid #1a73e8")}
          onBlur={(e) => (e.target.style.borderBottom = "2px solid #dadce0")}
        />

        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onFocus={(e) => (e.target.style.borderBottom = "2px solid #1a73e8")}
          onBlur={(e) => (e.target.style.borderBottom = "2px solid #dadce0")}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          onFocus={(e) => (e.target.style.borderBottom = "2px solid #1a73e8")}
          onBlur={(e) => (e.target.style.borderBottom = "2px solid #dadce0")}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  </div>
);

};

const styles = {
  // 🌤️ Light background
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  // ⬜ White card
  card: {
    background: "#ffffff",
    width: "360px",
    padding: "35px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  // 🧾 Centered heading
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#202124"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px"
  },

  // ✨ Google-style underline input
  input: {
    border: "none",
    borderBottom: "2px solid #dadce0",
    padding: "10px 5px",
    fontSize: "15px",
    outline: "none",
    color: "#202124"
  },

  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#1a73e8",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer"
  },

  error: {
    color: "#d93025",
    fontSize: "14px",
    textAlign: "center"
  }
};

export default Register;
