export const Modal = ({ message, action, buttonName }: { message: string; action: () => void; buttonName: string }) => {
  return (
    <div className='modal container'>
      <div className='content'>
        <button className='close' onClick={action}>
          ✖
        </button>
        <p>{message}</p>
        <button className='accept' onClick={action}>
          {buttonName}
        </button>
      </div>
    </div>
  );
};
