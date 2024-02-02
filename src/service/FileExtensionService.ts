import axios from 'axios';
import CreateExtensionDto from 'model/CreateExtensionDto';
import UpdateExtensionDto from 'model/UpdateExtensionDto';

const API = `${process.env.REACT_APP_SERVER_URL}/file-extenion`;

export const createCustomExtension = async (body: CreateExtensionDto) => {
  try {
    const response = await axios.post(`${API}`, body);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const findAllExtensions = async () => {
  try {
    const response = await axios.get(`${API}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateExtension = async (body: UpdateExtensionDto) => {
  try {
    const response = await axios.put(`${API}`, body);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteById = async (id: string) => {
  try {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
