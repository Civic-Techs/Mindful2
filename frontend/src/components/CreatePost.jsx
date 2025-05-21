import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { createPost } from "../adapters/postsFetch";

export default function CreatePost({ onPostCreated }) {
  const { currentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    votes: 0,
    is_winner: false,
    user_id: currentUser?.id || null,
    challenge_id: id,
  });

  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const body = {
      //   ...formData,
      //   user_id: currentUser.id,
      // };

      const newPost = await createPost(id, {
        ...formData,
        user_id: currentUser.id,
      });
      console.log("Response", newPost);

      if (!newPost) {
        throw new Error("Failed to create post.");
      }

      if (onPostCreated) {
        onPostCreated(newPost);
      }
      alert("Post created successfully!");
      setFormData({
        title: "",
        description: "",
        img: "",
        votes: 0,
        is_winner: false,
      });

      navigate(`/challenges/${id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("An error occurred while creating the post.");
    }
  };

  return (
    <form id="create-post" onSubmit={handleSubmit}>
      <h2>Create a New Post</h2>
      <label>Title: </label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label>Description: </label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>Image URL:</label>
      <input
        type="text"
        name="img"
        value={formData.img}
        onChange={handleChange}
      />
      <button type="submit">Create Post</button>
    </form>
  );
}
