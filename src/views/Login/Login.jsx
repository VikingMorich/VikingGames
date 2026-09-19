import "./Login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useGlobalDB } from "../../hooks/useGlobalDB";

export const Login = () => {
  const navigate = useNavigate();
  const { loginAdmin, user: loggedUser } = useGlobalDB();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (loggedUser) {
      navigate("/user", { replace: true });
    }
  }, [loggedUser, navigate]);

  const loginFunction = async () => {
    try {
      await loginAdmin(user, password);
    } catch (error) {
      toast.error("Email o contrassenya incorrectes", {
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="login-view">
      <div className="login-wrap">
        <div className="login-op">
          <span>Email: </span>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </div>
        <div className="login-op">
          <span>Contrassenya: </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-button" onClick={loginFunction}>
          Entrar
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
