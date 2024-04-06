import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/src/components/ui/navigation-menu';
import { NavListItem } from '../list/NavListItem';
import { SquareLibrary, TextCursorInput, WholeWord, Workflow } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useMenuStore } from '@/src/stores/menu';

const Header = () => {
  const currentPath = useMenuStore((state) => state.currentPath);

  return (
    <div className="sticky top-0 left-0 w-full bg-background z-10">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(currentPath.includes('fix/') && 'font-semibold')}
            >
              맞춤법 검사
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-4">
                <NavListItem icon={<Workflow />} title="자동 교정" link="fix/area">
                  선택한 영역에 있는 문구의 맞춤법 검사
                </NavListItem>
                {/*<NavListItem*/}
                {/*  icon={<TextCursorInput />}*/}
                {/*  title="직접 입력"*/}
                {/*  link="fix/enter"*/}
                {/*/>*/}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(currentPath.includes('setting/') && 'font-semibold')}
            >
              설정
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid ap-3 p-4 md:grid-cols-2">
                <NavListItem
                  icon={<WholeWord />}
                  title="교정 옵션"
                  link="setting/fix-option"
                >
                  정규식을 이용한 추가 처리
                </NavListItem>
                <NavListItem icon={<SquareLibrary />} title="정보" link="setting/info" />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Header;
