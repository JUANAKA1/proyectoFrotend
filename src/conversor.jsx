import { useState } from "react";
import './App.css';

function Conversor() {
    // Estado para almacenar el texto ingresado por el usuario
    const [texto, setTexto] = useState('');
    // Estado para almacenar el texto reconocido a través de la voz
    const [voz, setVoz] = useState('');

    // Función para manejar el cambio en el campo de texto
    function cambiarTexto(evento) {
        setTexto(evento.target.value); // Actualiza el estado con el texto ingresado por el usuario
    }

    // Función para convertir texto a voz (TTS - Text To Speech)
    function textoVoz() { 
        // Crear una nueva instancia de SpeechSynthesisUtterance con el texto ingresado
        const configuracion = new window.SpeechSynthesisUtterance(texto);
        // Utilizar el sistema de síntesis de voz del navegador para leer el texto en voz alta
        window.speechSynthesis.speak(configuracion);
    }

    // Función para convertir voz a texto (STT - Speech To Text)
    function vozTexto() {
        // Crear una nueva instancia del reconocimiento de voz dependiendo del navegador
        const agente = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        agente.lang = 'es-ES'; // Establecer el idioma para el reconocimiento de voz (español)
        agente.start(); // Iniciar el reconocimiento de voz

        // Definir lo que ocurre cuando se recibe un resultado de la voz reconocida
        agente.onresult = resultado;

        // Manejar cualquier error en el reconocimiento de voz
        agente.onerror = function(event) {
            console.error('Error al reconocer voz:', event.error); // Mostrar el error en la consola
        };
    }

    // Función para procesar el resultado del reconocimiento de voz
    function resultado(informacion) {
        // Extraer el texto reconocido de la información obtenida por el reconocimiento de voz
        const textoReconocido = informacion.results[0][0].transcript;
        console.log(textoReconocido); // Mostrar el texto reconocido en la consola
        setVoz(textoReconocido); // Actualizar el estado con el texto reconocido
    }

    return (
        <>
            <h1>Conversor TTS a STT</h1>
            
            {/* Sección de conversión de texto a voz */}
            <h2>Conversor de texto a voz</h2>
            <input type="text" value={texto} onChange={cambiarTexto} /> {/* Input para ingresar el texto */}
            <button onClick={textoVoz}>Convertir</button> {/* Botón para convertir el texto a voz */}
            
            {/* Sección de conversión de voz a texto */}
            <h2>Conversor voz a texto</h2>
            <button onClick={vozTexto}>Grabar</button> {/* Botón para iniciar la grabación de voz */}
            
            {/* Mostrar el texto reconocido por el reconocimiento de voz */}
            <p>Texto reconocido: {voz}</p>
        </>
    );
}

export default Conversor;

