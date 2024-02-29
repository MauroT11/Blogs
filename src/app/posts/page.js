import { sql } from "@vercel/postgres"
import Link from "next/link"

export default async function page() {

    const posts = (await sql`select * from posts`).rows

    return (
        <main className="flex flex-col items-center justify-between mt-1">
            <h1 className="text-3xl">Posts</h1>
            <div className="flex gap-4">
                {posts.map((post) => (
                    <div key={post.id} className="border-4 p-4 flex flex-col items-center rounded-xl">
                        <h3 className="text-lg">{post.title}</h3>
                        <Link href={`/posts/${post.id}`} className="text-red-500">View</Link>
                    </div>
                ))}
            </div>
            
        </main>
    )
}