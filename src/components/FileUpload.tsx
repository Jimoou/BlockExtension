import { useModal } from 'hooks/useModal';
import { useState } from 'react';
import { uploadFile } from 'service/FileService';
import { Modal } from './Modal';

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { modalInfo, openModal, closeModal } = useModal();

  const handleFileChange = async (event: any) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadFile(formData);

      if (response.statusCode === 200) {
        setFile(null);
      }
      openModal(response.message, closeModal, '확인');
    }
  };

  return (
    <>
      <input type='file' onChange={handleFileChange} />
      <button onClick={() => handleUpload()}>전송</button>
      {modalInfo.isOpen && (
        <Modal message={modalInfo.message} action={modalInfo.action} buttonName={modalInfo.buttonName} />
      )}
    </>
  );
};
