import { sql } from "@vercel/postgres"
import Image from "next/image"
import Submit from "@/component/Submit"
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartDislike } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default function Comments({comments, username, albumId}) {

    async function handleCommentDelete() {
        'use server'
        console.log('delete')
        await sql`delete from comments where albumid = ${comments[0].id}`

        revalidatePath(`/albums`)

        redirect(`/albums`)
    }

    async function handleCommentLike() {
        'use server'
        let like = comments[0].likes + 1

        await sql`update comments set likes = ${like} where id = ${comments[0].id}`

        revalidatePath(`/albums/${albumId}`)

        redirect(`/albums/${albumId}`)
    }

    async function handleCommentDislike() {
        'use server'
        let dislike = comments[0].dislikes + 1

        await sql`update comments set dislikes = ${dislike} where id = ${comments[0].id}`

        revalidatePath(`/albums/${albumId}`)

        redirect(`/albums/${albumId}`)
    }

    return (
        <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">Comments</h1>
                    <div className="grid-rows-2 flex-col gap-2 min-w-[250px]">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex flex-col gap-1 items-center min-w-48 border-zinc-400 border-[2px] rounded-xl p-2 my-1">
                                <div className="flex flex-col items-center">
                                    <p className="text-lg">{comment.content}</p>
                                    <p>{comment.rate} 🌟</p>
                                </div>
                                <div>
                                    <p className="text-sm">{comment.date}</p>
                                </div>
                                {(username == comment.username) ? (
                                    <div className="flex gap-2">
                                        <Link href={`/albums/${albumId}/comments/${comment.id}/edit`} className="bg-blue-700 text-md text-white py-1 px-2 rounded border-black border-[2px] hover:bg-blue-500"><IoMdCreate /></Link>
                                        <form action={handleCommentDelete}>
                                            <button className="bg-red-600 text-white text-md py-1 px-2 rounded border-black border-[2px] hover:bg-red-500"><IoMdClose /></button>
                                        </form>                        
                                    </div>
                                ) : (
                                    <div className="flex items-center flex-col">
                                        <p>{comment.username}</p>
                                        <div className="flex gap-8">
                                            <form action={handleCommentLike}>
                                                <button className="hover:bg-green-400 flex items-center p-1 gap-2 rounded-md text-2xl"><IoIosHeart /> {comment.likes}</button>
                                            </form>
                                            <form action={handleCommentDislike}>
                                                <button className="hover:bg-red-400 p-1 flex items-center gap-2 rounded-md text-2xl"><IoIosHeartDislike /> {comment.dislikes}</button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
    )
}