import { Component } from 'react';
import { getAssetUrl } from '../../utils/assets';

export class Header extends Component {
  render() {
    return (
      <header className="relative h-[92px] overflow-hidden border-b border-zinc-900 bg-black sm:h-[96px]">
        <img
          src={getAssetUrl('header.png')}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/10" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1800px] items-start px-6 pt-4 sm:px-9">
          <img
            src={getAssetUrl('logo.png')}
            alt="Starforge"
            className="h-auto w-[310px] max-w-[70vw] object-contain mix-blend-screen sm:w-[330px]"
          />
        </div>
      </header>
    );
  }
}
