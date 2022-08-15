import Link from "next/link";
import { urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  post: Post
}

function SinglePost({ post }: Props) {
  return (
    <Link href={`/post/${post.slug.current}`}>
      <div className="group cursor-pointer border rounded-lg overflow-hidden">
        {post.mainImage && (
          <img className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()} alt={post.title} />
        )}
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-xs">
              {post.description} by {post.author.name}
            </p>
          </div>
          {post.author.image && (
            <img className="h-12 w-12 rounded-full" src={urlFor(post.author.image).url()} alt={post.author.name} />
          )}
        </div>
      </div>
    </Link>
  );
}

export default SinglePost;
