export default function Header() {

    return (
        <header className="flex justify-items-center items-center flex-col bg-indigo-700 text-white border-zinc-400 border-b-[5px]">
            <h1 className="text-4xl font-bold">Blogs</h1>
            <nav>
                <ul className="flex flex-row gap-3 p-2 text-lg">
                    <li><a href="/">Home</a></li>
                    <li><a href="/posts">Blog Posts</a></li>
                    <li><a href="/create">Create Posts</a></li>
                </ul>
            </nav>
        </header>
    )
}