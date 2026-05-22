import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // important
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      navigate("/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
<div style={styles.container}>
  <div style={styles.card}>
    <h2 style={styles.heading}>Login</h2>

    <form onSubmit={handleSubmit} style={styles.form}>
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
        Login
      </button>
    </form>

    <p style={styles.registerText}>
      Don’t have an account?{" "}
      <Link to="/users/register" style={styles.registerLink}>
        Register
      </Link>
    </p>
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
    background: "#f5f7fb" // light white-blue background
  },

  // ⬜ White login box
  card: {
    background: "#ffffff",
    width: "360px",
    padding: "35px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  // 🧾 Centered Login text
  heading: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#202124" // Google-like text color
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "22px"
  },

  // ✨ Google Form–style input
  input: {
    border: "none",
    borderBottom: "2px solid #dadce0",
    padding: "10px 5px",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    color: "#202124"
  },

  // 🔵 Button
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
  },

  // 👇 Inside the white box
  registerText: {
    marginTop: "20px",
    fontSize: "14px",
    textAlign: "center",
    color: "#5f6368"
  },

  registerLink: {
    color: "#1a73e8",
    textDecoration: "none",
    fontWeight: "500"
  }
};



export default Login;
