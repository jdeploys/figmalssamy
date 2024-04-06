import { create } from 'zustand';
import { RoutePath } from '@/src/types/routePath';

interface MenuStoreAction {
  setCurrentPath: (path: RoutePath) => void;
  setPreviousPath: (path: RoutePath) => void;
}

interface MenuStoreState {
  currentPath: RoutePath;
  previousPath?: RoutePath;
}

const initState: MenuStoreState = {
  currentPath: 'fix/area',
  previousPath: undefined,
};

export const useMenuStore = create<MenuStoreState & MenuStoreAction>(
  (setState, getState) => {
    return {
      ...initState,
      setCurrentPath: (path) => {
        setState({ currentPath: path });
      },
      setPreviousPath: (path) => {
        setState({ previousPath: path });
      },
    };
  }
);
