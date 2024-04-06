import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { SquareDashedMousePointer } from 'lucide-react';

const SelectionAlert = () => {
  return (
    <Alert>
      <SquareDashedMousePointer className="h-4 w-4" />
      <AlertTitle>알림</AlertTitle>
      <AlertDescription className="text-gray-600">
        맞춤법 검사를 하려면 영역(#Frame)을 선택하세요
      </AlertDescription>
    </Alert>
  );
};

export default SelectionAlert;
