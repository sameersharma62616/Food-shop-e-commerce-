import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
    );
  }, []);

  // console.log(process.env.REACT_APP_API_BASE_URL);
  
  const handleAuth = async (e) => {
    e.preventDefault();
  
    // Check if the user is the owner
    if (email === "itsoftlab@gmail.com" && password === "9109622511") {
      navigate("/ownerdashboard");
      return;
    }
  
    try {
      const url = isSignup
        ? `${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`
        :  `${process.env.REACT_APP_API_BASE_URL}/api/auth/login`;
      const data = isSignup ? { name, email, password } : { email, password };
  
      const res = await axios.post(url, data);
  
      if (!isSignup) {
        localStorage.setItem("token", res.data.token);
        navigate("/BrandDashboard");
      } else {
        alert("Signup successful, please login.");
        setIsSignup(false);
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 ref={titleRef} style={styles.title}>
          {isSignup ? "Create Account" : "Welcome To APNA FOOD"}
        </h2>
        <p style={styles.subtitle}>
          {isSignup ? "Sign up to get started!" : "Login to continue."}
        </p>
        <form onSubmit={handleAuth} ref={formRef} style={styles.form}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p
          style={styles.toggleText}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

// 💎 **Final Optimized CSS Styling**
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    // backgroundImage: "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    background: "linear-gradient(to right, #87CEFA, #00FFFF)", 
    transition: "all 0.5s ease-in-out",
  },
  formContainer: {
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.32)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "15px",
    width: "60vh",
    textAlign: "center",
    animation: "fadeIn 1s ease-in-out",
  },
  title: {
    fontSize: "35px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0px 2px 5px rgba(0,0,0,0.3)",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "18px",
    color: "#ddd",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "15px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    background: "rgba(255, 255, 255, 0.3)",
    color: "#fff",
    outline: "none",
    transition: "0.3s",
    textAlign: "center",
  },
  button: {
    background: "linear-gradient(to right, #ff416c, #ff4b2b)",
    color: "#fff",
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "transform 0.3s",
    fontWeight: "bold",
  },
  toggleText: {
    color: "white",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "16px",
    transition: "0.3s",
    fontWeight: "400"
  },
};

export default AuthPage;
