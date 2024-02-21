import React from 'react';

export const ImportButton = () => {
  const handleImport = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_companies`, {
      method: 'POST',
    }).then(response => {
      if (response.ok) {
        console.log('インポートジョブを実行しました。');
      } else {
        console.error('エラーが発生しました。');
      }
    });
  };

  return (
    <button className='font-bold text-white bg-sky-600 py-2 px-2 mt-5 rounded-lg' onClick={handleImport}>スプレッドシートからインポート</button>
  );
}
