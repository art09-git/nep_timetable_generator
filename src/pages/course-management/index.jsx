import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CourseFilters from './components/CourseFilters';
import CourseTable from './components/CourseTable';
import BulkActions from './components/BulkActions';
import CourseAnalytics from './components/CourseAnalytics';
import CourseModal from './components/CourseModal';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('courses');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: '',
    program: 'all',
    semester: 'all',
    minCredits: '',
    maxCredits: '',
    courseTypes: [],
    status: 'all',
    nepCompliant: false
  });

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      code: "EDU101",
      title: "Foundations of Education",
      credits: 4,
      program: "bed",
      semester: 1,
      type: "core",
      theoryHours: 3,
      practicalHours: 1,
      prerequisites: [],
      description: "Introduction to educational theories, philosophies, and historical perspectives that form the foundation of modern education systems.",
      learningOutcomes: "Students will understand basic educational theories and their applications in contemporary educational settings.",
      assessmentMethods: "Written examinations, assignments, and practical demonstrations",
      status: "active",
      nepCompliant: true
    },
    {
      id: 2,
      code: "EDU201",
      title: "Child Development and Psychology",
      credits: 4,
      program: "bed",
      semester: 2,
      type: "core",
      theoryHours: 3,
      practicalHours: 1,
      prerequisites: ["EDU101"],
      description: "Comprehensive study of child development stages, cognitive psychology, and learning theories applicable to educational contexts.",
      learningOutcomes: "Understanding of developmental psychology and its application in educational planning and classroom management.",
      assessmentMethods: "Case studies, research projects, and practical assessments",
      status: "active",
      nepCompliant: true
    },
    {
      id: 3,
      code: "MAT101",
      title: "Mathematical Foundations",
      credits: 6,
      program: "fyup",
      semester: 1,
      type: "core",
      theoryHours: 4,
      practicalHours: 2,
      prerequisites: [],
      description: "Fundamental mathematical concepts including algebra, calculus, and statistical methods essential for undergraduate studies.",
      learningOutcomes: "Proficiency in mathematical reasoning and problem-solving techniques.",
      assessmentMethods: "Written tests, problem-solving assignments, and practical applications",
      status: "active",
      nepCompliant: true
    },
    {
      id: 4,
      code: "ENG102",
      title: "English Communication Skills",
      credits: 4,
      program: "fyup",
      semester: 1,
      type: "core",
      theoryHours: 2,
      practicalHours: 2,
      prerequisites: [],
      description: "Development of effective communication skills in English including reading, writing, speaking, and listening competencies.",
      learningOutcomes: "Enhanced communication abilities and language proficiency for academic and professional contexts.",
      assessmentMethods: "Oral presentations, written assignments, and language proficiency tests",
      status: "active",
      nepCompliant: true
    },
    {
      id: 5,
      code: "EDU301",
      title: "Research Methodology in Education",
      credits: 4,
      program: "med",
      semester: 1,
      type: "core",
      theoryHours: 2,
      practicalHours: 2,
      prerequisites: [],
      description: "Advanced research methods and statistical techniques for educational research, including qualitative and quantitative approaches.",
      learningOutcomes: "Competency in designing and conducting educational research studies.",
      assessmentMethods: "Research proposals, data analysis projects, and thesis work",
      status: "active",
      nepCompliant: true
    },
    {
      id: 6,
      code: "ITEP101",
      title: "Integrated Pedagogy",
      credits: 5,
      program: "itep",
      semester: 1,
      type: "core",
      theoryHours: 3,
      practicalHours: 2,
      prerequisites: [],
      description: "Comprehensive approach to teaching methodologies integrating subject knowledge with pedagogical skills.",
      learningOutcomes: "Integrated understanding of content and pedagogy for effective teaching.",
      assessmentMethods: "Teaching demonstrations, lesson planning, and reflective portfolios",
      status: "active",
      nepCompliant: true
    },
    {
      id: 7,
      code: "SCI201",
      title: "Environmental Science",
      credits: 4,
      program: "fyup",
      semester: 3,
      type: "elective",
      theoryHours: 3,
      practicalHours: 1,
      prerequisites: [],
      description: "Study of environmental systems, sustainability, and human impact on natural ecosystems.",
      learningOutcomes: "Understanding of environmental challenges and sustainable development practices.",
      assessmentMethods: "Field studies, research projects, and environmental impact assessments",
      status: "active",
      nepCompliant: true
    },
    {
      id: 8,
      code: "EDU401",
      title: "Educational Leadership",
      credits: 3,
      program: "med",
      semester: 2,
      type: "elective",
      theoryHours: 2,
      practicalHours: 1,
      prerequisites: ["EDU301"],
      description: "Principles and practices of educational leadership, administration, and institutional management.",
      learningOutcomes: "Leadership skills and administrative competencies for educational institutions.",
      assessmentMethods: "Case study analysis, leadership projects, and administrative simulations",
      status: "draft",
      nepCompliant: false
    },
    {
      id: 9,
      code: "PRAC101",
      title: "Teaching Practice I",
      credits: 6,
      program: "bed",
      semester: 3,
      type: "practical",
      theoryHours: 1,
      practicalHours: 5,
      prerequisites: ["EDU101", "EDU201"],
      description: "Supervised teaching practice in real classroom environments with mentor guidance and feedback.",
      learningOutcomes: "Practical teaching experience and classroom management skills.",
      assessmentMethods: "Teaching observations, lesson evaluations, and reflective journals",
      status: "active",
      nepCompliant: true
    },
    {
      id: 10,
      code: "PROJ401",
      title: "Capstone Project",
      credits: 8,
      program: "fyup",
      semester: 8,
      type: "project",
      theoryHours: 1,
      practicalHours: 7,
      prerequisites: [],
      description: "Independent research project demonstrating mastery of program learning outcomes and research capabilities.",
      learningOutcomes: "Research competency and independent learning skills.",
      assessmentMethods: "Project presentation, thesis defense, and peer review",
      status: "inactive",
      nepCompliant: true
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadCourses = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    };

    loadCourses();
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = courses?.filter(course => {
      const matchesSearch = !filters?.search || 
        course?.code?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        course?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase());
      
      const matchesProgram = filters?.program === 'all' || course?.program === filters?.program;
      const matchesSemester = filters?.semester === 'all' || course?.semester?.toString() === filters?.semester;
      const matchesStatus = filters?.status === 'all' || course?.status === filters?.status;
      const matchesNepCompliant = !filters?.nepCompliant || course?.nepCompliant;
      
      const matchesCredits = (!filters?.minCredits || course?.credits >= parseInt(filters?.minCredits)) &&
                           (!filters?.maxCredits || course?.credits <= parseInt(filters?.maxCredits));
      
      const matchesCourseTypes = filters?.courseTypes?.length === 0 || filters?.courseTypes?.includes(course?.type);

      return matchesSearch && matchesProgram && matchesSemester && matchesStatus && 
             matchesNepCompliant && matchesCredits && matchesCourseTypes;
    });

    setFilteredCourses(filtered);
  }, [courses, filters]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      program: 'all',
      semester: 'all',
      minCredits: '',
      maxCredits: '',
      courseTypes: [],
      status: 'all',
      nepCompliant: false
    });
  };

  const handleSelectionChange = (newSelection) => {
    setSelectedCourses(newSelection);
  };

  const handleBulkAction = async (action) => {
    console.log(`Applying bulk action: ${action} to courses:`, selectedCourses);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (action === 'delete') {
      setCourses(prev => prev?.filter(course => !selectedCourses?.includes(course?.id)));
      setSelectedCourses([]);
    } else if (action === 'activate') {
      setCourses(prev => prev?.map(course => 
        selectedCourses?.includes(course?.id) ? { ...course, status: 'active' } : course
      ));
    } else if (action === 'deactivate') {
      setCourses(prev => prev?.map(course => 
        selectedCourses?.includes(course?.id) ? { ...course, status: 'inactive' } : course
      ));
    }
  };

  const handleAddCourse = () => {
    setModalMode('add');
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEditCourse = (course) => {
    setModalMode('edit');
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleViewCourse = (course) => {
    setModalMode('view');
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleSaveCourse = async (courseData) => {
    if (modalMode === 'add') {
      setCourses(prev => [...prev, { ...courseData, id: Date.now() }]);
    } else if (modalMode === 'edit') {
      setCourses(prev => prev?.map(course => 
        course?.id === courseData?.id ? courseData : course
      ));
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting courses in ${format} format`);
    // Implement export functionality
  };

  const tabs = [
    { id: 'courses', label: 'Course Catalog', icon: 'BookOpen' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading course data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Course Management</h1>
              <p className="text-muted-foreground">
                Configure curriculum structure, course codes, credits, and NEP 2020 compliance across all academic programs
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
              >
                Import Courses
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                onClick={handleAddCourse}
              >
                Add Course
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center space-x-1 mb-6 border-b border-border">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <CourseFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
              
              <CourseTable
                courses={filteredCourses}
                selectedCourses={selectedCourses}
                onSelectionChange={handleSelectionChange}
                onEdit={handleEditCourse}
                onView={handleViewCourse}
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <CourseAnalytics courses={courses} />
          )}

          {/* Quick Actions */}
          <QuickActions
            context="course"
            onExport={handleExport}
            onSave={() => console.log('Save action')}
            onShare={() => console.log('Share action')}
            onPrint={() => console.log('Print action')}
          />

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedCourses?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={() => setSelectedCourses([])}
          />

          {/* Course Modal */}
          <CourseModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            course={selectedCourse}
            onSave={handleSaveCourse}
            mode={modalMode}
          />
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;