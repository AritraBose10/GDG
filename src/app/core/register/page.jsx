"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GDGRegistrationForm.css";

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [skills, setSkills] = useState([{ skill: "", level: "" }]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({});
  const [portfolioLink, setPortfolioLink] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const onSubmit = async (data) => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        "https://gdg-reg.onrender.com/check-existing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.email,
            contactNumber: data.contactNumber,
            collegeId: data.collegeId,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 400) {
        if (result.emailExists)
          toast.error("This email is already registered.");
        if (result.contactExists)
          toast.error("This contact number is already registered.");
        if (result.collegeIdExists)
          toast.error("This College ID is already registered.");
        setIsLoading(false); // Reset loading state
        return;
      }

      setFormData({
        ...data,
        skills,
        portfolio: data.portfolio || "",
      });
      setShowConfirmation(true);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      setIsLoading(false); // Reset loading state
    }
  };

  const confirmSubmit = () => {
    fetch("https://gdg-reg.onrender.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        toast.success("Registration successful!");
        setShowConfirmation(false);
        resetForm();
        setIsLoading(false); // Reset loading state
        setTimeout(() => {
          router.push("/core/success");
        }, 1000);
      })
      .catch(() => {
        toast.error("An error occurred. Please try again.");
        setIsLoading(false); // Reset loading state
      });
  };

  const resetForm = () => {
    setSkills([{ skill: "", level: "" }]);
    setPortfolioLink("");
    setFormData({});
    setShowConfirmation(false);
    setIsLoading(false);
    reset();
  };
  const handleCancel = () => {
    setShowConfirmation(false);
    setIsLoading(false);
  };
  const addSkill = () => {
    if (skills.length < 3) setSkills([...skills, { skill: "", level: "" }]);
  };

  const updateSkill = (index, field, value) => {
    const updatedSkills = skills.map((skill, i) => {
      if (i === index) return { ...skill, [field]: value };
      return skill;
    });
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-gray-950 relative">
      <ToastContainer />

      <div className="w-[min(70rem,100%)] mx-auto p-4 z-10 relative">
        <div className="text-white text-center p-3 text-lg">
          <h1 className="heading">GDG on Campus TIU Core Team Registration</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3>Personal Information</h3>
            {/* Full Name Input */}
            <div className="form-group">
              <input
                id="fullName"
                {...register("fullName", {
                  required: "Full name is required",
                })}
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="error-message">{errors.fullName.message}</p>
              )}
            </div>
            {/* Email Input */}
            <div className="form-group">
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                placeholder="Email ID"
              />
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>
            {/* Contact Number Input */}
            <div className="form-group">
              <input
                id="contactNumber"
                type="tel"
                {...register("contactNumber", {
                  required: "Contact number is required",
                })}
                placeholder="Contact Number"
              />
              {errors.contactNumber && (
                <p className="error-message">{errors.contactNumber.message}</p>
              )}
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="form-section">
            <h3>Academic Information</h3>
            {/* Year of Study Input */}
            <div className="form-group">
              <select
                id="yearOfStudy"
                {...register("yearOfStudy", {
                  required: "Year of study is required",
                })}
              >
                <option value="">Year of Study</option>

                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              {errors.yearOfStudy && (
                <p className="error-message">{errors.yearOfStudy.message}</p>
              )}
            </div>
            {/* Batch Input */}
            <div className="form-group">
              <input
                id="batch"
                {...register("batch", {
                  required: "Batch is required",
                })}
                placeholder="Batch"
              />
              {errors.batch && (
                <p className="error-message">{errors.batch.message}</p>
              )}
            </div>
            {/* College ID Input */}
            <div className="form-group">
              <input
                id="collegeId"
                {...register("collegeId", {
                  required: "College ID is required",
                })}
                placeholder="College ID"
              />
              {errors.collegeId && (
                <p className="error-message">{errors.collegeId.message}</p>
              )}
            </div>
          </div>

          {/* Experience & Skills Section */}
          <div className="form-section">
            <h3>Experience & Skills</h3>
            {/* Past Member Input */}
            <div className="form-group">
              <select
                id="pastMember"
                {...register("pastMember", {
                  required: "This field is required",
                })}
              >
                <option value="">
                  Member of the Core Team in past year/years?
                </option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.pastMember && (
                <p className="error-message">{errors.pastMember.message}</p>
              )}
            </div>
            {/* Skills Input */}
            <div className="form-group">
              <label>Skills (Max 3)</label>
              {skills.map((skill, index) => (
                <div key={index} className="skill-input">
                  <input
                    placeholder="Skill"
                    value={skill.skill}
                    onChange={(e) =>
                      updateSkill(index, "skill", e.target.value)
                    }
                  />
                  <select
                    value={skill.level}
                    onChange={(e) =>
                      updateSkill(index, "level", e.target.value)
                    }
                  >
                    <option value="">Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="remove-skill-btn"
                  >
                    ×
                  </button>
                </div>
              ))}
              {skills.length < 3 && (
                <button
                  type="button"
                  onClick={addSkill}
                  className="add-skill-btn"
                >
                  + Add Skill
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="roles">Which role are you applying for?</label>
            <select
              id="roles"
              {...register("roles", {
                required: "Please select a role",
              })}
              onChange={(e) => setSelectedRole(e.target.value)} // Handle the change here
            >
              <option value="">Select a role</option>
              <option value="Technical">Technical</option>
              <option value="Non Technical">Non Technical</option>
              <option value="Both">Both</option>
            </select>
            {errors.roles && (
              <p className="error-message">{errors.roles.message}</p>
            )}
          </div>
          {(selectedRole === "Technical" || selectedRole === "Both") && (
            <div className="form-group">
              <label htmlFor="technicalDomains">Select your domain</label>
              <select
                id="technicalDomains"
                {...register("technicalDomains", {
                  required: "Please select a domain",
                })}
              >
                <option value="">Select a technical domain</option>
                <option value="DSA/Competitive Programming">
                  DSA/Competitive Programming
                </option>
                <option value="Cloud and GenAI">Cloud and GenAI</option>
                <option value="Robotics">Robotics</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Web Development">Web Development</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Android Development">Android Development</option>
                <option value="Flutter Development">Flutter Development</option>
              </select>
              {errors.technicalDomains && (
                <p className="error-message">
                  {errors.technicalDomains.message}
                </p>
              )}
            </div>
          )}

          {(selectedRole === "Non Technical" || selectedRole === "Both") && (
            <div className="form-group">
              <label htmlFor="nonTechnicalDomains">Select your domain</label>
              <select
                id="nonTechnicalDomains"
                {...register("nonTechnicalDomains", {
                  required: "Please select a domain",
                })}
              >
                <option value="">Select a non-technical domain</option>
                <option value="Content Writing">Content Writing</option>
                <option value="Poster Making">Poster Making</option>
                <option value="Videography/Photography">
                  Videography/Photography
                </option>
                <option value="Outreach">Outreach</option>
                <option value="Social Media Handling">
                  Social Media Handling
                </option>
              </select>
              {errors.nonTechnicalDomains && (
                <p className="error-message">
                  {errors.nonTechnicalDomains.message}
                </p>
              )}
            </div>
          )}

          {/* Additional Information Section */}
          <div className="form-section">
            <h3>Additional Information</h3>
            {/* Portfolio Link Input */}
            <div className="form-group">
              <label htmlFor="portfolio" className="text-input-label">
                <input
                  id="portfolio"
                  type="text"
                  placeholder="Link to your portfolio, or resume (Optional)"
                  {...register("portfolio")}
                  className="text-input"
                  onChange={(e) => setPortfolioLink(e.target.value)}
                />
                {portfolioLink && (
                  <div className="portfolio-info">
                    <span className="portfolio-icon">🔗</span>
                    <span>{portfolioLink}</span>
                  </div>
                )}
              </label>
            </div>

            {/* Reason Textarea Input */}
            <div className="form-group">
              <textarea
                id="reason"
                {...register("reason", {
                  required: "This field is required",
                })}
                placeholder="Why do you want to be a part of GDSC Core Team?"
              />
              {errors.reason && (
                <p className="error-message">{errors.reason.message}</p>
              )}
            </div>

            {/* Commitment Select Input */}
            <div className="form-group">
              <label>
                Can you keep up with regular attendance and active
                participation?
              </label>
              <select
                id="commitment"
                {...register("commitment", {
                  required: "This field is required",
                })}
              >
                <option value="">Select an answer</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
              {errors.commitment && (
                <p className="error-message">{errors.commitment.message}</p>
              )}
            </div>
          </div>

          {/* Form Alert */}
          <div className="form-alert">
            <p>
              Please ensure all information provided is accurate. Your
              application will be reviewed by the GDG on Campus TIU team.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={() => handleSubmit(onSubmit)()}
            className={`submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div> // Loader element
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-dialog">
            <h3>Confirm Submission</h3>
            <p>
              Are you sure you want to submit the form? Please ensure all
              details are correct.
            </p>
            <div className="confirmation-buttons">
              <button onClick={confirmSubmit} className="confirm-btn">
                Yes, Submit
              </button>
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <BackgroundBeams />
    </div>
  );
};

export default Page;
