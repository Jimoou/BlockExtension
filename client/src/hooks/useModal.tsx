import { useState } from 'react';

export const useModal = () => {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    message: '',
    action: () => {},
    buttonName: '',
  });

  const openModal = (message: string, action: () => void, buttonName: string) => {
    setModalInfo({
      isOpen: true,
      message,
      action,
      buttonName,
    });
  };

  const closeModal = () => {
    if (modalInfo.action && modalInfo.action !== closeModal) {
      modalInfo.action();
    }
    setModalInfo({ ...modalInfo, isOpen: false });
  };

  return { modalInfo, openModal, closeModal };
};
