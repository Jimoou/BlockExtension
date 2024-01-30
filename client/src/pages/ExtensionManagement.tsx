import { FileExtensionTag } from 'components/FileExtensionTag';
import { Modal } from 'components/Modal';
import { useFileExtensions } from 'hooks/useFileExtension';
import { useModal } from 'hooks/useModal';
import FileExtension from 'model/FileExtension';
import { useState } from 'react';

export default () => {
  const { modalInfo, openModal, closeModal } = useModal();
  const [errorMessage, setErrorMessage] = useState('');
  const { extensions, fixExtensions, customExtensions, blockedExtensions } = useFileExtensions();
  const [extension, setExtension] = useState<FileExtension>({
    id: '',
    name: '',
    status: '',
    block: false,
  });
  const count = { currentCustomExt: extensions.length, maximumCustomExt: 200 };

  const createExtension = () => {
    if (!extension) {
      openModal('확장자명을 입력하세요.', closeModal, '확인');
      return;
    }

    if (extensions.some((ext) => ext.name === extension.name)) {
      openModal(
        '중복된 확장자입니다.',
        () => {
          setExtension({
            id: '',
            name: '',
            status: '',
            block: false,
          });
        },
        '확인'
      );
      return;
    }
    // TODO : 커스텀 확장자 추가 API 호출
    // TODO : API 호출 후 페이지 리렌더링
  };

  const moveExtension = (extensionId: string, block: boolean) => {
    if (!extensionId) {
      openModal('잘못된 접근입니다.', closeModal, '확인');
      return;
    }

    // TODO : foundedExtension 서버에서 가져오기
    // const foundedExtension = extensions.find((ext) => ext.id === extensionId);
    // setExtension({
    //   id: foundedExtension.id,
    //   name: foundedExtension?.name,
    //   status: foundedExtension?.status,
    //   block: block ? false : true,
    // });
    // TODO : block상태 업데이트 하는 API 호출
    // TODO : API 호출 후 페이지 리렌더링
  };

  const removeExtension = (extensionId: string) => {
    if (!extensionId || fixExtensions.find((ext) => ext.id === extensionId)) {
      openModal('잘못된 접근입니다.', closeModal, '확인');
      return;
    }
    if (extensions.find((ext) => ext.id === extensionId)) {
      // TODO : 확장자 삭제 API 호출
      // TODO : API 호출 후 페이지 리렌더링
    }
  };

  const handleInputChange = (event: any) => {
    if (event.target.value.length > 20) {
      setErrorMessage('20자 이하로 입력하세요.');
      return;
    } else {
      setErrorMessage('');
    }
    setExtension({
      id: '',
      name: event.target.value,
      status: 'custom',
      block: false,
    });
  };

  return (
    <div>
      <div>
        <h2>커스텀 확장자</h2>
        <div>
          <input
            type='text'
            onChange={(event) => handleInputChange(event)}
            value={extension.name}
            placeholder='확장자 이름을 입력하세요.'
          />
          {errorMessage && <p>{errorMessage}</p>}
          <button onClick={() => createExtension}>추가</button>
        </div>
        <div>
          {count.currentCustomExt} / {count.maximumCustomExt}
        </div>
      </div>
      <div>
        <h2>차단할 확장자</h2>
        <div>
          {fixExtensions.map((ext) => (
            <FileExtensionTag key={ext.id} name={ext.name} status='fix' onAction={() => moveExtension(ext.id, true)} />
          ))}
          {customExtensions.map((ext) => (
            <FileExtensionTag
              key={ext.id}
              name={ext.name}
              status='custom'
              onAction={() => moveExtension(ext.id, true)}
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
                <FileExtensionTag
                  key={ext.id}
                  name={ext.name}
                  status='blocked'
                  onAction={() => moveExtension(ext.id, false)}
                />
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
