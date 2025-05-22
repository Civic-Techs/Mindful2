import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      setStatus('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setStatus('Uploading...');
      const response = await axios.post(
        'http://localhost:3000/upload',
        formData
      );
      const imageUrl = response.data.imageUrl;
      setStatus('Image uploaded successfully!');

      // Pass the Cloudinary URL to the parent component
      if (onUpload) {
        onUpload(imageUrl);
      }
    } catch (error) {
      setStatus('Image upload failed.');
      console.error(error);
    }
  };

  return (
    <div className="upload-container">
      <h5>Upload an Image</h5>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Preview" />}
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default UploadForm;
