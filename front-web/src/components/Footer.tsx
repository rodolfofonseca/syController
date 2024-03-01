"use client";
export function Footer() {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {year} <a href="https://flowbite.com/" className="hover:underline">Rofters™</a>. Todos os direitos reservados.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Sobre</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Política de privacidade</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensa</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contato</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}