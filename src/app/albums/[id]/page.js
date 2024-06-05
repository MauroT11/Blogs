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
import AnimateIn from "@/component/AnimateIn";
import AnimateImg from "@/component/AnimateImg";
import { currentUser } from "@clerk/nextjs/server";

export async function generateMetadata({params}) {
    
    const album = (await sql`select * from albumrevs where id = ${params.id}`).rows
    // console.log(album)
    return {
        title: `Track Gallery - ${album[0].title} by ${album[0].artist}`,
        description: `All of the albums added by users.`
    }
  }

export default async function page({params}) {

    const user = await currentUser();
    const username = user?.username;
    
    const post = (await sql`select * from albumrevs where id = ${params.id}`).rows
    // console.log(post[0].username)
    const comments = (await sql`select * from comments where albumid = ${params.id}`).rows
    

    async function handleComment(formData) {
        'use server'

        const comment = formData.get('comment')
        const rate = formData.get('rate')
        const submitDate = new Date()

        const date = `${submitDate.getUTCDate()}/${(submitDate.getUTCMonth() + 1)}/${submitDate.getUTCFullYear()} ${submitDate.getUTCHours()}:${submitDate.getMinutes()}`

        // console.log(comment, rate, date)

        await sql`INSERT INTO comments (content, rate, date, albumid, username) VALUES (${comment}, ${rate}, ${date}, ${params.id}, ${username})`

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

    async function handleLike() {
        'use server'
        let like = post[0].likes + 1
        
        await sql`update albumrevs set likes = ${like} where id = ${params.id}`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
    }

    async function handleDislike() {
        'use server'
        let dislike = post[0].dislikes + 1

        await sql`update albumrevs set dislikes = ${dislike} where id = ${params.id}`

        revalidatePath(`/albums/${params.id}`)

        redirect(`/albums/${params.id}`)
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
        <main className="flex flex-col items-center mt-8 justify-around">
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <AnimateIn>    
                    {post.map((db) => (
                        <div key={db.id} className="flex flex-col items-center min-w-56 justify-center gap-4">
                            <h1 className="text-4xl font-bold">{db.title}</h1>
                            <AnimateImg>
                                <Image src={db.image} width={350} height={400} alt="Album Image" className="my-2 rounded-lg"/>
                            </AnimateImg>
                            <div className="flex flex-col gap-2 items-center">
                                <h3 className="text-2xl">{db.artist}</h3>
                                <h3 className="text-lg">{db.genre}</h3>
                                
                            </div>
                            {(username == db.username) ? (
                                <div className="flex gap-4">
                                    <Link href={`/albums/${params.id}/edit`} className="bg-blue-700 text-white text-lg py-1 px-2 rounded border-black border-[2px] hover:bg-blue-500"><IoMdCreate /></Link>
                                    <form action={handleDelete}>
                                        <button className="bg-red-600 text-white py-1 px-2 rounded text-lg border-black border-[2px] hover:bg-red-500"><IoMdClose /></button>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 flex-col">
                                    <p>Added by: <Link href={`/profile/${db.username}`}>{db.username}</Link></p>
                                    <div className="flex gap-8">
                                        <form className="flex" action={handleLike}>
                                            <button className="hover:bg-green-400 gap-2 p-2 rounded-md text-2xl flex items-center"><IoIosHeart />{db.likes}</button>
                                        </form>
                                        <form action={handleDislike}>
                                            <button className="hover:bg-red-400 p-2 gap-2 rounded-md text-2xl flex items-center"><IoIosHeartDislike /> {db.dislikes}</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    </AnimateIn>
                </div>    
            {/* COMMENT SECTION  */}
            <div className="col-span-2 ml-72 justify-items-center">
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
                                        <Link href={`/albums/${params.id}/comments/${comment.id}/edit`} className="bg-blue-700 text-md text-white py-1 px-2 rounded border-black border-[2px] hover:bg-blue-500"><IoMdCreate /></Link>
                                        <form action={handleCommentDelete}>
                                            <button className="bg-red-600 text-white text-md py-1 px-2 rounded border-black border-[2px] hover:bg-red-500"><IoMdClose /></button>
                                        </form>                        
                                    </div>
                                ) : (
                                    <>
                                    <p>{comment.username}</p>
                                    <div className="flex gap-8">
                                        <form>
                                            <button className="hover:bg-green-400 p-1 rounded-md text-2xl"><IoIosHeart /></button>
                                        </form>
                                        <form>
                                            <button className="hover:bg-red-400 p-1 rounded-md text-2xl"><IoIosHeartDislike /></button>
                                        </form>
                                    </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* ADD COMMENT */}
  
            </div>
                {(username == post[0].username) ? (
                    <></>
                ) : (
                <div className="absolute bg-white bottom-16 z-10 mb-3 flex flex-col items-center mt-4 border-zinc-400 border-[2px] rounded-xl p-4 text-center">
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
                )}
        </main>
    )
}