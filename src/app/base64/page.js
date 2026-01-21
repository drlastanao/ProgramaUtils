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
            <header style={{ marginBottom: '2rem' }}>
                <Link href="/" style={{ color: '#3b82f6', marginBottom: '1rem', display: 'inline-block' }}>← Volver al Inicio</Link>
                <h1>Codificador / Decodificador Base64</h1>
            </header>

            <div className="glass-card">
                <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => setMode('encode')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: mode === 'encode' ? '#3b82f6' : '#334155',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'background 0.2s'
                        }}
                    >
                        Codificar
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            border: 'none',
                            backgroundColor: mode === 'decode' ? '#3b82f6' : '#334155',
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'background 0.2s'
                        }}
                    >
                        Decodificar
                    </button>
                </div>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Entrada:</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '150px',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #334155',
                                backgroundColor: '#1e293b',
                                color: 'white',
                                fontFamily: 'monospace',
                                fontSize: '1rem'
                            }}
                            placeholder={mode === 'encode' ? 'Escribe el texto a codificar...' : 'Pega el Base64 a decodificar...'}
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleProcess}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                backgroundColor: '#ec4899',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                transition: 'transform 0.2s'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {mode === 'encode' ? 'Codificar' : 'Decodificar'}
                        </button>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Salida:</label>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                value={output}
                                readOnly
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0f172a',
                                    color: '#10b981',
                                    fontFamily: 'monospace',
                                    fontSize: '1rem'
                                }}
                            />
                            {output && !output.startsWith('Error') && (
                                <button
                                    onClick={copyToClipboard}
                                    style={{
                                        position: 'absolute',
                                        top: '0.5rem',
                                        right: '0.5rem',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.25rem',
                                        border: 'none',
                                        backgroundColor: '#334155',
                                        color: 'white',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                    }}
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
