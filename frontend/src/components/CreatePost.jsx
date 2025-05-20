import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { addParticipant } from "../adapters/participants-adapter";

export default function CreatePost({ onPostCreated, challengeId }) {
    const { currentUser } = useContext(CurrentUserContext);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        img: "",
        votes: 0,
        winner: false,
        user_id: currentUser?.id || "",
        challenge_id: challengeId
    });

    const navigate = useNavigate();

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
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to create post.");
            }

            const newPost = await response.json();
            if (onPostCreated) {
                onPostCreated(newPost);

                await addParticipant({ user_id: formData.user_id, challenge_id: formData.challenge_id });
            }

            alert("Post created and you have joined the challenge!");
            setFormData({
                title: "",
                description: "",
                img: "",
                votes: 0,
                user_id: currentUser?.id || "",
                challenge_id: challengeId || ""
            });
            navigate("/posts");
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
    )
}
