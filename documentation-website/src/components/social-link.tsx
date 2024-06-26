import React, {
  lazy,
  Suspense,
} from 'react';
import t from './t.ts';
import languageKey from '../locales/language-key.ts';
import {
  INITIAL_ZERO,
} from '../constants.ts';
import SocialImage from './social-image.tsx';

interface SocialLinkType {
  to: string|string[];
  label: string;
}
const SocialLink = ({
  to,
  label,
}: SocialLinkType,) => {
  if (Array.isArray(to,)) {
    const EL = lazy(async() => {
      const items: React.JSX.Element[] = [];
      let pos = INITIAL_ZERO;
      for (const url of to) {
        // eslint-disable-next-line no-await-in-loop
        const title = await t(
          `socials.${ label }.title${ pos }` as languageKey,
        );
        // eslint-disable-next-line no-await-in-loop
        const text = await t(`socials.${ label }.text${ pos }` as languageKey,);
        items.push(<li key={label + pos}>
          <a
            href={url}
            rel='noreferrer'
            target='_blank'
            title={title}
          >{text}</a>
        </li>,);
        pos ++;
      }
      return {
        default: () => <span
          className="external-link"
        >
          <SocialImage label={label}/>
          <ul>{items}</ul>
        </span>,
      };
    },);
    return <li id={label} key={label}>
      <Suspense fallback={<span
        className="external-link"
      >
        <SocialImage label={label}/>
      </span>}><EL/></Suspense>
    </li>;
  }
  const EL = lazy(async() => {
    const title = await t(`socials.${ label }.title` as languageKey,);
    return {
      default: () => <a
        href={to}
        className="external-link"
        target='_blank'
        rel='noreferrer'
        title={title}
      >
        <SocialImage label={label}/>
      </a>,
    };
  },);
  return <li id={label}>
    <Suspense fallback={<a
      href={to}
      className="external-link"
      target='_blank'
      rel='noreferrer'
    >
      <SocialImage label={label}/>
    </a>}><EL/></Suspense>
  </li>;
};
export default SocialLink;
