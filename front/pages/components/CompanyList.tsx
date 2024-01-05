import FilterAltIcon from '@mui/icons-material/FilterAlt';

  export const CompanyList = () => {
    return (
     
    <div style={{ height: '700px', width: '100%', overflowX: 'auto', overflowY: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th className='border-2 w-44'>活動ステータス<FilterAltIcon/></th>
            <th className='border-2 w-44'>営業担当者<FilterAltIcon/></th>
            <th className='border-2 w-44'>最終アタック結果<FilterAltIcon/></th>
            <th className='border-2 w-44'>次回予定日<FilterAltIcon/></th>
            <th className='border-2 w-44'>優先度<FilterAltIcon/></th>
            <th className='border-2 w-44'>会社名<FilterAltIcon/></th>
            <th className='border-2 w-44'>業界<FilterAltIcon/></th>
            <th className='border-2 w-44'>名前<FilterAltIcon/></th>
            <th className='border-2 w-44'>部署<FilterAltIcon/></th>
            <th className='border-2 w-44'>特記事項<FilterAltIcon/></th>
          </tr>
        </thead>
        <tbody  className='border-solid border-2'>
          {Array.from({ length: 30 }).map((_, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
              <td className='border-2'>ステータス {index + 1}</td>
              <td className='border-2'>担当者 {index + 1}</td>
              <td className='border-2'>結果 {index + 1}</td>
              <td className='border-2'>予定日 {index + 1}</td>
              <td className='border-2'>優先度 {index + 1}</td>
              <td className='border-2'>会社名 {index + 1}</td>
              <td className='border-2'>業界 {index + 1}</td>
              <td className='border-2'>名前 {index + 1}</td>
              <td className='border-2'>部署 {index + 1}</td>
              <td className='border-2'>特記事項 {index + 1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        )
    }
  
