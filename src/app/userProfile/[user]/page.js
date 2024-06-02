import Link from "next/link";
import Image from "next/image";
import AlbumPop from "@/component/AlbumPop";
import { sql } from "@vercel/postgres"


export default async function Page({params}) {

    const albums = (await sql`select * from albumrevs where username = ${params.user}`).rows
    const userInfo = (await sql`select * from trackusers where username = ${params.user}`).rows
    // console.log(userInfo)

    return (
        <main className="flex flex-col items-center justify-between gap-4 py-8">
            {userInfo.map((info) => (
                <div key={info.id} className="flex flex-col gap-4 items-center">
                    <h1 className="text-4xl font-bold">{info.username}</h1>
                    <p>Bio: <br />{info.bio}</p>
                </div>
            ))}
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-4xl font-semibold">Added Albums</h1>
                
                
                <div className="flex gap-4 max-w-[1500px] flex-wrap justify-center">
                {albums.map((post) => (
                        <AlbumPop key={post.id}>
                            <Link  href={`/albums/${post.id}`} className="border-2 bg-indigo-100 p-4 flex flex-col mt-3 items-center rounded-xl border-zinc-400 max-w-[350px]">
                                <h3 className="text-lg font-bold text-center">{post.title}</h3>
                                <Image src={post.image} alt="Album Image" width={100} height={200} className="my-2 rounded" />
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