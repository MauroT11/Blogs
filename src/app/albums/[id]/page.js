import { sql } from "@vercel/postgres"
import Image from "next/image"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export async function generateMetadata({params}) {
    
    const album = (await sql`select * from albumrevs where id = ${params.id}`).rows
    // console.log(album)
    return {
        title: `Track Gallery - ${album[0].title} by ${album[0].artist}`,
        description: `All of the albums added by users.`
    }
  }

export default async function page({params}) {
    
    const post = (await sql`select * from albumrevs where id = ${params.id}`).rows
    // console.log(params)
    const comments = (await sql`select * from comments where albumid = ${params.id}`).rows
    // console.log(comments)

    async function handleComment(formData) {
        'use server'

        const comment = formData.get('comment')
        const rate = formData.get('rate')
        const submitDate = new Date()

        const date = `${submitDate.getUTCDate()}/${(submitDate.getUTCMonth() + 1)}/${submitDate.getUTCFullYear()} ${submitDate.getUTCHours()}:${submitDate.getMinutes()}`

        // console.log(comment, rate, date)

        await sql`INSERT INTO comments (content, rate, date, albumid) VALUES (${comment}, ${rate}, ${date}, ${params.id})`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
    }

    async function handleDelete() {
        'use server'

        await sql`delete from comments where albumid = ${params.id}`
        await sql`delete from albumrevs where id = ${params.id}`
        

        revalidatePath(`/albums/`)

        redirect(`/albums/`)
    }

    async function handleCommentDelete() {
        'use server'
        console.log('delete')
        // await sql`delete from comments where albumid = ${params.id}`
        // await sql`delete from albumrevs where id = ${params.id}`
        

        // revalidatePath(`/albums/`)

        // redirect(`/albums/`)
    }

    return (
        <main className="flex flex-col items-center mt-8 justify-evenly">


            <div className="flex items-center justify-evenly min-w-full">
            {post.map((db) => (
                <div key={db.id} className="flex flex-col items-center min-w-56 justify-center">
                    <h1 className="text-5xl font-bold">{db.title}</h1>
                    <Image src={db.image} width={350} height={400} alt="Album Image" className="my-2 rounded-lg"/>
                    
                    <h3 className="text-2xl">{db.artist}</h3>
                    <h3 className="text-lg my-1">{db.genre}</h3>
                    <div className="flex gap-4">
                        <Link href={`/albums/${params.id}/edit`} className="bg-blue-700 text-white py-1 px-4 rounded border-black border-[2px]">Edit</Link>
                        <form action={handleDelete}>
                            <button className="bg-red-600 text-white py-1 px-2 rounded border-black border-[2px]">Delete</button>
                        </form>
                    </div>
                </div>
            ))}


            <div className="grid-rows-2 flex-col gap-2 min-w-52 ">
                {/* COMMNET SECTION  */}
                {comments.map((comment) => (
                    <div key={comment.id} className="flex flex-col gap-1 items-center min-w-48 border-zinc-400 border-[2px] rounded-xl p-2 my-1">
                        <div className="flex flex-col items-center">
                            <p className="text-lg">{comment.content}</p>
                            <p>{comment.rate} 🌟</p>
                        </div>
                        <div>
                            <p className="text-xs">{comment.date}</p>
                        </div>
                        <div className="flex gap-2">
                            <Link href={`/albums/${params.id}/comments/${comment.id}/edit`} className="bg-blue-700 text-xs text-white px-2 rounded border-black border-[2px]">Edit</Link>
                            <form action={handleCommentDelete}>
                                <button className="bg-red-600 text-white text-xs px-2 rounded border-black border-[2px]">Delete</button>
                            </form>                        
                        </div>
                    </div>
                ))}
            </div>
            </div>
            {/* ADD COMMENT */}


            <div className="absolute bg-white bottom-16 z-10 mb-3 flex flex-col items-center mt-4 border-zinc-400 border-[2px] rounded-xl p-4 text-center">
                {/* <h1 className="text-lg">Leave a comment</h1> */}
                <form className="flex place-content-evenly gap-3 items-center justify-center" action={handleComment}>
                    <div className="flex justify-center">
                        <input type="tex" name="comment" id="comment"  className="bg-white py-2 border-zinc-400 w-80 border-[2px] rounded-lg p-1 text-center" placeholder="Leave a comment" />
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
            </div>


        </main>
    )
}