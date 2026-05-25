import { Card } from '../Card';
import type { CharacterResult } from '../../types/character';

interface CardListProps {
  items: CharacterResult[];
  onItemSelect: (item: CharacterResult) => void;
}

export const CardList = ({ items, onItemSelect }: CardListProps) => {
  if (items.length === 0) {
    return (
      <div className="rounded-[8px] border border-yellow-400 bg-zinc-950/80 px-6 py-8 text-center text-base font-semibold text-zinc-300">
        No results found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[8px] border border-yellow-400 bg-zinc-950/80 shadow-[0_0_22px_rgba(250,204,21,0.08)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-fixed border-collapse font-mono text-[14px] leading-snug">
          <colgroup>
            <col className="w-12" />
            <col className="w-[40%]" />
            <col className="w-[60%]" />
          </colgroup>
          <caption className="border-b border-yellow-400/60 px-4 py-2 text-center text-[16px] font-bold text-white">
            Results
          </caption>
          <thead>
            <tr className="border-b border-yellow-400/60 text-left text-zinc-100">
              <th className="py-2 pl-4 pr-1 font-semibold">Select</th>
              <th className="py-2 pl-5 pr-4 font-semibold">Item Name</th>
              <th className="py-2 pl-4 pr-6 font-semibold">
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
};
