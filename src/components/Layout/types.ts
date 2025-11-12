// components/Layout/types.ts
export interface LayoutBaseProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  totalCartItems: number;
  favoritesCount: number;
  isAuthenticated: boolean;
}

export interface LayoutProps extends LayoutBaseProps {
  children: React.ReactNode;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onSignOut: () => void;
}

export interface HeaderProps extends LayoutBaseProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export interface DesktopNavProps extends LayoutBaseProps {}

export interface MobileNavProps {
  totalCartItems: number;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export interface MobileMenuProps extends LayoutBaseProps {
  isOpen: boolean;
  onCloseMenu: () => void;
  onSignOut: () => void;
}