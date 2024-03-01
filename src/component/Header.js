export default function Header() {

    return (
        <header className="flex flex-col items-center text-white bg-blue-700 p-1 border-zinc-400 border-b-[5px]">
            <h1 className="text-4xl font-bold">Track Gallery</h1>
            <nav>
                <ul className="flex flex-row gap-3 p-2 text-lg">
                    <li><a href="/" className="hover:underline">Home</a></li>
                    <li><a href="/albums" className="hover:underline">Albums</a></li>
                    <li><a href="/createA" className="hover:underline">Add Album</a></li>
                    <li><a href="/createG" className="hover:underline">Add Genre</a></li>
                </ul>
            </nav>
        </header>
    )
}