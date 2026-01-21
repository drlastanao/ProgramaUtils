'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'sql-formatter';

export default function SqlFormatterPage() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleFormat = () => {
        try {
            if (!input.trim()) {
                setOutput('');
                return;
            }

            // Pre-procesamiento: asegurar que las comillas simples sean las estándar
            // y manejar posibles errores de entrada
            const cleanInput = input.replace(/[\u2018\u2019]/g, "'");

            const formatted = format(cleanInput, {
                language: 'sql',
                tabWidth: 2,
                keywordCase: 'upper',
                linesBetweenQueries: 2,
            });

            setOutput(formatted);
        } catch (e) {
            console.error('Error de formateo SQL:', e);
            // Si falla el formateador, al menos mostramos el error específico
            // para que el usuario sepa que su SQL puede tener errores de sintaxis
            setOutput(`Error de Formateo: ${e.message}\n\nNota: Asegúrate de que las comillas estén bien cerradas. Ejemplo: 'O''Reilly' en lugar de 'O'Reilly'.`);
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
                <h1>Formateador SQL</h1>
                <p style={{ color: '#94a3b8' }}>Estiliza tus consultas SQL para que sean más legibles (Límite visual recomendado: 80 caracteres).</p>
            </header>

            <div className="glass-card">
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Consulta SQL:</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            style={{
                                width: '100%',
                                minHeight: '200px',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                border: '1px solid #334155',
                                backgroundColor: '#1e293b',
                                color: 'white',
                                fontFamily: 'monospace',
                                fontSize: '1rem'
                            }}
                            placeholder="Escribe tu SQL aquí (ej: SELECT * FROM users WHERE id = 1)..."
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleFormat}
                            style={{
                                padding: '1rem 2rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                backgroundColor: '#8b5cf6',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: '700',
                                fontSize: '1.1rem',
                                transition: 'transform 0.2s'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Formatear SQL
                        </button>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>SQL Formateado:</label>
                        <div style={{ position: 'relative' }}>
                            <pre
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
                                    padding: '1rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #334155',
                                    backgroundColor: '#0f172a',
                                    color: '#60a5fa',
                                    fontFamily: 'monospace',
                                    fontSize: '1rem',
                                    overflowX: 'auto',
                                    whiteSpace: 'pre-wrap',
                                    maxWidth: '80ch' // Enforce 80 chars visual limit
                                }}
                            >
                                {output || 'El resultado aparecerá aquí...'}
                            </pre>
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
