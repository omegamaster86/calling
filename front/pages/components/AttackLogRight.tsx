

export const AttackLogRight = () => {
  return (
    <div className='mt-5'>
        <h2 className='mx-9 font-extrabold border-l-4 border-sky-400 border-b-2 pb-2 pl-2'>架電履歴</h2>
        <div style={{ height: '700px', width: '700px', overflowX: 'auto', overflowY: 'auto' }}>
        <table className='mx-9 mt-8'>
            <thead>
            <tr>
                <th className='border-2 w-44'>アタック日</th>
                <th className='border-2 w-44'>架電結果</th>
                <th className='border-2 w-44'>対話内容</th>
            </tr>
            </thead>
            <tbody  className='border-solid border-2'>
            {Array.from({ length: 15 }).map((_, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className='border-2 text-nowrap truncate'>アタック日 {index + 1}</td>
                <td className='border-2 truncate'>架電結果 {index + 1}</td>
                <td className='border-2 truncate'>対話内容 {index + 1}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    </div>
  );
}