import FileExtension from 'model/FileExtensionDto';
import { useState, useEffect } from 'react';
import { findAllExtensions } from 'service/FileExtensionService';

export const useFileExtensions = () => {
  const [extensions, setExtensions] = useState<FileExtension[]>([]);
  const [fixExtensions, setFixExtensions] = useState<FileExtension[]>([]);
  const [customExtensions, setCustomExtensions] = useState<FileExtension[]>([]);
  const [blockedExtensions, setBlockedExtensions] = useState<FileExtension[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await findAllExtensions();
    if (data) {
      setExtensions(data);
    }
  };

  useEffect(() => {
    const filteredFix: FileExtension[] = [];
    const filteredCustom: FileExtension[] = [];
    const filteredBlocked: FileExtension[] = [];

    extensions.forEach((ext) => {
      if (ext.block) {
        filteredBlocked.push(ext);
      } else {
        if (ext.status === 'fix') {
          filteredFix.push(ext);
        }
        if (ext.status === 'custom') {
          filteredCustom.push(ext);
        }
      }
    });

    setFixExtensions(filteredFix);
    setCustomExtensions(filteredCustom);
    setBlockedExtensions(filteredBlocked);
  }, [extensions]);

  return { extensions, fixExtensions, customExtensions, blockedExtensions, fetchData };
};
