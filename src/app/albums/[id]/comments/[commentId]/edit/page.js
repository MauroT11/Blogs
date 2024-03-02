import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export default async function page({params}) {

    console.log(params)
    const data = (await sql`select * from comments where id = ${params.commentId}`).rows
    const comment = data[0]
    // console.log(comment)
    

    async function handleCommentEdit(formData) {
        'use server'

        // console.log(formData)
        const comment = formData.get('comment')
        const rate = formData.get('rate')
        // console.log(comment, rate)

        await sql`update comments set content = ${comment}, rate = ${rate} where id = ${params.commentId};`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
    }

    return (
        <main className="flex flex-col items-center mt-1">
            <a href={`/albums/${params.id}`} className="hover:underline">Back to album</a>

            <h1 className="text-3xl font-bold">Edit Comment</h1>

            <form className="flex flex-col gap-2" action={handleCommentEdit}>
                <div className="flex flex-col gap-1 items-center justify-center mt-2">
                    <label htmlFor="comment">Title: </label>
                    <textarea cols={30} placeholder={comment.content} type="text" name="comment" id="comment" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
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