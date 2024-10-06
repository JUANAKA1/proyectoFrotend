import { useState } from "react";
import './App.css';

function Conversorr() {
    const [texto, setTexto] = useState('');
    const [voz, setVoz] = useState('');

    function cambiarTexto(evento) {
        setTexto(evento.target.value);
    }

    function textoVoz() { 
        const configuracion = new window.SpeechSynthesisUtterance(texto);
        window.speechSynthesis.speak(configuracion);
    }

    function vozTexto() {
        const agente = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        agente.lang = 'es-ES'; // Establecer el idioma
        agente.start();

        agente.onresult = resultado;
        agente.onerror = function(event) {
            console.error('Error al reconocer voz:', event.error);
        };
    }

    function resultado(informacion) {
        const textoReconocido = informacion.results[0][0].transcript;
        console.log(textoReconocido);
        setVoz(textoReconocido);
    }

    return (
        <>
            <h1>Conversor TTS a STT</h1>
            <h2>Conversor de texto a voz</h2>
            <input type="text" value={texto} onChange={cambiarTexto} />
            <button onClick={textoVoz}>Convertir</button>
            <h2>Conversor voz a texto</h2>
            <button onClick={vozTexto}>Grabar</button>
            <p>Texto reconocido: {voz}</p>
        </>
    );
}

export default Conversor;
