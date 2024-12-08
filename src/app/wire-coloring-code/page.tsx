'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { motion } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-500 to-yellow-600 text-gray-800 flex flex-col items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white rounded-lg shadow-lg p-6 sm:p-8 max-w-xs sm:max-w-md md:max-w-lg w-full"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-yellow-300">
          Wire Coloring Code - Upload Image
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label
              className="block text-base sm:text-lg font-medium mb-2"
              htmlFor="fileInput"
            >
              Select an image to process
            </label>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-300 bg-gray-800 rounded-lg border border-gray-600 shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-none file:text-sm file:font-semibold file:bg-yellow-500 file:text-gray-900 hover:file:bg-yellow-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 transition-all duration-200"
          >
            {loading ? 'Processing...' : 'Upload and Process'}
          </button>
        </form>
        {loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
            className="text-center text-yellow-300 font-medium mt-4"
          >
            Processing your image...
          </motion.p>
        )}
        {processedImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 text-center"
          >
            <h2 className="text-lg sm:text-2xl font-semibold text-yellow-300 mb-4">
              Processed Image
            </h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={processedImage}
                alt="Processed"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default UploadPage;
