import FixAreaPage from '@/src/pages/fix/area';
import { useMenuStore } from '@/src/stores/menu';
import SettingInfoPage from '@/src/pages/setting/info';
import FixOptionPage from '@/src/pages/setting/fix-option';

const pageMap = {
  '/': <FixAreaPage />,
  'fix/area': <FixAreaPage />,
  'fix/enter': <FixAreaPage />,
  'setting/fix-option': <FixOptionPage />,
  'setting/info': <SettingInfoPage />,
};

// 내부 라우터 직접 구성
const Outlet = () => {
  const currentPath = useMenuStore((state) => state.currentPath);

  const target = pageMap[currentPath];
  if (!target) {
    return null;
  }
  return <div className="w-full p-4">{target}</div>;
};

export default Outlet;
