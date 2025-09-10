import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const QuickActions = ({ context = 'timetable', onExport, onSave, onShare, onPrint }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = {
    timetable: [
      { 
        label: 'Save', 
        icon: 'Save', 
        variant: 'default', 
        onClick: onSave,
        shortcut: 'Ctrl+S'
      },
      { 
        label: 'Export PDF', 
        icon: 'FileText', 
        variant: 'outline', 
        onClick: () => onExport?.('pdf'),
        shortcut: 'Ctrl+E'
      },
      { 
        label: 'Export Excel', 
        icon: 'FileSpreadsheet', 
        variant: 'outline', 
        onClick: () => onExport?.('excel')
      },
      { 
        label: 'Share', 
        icon: 'Share2', 
        variant: 'outline', 
        onClick: onShare
      },
      { 
        label: 'Print', 
        icon: 'Printer', 
        variant: 'ghost', 
        onClick: onPrint,
        shortcut: 'Ctrl+P'
      }
    ],
    course: [
      { 
        label: 'Add Course', 
        icon: 'Plus', 
        variant: 'default', 
        onClick: () => console.log('Add course')
      },
      { 
        label: 'Import', 
        icon: 'Upload', 
        variant: 'outline', 
        onClick: () => console.log('Import courses')
      },
      { 
        label: 'Export', 
        icon: 'Download', 
        variant: 'outline', 
        onClick: () => onExport?.('csv')
      }
    ],
    student: [
      { 
        label: 'Add Student', 
        icon: 'UserPlus', 
        variant: 'default', 
        onClick: () => console.log('Add student')
      },
      { 
        label: 'Bulk Import', 
        icon: 'Upload', 
        variant: 'outline', 
        onClick: () => console.log('Bulk import')
      },
      { 
        label: 'Export List', 
        icon: 'Download', 
        variant: 'outline', 
        onClick: () => onExport?.('csv')
      }
    ]
  };

  const currentActions = actions?.[context] || actions?.timetable;

  return (
    <>
      {/* Desktop Quick Actions */}
      <div className="hidden md:flex items-center space-x-2 bg-card border border-border rounded-lg p-2 elevation-1">
        {currentActions?.slice(0, 3)?.map((action, index) => (
          <Button
            key={index}
            variant={action?.variant}
            size="sm"
            onClick={action?.onClick}
            iconName={action?.icon}
            iconPosition="left"
            className="whitespace-nowrap"
            title={action?.shortcut ? `${action?.label} (${action?.shortcut})` : action?.label}
          >
            {action?.label}
          </Button>
        ))}
        
        {currentActions?.length > 3 && (
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2"
            />
            
            {isExpanded && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg elevation-3 z-50 animate-fade-in">
                <div className="p-2">
                  {currentActions?.slice(3)?.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        action?.onClick?.();
                        setIsExpanded(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name={action?.icon} size={16} />
                      <span>{action?.label}</span>
                      {action?.shortcut && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          {action?.shortcut}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Mobile Quick Actions - Bottom Sheet Style */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <div className="flex flex-col-reverse space-y-reverse space-y-2">
          {isExpanded && (
            <div className="flex flex-col space-y-2 animate-slide-in">
              {currentActions?.slice(1)?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.variant}
                  size="sm"
                  onClick={() => {
                    action?.onClick?.();
                    setIsExpanded(false);
                  }}
                  iconName={action?.icon}
                  className="w-12 h-12 rounded-full elevation-2"
                  title={action?.label}
                />
              ))}
            </div>
          )}
          
          <Button
            variant="default"
            size="lg"
            onClick={() => {
              if (currentActions?.length === 1) {
                currentActions?.[0]?.onClick?.();
              } else {
                setIsExpanded(!isExpanded);
              }
            }}
            iconName={currentActions?.length === 1 ? currentActions?.[0]?.icon : (isExpanded ? "X" : "Plus")}
            className="w-14 h-14 rounded-full elevation-3"
          />
        </div>
      </div>
    </>
  );
};

export default QuickActions;