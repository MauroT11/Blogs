import Link from "next/link";
import Image from "next/image";
import AlbumPop from "@/component/AlbumPop";
import { sql } from "@vercel/postgres"
import AlbumCard from "@/component/AlbumCard"
import Button from '@mui/material/Button';
import { IoMdCreate } from "react-icons/io";
import { UserProfile } from "@clerk/nextjs";

export default async function Page({params}) {

    const albums = (await sql`select * from albumrevs where username = ${params.user}`).rows
    const userInfo = (await sql`select * from trackusers where username = ${params.user}`).rows
    // console.log(userInfo)

    return (
        <main className="flex flex-col items-center justify-between gap-4 py-8">
            {userInfo.map((info) => (
                <div key={info.id} className="flex flex-col gap-4 items-center">
                    <h1 className="text-4xl font-bold">{info.username}</h1>
                    <p className="text-2xl">{info.bio}</p>
                    {/* <Link href={`/userProfile/${info.username}/editBio`}>Edit Bio</Link> */}
                    <Button variant="outlined" href={`/userProfile/${info.username}/editBio`} size="small" startIcon={<IoMdCreate />}>Edit Bio</Button>
                </div>
            ))}
            <div>
            </div>
            <div className="flex flex-col text-center gap-4">
                <h1 className="text-4xl font-semibold">Added Albums</h1>
                <AlbumCard albums={albums} />
            </div>    
            <UserProfile />
        </main>
        
    )
}