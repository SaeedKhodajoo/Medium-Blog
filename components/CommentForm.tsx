import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Post } from "../typings";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function CommentForm({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
        reset({ name: "", email: "", comment: "" });
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

//   useEffect(() => {
//     if (formState.isSubmitSuccessful) {
//       reset({ name: "", email: "", comment: "" });
//     }
//   }, [formState, submitted, reset]);

  submitted && setTimeout(() => setSubmitted(false), 3000);

  if (submitted) {
    return (
      <div className="flex flex-col p-10 my-10 text-white bg-yellow-500 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold">
          Thank you for submitting your comment!
        </h3>
        <p>Once it has been approved, it will be appear below!</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col max-w-2xl p-5 mx-auto mb-10"
    >
      <h3 className="text-lg text-yellow-500">Enjoyed this article</h3>
      <h4 className="text-3xl font-bold">Leave a comment bellow!</h4>
      <hr className="py-3 mt-2" />

      <input {...register("_id")} type="hidden" name="_id" value={post._id} />

      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register("name", { required: true })}
          className="shadow border rounded py-2 px-3  form-input mt-1 block  w-full focus:ring outline-none ring-yellow-500"
          type="text"
          placeholder="your name"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          {...register("email", { required: true })}
          className="shadow border rounded py-2 px-3  form-input mt-1 block  w-full focus:ring outline-none ring-yellow-500"
          type="email"
          placeholder="your email"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          className="shadow border rounded py-2 px-3  form-textarea mt-1 block  w-full focus:ring outline-none ring-yellow-500"
          rows={8}
          placeholder="let me know what you think..."
        />
      </label>

      <div className="flex flex-col p-5">
        {errors.name && (
          <span className="text-red-500">- The name field is required</span>
        )}
        {errors.email && (
          <span className="text-red-500">- The email field is required</span>
        )}
        {errors.comment && (
          <span className="text-red-500">- The comment field is required</span>
        )}
      </div>

      <input
        type="submit"
        value="Submit"
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline 
      focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
      />
    </form>
  );
}

export default CommentForm;
