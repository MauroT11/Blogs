import { sql } from "@vercel/postgres"
import Image from "next/image"
import { revalidatePath } from "next/cache";
import AVotesBtn from "@/component/AVotesBtn"


export default function AlbumVotes({album, }) {

    return(
        <>
            <form>
                <AVotesBtn />
            </form>
        </>
    )
}