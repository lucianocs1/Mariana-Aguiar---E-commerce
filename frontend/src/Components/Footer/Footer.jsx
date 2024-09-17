import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logoma.jpg";
import instagram_imagem from "../Assets/instagram_icon.png";
import facebook_imagem from "../Assets/face.png";
import whatsapp_imagem from "../Assets/whatsapp_icon.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="Logo" />
        <p>MARIANA AGUIAR</p>
      </div>
      <ul className="footer-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/produtos">Produtos</a>
        </li>
        <li>
          <a href="/servicos">Serviços</a>
        </li>
        <li>
          <a href="/sobre">Sobre</a>
        </li>
        <li>
          <a href="/contato">Contato</a>
        </li>
        <li>
          <a href="/empresa">Empresa</a>
        </li>
        <li>
          <a href="/faq">FAQ</a>
        </li>
        <li>
          <a href="/blog">Blog</a>
        </li>
        <li>
          <a href="/politica-privacidade">Política de Privacidade</a>
        </li>
        <li>
          <a href="/termos-servico">Termos de Serviço</a>
        </li>
      </ul>
      <div className="footer-contact">
        <h3>Contato</h3>
        <p>
          <strong>Endereço:</strong> Rua Major Vieira, 67 - Cataguases, MG
        </p>
        <p>
          <strong>Telefone:</strong> (32) 1234-5678
        </p>
        <p>
          <strong>Email:</strong> contato@marianaaguiar.com.br
        </p>
      </div>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagram_imagem} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebook_imagem} alt="Facebook" />
          </a>
        </div>
        <div className="footer-icons-container">
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={whatsapp_imagem} alt="WhatsApp" />
          </a>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>© 2024 Mariana Aguiar. Todos os direitos reservados.</p>
      </div>
    </div>
  );
};

export default Footer;
