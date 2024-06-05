import Image from "next/image";
import Link from "next/link"
import { sql } from "@vercel/postgres"
import AlbumPop from "@/component/AlbumPop"

export default async function Home() {

  const albums = (await sql`select * from albumRevs order by id desc limit 5`).rows

  const likes = (await sql`select * from albumRevs order by likes desc limit 5`).rows
    
  const genres = (await sql`select * from genres`).rows
// console.log(albums)
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-[1500px] text-center gap-4 mt-4">
        <h1 className="text-4xl font-bold">Recently Added Albums</h1>
        <div className="flex gap-8 mb-4">
          {albums.map((album) => (
            <div key={albums.id} title={`${album.title} by ${album.artist}`} className="shadow-lg rounded-lg shadow-blue-500/50 ">
            <AlbumPop >
              <Link href={`/albums/${album.id}`}>
                <Image src={album.image} alt="Album Image" width={250} height={200} className=" rounded-lg border-zinc-700 border-4"/>
              </Link>
            </AlbumPop>
            </div>
          ))}
        </div>
        <h3 className="text-4xl font-bold">Genres</h3>
        <div className="flex gap-8 mb-4">
          {genres.map((genre) => (
            <div key={genre.id} className="hover:scale-125 hover:duration-300">
              <Link href={`/genres/${genre.id}`} className="text-3xl text-zinc-600 hover:text-black hover:duration-300">
                {genre.name}
              </Link>
            </div>
          ))}
        </div>
        <h1 className="text-4xl font-bold">Top Rated Albums</h1>
        <div className="flex gap-8">
          {likes.map((album) => (
            <div key={albums.id} title={`${album.title} by ${album.artist}`} className="shadow-xl rounded-lg shadow-blue-500/50">
            <AlbumPop>
              <Link key={albums.id} href={`/albums/${album.id}`}>
                <Image src={album.image} alt="Album Image" width={250} height={200} className=" rounded-lg border-zinc-700 border-4" />
              </Link>
            </AlbumPop>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
