import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Briefcase, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import logo from "../../public/Akira_logo.webp";

const departments = [
  "Support Engineer",
  "Service Engineer",
  "R&D",
  "Admin",
  "Sales",
  "Quality Assurance"
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    dob: "",
    department: "Support Engineer",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, userId, email, dob, department, password, confirmPassword } = formData;

    // Basic Validation
    if (!name || !userId || !email || !dob || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if user already exists
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    if (employees.some(emp => emp.userId.toLowerCase() === userId.toLowerCase())) {
      setError("User ID already exists. Please choose another one.");
      return;
    }

    // Register new employee
    const newEmployee = {
      name,
      userId,
      email,
      dob,
      department,
      role: department,
      password
    };

    const updatedEmployees = [...employees, newEmployee];
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));

    setSuccess("Registration successful! Redirecting to login...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden text-gray-700">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-700 opacity-80"></div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-[0.5vw] h-[0.5vw] bg-white bg-opacity-20 rounded-full transition-all duration-[6000ms] ${
                mounted ? "animate-pulse" : ""
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[40%]">
        <div
          className={`transition-all duration-1000 ${
            mounted
              ? "transform translate-y-0 opacity-100"
              : "transform translate-y-8 opacity-0"
          }`}
        >
          <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl p-[2vw] border border-white border-opacity-20">
            <div className="flex items-center justify-between mb-[1vw]">
               <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-[0.3vw] text-[0.85vw] text-gray-500 hover:text-blue-600 transition-colors"
               >
                 <ArrowLeft size={"1vw"} /> Back to Login
               </button>
               <img src={logo} alt="App Logo" className="w-[6vw]" />
            </div>

            <div className="text-center mb-[1.5vw]">
              <h1 className="text-[1.5vw] font-bold text-gray-800">Employee Registration</h1>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-[1vw] px-[1vw] py-[0.5vw] bg-red-50 border border-red-300 rounded-lg flex items-center gap-[0.5vw]">
                <div className="w-[0.5vw] h-[0.5vw] bg-red-500 rounded-full flex-shrink-0"></div>
                <p className="text-red-600 text-[0.85vw] font-medium">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-[1vw] px-[1vw] py-[0.5vw] bg-green-50 border border-green-300 rounded-lg flex items-center gap-[0.5vw]">
                <div className="w-[0.5vw] h-[0.5vw] bg-green-500 rounded-full flex-shrink-0"></div>
                <p className="text-green-600 text-[0.85vw] font-medium">{success}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-[1.5vw] gap-y-[1vw]">
              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Full Name *
                </label>
                <div className="relative">
                  <User size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Enter full name"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Employee ID / User ID *
                </label>
                <div className="relative">
                  <ShieldCheck size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="e.g. Fisto9"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="example@akira.com"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Date of Birth *
                </label>
                <div className="relative">
                  <Calendar size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                  />
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Department / Role *
                </label>
                <div className="relative">
                  <Briefcase size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="relative group">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Password *
                </label>
                <div className="relative">
                  <Lock size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Create password"
                  />
                </div>
              </div>

              <div className="relative group col-span-2">
                <label className="block text-[0.8vw] font-medium text-gray-700 mb-[0.4vw]">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock size={"1vw"} className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-[2.2vw] text-[0.85vw] pr-[1vw] py-[0.5vw] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="col-span-2 mt-[1vw] text-[1vw] w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-[0.7vw] rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300"
              >
                Complete Registration
              </button>
            </form>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
