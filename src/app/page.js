import Link from 'next/link';

const utilities = [
    {
        id: 'base64',
        name: 'Codificador Base64',
        description: 'Codifica y decodifica texto en formato Base64 de forma rápida y segura.',
        icon: '🔗',
        href: '/base64'
    },
    {
        id: 'sql-formatter',
        name: 'Formateador SQL',
        description: 'Embellece y organiza tus consultas SQL con un ancho máximo de 80 caracteres.',
        icon: '📊',
        href: '/sql-formatter'
    },
    // Más utilidades se añadirán aquí
];

export default function Home() {
    return (
        <div>
            <header className="page-header" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>ProgramaUtils</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Recopilación de utilidades para desarrolladores</p>
            </header>

            <div className="grid-utilities">
                {utilities.map((util) => (
                    <Link href={util.href} key={util.id} className="glass-card" style={{ display: 'block' }}>
                        <div className="card-icon">{util.icon}</div>
                        <h2 className="card-title">{util.name}</h2>
                        <p className="card-description">{util.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
