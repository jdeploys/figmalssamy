import { NavigationMenuLink } from '@radix-ui/react-navigation-menu';
import React, { ReactNode } from 'react';
import { cn } from '@/src/lib/utils';
import { useMenuStore } from '@/src/stores/menu';
import { RoutePath } from '@/src/types/routePath';

export const NavListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    icon?: ReactNode;
    link: RoutePath;
  }
>(({ className, title, icon, link, children, ...props }, ref) => {
  const { currentPath, setCurrentPath } = useMenuStore((state) => ({
    currentPath: state.currentPath,
    setCurrentPath: state.setCurrentPath,
  }));
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
          onClick={(e) => {
            e.preventDefault();
            setCurrentPath(link);
          }}
        >
          <div
            className={cn(
              'text-sm leading-none flex flex-row items-center gap-2',
              currentPath === link ? 'font-semibold' : 'font-medium'
            )}
          >
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
