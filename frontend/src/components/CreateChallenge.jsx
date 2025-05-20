import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";

export default function CreateChallenge({ onChallengeCreated }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
    is_contest: false,
    end_time: "",
    user_id: currentUser?.id || "",
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
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // console.log(formData);

      if (!response.ok) {
        // console.log(response);
        throw new Error("Failed to create challenge");
      }

      const newChallenge = await response.json();
      if (onChallengeCreated) {
        onChallengeCreated(newChallenge);
      }
      alert("Challenge created successfully!");
      setFormData({
        title: "",
        description: "",
        img: "",
        is_contest: false,
        end_time: "",
        user_id: currentUser?.id || "",
      });
      navigate("/challenges");
    } catch (error) {
      console.error("Error creating challenge:", error);
      alert("An error occurred while creating the challenge.");
    }
  };

  return (
    <form id="create-form" onSubmit={handleSubmit}>
      <h2>Create a New Challenge</h2>
      <label>Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <label>Description:</label>
      <textarea
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
      <label>
        Is Contest:{" "}
        <input
          type="checkbox"
          name="is_contest"
          checked={formData.is_contest}
          onChange={handleChange}
        />
      </label>
      <label>End Time:</label>{" "}
      <input
        type="datetime-local"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
      />
      <button type="submit">Create Challenge</button>
    </form>
  );
}
