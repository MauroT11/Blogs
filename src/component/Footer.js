export default function Footer() {

    return (
        <footer className="fixed bottom-0 text-white min-w-full flex justify-between items-center py-2 px-8 bg-blue-700 border-zinc-400 border-t-[5px]">
            <div>
                <p className="text-md">© Track Gallery By Mauro Trovoada. <br />Tech Educators</p>
            </div>
            <ul className="flex flex-wrap items-center mt-3 text-lg font-medium sm:mt-0" >
                <li>
                    <a href="https://github.com/MauroT11" className="hover:underline me-4 md:me-6">Github</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/mauro-trovoada-76852b240/" className="hover:underline me-4 md:me-6">LinkedIn</a>
                </li>
                <li>
                    <a href="mailto:mauro.co.uk@hotmail.com" className="hover:underline me-4 md:me-6">Email</a>
                </li>

            </ul>
        </footer>
    )
}