import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/users/profile`, {
      credentials: "include"
    })
      .then(res => {
        if (res.ok) setIsAuth(true);
        else setIsAuth(false);
      })
      .catch(() => setIsAuth(false));
  }, []);

  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/users/logout`, {
      method: "POST",
      credentials: "include"
    });

    setIsAuth(false);
    navigate("/users/login");
  };

  return (
    <nav style={styles.navbar}>
      <ul style={styles.menu}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/blogs/add" style={styles.link}>Add Blog</Link></li>

        {!isAuth ? (
          <>
            <li><Link to="/users/login" style={styles.link}>Login</Link></li>
            
          </>
        ) : (
          <>
            <li><Link to="/users/profile" style={styles.link}>Profile</Link></li>
            <li>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    height: "64px",
    background: "linear-gradient(90deg, #fafaffff, #dcdce3ff)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },

  menu: {
    listStyle: "none",
    display: "flex",
    gap: "30px",
    margin: 0,
    padding: 0,
    alignItems: "center"
  },

  link: {
    color: "linear-gradient(90deg, #6262d0ff, #cecef4ff)",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    padding: "6px 10px",
    borderRadius: "6px",
    transition: "background 0.3s ease"
  },

  logoutBtn: {
    background: "rgba(223, 71, 71, 0.9)",
    border: "none",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "500",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s ease"
  }
};


export default Navbar;
