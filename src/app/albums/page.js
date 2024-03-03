import { sql } from "@vercel/postgres"
import Link from "next/link"
import Image from "next/image"
import Filter from "@/component/Filter"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AnimateSide from "@/component/AnimateSide";

export async function generateMetadata() {
    return {
        title: `Track Gallery - Albums`,
        description: `This page has a list of posts`
    }
  }

export default async function page({params, searchParams}) {

    const posts = (await sql`select * from albumRevs`).rows
    
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
        <main className="flex flex-col items-center justify-between">
            <form action={handleFilter}>
                <div className="flex gap-2 justify-center mt-2">
                        <label htmlFor="genre" className="text-lg">Genres:</label>
                        <select name="genre" id="genre" className="text-center border-zinc-400 border-[2px] rounded-lg py-1">
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                        <Filter />
                </div>
            </form>

            <div className="flex gap-3">
              <Link href={`/albums?sort=asc`}>Sort ascending</Link> - <Link href={`/albums?sort=desc`}>
                      Sort descending
                    </Link>
            </div>
            <AnimateSide>
            <div className="flex gap-2 flex-wrap justify-center">
                {posts.map((post) => (
                    <div key={post.id} className="border-2 bg-indigo-100 p-4 flex flex-col mt-3 items-center rounded-xl border-zinc-400">
                        <h3 className="text-lg font-bold">{post.title}</h3>
                        <Image src={post.image} alt="Album Image" width={150} height={200} className="my-2 rounded" />
                        <p className="text-sm">{post.artist}</p>
                        <Link href={`/albums/${post.id}`} className="text-red-500 hover:underline hover:font-bold">View</Link>
                    </div>
                ))}
            </div>
            </AnimateSide>
        </main>
    )
}