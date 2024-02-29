export default function Footer() {

    return (
        <footer className="absolute bottom-0 text-white min-w-full flex justify-between items-center p-4 bg-blue-700 border-zinc-400 border-t-[5px]">
            <div>
                <p className="text-lg">© Albums By Mauro Trovoada. Tech Educators</p>
            </div>
            <ul className="flex flex-wrap items-center mt-3 text-lg font-medium sm:mt-0" >
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Email</a>
                </li>

            </ul>
        </footer>
    )
}