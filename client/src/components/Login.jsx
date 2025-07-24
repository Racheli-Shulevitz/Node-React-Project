import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const fetchLogin = async (e) => {
    e.preventDefault();
    const newUser = { userName, password };
    try {
      const { data } = await axios.post(
        "http://localhost:1222/api/auth/login",
        newUser
      );
      localStorage.setItem("token", data);
      navigate("/");
      setMessage({
        severity: "success",
        summary: "Welcome",
      });
    } catch (err) {
      console.log(err);
      setMessage({
        severity: "error",
        summary: "Login failed",
        detail: "משתמש זה אינו רשום "
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      <Card
        title={<div style={{ textAlign: "center" }}>כניסה</div>}
        style={{ width: "90%", maxWidth: "400px", padding: "2rem" }}
      >
        {message && (
          <Message severity={message.severity} text={message.detail} />
        )}
        <form>
          <div className="p-fluid">
            <div className="p-field p-mb-4">
              <label>שם משתמש</label>
              <InputText
                onChange={(e) => setUserName(e.target.value)}
                className="p-inputtext-lg p-d-block"
              />
            </div>
            <div className="p-field p-mb-4">
              <label>סיסמא</label>
              <InputText
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="p-inputtext-lg p-d-block"
              />
            </div>
            <Button
              onClick={(e) => fetchLogin(e)}
              label="כניסה למערכת"
              severity="secondary"
              style={{ marginTop: "5%", width: "100%" }}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
