export const Modal = ({ message, action, buttonName }: { message: string; action: () => void; buttonName: string }) => {
  return (
    <div className='modal'>
      <div className='modal message'>{message}</div>
      <div className='modal button'>
        <button onClick={action}>{buttonName}</button>
      </div>
    </div>
  );
};
