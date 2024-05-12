import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-screen-lg text-center gap-4 mt-8">
        <h1>ADD</h1>
        <div className="flex gap-8">
            <Link href={"/add/addAlbum"}>Album</Link>
            <Link href={"/add/addGenre"}>Genre</Link>
        </div>
        
      </div>
    </main>
  );
}
