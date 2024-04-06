import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert';
import { MessageSquareHeart } from 'lucide-react';

const SelectionAlert = () => {
  return (
    <Alert>
      <MessageSquareHeart className="h-4 w-4" />
      <AlertTitle>좋아요!</AlertTitle>
      <AlertDescription className="text-gray-600">모두 잘 작성되었어요</AlertDescription>
    </Alert>
  );
};

export default SelectionAlert;
