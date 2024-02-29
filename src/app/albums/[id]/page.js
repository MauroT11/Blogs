import { sql } from "@vercel/postgres"
import Image from "next/image"

export default async function page({params}) {
    
    const post = (await sql`select * from albumrevs where id = ${params.id}`).rows
    console.log(post)

    return (
        <main className="flex flex-col items-center mt-1">
            <h1 className="text-3xl font-bold">POST</h1>
            {post.map((db) => (
                <div key={db.id} className="flex flex-col items-center">
                    <h1>{db.title}</h1>
                    {/* <Image src={db.image} width={300} height={300} alt="Album Image"/> */}
                    <h3>{db.artist}</h3>
                    <h3>{db.genre}</h3>
                </div>
            ))}
        </main>
    )
}