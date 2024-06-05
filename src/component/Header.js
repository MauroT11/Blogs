import PopHeader from "@/component/PopHeader"
import { UserButton, SignInButton  } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function Header({ username, userId }) {

    return (
        <header className="sticky flex justify-around items-center text-white bg-blue-700 py-2 border-zinc-400 border-b-[5px]">
            <PopHeader>
                <Link href="/" className="text-4xl font-bold">Track Gallery</Link>
            </PopHeader>
            
            <nav>
                <ul className="flex flex-row gap-8 p-2 text-3xl">
                    <PopHeader>
                        <li><a href="/albums">Albums</a></li>
                    </PopHeader>
                    <PopHeader>
                        <li><a href="/addAlbum">Add</a></li>
                    </PopHeader>
                    {userId ? (
                    <UserButton
                        userProfileMode="navigation"
                        userProfileUrl={`/userProfile/${username}`}
                        afterSignOutUrl="/"
                        />
                    ) : (
                        <PopHeader>
                            <Link href={`/signIn`} state={userId}>Sign In</Link>
                        </PopHeader>
                    )}
                </ul>
            </nav>
        </header>
    )
}