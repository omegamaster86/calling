import React,{ useState, useEffect } from 'react';
import { Alert, AlertIcon, Stack} from '@chakra-ui/react'

export const ImportButton = () => {
  const [isPostSuccess, setIsPostSuccess] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (isPostSuccess || isPostError) {
      setShowAlert(true);
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPostSuccess, isPostError]);
  
  const handleImport = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/spreadsheets/import`, {
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        setIsPostSuccess(true);
        setIsPostError(false);
      } else {
        setIsPostSuccess(false);
        setIsPostError(true);
      }
    })
  };

  return (
    <div>
      <button className='font-bold text-white bg-sky-600 py-2 px-2 mt-5 rounded-lg' onClick={handleImport}>スプレッドシートからインポート</button>
      <div className='pt-3 w-48 rounded-lg'>
        {isPostSuccess && showAlert && (
          <Stack spacing={3}>
            <Alert status='success'>
              <AlertIcon />
              インポート完了!
            </Alert>
          </Stack>
        )}
        {isPostError && showAlert && (
          <Stack spacing={3}>
            <Alert status='error'>
              <AlertIcon />
              インポート失敗。
            </Alert>
          </Stack>
        )}
      </div>
    </div>
  );
}
