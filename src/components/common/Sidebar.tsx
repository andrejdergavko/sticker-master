'use client';
import type { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Divider from '@mui/material/Divider';
import {
  faPrint,
  faFile,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Routes } from '~lib/enums';

type MenuItem = {
  label: string;
  icon: IconDefinition;
  href: Routes;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Печать',
    icon: faPrint,
    href: Routes.print,
  },
  {
    label: 'Выбор файла',
    icon: faFile,
    href: Routes.fileSelection,
  },
];

const Sidebar: FC = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] px-6 py-6 shadow-xl">
      <div className="pt-3 pb-1">
        <Link href="/" className="font-bold uppercase">
          Sticker Master
        </Link>
      </div>

      <Divider className="my-4 mt-6" />

      <ul className="list-none">
        {MENU_ITEMS.map((item) => (
          <li key={item.label} className="my-3">
            <Link
              href={item.href}
              className={`py-3 flex items-center uppercase font-bold text-xs hover:text-slate-500 ${
                pathname === item.href ? 'text-sky-500 hover:text-sky-600' : ''
              }`}
            >
              <FontAwesomeIcon
                className={`${item.icon} mr-3 text-base ${
                  pathname === item.href ? 'text-sky-500' : 'opacity-40'
                }`}
                size="lg"
                icon={item.icon}
              />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Divider className="my-4" />
    </aside>
  );
};

export default Sidebar;
