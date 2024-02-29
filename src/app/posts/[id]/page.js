import { sql } from "@vercel/postgres"

export default async function page({params}) {
    
    const post = (await sql`select * from posts where id = ${params.id}`).rows

    return (
        <main className="flex flex-col items-center mt-1">
            <h1 className="text-3xl font-bold">POST</h1>
            {post.map((db) => (
                <div key={db.id} className="flex flex-col items-center">
                    <h1>{db.title}</h1>
                    <h3>{db.content}</h3>
                </div>
            ))}
        </main>
    )
}