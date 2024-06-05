import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { currentUser } from "@clerk/nextjs/server";

export default async function page() {

    const genres = (await sql`select * from genres`).rows
    const user = await currentUser();
    // console.log(genres)
    
    async function handleAlbum(formData) {
        'use server'

        console.log(formData)
        const title = formData.get('title')
        const artist = formData.get('artist')
        const image = formData.get('image')
        const genre = formData.get('genre')
        const user = formData.get(user[0].username)

        await sql`INSERT INTO albumRevs (title, artist, image, genre, username) VALUES (${title}, ${artist}, ${image}, ${genre}, ${user})`

        revalidatePath('/albums')

        redirect('/albums')
    }

    return (
        <main className="flex flex-col items-center mt-4 gap-8">
            <h1 className="text-3xl font-bold">Add Album</h1>
            <form className="flex flex-col gap-1" action={handleAlbum}>
                <div className="flex flex-col gap-1 items-center justify-center mt-2">
                    <label htmlFor="title" className="text-2xl">Title: </label>
                    <input type="text" name="title" id="title" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center min-w-[450px] text-2xl"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="artist" className="text-2xl">Artist: </label>
                    <input type="text" name="artist" id="artist" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center min-w-[450px] text-2xl"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="image" className="text-2xl">Image Link: </label>
                    <textarea rows={2} cols={50} type="text" name="image" id="image" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 "/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="genre" className="text-2xl">Genre: </label>
                    <select className="border-zinc-400 border-[2px] rounded-lg p-1 mb-4 text-2xl" name="genre" id="genre">
                        {genres.map((genre) => (
                            <option key={genre.id} className="text-center">{genre.name}</option>
                        ))}
                    </select>
                </div>
                <Submit />
                <Link href="/addGenre" className="bg-primary text-white text-center border-black border-[2px] rounded-lg px-2 py-1">Add Genre</Link>
            </form>
        </main>
    )
}