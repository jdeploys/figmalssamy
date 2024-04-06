import React from 'react';
import { MoonStar } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Switch } from '@/src/components/ui/switch';
import { useSettingStore } from '@/src/stores/setting';

const SettingInfoPage = () => {
  const setting = useSettingStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>정보</CardTitle>
        <CardDescription>App Version. 1.0.0</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <MoonStar />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Dark Mode</p>
            <p className="text-sm text-muted-foreground">다크 모드 / 라이트 모드 전환</p>
          </div>
          <Switch
            checked={setting.darkMode}
            onCheckedChange={(value) => {
              setting.setDarkMode(value);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingInfoPage;
