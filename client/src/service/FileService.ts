import axios from 'axios';

const API = `${process.env.REACT_APP_SERVER_URL}/file`;

export const uploadFile = async (file: FormData) => {
  try {
    const response = await axios.post(`${API}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
