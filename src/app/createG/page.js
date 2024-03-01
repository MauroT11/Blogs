import { sql } from "@vercel/postgres"
import Submit from "@/component/Submit"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function generateMetadata({params}) {
    return {
        title: `Track Gallery - Add Genre`,
        description: `Add a new music genre.`
    }
  }

export default async function page() {

    
    async function handleAlbum(formData) {
        'use server'

        
        const name = formData.get('name')
        const desc = formData.get('desc')
        console.log(name, desc)

        await sql`INSERT INTO genres (name, des) VALUES (${name}, ${desc})`

        revalidatePath('/albums')

        redirect('/albums')
    }

    return (
        <main className="flex flex-col items-center mt-1">
            <h1 className="text-3xl font-bold">Add Genre</h1>
            <form className="flex flex-col gap-1" action={handleAlbum}>
                <div className="flex flex-col gap-1 items-center justify-center my-2">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center mb-4">
                    <label htmlFor="desc">Description: </label>
                    <textarea rows={5} cols={30} type="text" name="desc" id="desc" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 text-center"/>
                </div>
                <Submit />
            </form>
        </main>
    )
}