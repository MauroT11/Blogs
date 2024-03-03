import Image from "next/image";

export default async function Home() {

  
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col items-center max-w-screen-lg text-center gap-4 mt-8">
        <p>Music has been an integral part of the human experience throughout history. From ancient tribal chants to modern symphonies, it has transcended cultural boundaries and connected people across time and space. Music transcends time, language, and borders, weaving a rich tapestry of human existence. Whether through ancient chants, classical masterpieces, or contemporary hits, music continues to resonate within us all.</p>
          <p>On this website you can add genres and albums, leave comments about the albums.</p>
            <div className="flex gap-4 text-2xl">
              <a href="/albums" className="hover:underline">Albums</a>
              <a href="/createA" className="hover:underline">Add Album</a>
              <a href="/createG" className="hover:underline">Add Genre</a>
            </div>          
          <div className="flex gap-4">
            {/* <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg/1200px-Joseph_Karl_Stieler%27s_Beethoven_mit_dem_Manuskript_der_Missa_solemnis.jpg' alt="Ludwig Beethoven" width={100} height={100} />
            <Image src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Mozart_Portrait_Croce.jpg' alt="Wolfgang Mozart" width={100} height={100} />
            <Image src='https://hips.hearstapps.com/hmg-prod/images/louis.jpg' alt="Lois Armstrong" width={100} height={100} />
            <Image src='https://hips.hearstapps.com/hmg-prod/images/photo-of-elvis-presley-posed-studio-portrait-of-elvis-news-photo-84857388-1552512781.jpg?crop=0.794xw:1.00xh;0.0102xw,0&resize=640:*' alt="Elvis Presley" width={100} height={100} />
            <Image src='https://www.bobgruen.com/wp-content/uploads/2014/05/C-112_JamesBrown_1980_Gruen.jpg?gid=87' alt="James Brown" width={100} height={100} />
            <Image src='https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/512227_v9_bb.jpg' alt="Michael Jackson" width={100} height={100} /> */}
            <Image src='https://i.ebayimg.com/images/g/QQAAAOSwk-JiEK3v/s-l1200.webp' alt="Frank Sinatra" width={500} height={100} />
        </div>
      </div>
    </main>
  );
}
