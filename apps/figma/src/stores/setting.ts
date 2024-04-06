import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingStoreAction {
  setDarkMode: (value: boolean) => void;
  setEndPointProcessing: (value: boolean) => void;
}

interface SettingStoreState {
  darkMode: boolean;
  endPointProcessing: boolean;
}

export const useSettingStore = create<SettingStoreState & SettingStoreAction>()(
  persist(
    (setState) => ({
      darkMode: false,
      endPointProcessing: true,
      setEndPointProcessing: (value) => {
        setState({
          endPointProcessing: value,
        });
      },
      setDarkMode: (value) => {
        document.documentElement.classList[value ? 'add' : 'remove']('dark');
        setState({ darkMode: value });
      },
    }),
    {
      name: 'setting',
      partialize: (state) => ({ darkMode: state.darkMode }),
    }
  )
);
