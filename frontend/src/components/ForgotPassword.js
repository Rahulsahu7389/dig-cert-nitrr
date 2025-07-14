import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import urls from "../urls.json";
const server = urls.SERVER_URL;

const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [flag, setflag] = useState(false);
  const [password, setpassword] = useState("");
  const [code, setcode] = useState("")
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      let response = await fetch(`${server}/api/forgot_password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      let data = await response.json();
      if (data.success == true) {
        alert(data.message);
        setflag(true);
      } else {
        alert(data.message);
        navigate("/forgot_password");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("error while sending the otp");
      
    }

  }
  const handleSubmit2 = async (e) => {
    setflag(true);
    e.preventDefault();
    let response = await fetch(`${server}/api/verify_otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":email, "password": password, "code": code }),
    });
    let data = await response.json();
    if (data.success) {
      alert(data.message);
      navigate("/login");
    } else {
      alert("Error sending password reset link. Please try again.");
    }
  }
  console.log(email);
  useEffect(() => {

    setflag(false);
  }, [])


  return (
    <div>
      <div className="container">
        {!flag && (
          <div className="row justify-content-center">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: "100vh",
              }}
              className="col-md-6"
            >
              <h2 className="text-center" style={{ color: "white" }}>Forgot Password</h2>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "blue", color: "white" }}>
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        )}
        {flag && (
          <div className="second-container" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100vh",
          }}>
            <form action="" onSubmit={handleSubmit2} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
            }}>
              <div className="mb-3">
                <label htmlFor="new-password" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  id="new-password"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirm-password" className="form-label">
                  verification code
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={code}

                  onChange={(e) => setcode(e.target.value)}
                  placeholder="enter verification code"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "blue", color: "white" }}>
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;