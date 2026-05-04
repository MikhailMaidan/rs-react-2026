import { Component } from 'react';
import type { CharacterResult } from '../../types/character';

interface CardProps {
  item: CharacterResult;
}

export class Card extends Component<CardProps> {
  render() {
    const { item } = this.props;

    return (
      <tr className="border-b border-yellow-400/40 last:border-b-0">
        <td className="py-4 pl-10 pr-6 align-top text-white">
          {item.name}
        </td>
        <td className="py-4 pl-6 pr-10 align-top text-zinc-200">
          {item.description}
        </td>
      </tr>
    );
  }
}
