import { useDispatch, useSelector } from 'react-redux';
import { toggleSelectedItem } from '../../store/selectedItemsSlice';
import type { AppDispatch, RootState } from '../../store/store';
import type { CharacterResult } from '../../types/character';

interface CardProps {
  item: CharacterResult;
  onSelect: (item: CharacterResult) => void;
}

export function Card({ item, onSelect }: CardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );
  const isSelected = selectedItems.some(
    (selectedItem) => selectedItem.url === item.url
  );

  const handleCheckboxChange = () => {
    dispatch(toggleSelectedItem(item));
  };

  return (
    <tr
      className="cursor-pointer border-b border-yellow-400/40 transition hover:bg-yellow-400/10 last:border-b-0"
      onClick={() => onSelect(item)}
    >
      <td className="w-16 py-4 pl-6 pr-2 align-top">
        <input
          type="checkbox"
          aria-label={`Select ${item.name}`}
          checked={isSelected}
          className="h-5 w-5 cursor-pointer accent-yellow-400"
          onChange={handleCheckboxChange}
          onClick={(event) => event.stopPropagation()}
        />
      </td>
      <td className="py-4 pl-10 pr-6 align-top text-white">{item.name}</td>
      <td className="py-4 pl-6 pr-10 align-top text-zinc-200">
        {item.description}
      </td>
    </tr>
  );
}
