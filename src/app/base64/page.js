'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Base64Page() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'

    const handleProcess = () => {
        try {
            if (mode === 'encode') {
                setOutput(btoa(input));
            } else {
                setOutput(atob(input));
            }
        } catch (e) {
            setOutput('Error: Entrada no válida para ' + (mode === 'encode' ? 'codificar' : 'decodificar'));
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        alert('Copiado al portapapeles');
    };

    return (
        <div>
            <header className="page-header left">
                <Link href="/" className="back-link">← Volver al Inicio</Link>
                <h1>Codificador / Decodificador Base64</h1>
            </header>

            <div className="glass-card">
                <div className="controls-row left">
                    <button
                        onClick={() => setMode('encode')}
                        className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        Codificar
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        Decodificar
                    </button>
                </div>

                <div className="input-group">
                    <div className="field-container">
                        <label className="label">Entrada:</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="textarea-base"
                            placeholder={mode === 'encode' ? 'Escribe el texto a codificar...' : 'Pega el Base64 a decodificar...'}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleProcess}
                            className="btn btn-accent btn-action"
                        >
                            {mode === 'encode' ? 'Codificar' : 'Decodificar'}
                        </button>
                    </div>

                    <div className="field-container">
                        <label className="label">Salida:</label>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={output}
                                readOnly
                                className="textarea-base textarea-output"
                            />
                            {output && !output.startsWith('Error') && (
                                <button
                                    onClick={copyToClipboard}
                                    className="btn btn-copy"
                                >
                                    Copiar
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
