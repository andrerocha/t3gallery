
import { db } from "~/server/db";

export const dynamic = "forece-dynamic";

const mockUrls = [
  "https://utfs.io/f/JhWsSz31MqySi4zXnpbadTOHbU5c0GJCyv73kfFonLpASjlK",
  "https://utfs.io/f/JhWsSz31MqySi6PMRgEbadTOHbU5c0GJCyv73kfFonLpASjl",
  "https://utfs.io/f/JhWsSz31MqySXdrn5qDtjmr9VKHpMi261YeZTDwzgqUSFaA5",
  "https://utfs.io/f/JhWsSz31MqyStYqTckZAR3tzX8dh2ZeDulKHwkgcnsVqM75p",
  "https://utfs.io/f/JhWsSz31MqyS3dlBmEaMhxuWw8gRAt3TnUHJq1cIfaPyXFZi",
  "https://utfs.io/f/JhWsSz31MqySszrgpDWLdANhbUQsGC7YfTIt1c9e4nPjJEVy",
  "https://utfs.io/f/JhWsSz31MqySszrgpDWLdANhbUQsGC7YfTIt1c9e4nPjJEVy",
  "https://utfs.io/f/JhWsSz31MqySaooutzUFTGpHLSYfNPXBwgt752OM4aVlEhcD",
  "https://utfs.io/f/JhWsSz31MqySNawdYofZzAHacs4nuwhtp1BRqrDF895ImLY2",
  "https://utfs.io/f/JhWsSz31MqySZ6NWCD4NjRXr7FU1yBMKEADzuP89JdGxkgSV"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url
}));



export default async function HomePage() {

  const posts = await db.query.posts.findMany();

  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
          <div key={image.id + "-" + index} className="w-48" >
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
