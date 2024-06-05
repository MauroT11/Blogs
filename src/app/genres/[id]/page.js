import { sql } from "@vercel/postgres"
import Link from "next/link";
import Image from "next/image"
import AlbumCard from "@/component/AlbumCard"

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
    const albums = (await sql`select * from albumrevs where genre = ${name}`).rows
    
    // console.log(posts)
    

    return (
        <main className="flex flex-col items-center gap-4 justify-between mt-1">
            <Link href={'/albums'} className="hover:underline">Back to Albums</Link>
            <h1 className="text-3xl font-bold">{genres[0].name}</h1>
            <h1 className="text-center text-lg w-10/12">{genres[0].des}</h1>
            <AlbumCard albums={albums} />
        </main>
    )
}