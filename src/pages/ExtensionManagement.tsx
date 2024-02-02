import { FileExtensionTag } from 'components/FileExtensionTag';
import { FileUpload } from 'components/FileUpload';
import { Modal } from 'components/Modal';
import { useFileExtensions } from 'hooks/useFileExtension';
import { useModal } from 'hooks/useModal';
import CreateExtensionDto from 'model/CreateExtensionDto';
import FileExtensionDto from 'model/FileExtensionDto';
import UpdateExtensionDto from 'model/UpdateExtensionDto';
import { useState } from 'react';
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
    <div className='container'>
      <h2>파일 확장자 차단</h2>
      <div className='content'>
        <h3>확장자 목록</h3>
        <div className='header'>
          <h4>자주쓰는 확장자</h4>
        </div>
        <div className='box'>
          {fixExtensions &&
            fixExtensions.map((ext) => (
              <FileExtensionTag key={ext.id} name={ext.name} status='fix' onAction={() => moveExtension(ext)} />
            ))}
        </div>
        <div className='header'>
          <h4>직접 추가한 확장자</h4>
          <p className='text'>
            {count.currentCustomExt} / {count.maximumCustomExt}
          </p>
          <input
            type='text'
            onChange={(event) => handleInputChange(event)}
            value={customExtension}
            placeholder='확장자 이름을 입력하세요.'
          />
          <button onClick={() => createExtension()}>추가</button>
          {errorMessage && <p className='text error'>{errorMessage}</p>}
        </div>
        <div className='box'>
          {customExtensions ? (
            <>
              {customExtensions.map((ext) => (
                <FileExtensionTag
                  key={ext.id}
                  name={ext.name}
                  status='custom'
                  onAction={() => moveExtension(ext)}
                  onRemove={() => removeExtension(ext.id)}
                />
              ))}
            </>
          ) : (
            <p className='text info'>확장자명을 직접 작성해보세요.</p>
          )}
        </div>
      </div>
      <div className='content'>
        <h3>차단된 확장자 목록</h3>
        <div className='box'>
          {blockedExtensions ? (
            <>
              {blockedExtensions.map((ext) => (
                <FileExtensionTag key={ext.id} name={ext.name} status='blocked' onAction={() => moveExtension(ext)} />
              ))}
            </>
          ) : (
            <p className='text info'>차단할 확장자를 위에서 클릭하여 추가해보세요.</p>
          )}
        </div>
      </div>
      <div className='content'>
        <h3>파일 첨부하고 전송하기</h3>
        <div className='box'>
          <FileUpload />
        </div>
      </div>
      {modalInfo.isOpen && (
        <Modal message={modalInfo.message} action={modalInfo.action} buttonName={modalInfo.buttonName} />
      )}
    </div>
  );
};
