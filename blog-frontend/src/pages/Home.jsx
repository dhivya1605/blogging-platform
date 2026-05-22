import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/blogs`)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  
  const handleLike = async (e, blogId) => {
    e.stopPropagation(); 

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/blogs/${blogId}/like`,
      {
        method: "PATCH",
        credentials: "include"
      }
    );

    if (!res.ok) {
      alert("Login required");
      return;
    }

    fetchBlogs(); 
  };

  
  const handleComment = (e, blogId) => {
    e.stopPropagation(); 
    navigate(`/blogs/${blogId}`);
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading blogs...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Blogs</h2>

      {blogs.length === 0 && <p>No blogs found</p>}

      {blogs.map((blog) => (
        <div
          key={blog._id}
          style={styles.card}
          onClick={() => navigate(`/blogs/${blog._id}`)}
        >
          
          <div style={styles.date}>
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>

         
          <p style={styles.description}>{blog.description}</p>

         
          <div style={styles.bottomRow}>
            
            <span style={styles.author}>
              By : {blog.authorId?.name || "Unknown"}
            </span>

            
            <div style={styles.actions}>
              <button
                style={styles.actionBtn}
                onClick={(e) => handleLike(e, blog._id)}
              >
                👍 {blog.likes.length}
              </button>

              <button
                style={styles.actionBtn}
                onClick={(e) => handleComment(e, blog._id)}
              >
                💬 {blog.comments.length}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "10px"
  },

  heading: {
    marginBottom: "25px",
    fontSize: "26px",
    fontWeight: "600",
    color: "#222",
    textAlign: "center"
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "18px 20px",
    marginBottom: "20px",
    cursor: "pointer",
    position: "relative",

   
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  },

  
  cardHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)"
  },

  date: {
    position: "absolute",
    top: "14px",
    right: "18px",
    fontSize: "12px",
    color: "#999"
  },

  description: {
    marginTop: "30px",
    marginBottom: "28px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333"
  },

  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  author: {
    fontWeight: "500",
    fontSize: "14px",
    color: "#555"
  },

  actions: {
    display: "flex",
    gap: "18px"
  },

  actionBtn: {
    background: "#f7f7f7",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#444",
    transition: "background 0.2s ease"
  },

  actionBtnHover: {
    background: "#ececec"
  }
};


export default Home;
