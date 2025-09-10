import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/': 'Dashboard',
    '/course-management': 'Course Management',
    '/student-management': 'Student Management',
    '/timetable-generator': 'Timetable Generator',
    '/timetable-view': 'Timetable View',
    '/student-portal': 'Student Portal',
    '/login': 'Login'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [{ label: 'Dashboard', path: '/' }];

    if (pathSegments?.length > 0) {
      let currentPath = '';
      pathSegments?.forEach((segment) => {
        currentPath += `/${segment}`;
        const label = pathMap?.[currentPath] || segment?.charAt(0)?.toUpperCase() + segment?.slice(1)?.replace('-', ' ');
        breadcrumbs?.push({ label, path: currentPath });
      });
    }

    return breadcrumbs?.length > 1 ? breadcrumbs : [];
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length === 0) return null;

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium">{crumb?.label}</span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className="hover:text-foreground transition-smooth"
            >
              {crumb?.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;