import { Component } from 'react';
import type { CharacterResult } from '../../types/character';

interface CardProps {
  item: CharacterResult;
}

export class Card extends Component<CardProps> {
  render() {
    const { item } = this.props;

    return (
      <tr className="border-b border-zinc-800/80 last:border-b-0">
        <td className="w-[31%] px-6 py-4 align-top text-white">{item.name}</td>
        <td className="px-6 py-4 align-top text-zinc-200">{item.description}</td>
      </tr>
    );
  }
}
