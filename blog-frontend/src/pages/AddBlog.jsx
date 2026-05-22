import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", 
        body: JSON.stringify({ description })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login required");
        navigate("/users/login");
        return;
      }

      alert("Blog added successfully");
      navigate("/"); 
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
  <div style={styles.container}>
    <div style={styles.card}>
      <h2 style={styles.heading}>Add Blog</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          rows="8"
          placeholder="Write your blog here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={styles.textarea}
          onFocus={(e) =>
            (e.target.style.borderBottom = "2px solid #1a73e8")
          }
          onBlur={(e) =>
            (e.target.style.borderBottom = "2px solid #dadce0")
          }
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Post Blog
        </button>
      </form>
    </div>
  </div>
);
};

const styles = {
  
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb"
  },

  
  card: {
    background: "#ffffff",
    width: "500px",
    padding: "35px 30px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

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

  
  textarea: {
    border: "none",
    borderBottom: "2px solid #dadce0",
    padding: "10px 5px",
    fontSize: "15px",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
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


export default AddBlog;
