"use client";
import { BackgroundBeams } from "@/components/ui/background-beams";
import "./SuccessPage.css"; // Ensure the CSS file is correctly imported

export function SuccessPage() {
  return (
    <div className="success-wrapper">
      <div className="success-container">
        <h2 id="regis">Registration Successful!</h2>
        <p id="text">
          Thank you for registering for the GDG on Campus TIU Core Team
          Interview. If you are shortlisted, you will receive an email with the
          details about the interview.
        </p>
        <p>Best of luck!</p>
      </div>
      <BackgroundBeams />
    </div>
  );
}

export default SuccessPage;
