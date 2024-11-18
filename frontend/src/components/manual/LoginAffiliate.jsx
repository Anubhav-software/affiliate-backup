import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export const AffiliateLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password.length >= 8) {
      setLoading(true);
      setMessage("");
      setError("");

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Successfully logged in
          setLoading(false);
          setMessage("OTP sent to your email successfully!");
          setEmail("");
          setPassword("");

          // After successful login, navigate to the VerifyOTPPage
          navigate("/verify-otp"); // Redirect to the OTP verification page
        } else {
          setLoading(false);
          setError(data.message || "Login failed. Please try again.");
        }
      } catch (err) {
        setLoading(false);
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-[450px] mx-auto">
      <section className="flex min-h-[88vh] justify-center items-center">
        <div className="border-black/10 border-2 shadow-lg shadow-black/10 w-full m-4 md:m-auto p-4 rounded-lg">
          <h1 className="font-semibold text-2xl text-center mb-5">
            Login to your Affiliate Account
          </h1>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2">
              Email
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-2 border-black/20 duration-200 focus:border-green-700 text-black p-2 focus:outline-none rounded-lg"
              />
            </label>

            <label className="flex flex-col gap-2">
              Password
              <div className="flex justify-between items-center border-2 rounded-lg border-black/20 p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[90%] bg-transparent focus:outline-none"
                />
                {showPassword ? (
                  <EyeOff onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <Eye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              {password.length > 0 && password.length < 8 && (
                <span className="text-red-500">
                  Password should have at least 8 characters
                </span>
              )}
            </label>

            {loading ? (
              <button
                className="font-semibold flex gap-3 p-3 bg-green-600 text-white rounded-lg items-center justify-center"
                disabled={true}
              >
                <ClockLoader size={20} color="#fff" />
                <span>Onboarding...</span>
              </button>
            ) : (
              <button
                type="submit"
                className={`p-3 ${
                  email && password.length >= 8
                    ? "bg-green-600 text-white cursor-pointer"
                    : "bg-black/30 text-white cursor-not-allowed"
                } rounded-lg mt-3 font-semibold duration-200`}
                disabled={!(email && password.length >= 8)}
              >
                Send OTP
              </button>
            )}

            {message && (
              <div className="mt-3 text-green-600 font-semibold">{message}</div>
            )}

            {error && (
              <div className="mt-3 text-red-600 font-semibold">{error}</div>
            )}
          </form>
        </div>
      </section>
    </div>
  );
};
