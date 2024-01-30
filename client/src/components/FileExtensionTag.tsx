import FileExtension from 'model/FileExtension';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

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
      <span className={`file-extension-tag ${status}`}>
        <p onClick={onAction}>{name}</p>
        {status === 'custom' && (
          <p onClick={onRemove}>
            <CloseIcon />
          </p>
        )}
      </span>
    </>
  );
};
