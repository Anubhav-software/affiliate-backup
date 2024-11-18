import React, { useState } from "react";
import { ClockLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

export const VerifyOTPPage = () => {
  const [email, setEmail] = useState(""); // Email input state
  const [otp, setOtp] = useState(""); // OTP input state
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success message state
  const [error, setError] = useState(""); // Error message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      setError("Please enter both email and OTP.");
      return;
    }

    setLoading(true);
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // OTP verified successfully
        setLoading(false);
        setMessage("OTP verified successfully. Redirecting...");
        // Optionally, navigate to a dashboard or home page
        setTimeout(() => {
          navigate("/dashboard"); // Replace with your desired route
        }, 2000);
      } else {
        setLoading(false);
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-[450px] mx-auto">
      <section className="flex min-h-[88vh] justify-center items-center">
        <div className="border-black/10 border-2 shadow-lg shadow-black/10 w-full m-4 md:m-auto p-4 rounded-lg">
          <h1 className="font-semibold text-2xl text-center mb-5">
            Verify OTP
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
              OTP
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-transparent border-2 border-black/20 duration-200 focus:border-green-700 text-black p-2 focus:outline-none rounded-lg"
              />
            </label>

            {loading ? (
              <button
                className="font-semibold flex gap-3 p-3 bg-green-600 text-white rounded-lg items-center justify-center"
                disabled={true}
              >
                <ClockLoader size={20} color="#fff" />
                <span>Verifying OTP...</span>
              </button>
            ) : (
              <button
                type="submit"
                className={`p-3 ${
                  email && otp.length === 6
                    ? "bg-green-600 text-white cursor-pointer"
                    : "bg-black/30 text-white cursor-not-allowed"
                } rounded-lg mt-3 font-semibold duration-200`}
                disabled={!(email && otp.length === 6)} // Assuming OTP is 6 digits
              >
                Verify OTP
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
