import { useEffect, useState } from 'react'
import './App.css'
import Conversor from './conversor'

function App() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [logeado, setLogeado] = useState(false)

  function cambiarUsuario(evento) {
    setUsuario(evento.target.value)
  }

  function cambiarClave(evento) {
    setClave(evento.target.value)
  } 
  async function ingresar() {
    console.log('Usuario: ', usuario)
    console.log('Clave: ', clave)
  try {
    const peticion = await fetch('http://localhost:3000/login?usuario='+ usuario +'&clave='+ clave, {credentials: 'include'})
    if (peticion.ok) {
    setLogeado (true)
  } else {
    alert('Datos incorrectos')
  }
  
}catch(error){
    alert('Datos incorrectos')
  }
}
      // if (usuario === "admin" && clave === "admin") {
    //   alert("Datos correctos")
    //   setLogeado(true)
    // } else {
    //   alert("Datos incorrectos")
    // }
    function validar() {
      const validarSesion = async ()=>{
        try {
        const peticion = await fetch('http://localhost:3000/validar', {credentials: 'include'})
        if (peticion.ok) {
        setLogeado (true)
      } 
    }catch(error){
    }
  }
    validarSesion();
}

useEffect(validar, [])

  if (logeado) {
    return (<Conversor/>)
    
  }
  return (
    <>
    <h1>Inicio de sesión</h1>
    <label htmlFor="usuario">Usuario:
    <input id='usuario' type="text" value={usuario} onChange={cambiarUsuario}/>
    </label> <br />
    <label htmlFor="clave">Clave:
    <input id='clave' type="password" value={clave} onChange={cambiarClave} /> 
    </label><br />
    <button type="submit" onClick={ingresar}>Ingresar</button>
    </>
  )
}
export default App
