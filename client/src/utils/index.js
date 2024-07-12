import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_SERVER_URL;
console.log(API_URL);
const CLOUDINARY_ID = import.meta.env.VITE_APP_CLOUDINARY_ID;

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append('file', uploadFile);
  formData.append('upload_preset', 'BomboBlog');
  console.log(formData);
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: null,
          'allow-origin': 'http://localhost:5173',
          'Access-Control-Allow-Headers': '*',
        },
        withCredentials: false,
      }
    );
    console.log(response.data);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const handleMultipleFilesUpload = async (uploadFile) => {
  try {
    const files = [];
    for (let i = 0; i < 4; i++) {
      const formData = new FormData();
      formData.append('file', uploadFile[i]);
      formData.append('upload_preset', 'Smart Vision');
      await axios
        .post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_ID}/image/upload/`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: null,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          files.push(response.data.secure_url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return files;
  } catch (error) {
    console.log(error);
  }
};
