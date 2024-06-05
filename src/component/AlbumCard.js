import AnimateSide from "@/component/AnimateSide";
import AnimateIn from "@/component/AnimateIn";
import AlbumPop from "@/component/AlbumPop";
import Link from "next/link"
import Image from "next/image"

export default function AlbumCard({albums}) {

    return(
        <AnimateIn>
                <div className="flex gap-16 max-w-[1500px] flex-wrap justify-center">
                    {albums.map((album) => (
                        <AlbumPop key={album.id}>
                            <Link  href={`/albums/${album.id}`} className="border-2 bg-indigo-100 p-4 flex flex-col mt-3 items-center rounded-xl border-zinc-400 max-w-[350px] shadow-lg shadow-blue-500/50 ">
                                <h3 className="text-2xl font-bold text-center">{album.title}</h3>
                                <Image src={album.image} alt="Album Image" width={250} height={200} className="my-2 rounded" />
                                <p className="text-lg">{album.artist}</p>
                                {/* <Link href={`/albums/${post.id}`} className="text-red-500 hover:font-bold">View</Link> */}
                            </Link>
                        </AlbumPop>
                        
                    ))}
                </div>
            </AnimateIn>
    )
}