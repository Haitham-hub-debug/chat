// src/Register.jsx
import { useState } from "react";
import axios from "axios";

export default function anmelden() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/anmelden", {
        username,
        email,
        password,
      });
      alert("تم التسجيل بنجاح، يمكنك الآن تسجيل الدخول");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div>
      <h2>تسجيل حساب جديد</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="الاسم" value={username} onChange={e => setUsername(e.target.value)} required />
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">تسجيل</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
