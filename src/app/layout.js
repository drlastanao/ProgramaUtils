import './globals.css';

export const metadata = {
    title: 'ProgramaUtils - Herramientas de Programación',
    description: 'Una colección de utilidades útiles para programadores',
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>
                <main className="container">
                    {children}
                </main>
            </body>
        </html>
    );
}
