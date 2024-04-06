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

const FixOptionPage = () => {
  const setting = useSettingStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>교정 옵션</CardTitle>
        <CardDescription>
          맞춤법 외에 추가적인 부가 기능을 설정할 수 있어요
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <MoonStar />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">마침표 교정</p>
            <p className="text-sm text-muted-foreground">
              1개 문장에서는 마침표를 제공하지 않는 기능이에요.
              <br />
              설정을 끄게 되면 항상 마침표를 추가해요.
            </p>
          </div>
          <Switch
            checked={setting.endPointProcessing}
            onCheckedChange={(value) => {
              setting.setEndPointProcessing(value);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FixOptionPage;
