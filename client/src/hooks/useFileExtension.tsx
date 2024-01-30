import FileExtension from 'model/FileExtension';
import { useState, useEffect } from 'react';

export const useFileExtensions = () => {
  const [extensions, setExtensions] = useState<FileExtension[]>([]);
  const [fixExtensions, setFixExtensions] = useState<FileExtension[]>([]);
  const [customExtensions, setCustomExtensions] = useState<FileExtension[]>([]);
  const [blockedExtensions, setBlockedExtensions] = useState<FileExtension[]>([]);

  useEffect(() => {
    // TODO : 서버에서 extensions 데이터를 가져오는 API 호출
    const fetchData = async () => {
      // const data = await fetchExtensions();
      // setExtensions(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredFix: FileExtension[] = [];
    const filteredCustom: FileExtension[] = [];
    const filteredBlocked: FileExtension[] = [];

    extensions.forEach((ext) => {
      if (ext.status === 'fixed') {
        filteredFix.push(ext);
      }
      if (ext.status === 'custom') {
        filteredCustom.push(ext);
      }
      if (ext.block) {
        filteredBlocked.push(ext);
      }
    });

    setFixExtensions(filteredFix);
    setCustomExtensions(filteredCustom);
    setBlockedExtensions(filteredBlocked);
  }, [extensions]);

  return { extensions, fixExtensions, customExtensions, blockedExtensions };
};
