import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [protectedData, setProtectedData] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // عند تحميل الصفحة
  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    axios
      .get("http://localhost:5000/api/chat/protected-route", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProtectedData(res.data.message))
      .catch((err) => setProtectedData("فشل في جلب البيانات"));

    fetchMessages();
  }, []);

  // جلب الرسائل
  const fetchMessages = () => {
    axios
      .get("http://localhost:5000/api/chat/messages", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error(err));
  };

  // إرسال رسالة
  const handleSend = async () => {
    if (!message.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/chat/send",
        { content: message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("");
      fetchMessages(); // تحديث الرسائل بعد الإرسال
    } catch (err) {
      console.error("خطأ في إرسال الرسالة:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>مرحبا بك في الدردشة</h2>
      <p>{protectedData}</p>
      <div style={{ border: "1px solid gray", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.content}</p>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          type="text"
          placeholder="اكتب رسالتك"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ width: "70%" }}
        />
        <button onClick={handleSend}>إرسال</button>
        <button onClick={handleLogout} style={{ marginLeft: 10 }}>تسجيل الخروج</button>
      </div>
    </div>
  );
}
