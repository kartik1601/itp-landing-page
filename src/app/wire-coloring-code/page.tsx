'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://wcc.ngrok.io/process-image', formData, {
        responseType: 'blob',
      });

      const imageBlob = response.data;
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setProcessedImage(imageObjectURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload and Process</button>
      </form>
      {loading && <p>Processing...</p>}
      {processedImage && (
        <div>
          <h2>Processed Image:</h2>
          <Image src={processedImage} alt="Processed" width={500} height={500} />
        </div>
      )}
    </div>
  );
};

export default UploadPage;
