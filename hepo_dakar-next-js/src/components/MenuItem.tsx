"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  _key: string;
  title: string;
  url: string;
  submenuItems: MenuItem[];
}

interface MenuItemProps {
  item: MenuItem;
  isRoot: boolean;
}

export default function MenuItem({ isRoot, item }: MenuItemProps) {
  const pathName = usePathname();

  return (
    <li
      key={item._key}
      className={`
                  ${isRoot ? "nav-item" : ""} 
                  ${item.submenuItems && item.submenuItems.length > 0 ? "dropdown" : ""}
                `.trim()}
    >
      <Link
        className={`
                    ${isRoot ? "nav-link" : "dropdown-item"} 
                    ${item.submenuItems && item.submenuItems.length > 0 ? "dropdown-toggle" : ""}
                    ${item.url === pathName ? "active" : ""}
                  `.trim()}
        href={item.url !== undefined ? item.url : ""}
      >
        {item.title}
      </Link>
      {item.submenuItems && item.submenuItems.length > 0 && (
        <ul className="dropdown-menu">
          {item.submenuItems.map((submenuItem: MenuItem, index) => {
            return (
              <MenuItem
                isRoot={false}
                item={submenuItem}
                key={submenuItem._key}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}
