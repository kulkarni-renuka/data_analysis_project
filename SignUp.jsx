import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, role: form.role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-[#E43D12] mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {["email", "password", "confirm"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "password"}
            name={field}
            placeholder={field === "confirm" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full p-3 mb-4 border rounded-md"
          />
        ))}
        <select name="role" value={form.role} onChange={handleChange} className="w-full p-3 mb-4 border rounded-md">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-[#E43D12] text-white py-3 rounded-md font-semibold hover:bg-opacity-90 transition">
          Sign Up
        </button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/login" className="text-[#E43D12] font-medium hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}





