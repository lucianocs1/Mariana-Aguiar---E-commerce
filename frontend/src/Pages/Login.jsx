import React, { useState } from "react";
import "./CSS/Login.css";

const LoginSignup = () => {
  const [state, setState] = useState("Entrar");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para exibir o modal

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const login = async () => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-name", data.username);
        window.location.replace("/");
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const signup = async () => {
    if (!isChecked) {
      alert(
        "Você precisa concordar com os termos de uso e política de privacidade para continuar."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth-token", data.token);
        localStorage.setItem("user-name", data.username);
        setShowSuccessModal(true); // Exibe o modal de sucesso
      } else {
        alert(data.errors);
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    }
  };

  return (
    <div className="log">
      <div className="log-container">
        <h1>{state}</h1>

        <div className="log-fields">
          {state === "Crie sua conta" && (
            <input
              type="text"
              placeholder="Seu nome"
              name="username"
              value={formData.username}
              onChange={changeHandler}
            />
          )}
          <input
            type="email"
            placeholder="Digite seu e-mail"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Digite sua senha"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>

        <button onClick={() => (state === "Entrar" ? login() : signup())}>
          {state}
        </button>

        {state === "Entrar" ? (
          <p className="log-login">
            Não possui conta?{" "}
            <span onClick={() => setState("Crie sua conta")}>
              Crie sua conta aqui
            </span>
          </p>
        ) : (
          <p className="log-login">
            Já possui uma conta?{" "}
            <span onClick={() => setState("Entrar")}>Entre aqui</span>
          </p>
        )}

        {state === "Crie sua conta" && (
          <div className="log-agree">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p>
              Ao continuar, concordo com os termos de uso e política de
              privacidade.
            </p>
          </div>
        )}
      </div>

      {/* Modal Popup de sucesso */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Conta criada com sucesso!</h2>
            <button onClick={() => window.location.replace("/")}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
