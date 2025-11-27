'use client';

import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/shared/Badge';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface ProfileTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function ProfileTabs({ tabs, activeTab, onTabChange, className }: ProfileTabsProps) {
  return (
    <div className={cn("", className)}>
      <nav className="flex gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-lg transition-colors",
              activeTab === tab.id
                ? "border-[#fd8c73] text-gray-900 dark:text-foreground"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
            )}
          >
            <Icon
              icon={tab.id === 'starred' ? 'akar-icons:star' : 'bx:book-bookmark'}
              width={24}
              height={24}
              className={cn(
                activeTab === tab.id ? "text-gray-900 dark:text-foreground" : "text-gray-400 dark:text-gray-500"
              )}
            />
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <Badge content={tab.count} />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}