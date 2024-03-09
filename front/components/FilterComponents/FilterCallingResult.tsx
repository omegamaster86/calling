import { Select } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

interface FilterCallingResult {
    selectedOption: string;
    onCallingResultChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  }

export const FilterCallingResult: React.FC<FilterCallingResult> = ({ selectedOption, onCallingResultChange }) => {
  const [filterOption, setFilterOption] = useState(selectedOption || '');

  useEffect(() => {
    setFilterOption(selectedOption || '');
  }, [selectedOption]);
  return (
        <Select placeholder='架電結果' bg='Cyan 50' ml='5' value={filterOption} onChange={onCallingResultChange}>
            <option value='アポイント'>アポイント</option>
            <option value='コンタクト'>コンタクト</option>
            <option value='資料送付'>資料送付</option>
            <option value='キーマンNG'>キーマンNG</option>
            <option value='受付NG'>受付NG</option>
            <option value='不在'>不在</option>
            <option value='不通'>不通</option>
            <option value='現アナ'>現アナ</option>
            <option value='テスト'>テスト</option>
        </Select>
  );
}