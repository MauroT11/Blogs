import Image from "next/image";

export default async function Home() {

  
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-[1000px] text-center gap-4 mt-8">
        <p className="text-2xl">Music has been an integral part of the human experience throughout history. From ancient tribal chants to modern symphonies, it has transcended cultural boundaries and connected people across time and space. Music transcends time, language, and borders, weaving a rich tapestry of human existence. Whether through ancient chants, classical masterpieces, or contemporary hits, music continues to resonate within us all.</p>
          <p className="text-lg">On this website you can add genres and albums, leave comments on the albums.</p>
          <div className="flex gap-4">
            <Image src='https://i.ebayimg.com/images/g/QQAAAOSwk-JiEK3v/s-l1200.webp' alt="Music Notes" width={500} height={100} />
        </div>
      </div>
    </main>
  );
}
