import { sql } from "@vercel/postgres"
import Link from "next/link"
import Image from "next/image"
import Filter from "@/component/Filter"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import AnimateSide from "@/component/AnimateSide";
import AnimateIn from "@/component/AnimateIn";
import AlbumPop from "@/component/AlbumPop";

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
        <main className="flex flex-col items-center justify-between mb-24">
            <h1 className="text-3xl font-bold mt-4">All Albums</h1>
            <form action={handleFilter}>
                <div className="flex gap-2 justify-center my-4 items-center">
                        <label htmlFor="genre" className="text-lg">Genres:</label>
                        <select name="genre" id="genre" className="text-center border-zinc-400 border-[2px] rounded-lg py-1">
                            <option value={0}>Select...</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                        <Filter />
                </div>
            </form>
            <div className="flex gap-3 text-lg my-4">
              <Link href={`/albums?sort=asc`}>Sort ascending</Link> - <Link href={`/albums?sort=desc`}> Sort descending</Link>
            </div>
            <AnimateIn>
                <div className="flex gap-16 max-w-[1500px] flex-wrap justify-center">
                {/* <div className="grid grid-cols-6 gap-8 items-center"> */}
                    {posts.map((post) => (
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
            </AnimateIn>
        </main>
    )
}