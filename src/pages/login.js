import React, { useState } from 'react';
import "../assets/styles/login.css"
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://nexiasoftpi-production.up.railway.app/api/user/login", requestOptions)
    .then((response) => response.json()) // Cambiar response.text() a response.json()
    .then((result) => {
      console.log(result); // Imprime la respuesta completa en la consola
  
      // Verificar si 'result.data' está presente y no es 'undefined' antes de acceder a 'result.data.token'
      if (result.data && result.data.token) {
        const token = result.data.token; // Obtener el token desde 'data'
        console.log("Token:", token); // Imprimir el token en la consola
  
        // Aquí puedes utilizar el token para lo que necesites, como almacenarlo en el estado del componente o enviarlo en las solicitudes al servidor.
  
        setIsAuthenticated(true); 
        navigate('/Datos'); // Redirigir al usuario a la página deseada (por ejemplo, la página "Datos")
      } else {
        alert('Credenciales incorrectas. Inténtalo de nuevo.');
      }
      })
      .catch((error) => console.log("error", error));
  };


  return (
    <div className="container">
      <h1 className="text-center">NexiaSoft</h1>
      <form className="mx-auto" onSubmit={handleSubmit}>
        <h4 className="text-center">Bienvenido</h4>
        <div className="imagen"></div>
        <div className="mb-3 mt-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <input
            type="email"
            placeholder="Ingresa el usuario"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            placeholder="Ingrese la contraseña"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-5">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
