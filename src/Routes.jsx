import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import TimetableGenerator from './pages/timetable-generator';
import Login from './pages/login';
import StudentManagement from './pages/student-management';
import CourseManagement from './pages/course-management';
import StudentPortal from './pages/student-portal';
import TimetableView from './pages/timetable-view';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CourseManagement />} />
        <Route path="/timetable-generator" element={<TimetableGenerator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/course-management" element={<CourseManagement />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/timetable-view" element={<TimetableView />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
