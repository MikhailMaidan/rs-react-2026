import { Component } from 'react';
import { Card } from '../Card/Card';
import type { CharacterResult } from '../../types/character';

interface CardListProps {
  items: CharacterResult[];
}

export class CardList extends Component<CardListProps> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return (
        <div className="rounded-[10px] border border-zinc-800 bg-zinc-950/80 px-8 py-14 text-center text-xl font-semibold text-zinc-300">
          No results found
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-[10px] border border-zinc-800 bg-zinc-950/80 shadow-[0_0_30px_rgba(255,255,255,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse font-mono text-[18px] leading-relaxed">
            <caption className="border-b border-zinc-800 px-6 py-4 text-center text-[20px] font-bold text-white">
              Results
            </caption>
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-100">
                <th className="w-[31%] px-6 py-4 font-semibold">Item Name</th>
                <th className="px-6 py-4 font-semibold">Item Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <Card key={item.url} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
