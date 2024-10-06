import { useEffect, useState } from 'react';
import './App.css';
import Conversor from './conversor';

function App() { 
  // Definimos estados locales para manejar el usuario, clave y estado de autenticación
  const [usuario, setUsuario] = useState(''); // Estado para almacenar el usuario ingresado
  const [clave, setClave] = useState(''); // Estado para almacenar la contraseña ingresada
  const [logeado, setLogeado] = useState(false); // Estado para saber si el usuario ha iniciado sesión

  // Función para actualizar el estado del usuario cuando el input cambia
  function cambiarUsuario(evento) {
    setUsuario(evento.target.value); // Tomar el valor del input y actualizar el estado
  }

  // Función para actualizar el estado de la clave cuando el input cambia
  function cambiarClave(evento) {
    setClave(evento.target.value); // Tomar el valor del input y actualizar el estado
  }

  // Función asíncrona para manejar el inicio de sesión
  async function ingresar() {
    console.log('Usuario: ', usuario);
    console.log('Clave: ', clave);

    try {
      // Hacemos una solicitud al servidor de login usando fetch, enviando el usuario y clave
      const peticion = await fetch(
        `http://localhost:3000/login?usuario=${encodeURIComponent(usuario)}&clave=${encodeURIComponent(clave)}`, 
        { credentials: 'include' } // credentials: 'include' permite que las cookies sean enviadas al servidor
      );
      
      if (peticion.ok) {
        setLogeado(true); // Si la solicitud fue exitosa, cambiamos el estado logeado a true
      } else {
        alert('Datos incorrectos'); // Si la respuesta no es exitosa, mostramos un mensaje de error
      }
    } catch (error) {
      alert('Error al intentar iniciar sesión'); // Si hay un error en la solicitud, mostramos un mensaje de error
    }
  }

  // Función para validar si el usuario ya tiene una sesión iniciada
  function validar() {
    const validarSesion = async () => {
      try {
        // Hacemos una solicitud para validar la sesión del usuario
        const peticion = await fetch('http://localhost:3000/validar', { credentials: 'include' });
        if (peticion.ok) {
          setLogeado(true); // Si la sesión es válida, establecemos logeado a true
        } else {
          console.error('Usuario no logeado');
        }
      } catch (error) {
        console.error('Error al validar la sesión:', error);
      }
    };
    validarSesion(); // Llamamos a la función de validación
  }

  // Hook de efecto para validar la sesión cuando se monta el componente
  useEffect(validar, []);

  // Si el usuario está logeado, mostramos el componente Conversor
  if (logeado) {
    return (<Conversor />); // Retorna el componente Conversor cuando el usuario ha iniciado sesión
  }

  // Si no está logeado, mostramos el formulario de inicio de sesión
  return (
    <>
      <h1>Inicio de sesión</h1>
      <label htmlFor="usuario">Usuario:
        <input id='usuario' type="text" value={usuario} onChange={cambiarUsuario} />
      </label> <br />
      <label htmlFor="clave">Clave:
        <input id='clave' type="password" value={clave} onChange={cambiarClave} />
      </label><br />
      <button type="submit" onClick={ingresar}>Ingresar</button>
    </>
  );
}

export default App;
