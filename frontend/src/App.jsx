import { Routes, Route } from "react-router-dom";
import { Button } from "./components/ui/button";
import { RegisterAffiliate } from "./components/manual/RegisterAffiliate";
import { AffiliateLogin } from "./components/manual/LoginAffiliate";
import { VerifyOTPPage } from "./components/manual/VerifyOtp";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<AffiliateLogin />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        {/* <Route path="/register" element={<RegisterAffiliate />} /> */}
      </Routes>
    </>
  );
}

export default App;
