import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function page({params}) {

    // console.log(params)
    const data = (await sql`select * from comments where id = ${params.commentId}`).rows
    const comment = data[0]
    console.log(comment)
    

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
            <h1 className="text-3xl font-bold">Comment</h1>
            <form className="flex flex-col gap-1" action={handleAlbum}>
                <div className="flex flex-col gap-1 items-center justify-center mt-2">
                    <label htmlFor="title">Title: </label>
                    <textarea cols={30} placeholder={comment.content} type="text" name="title" id="title" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                
                <div className="flex flex-col">
                        <select name="rate" id="rate" className="text-center border-zinc-400 border-[2px] rounded-lg py-2">
                            <option value={1}>1 ⭐</option>
                            <option value={2}>2 ⭐</option>
                            <option value={3}>3 ⭐</option>
                            <option value={4}>4 ⭐</option>
                            <option value={5}>5 🌟</option>
                        </select>
                    </div>
                <Submit />
            </form>
        </main>
    )
}