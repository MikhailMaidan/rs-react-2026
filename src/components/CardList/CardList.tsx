import { Card } from '../Card/Card';
import type { CharacterResult } from '../../types/character';

interface CardListProps {
  items: CharacterResult[];
  onItemSelect: (item: CharacterResult) => void;
}

export function CardList({ items, onItemSelect }: CardListProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-[10px] border border-yellow-400 bg-zinc-950/80 px-8 py-14 text-center text-xl font-semibold text-zinc-300">
        No results found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[10px] border border-yellow-400 bg-zinc-950/80 shadow-[0_0_30px_rgba(250,204,21,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] table-fixed border-collapse font-mono text-[18px] leading-relaxed">
          <colgroup>
            <col className="w-16" />
            <col className="w-[45%]" />
            <col className="w-[55%]" />
          </colgroup>
          <caption className="border-b border-yellow-400/60 px-6 py-4 text-center text-[20px] font-bold text-white">
            Results
          </caption>
          <thead>
            <tr className="border-b border-yellow-400/60 text-left text-zinc-100">
              <th className="py-4 pl-6 pr-2 font-semibold">Select</th>
              <th className="py-4 pl-10 pr-6 font-semibold">Item Name</th>
              <th className="py-4 pl-6 pr-10 font-semibold">
                Item Description
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Card key={item.url} item={item} onSelect={onItemSelect} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
