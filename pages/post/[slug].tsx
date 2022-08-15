import { GetStaticProps } from "next";
import React from "react";
import CommentForm from "../../components/CommentForm";
import Comments from "../../components/Comments";
import Header from "../../components/Header";
import SinglePostDetails from "../../components/Post";
import { sanityCLient } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  post: Post;
}

function SinglePostPage({ post }: Props) {
  return (
    <main>
      <Header />
      <SinglePostDetails post={post} />
      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
      <CommentForm post={post} />
      {post.comments.length !== 0 && <Comments post={post} />}
    </main>
  );
}

export default SinglePostPage;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
      }
      }`;

  const posts = await sanityCLient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author -> {
    name,
    image
  },
  "comments":*[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ],
  description,
  mainImage,
    slug,
  body
  }`;

  const post = await sanityCLient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
