import CloseIcon from '@mui/icons-material/Close';

export const FileExtensionTag = ({
  name,
  status,
  onRemove,
  onAction,
}: {
  name?: string;
  status?: string;
  onRemove?: () => void;
  onAction?: () => void;
}) => {
  return (
    <>
      <span className={`file-extension-tag ${status}`} onClick={onAction}>
        <p>{name}</p>
        {status === 'custom' && <CloseIcon onClick={onRemove} />}
      </span>
    </>
  );
};
