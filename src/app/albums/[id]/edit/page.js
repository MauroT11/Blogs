import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function page({params}) {

    
    const genres = (await sql`select * from genres`).rows
    const album = (await sql`select * from albumrevs where id = ${params.id}`).rows
    const content = album[0]
    // console.log(content)
    

    async function handleAlbum(formData) {
        'use server'

        // console.log(formData)
        const title = formData.get('title')
        const artist = formData.get('artist')
        const image = formData.get('image')
        const genre = formData.get('genre')

        // console.log(title, artist, image, genre)

        await sql`update albumRevs set title = ${title}, artist = ${artist}, image = ${image}, genre = ${genre} where id = ${params.id};`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
    }

    return (
        <main className="flex flex-col items-center mt-1 ">
            <h1 className="text-3xl font-bold">Add Album</h1>
            <form className="flex flex-col gap-1" action={handleAlbum}>
                <div className="flex flex-col gap-1 items-center justify-center mt-2">
                    <label htmlFor="title">Title: </label>
                    <input placeholder={content.title} type="text" name="title" id="title" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="artist">Artist: </label>
                    <input placeholder={content.artist} type="text" name="artist" id="artist" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="image">Image Link: </label>
                    <textarea rows={2} cols={50} placeholder={content.image} type="text" name="image" id="image" className="bg-white text-center border-zinc-400 border-[2px] rounded-lg p-1 "/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center">
                    <label htmlFor="genre">Genre: </label>
                    <select className="border-zinc-400 border-[2px] rounded-lg p-1 mb-4" name="genre" id="genre">
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