'use client';

import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedItem } from '../../store/selectedItemsSlice';
import type { AppDispatch, RootState } from '../../store';
import type { CharacterResult } from '../../types/character';

interface SelectItemCheckboxProps {
  item: CharacterResult;
}

export const SelectItemCheckbox = ({ item }: SelectItemCheckboxProps) => {
  const t = useTranslations('CardList');
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const isSelected = selectedItems.some(
    (selectedItem) => selectedItem.url === item.url
  );

  const handleChange = () => {
    dispatch(toggleSelectedItem(item));
  };

  return (
    <input
      type="checkbox"
      aria-label={t('selectItem', { name: item.name })}
      checked={isSelected}
      className="h-4 w-4 cursor-pointer accent-yellow-400"
      onChange={handleChange}
    />
  );
};
