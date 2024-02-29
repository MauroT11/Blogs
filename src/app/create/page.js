import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function page() {

    const genres = (await sql`select * from genres`).rows
    
    async function handleAlbum(formData) {
        'use server'

        console.log(formData)
        const title = formData.get('title')
        const artist = formData.get('artists')
        const image = formData.get('image')
        const genre = formData.get('genre')

        // await sql`INSERT INTO albums (Name, Author) VALUES (${title}, ${author})`

        // revalidatePath('/about')

        // redirect('/about')
    }

    return (
        <main className="flex flex-col items-center mt-1">
            <h1 className="text-3xl font-bold">Create Post</h1>
            <form className="flex flex-col gap-1" action={handleAlbum}>
                <div className="flex flex-col gap-1 items-center justify-center mt-2">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="artist">Artist: </label>
                    <input type="text" name="artist" id="artist" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="image">Image Link: </label>
                    <input type="text" name="image" id="image" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 "/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="genre">Genre: </label>
                    <select className="border-zinc-400 border-[2px] rounded-lg p-1" name="genre" id="genre">
                        {genres.map((genre) => (
                            <option key={genre.id} className="text-center">{genre.name}</option>
                        ))}
                    </select>
                </div>
                <Submit />
            </form>
        </main>
    )
}