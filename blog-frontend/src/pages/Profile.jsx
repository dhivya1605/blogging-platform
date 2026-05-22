import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/profile`,
          { credentials: "include" }
        );

        if (!res.ok) {
          throw new Error();
        }

        const data = await res.json();
        setUser(data);
      } catch {
        setError("Unable to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!user) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
  <div style={styles.container}>
    <div style={styles.profileCard}>
      <h2 style={styles.name}>{user.name}</h2>
      <p style={styles.email}>{user.email}</p>

      <h3 style={styles.sectionTitle}>Saved Blogs</h3>

      {user.savedBlogs.length === 0 ? (
        <p style={styles.empty}>No saved blogs yet</p>
      ) : (
        user.savedBlogs.map((blog) => (
          <div key={blog._id} style={styles.blogCard}>
            <p style={styles.blogText}>{blog.description}</p>

            <button
              onClick={() => navigate(`/blogs/${blog._id}`)}
              style={styles.viewBtn}
            >
              View Blog
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

};
const styles = {
  
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "40px",
    background: "#f5f7fb"
  },

 
  profileCard: {
    width: "750px",
    background: "#ffffff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  name: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#202124",
    marginBottom: "5px"
  },

  email: {
    fontSize: "14px",
    color: "#5f6368",
    marginBottom: "25px"
  },

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#333"
  },

  empty: {
    fontSize: "14px",
    color: "#777"
  },

  
  blogCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "16px",
    marginBottom: "15px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px"
  },

  blogText: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "1.5",
    flex: 1
  },


  viewBtn: {
    padding: "8px 14px",
    background: "#1a73e8",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    whiteSpace: "nowrap"
  }
};



export default Profile;
