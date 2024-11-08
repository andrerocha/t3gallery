
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { db } from "~/server/db";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/JhWsSz31MqySi4zXnpbadTOHbU5c0GJCyv73kfFonLpASjlK",
  "https://utfs.io/f/JhWsSz31MqySi6PMRgEbadTOHbU5c0GJCyv73kfFonLpASjl",
  "https://utfs.io/f/JhWsSz31MqySXdrn5qDtjmr9VKHpMi261YeZTDwzgqUSFaA5",
  "https://utfs.io/f/JhWsSz31MqyStYqTckZAR3tzX8dh2ZeDulKHwkgcnsVqM75p",
  "https://utfs.io/f/JhWsSz31MqyS3dlBmEaMhxuWw8gRAt3TnUHJq1cIfaPyXFZi",
  "https://utfs.io/f/JhWsSz31MqySszrgpDWLdANhbUQsGC7YfTIt1c9e4nPjJEVy",  
  "https://utfs.io/f/JhWsSz31MqySaooutzUFTGpHLSYfNPXBwgt752OM4aVlEhcD",
  "https://utfs.io/f/JhWsSz31MqySNawdYofZzAHacs4nuwhtp1BRqrDF895ImLY2",
  "https://utfs.io/f/JhWsSz31MqySZ6NWCD4NjRXr7FU1yBMKEADzuP89JdGxkgSV"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));

async function Images(){
  const images = await getMyImages();

  return (      
  <div className="flex flex-wrap gap-4">
    {images.map((image) => (
      <div key={image.id} className="flex h-48 w-48 flex-col">        
        <Image 
          src={image.url}                    
          style={{objectFit: "contain"}}
          width={192}
          height={192}
          alt={image.name}
          />
          <div>{image.name}</div>
      </div>
    ))}
  </div>)
}

export default async function HomePage() {

  return (
    <main className="">

      <SignedOut>
        <div className="w-full h-hull text-2x1 text-center">Please sign in above</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
