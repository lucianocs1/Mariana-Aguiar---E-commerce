import React, { useState } from "react"; // Importa o React e useState para criar o componente
import "./CSS/Login.css"; // Importa o CSS para estilizar o componente

const LoginSignup = () => {
  // Estado para alternar entre "Entrar" e "Crie sua conta"
  const [state, setState] = useState("Entrar");

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Estado para controlar se o checkbox de termos está marcado
  const [isChecked, setIsChecked] = useState(false);

  // Estado para controlar a exibição do modal de sucesso
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Função para atualizar o estado do formulário quando o usuário digita
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Função para atualizar o estado do checkbox
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Função para realizar o login
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
        localStorage.setItem("auth-token", data.token); // Armazena o token no localStorage
        localStorage.setItem("user-name", data.username); // Armazena o nome do usuário no localStorage
        window.location.replace("/"); // Redireciona para a página inicial
      } else {
        alert(data.errors); // Exibe mensagem de erro se o login falhar
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error); // Loga o erro no console
    }
  };

  // Função para realizar o cadastro
  const signup = async () => {
    if (!isChecked) {
      alert("Você precisa concordar com os termos de uso e política de privacidade para continuar.");
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
        localStorage.setItem("auth-token", data.token); // Armazena o token no localStorage
        localStorage.setItem("user-name", data.username); // Armazena o nome do usuário no localStorage
        setShowSuccessModal(true); // Exibe o modal de sucesso
      } else {
        alert(data.errors); // Exibe mensagem de erro se o cadastro falhar
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error); // Loga o erro no console
    }
  };

  return (
    <div className="log">
      <div className="log-container">
        <h1>{state}</h1> {/* Exibe "Entrar" ou "Crie sua conta" dependendo do estado */}

        <div className="log-fields">
          {/* Campos do formulário, nome só aparece em "Crie sua conta" */}
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

        {/* Botão que chama a função login ou signup dependendo do estado */}
        <button onClick={() => (state === "Entrar" ? login() : signup())}>
          {state}
        </button>

        {/* Texto para alternar entre tela de login e cadastro */}
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

        {/* Checkbox para concordar com termos, só aparece em "Crie sua conta" */}
        {state === "Crie sua conta" && (
          <div className="log-agree">
            <input
              type="checkbox"
              id="agree"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <p>
              Ao continuar, concordo com os termos de uso e política de privacidade.
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

export default LoginSignup; // Exporta o componente LoginSignup para uso em outras partes da aplicação
