import { FileExtensionTag } from 'components/FileExtensionTag';
import { Modal } from 'components/Modal';
import { useFileExtensions } from 'hooks/useFileExtension';
import { useModal } from 'hooks/useModal';
import CreateExtensionDto from 'model/CreateExtensionDto';
import FileExtensionDto from 'model/FileExtensionDto';
import UpdateExtensionDto from 'model/UpdateExtensionDto';
import { useEffect, useState } from 'react';
import { createCustomExtension, deleteById, updateExtension } from 'service/FileExtensionService';

export default () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [customExtension, setCustomExtension] = useState<string>('');

  const { fetchData, extensions, fixExtensions, customExtensions, blockedExtensions } = useFileExtensions();
  const { modalInfo, openModal, closeModal } = useModal();

  const count = { currentCustomExt: customExtensions.length, maximumCustomExt: 200 };

  const createExtension = async () => {
    if (!customExtension) {
      openModal('확장자명을 입력하세요.', closeModal, '확인');
      return;
    }

    if (extensions.some((ext) => ext.name === customExtension)) {
      setCustomExtension('');
      openModal('중복된 확장자입니다.', closeModal, '확인');
      return;
    }
    const customExtensionDto = new CreateExtensionDto(customExtension, false, 'custom');

    const response = await createCustomExtension(customExtensionDto);
    if (response.statusCode === 201) {
      fetchData();
    }
    openModal(response.message, closeModal, '확인');
  };

  const moveExtension = async (extDto: FileExtensionDto) => {
    if (!extDto) {
      openModal('잘못된 접근입니다.', closeModal, '확인');
      return;
    }
    const updateExtensionDto = new UpdateExtensionDto(extDto.id, extDto.name, !extDto.block);

    const response = await updateExtension(updateExtensionDto);
    if (response.statusCode === 200) {
      fetchData();
    }
  };

  const removeExtension = async (extensionId: string) => {
    if (!extensionId || fixExtensions.find((ext) => ext.id === extensionId)) {
      openModal('잘못된 접근입니다.', closeModal, '확인');
      return;
    }
    if (extensions.find((ext) => ext.id === extensionId)) {
      const response = await deleteById(extensionId);
      if (response.statusCode === 200) {
        fetchData();
      }
      openModal(response.message, closeModal, '확인');
    }
  };

  const handleInputChange = (event: any) => {
    if (event.target.value.length > 20) {
      setErrorMessage('20자 이하로 입력하세요.');
      return;
    } else {
      setErrorMessage('');
    }
    setCustomExtension(event.target.value);
  };

  return (
    <div>
      <div>
        <h2>커스텀 확장자</h2>
        <div>
          <input
            type='text'
            onChange={(event) => handleInputChange(event)}
            value={customExtension}
            placeholder='확장자 이름을 입력하세요.'
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button onClick={() => createExtension()}>추가</button>
        </div>
        <div>
          {count.currentCustomExt} / {count.maximumCustomExt}
        </div>
      </div>
      <div>
        <h2>차단할 확장자</h2>
        <div>
          {fixExtensions.map((ext) => (
            <FileExtensionTag key={ext.id} name={ext.name} status='fix' onAction={() => moveExtension(ext)} />
          ))}
          {customExtensions.map((ext) => (
            <FileExtensionTag
              key={ext.id}
              name={ext.name}
              status='custom'
              onAction={() => moveExtension(ext)}
              onRemove={() => removeExtension(ext.id)}
            />
          ))}
        </div>
      </div>
      <div>
        <h2>차단된 확장자</h2>
        <div>
          {blockedExtensions.length > 0 ? (
            <>
              {blockedExtensions.map((ext) => (
                <FileExtensionTag key={ext.id} name={ext.name} status='blocked' onAction={() => moveExtension(ext)} />
              ))}
            </>
          ) : (
            <p>차단할 확장자를 옆 박스에서 추가해보세요.</p>
          )}
        </div>
      </div>
      {modalInfo.isOpen && (
        <Modal message={modalInfo.message} action={modalInfo.action} buttonName={modalInfo.buttonName} />
      )}
    </div>
  );
};
