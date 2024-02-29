import { sql } from "@vercel/postgres"
import Image from "next/image"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function page({params}) {
    
    const post = (await sql`select * from albumrevs where id = ${params.id}`).rows
    // console.log(post)
    const comments = (await sql`select * from comments where albumid = ${params.id}`).rows
    // console.log(comments)

    async function handleComment(formData) {
        'use server'

        const comment = formData.get('comment')
        const rate = formData.get('rate')
        const submitDate = new Date()

        const date = `${submitDate.getUTCDate()}/${(submitDate.getUTCMonth() + 1)}/${submitDate.getUTCFullYear()} ${submitDate.getUTCHours()}:${submitDate.getMinutes()}`

        console.log(comment, rate, date)

        await sql`INSERT INTO comments (content, rate, date, albumid) VALUES (${comment}, ${rate}, ${date}, ${params.id})`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
    }

    return (
        <main className="flex flex-col items-center mt-1">
            {post.map((db) => (
                <div key={db.id} className="flex flex-col items-center">
                    <h1 className="text-4xl font-bold">{db.title}</h1>
                    <Image src={db.image} width={300} height={300} alt="Album Image" className="my-2 rounded-lg"/>
                    <h3 className="text-2xl">{db.artist}</h3>
                    <h3>{db.genre}</h3>
                </div>
            ))}
            {comments.map((comment) => (
                <div key={comment.id} className="flex flex-col items-center">
                    <p>{comment.content}</p>
                    <p>{comment.rate} 🌟</p>
                    <p>{comment.date}</p>
                </div>
            ))}
            <div className="absolute bottom-14 mb-3 flex flex-col items-center mt-4 border-zinc-400 border-[2px] rounded-xl p-4 text-center">
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