import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import Header from '@/src/components/layout/Header';
import { Toaster } from '@/src/components/ui/toaster';
import { useMenuStore } from '@/src/stores/menu';
import { useSelectionStore } from '@/src/stores/selection';
import Outlet from '@/src/components/layout/Outlet';

const UI = () => {
  const currentPath = useMenuStore((state) => state.currentPath);
  const setSelectedList = useSelectionStore((state) => state.setSelectedList);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    if (currentPath !== 'fix/area') {
      return;
    }
    if (pluginMessage.type === 'selection-change') {
      setSelectedList(pluginMessage.selection);
    }
  };

  return (
    <div className="relative h-full w-full bg-background text-foreground p-2">
      <Header />
      <Outlet />
      <Toaster />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('react-page')!);

root.render(<UI />);
