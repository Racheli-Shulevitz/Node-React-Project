import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message] = useState(null);
  const navigate = useNavigate();
  const fetchRegister = async (e) => {
    e.preventDefault();
    const newUser = { userName, password, name, email, phone };
    try {
      const { data } = await axios.post(
        "http://localhost:1222/api/auth/register",
        newUser
      );
      console.log(data);
      navigate("/login");
    } catch (err) {
      alert("conflict");
      console.log(err);
    }
  };
  return (
    <>
      <Card
        title={<div style={{ textAlign: "center" }}>הרשמה</div>}
        style={{
          width: "50%",
          maxWidth: "400px",
          padding: "2rem",
          marginLeft: "33%",
          direction: "rtl",
          position: "absolute",
          top: "25%",
        }}
      >
        {message && (
          <Message severity={message.severity} text={message.detail} />
        )}
        <form onSubmit={(e) => fetchRegister(e)}>
          <div className="p-fluid">
            <div className="p-field p-mb-4">
              <label>שם משתמש</label>
              <InputText
                onChange={(e) => setUserName(e.target.value)}
                className="p-inputtext-lg p-d-block"
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="p-field p-mb-4">
              <label>סיסמא</label>
              <InputText
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-inputtext-lg p-d-block"
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="p-field p-mb-4">
              <label>שם</label>
              <InputText
                onChange={(e) => setName(e.target.value)}
                className="p-inputtext-lg p-d-block"
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="p-field p-mb-4">
              <label>דוא"ל</label>
              <InputText
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="p-inputtext-lg p-d-block"
                style={{ direction: "rtl" }}
              />
            </div>
            <div className="p-field p-mb-4">
              <label>טלפון</label>
              <InputText
                onChange={(e) => setPhone(e.target.value)}
                className="p-inputtext-lg p-d-block"
                style={{ direction: "rtl" }}
              />
            </div>
            <Button
              type="submit"
              label="צור חשבון"
              severity="secondary"
              style={{ marginTop: "5%", width: "100%" }}
            />
          </div>
        </form>
      </Card>
    </>
  );
};

export default Register;
