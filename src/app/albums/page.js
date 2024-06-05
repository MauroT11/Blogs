import { sql } from "@vercel/postgres"
import Link from "next/link"
import FilterBtn from "@/component/FilterBtn"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AlbumCard from "@/component/AlbumCard"
import Filter from "@/component/Filter"

export async function generateMetadata() {
    return {
        title: `Track Gallery - Albums`,
        description: `This page has a list of posts`
    }
  }

export default async function page({params, searchParams}) {

    const albums = (await sql`select * from albumRevs`).rows
    
    const genres = (await sql`select * from genres`).rows
    // console.log(genres)
    async function handleFilter(formData) {
        'use server'

        const genre = formData.get('genre')

        revalidatePath(`/genres/${genre}`)

        redirect(`/genres/${genre}`)
    }

    if (searchParams.sort === "desc") {
        posts.reverse();
    }

    return (
        <main className="flex flex-col items-center justify-between mb-24">
            <h1 className="text-5xl font-bold mt-4">All Albums</h1>
            <Filter genres={genres} />
            <div className="flex gap-3 text-lg my-4">
              <Link href={`/albums?sort=asc`}>Sort ascending</Link> - <Link href={`/albums?sort=desc`}> Sort descending</Link>
            </div>
            <AlbumCard albums={albums} />
        </main>
    )
}