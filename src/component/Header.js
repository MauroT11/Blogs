import AnimateImg from "./AnimateImg"

export default function Header() {

    return (
        <header className="sticky flex flex-col items-center text-white bg-blue-700 p-1 border-zinc-400 border-b-[5px]">
            <AnimateImg>
                <h1 className="text-4xl font-bold">Track Gallery</h1>
            </AnimateImg>
            
            <nav>
                <ul className="flex flex-row gap-8 p-2 text-lg">
                    <AnimateImg>
                        <li><a href="/" className="hover:underline">Home</a></li>
                    </AnimateImg>
                    <AnimateImg>
                        <li><a href="/albums" className="hover:underline">Albums</a></li>
                    </AnimateImg>
                    <AnimateImg>
                        <li><a href="/createA" className="hover:underline">Add Album</a></li>
                    </AnimateImg>
                    <AnimateImg>
                        <li><a href="/createG" className="hover:underline">Add Genre</a></li>
                    </AnimateImg>
                    
                </ul>
            </nav>
        </header>
    )
}