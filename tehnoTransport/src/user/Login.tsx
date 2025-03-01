import { Checkbox, Field, Label } from "@headlessui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [enabled, setEnabled] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const LOGINURL = "http://localhost:3000/user/login";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(LOGINURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      console.log("User logged in successfully!", data);

      localStorage.setItem("token", data.idToken);
      if (!data.idToken) {
        throw new Error("Token is missing from response");
      }
      // Navigate to dashboard
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
              <h1 className="introh1 text-4xl text-sky-950 pb-5">
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

            <div className="mb-3 mt-3 flex flex-row items-center justify-between">
              <Field className="flex items-center gap-2">
                <Checkbox
                  checked={enabled}
                  onChange={setEnabled}
                  className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                >
                  <svg
                    className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Checkbox>
                <Label>Remember me</Label>
              </Field>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
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
