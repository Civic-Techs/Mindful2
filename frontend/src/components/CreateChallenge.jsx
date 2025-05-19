import { useState } from 'react';

export default function CreateChallenge({ onChallengeCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    img: '',
    is_contest: false,
    end_time: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-challenges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create challenge');
      }

      const newChallenge = await response.json();
      if (onChallengeCreated) {
        onChallengeCreated(newChallenge);
      }
      alert('Challenge created successfully!');
      setFormData({
        title: '',
        description: '',
        img: '',
        is_contest: false,
        end_time: '',
      });
    } catch (error) {
      console.error('Error creating challenge:', error);
      alert('An error occurred while creating the challenge.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create a New Challenge</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
      </label>
      <label>
        Is Contest:
        <input
          type="checkbox"
          name="is_contest"
          checked={formData.is_contest}
          onChange={handleChange}
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Create Challenge</button>
    </form>
  );
}
