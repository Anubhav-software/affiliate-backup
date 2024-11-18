import { Eye, EyeOff } from "lucide-react";
import { ClockLoader } from "react-spinners";
import { useState } from "react";
import axios from "axios";

export const RegisterAffiliate = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [aadharImages, setAadharImages] = useState([null, null]);
  const [panImage, setPanImage] = useState(null);

  const handleAadharImageChange = (e, index) => {
    const newAadharImages = [...aadharImages];
    newAadharImages[index] = e.target.files[0];
    setAadharImages(newAadharImages);
  };

  const handlePanImageChange = (e) => {
    setPanImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append form fields
    formData.append("fullName", e.target.fullName.value);
    formData.append("email", e.target.email.value);
    formData.append("mobile", e.target.phoneNumber.value);
    formData.append("aadharNumber", e.target.aadharNumber.value);
    formData.append("panNumber", e.target.panNumber.value);
    formData.append("accountNumber", e.target.accountNumber.value);
    formData.append("ifscCode", e.target.ifscCode.value);
    formData.append("bankName", e.target.bankName.value);
    formData.append("branchName", e.target.branchName.value);
    formData.append("password", e.target.password.value);
    formData.append("confirmPassword", e.target.confirmPassword.value);

    // Append files (Aadhar and PAN images)
    if (aadharImages[0]) {
      formData.append("aadharFront", aadharImages[0]);
    }
    if (aadharImages[1]) {
      formData.append("aadharBack", aadharImages[1]);
    }
    if (panImage) {
      formData.append("panFront", panImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Registration successful:", response.data);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error during registration:", error);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <section className="flex min-h-[88vh] m-5 justify-center items-center">
        <div className="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 p-[2px] rounded-lg shadow-lg w-full m-4 md:m-auto">
          <div className="bg-white p-6 rounded-lg">
            <h1 className="font-semibold text-3xl text-center mb-6 text-gray-800">
              Become An Affiliate
            </h1>

            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">Full Name</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">Username</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Phone Number
                  </span>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Aadhar Number
                  </span>
                  <input
                    type="text"
                    name="aadharNumber"
                    placeholder="Aadhar Number"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    PAN Number
                  </span>
                  <input
                    type="text"
                    name="panNumber"
                    placeholder="PAN Number"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">Bank Name</span>
                  <input
                    type="text"
                    name="bankName"
                    placeholder="Bank Name"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Branch Name
                  </span>
                  <input
                    type="text"
                    name="branchName"
                    placeholder="Branch Name"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Account Number
                  </span>
                  <input
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">IFSC Code</span>
                  <input
                    type="text"
                    name="ifscCode"
                    placeholder="IFSC Code"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>

                {/* <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Aadhar Images (Front & Back)
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleAadharImageChange(e, 0)}
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                    accept="image/*"
                  />
                  <input
                    type="file"
                    onChange={(e) => handleAadharImageChange(e, 1)}
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                    accept="image/*"
                  />
                </label> */}
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">PAN Image</span>
                  <input
                    type="file"
                    onChange={handlePanImageChange}
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                    accept="image/*"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Aadhar Front Image
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleAadharImageChange(e, 0)}
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                    accept="image/*"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Aadhar Back Image
                  </span>
                  <input
                    type="file"
                    onChange={(e) => handleAadharImageChange(e, 1)}
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                    accept="image/*"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                  <span
                    className="absolute right-5 top-2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  ></span>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-gray-700 font-semibold">
                    Confirm Password
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="bg-transparent border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-100 duration-200 ease-in-out shadow-sm hover:shadow-md"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>

              <button
                type="submit"
                className="mt-4 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? <ClockLoader color="white" size={24} /> : "Register"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
