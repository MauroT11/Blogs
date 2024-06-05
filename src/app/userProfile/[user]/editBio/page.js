import Submit from "@/component/Submit"
import { sql } from "@vercel/postgres"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function generateMetadata({params}) {
    return {
        title: `Track Gallery - Edit Bio`,
        description: `Change your profile bio`
    }
  }

export default function Page({params}) {

    // console.log(params.user)

    async function handleBio(formData) {
        'use server'
        
        const bio = formData.get('bio')
        console.log(bio)

        await sql`UPDATE trackusers SET bio = ${bio} where username = ${params.user}`

        revalidatePath(`/userProfile/${params.user}`)

        redirect(`/userProfile/${params.user}`)
    }

    return (
        <main className="flex flex-col items-center justify-between gap-4 py-8">
            <h1 className="text-3xl font-bold">Edit your profile bio</h1>
            <form className="flex flex-col gap-1 items-center" action={handleBio}>
                <div className="flex flex-col gap-1 items-center justify-center mb-4">
                    <label htmlFor="bio" className="text-2xl">New Bio: </label>
                    <textarea rows={5} cols={30} type="text" name="bio" id="bio" className="bg-white border-zinc-400 border-[2px] rounded-lg p-1 min-w-[500px] text-lg"/>
                </div>
                <Submit />
            </form>
        </main>
    )
}