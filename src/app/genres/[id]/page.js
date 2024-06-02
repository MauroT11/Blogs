import { sql } from "@vercel/postgres"
import Link from "next/link";
import Image from "next/image"

export async function generateMetadata({params}) {

    const genres = (await sql`select * from genres where id = ${params.id}`).rows
    return {
        title: `Albums -  ${genres[0].name}`,
        description: `${genres[0].name} Albums`
    }
  }

export default async function page({params}) {
    const genres = (await sql`select * from genres where id = ${params.id}`).rows
    const name = genres[0].name
    // console.log(name)
    const posts = (await sql`select * from albumrevs where genre = ${name}`).rows
    
    // console.log(posts)
    

    return (
        <main className="flex flex-col items-center justify-between mt-1">
            <Link href={'/albums'} className="hover:underline">Back to Albums</Link>
            <h1 className="text-3xl font-bold">{genres[0].name}</h1>
            <h1 className="text-center text-xs w-10/12">{genres[0].des}</h1>
            <div className="flex gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="border-2 bg-indigo-100 p-4 flex flex-col mt-3 items-center rounded-xl border-zinc-400">
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <Image src={post.image} alt="Album Image" width={200} height={300} className="my-2 rounded-lg" />
                        <p className="text-sm">{post.genre}</p>
                        <Link href={`/albums/${post.id}`} className="text-red-500 hover:underline hover:font-bold">View</Link>
                    </div>
                ))}
            </div>
        </main>
    )
}