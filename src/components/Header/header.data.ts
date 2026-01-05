import type { NavMenuItem } from "../../types/navigation";

export const HEADER_MENU: NavMenuItem[] = [
  { id: 'products', label: 'Sản phẩm', hasDropdown: true },
  { id: 'templates', label: 'Web Templates' },
  { id: 'mobiles', label: 'Mobile Apps', path: '/mobiles' },
  { id: 'ui-kits', label: 'UI Kits' },
  { id: 'resources', label: 'Tài nguyên' },
];
