import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("تم تسجيل الدخول بنجاح");
      // توجيه المستخدم لصفحة الدردشة أو الرئيسية
      navigate("/chat");
    } catch (err) {
      setError(err.response?.data?.message || "حدث خطأ");
    }
  };

  return (
    <div>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required /><br/><br/><br/>


        <button type="submit">دخول</button>
      <a href="/Anmelden">سجل الآن</a>



      </form>
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}
