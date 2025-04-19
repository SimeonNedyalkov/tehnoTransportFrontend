import { Field } from "@headlessui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../tools/UserContext";

import "firebase/auth";

export default function Login() {
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const LOGINURL = "https://tehno-transport-b.onrender.com/user/login";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(LOGINURL, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      const userRes = await fetch(
        "https://tehno-transport-b.onrender.com/user/getUser",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${data.idToken}`,
          },
        }
      );

      if (!userRes.ok) throw new Error("Failed to fetch user after login");

      const userData = await userRes.json();
      setUser(userData);
      console.log("User logged in successfully!", data);
      navigation("/app/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <div className="loginForm">
        <div className="formWrapper">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="intro">
              <h1 className="introh1 text-4xl text-sky-950 pb-5 mb-8 pb-8">
                Tehno Transport Admin Login.
              </h1>
              <h5 className="text-sm text-gray-600 pb-5">
                This portal is for Tehno Transport staff only. Unauthorized
                access is prohibited.
              </h5>
            </div>

            {error && <div className="text-lg pb-5">{error}</div>}
            <div className="mb-3 flex flex-col">
              <label className="flex justify-start styledEmail">E-mail</label>
              <input
                type="email"
                className="form-control styledInput"
                placeholder="example@email.com"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3 flex flex-col">
              <label className="flex justify-start styledPassword">
                Password
              </label>
              <input
                type="password"
                className="form-control styledInput"
                placeholder="Your Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="rememberMeForgotPassword mb-3 mt-3 flex flex-row items-center justify-between">
              <Field className="flex items-center gap-2">
                <Link to="register">Don't have an account?</Link>
              </Field>
              <p className="forgot-password text-right">
                Forgot <Link to="forgotPassword">password?</Link>
              </p>
            </div>
            <div className="divider">
              <hr className="line" />
            </div>
            <div className="d-grid flex justify-center">
              <button type="submit" className="loginBtn">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
