import type { CharacterResult } from '../../types/character';

interface CardProps {
  item: CharacterResult;
  onSelect: (item: CharacterResult) => void;
}

export function Card({ item, onSelect }: CardProps) {
  return (
    <tr
      className="cursor-pointer border-b border-yellow-400/40 transition hover:bg-yellow-400/10 last:border-b-0"
      onClick={() => onSelect(item)}
    >
      <td className="py-4 pl-10 pr-6 align-top text-white">{item.name}</td>
      <td className="py-4 pl-6 pr-10 align-top text-zinc-200">
        {item.description}
      </td>
    </tr>
  );
}
