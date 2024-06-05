import Link from "next/link";
import Image from "next/image";
import AlbumPop from "@/component/AlbumPop";
import { sql } from "@vercel/postgres"
import AlbumCard from "@/component/AlbumCard"

export default async function Page({params}) {

    const albums = (await sql`select * from albumrevs where username = ${params.user}`).rows
    const user = (await sql`select * from trackusers where username = ${params.user}`).rows

    console.log(user[0])

    return (
        <main className="flex flex-col items-center justify-between py-8 mb-16">
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-4xl font-semibold">{params.user}&apos;s Profile</h1>
                <h2 className="text-2xl">{user[0].bio}</h2>
                <AlbumCard albums={albums} />   
            </div>    
        </main>
        
    )
}