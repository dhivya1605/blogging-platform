import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogbyId = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

 useEffect(() => {
  const fetchBlog = async () => {
    try {
      
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setBlog(data);

      
      const profileRes = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/profile`,
        { credentials: "include" }
      );

      if (profileRes.ok) {
        const profile = await profileRes.json();

        const alreadySaved = profile.savedBlogs?.some(
          (b) => b._id === id
        );

        setIsSaved(alreadySaved);
      }

    } catch {
      setError("Unable to load blog");
    }
  };

  fetchBlog();
}, [id]);


  
  const handleLike = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/blogs/${id}/like`,
        {
          method: "PATCH",
          credentials: "include"
        }
      );

      if (!res.ok) {
        alert("Login required");
        return;
      }

      const updated = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
      setBlog(await updated.json());
    } catch {
      alert("Error while liking");
    }
  };

 const handleSave = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/users/save/${id}`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    if (!res.ok) {
      alert("Login required");
      return;
    }

    const data = await res.json();

    
    setIsSaved(data.saved);

  } catch (err) {
    alert("Error while saving blog");
  }
};



  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/blogs/${id}/comment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify({ message: comment })
        }
      );

      if (!res.ok) {
        
        alert("Login required");
        return;
      }

      setComment("");

     
      const updated = await fetch(`${process.env.REACT_APP_API_URL}/api/blogs/${id}`);
      setBlog(await updated.json());
    } catch {
      alert("Error adding comment");
    }
  };

  if (error) {
    return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  }

  if (!blog) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>{blog.authorId?.name || "Author"}</h2>

      <p style={styles.date}>
        {new Date(blog.createdAt).toLocaleString()}
      </p>

      <p style={styles.description}>{blog.description}</p>

      <button onClick={handleLike} style={styles.likeBtn}>
        👍 Like ({blog.likes.length})
      </button>
    
      <button onClick={handleSave} style={styles.likeBtn}>
      {isSaved ? "Save" : "Unsave"}
      </button>

      <div style={styles.commentSection}>
        <h4>Comments {blog.comments.length}</h4>

        {blog.comments.map((c, index) => (
          <p key={index}>
            <strong>{c.userId?.name || "User"}:</strong> {c.message}
          </p>
        ))}

        <form onSubmit={handleComment} style={styles.commentForm}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  
  container: {
    maxWidth: "750px",
    margin: "50px auto",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
  },

  date: {
    fontSize: "13px",
    color: "#8a8a8a",
    marginBottom: "15px"
  },

  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
    margin: "25px 0"
  },

  
  likeBtn: {
    padding: "8px 16px",
    background: "#f1f3f4",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background 0.2s ease"
  },

  commentSection: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #eee"
  },

  commentForm: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  }
};



export default BlogbyId;
