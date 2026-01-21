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
            setOutput(`Error de Formateo: ${e.message}\n\nNota: Asegúrate de que las comillas estén bien cerradas. Ejemplo: 'O''Reilly' en lugar de 'O'Reilly'.`);
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
                <h1>Formateador SQL</h1>
                <p style={{ color: '#94a3b8' }}>Estiliza tus consultas SQL para que sean más legibles (Límite visual recomendado: 80 caracteres).</p>
            </header>

            <div className="glass-card">
                <div className="input-group">
                    <div className="field-container">
                        <label className="label">Consulta SQL:</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="textarea-base"
                            style={{ minHeight: '200px' }}
                            placeholder="Escribe tu SQL aquí (ej: SELECT * FROM users WHERE id = 1)..."
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={handleFormat}
                            className="btn btn-purple btn-action"
                        >
                            Formatear SQL
                        </button>
                    </div>

                    <div className="field-container">
                        <label className="label">SQL Formateado:</label>
                        <div style={{ position: 'relative' }}>
                            <pre className="textarea-base textarea-sql-output" style={{ minHeight: '200px' }}>
                                {output || 'El resultado aparecerá aquí...'}
                            </pre>
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
