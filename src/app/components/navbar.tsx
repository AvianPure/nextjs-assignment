import 'tailwindcss/tailwind.css'

export function NavBar() {
    return (
        <nav className="absolute top-0 left-0">
            <div className="flex space-x-4">
                <a href="/">Koti</a>
                <a href="/hinnat">Hinnat</a>
            </div>
        </nav>
    );
}
