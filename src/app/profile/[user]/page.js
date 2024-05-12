import Link from "next/link";
import Image from "next/image";
import AlbumPop from "@/component/AlbumPop";
import { sql } from "@vercel/postgres"


export default async function Page({params}) {

    const albums = (await sql`select * from albumrevs where username = ${params.user}`).rows

    return (
        <main className="flex flex-col items-center justify-between py-8 ">
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-4xl font-semibold">{params.user}&apos;s Added Albums</h1>
                <div className="flex gap-16 max-w-[1500px] flex-wrap justify-center">
                {albums.map((post) => (
                        <AlbumPop key={post.id}>
                            <Link  href={`/albums/${post.id}`} className="border-2 bg-indigo-100 p-4 flex flex-col mt-3 items-center rounded-xl border-zinc-400 max-w-[350px]">
                                <h3 className="text-2xl font-bold text-center">{post.title}</h3>
                                <Image src={post.image} alt="Album Image" width={250} height={200} className="my-2 rounded" />
                                <p className="text-lg">{post.artist}</p>
                                {/* <Link href={`/albums/${post.id}`} className="text-red-500 hover:font-bold">View</Link> */}
                            </Link>
                        </AlbumPop>
                    ))}
                </div>    
            </div>    
        </main>
        
    )
}