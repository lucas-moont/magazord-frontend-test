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
      <nav className="flex gap-4 sm:gap-6 md:gap-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 pb-3 px-1 border-b-2 font-medium text-base transition-colors",
              activeTab === tab.id
                ? "border-tab-active-border text-gray-900 dark:text-foreground"
                : "border-transparent text-tab-inactive-text hover:text-tab-inactive-hover-text hover:border-tab-inactive-hover-border"
            )}
          >
            <Icon
              icon={tab.id === 'starred' ? 'akar-icons:star' : 'bx:book-bookmark'}
              width={24}
              height={24}
              className={cn(
                activeTab === tab.id 
                  ? "text-gray-900 dark:text-foreground" 
                  : "text-tab-inactive-text"
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