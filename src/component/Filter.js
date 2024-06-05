import FilterBtn from "@/component/FilterBtn"
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Filter({genres}) {

    async function handleFilter(formData) {
        'use server'

        const genre = formData.get('genre')

        revalidatePath(`/genres/${genre}`)

        redirect(`/genres/${genre}`)
    }

    return (
        <form action={handleFilter}>
                <div className="flex gap-4 justify-center my-4 items-center">
                        <label htmlFor="genre" className="text-2xl">Genres:</label>
                        <select name="genre" id="genre" className="text-center border-zinc-400 border-[2px]  rounded-lg py-1">
                            <option value={0}>Select...</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                        <FilterBtn />
                </div>
            </form>
    )
}