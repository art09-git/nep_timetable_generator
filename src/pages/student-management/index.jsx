import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActions from '../../components/ui/QuickActions';

import Button from '../../components/ui/Button';
import StudentTable from './components/StudentTable';
import BulkActions from './components/BulkActions';
import StudentStats from './components/StudentStats';
import ImportModal from './components/ImportModal';
import StudentModal from './components/StudentModal';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    program: '',
    semester: '',
    status: '',
    minCredits: '',
    maxCredits: ''
  });
  const [showStats, setShowStats] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [modalMode, setModalMode] = useState('add');

  // Mock student data
  const mockStudents = [
    {
      id: 1,
      rollNumber: "BED2023001",
      name: "Aarav Sharma",
      email: "aarav.sharma@student.jk.gov.in",
      phone: "+91 9876543210",
      program: "B.Ed.",
      semester: 3,
      enrolledCredits: 18,
      electiveCount: 3,
      status: "Active",
      electives: ["psychology", "technology", "guidance"],
      address: "Srinagar, Jammu & Kashmir",
      dateOfBirth: "2001-05-15",
      gender: "Male",
      category: "General",
      parentName: "Rajesh Sharma",
      parentPhone: "+91 9876543211"
    },
    {
      id: 2,
      rollNumber: "MED2023002",
      name: "Priya Kumari",
      email: "priya.kumari@student.jk.gov.in",
      phone: "+91 9876543212",
      program: "M.Ed.",
      semester: 2,
      enrolledCredits: 22,
      electiveCount: 4,
      status: "Active",
      electives: ["philosophy", "sociology", "curriculum", "administration"],
      address: "Jammu, Jammu & Kashmir",
      dateOfBirth: "1999-08-22",
      gender: "Female",
      category: "OBC",
      parentName: "Suresh Kumar",
      parentPhone: "+91 9876543213"
    },
    {
      id: 3,
      rollNumber: "FYUP2023003",
      name: "Mohammad Ali",
      email: "mohammad.ali@student.jk.gov.in",
      phone: "+91 9876543214",
      program: "FYUP",
      semester: 4,
      enrolledCredits: 20,
      electiveCount: 2,
      status: "Active",
      electives: ["measurement", "technology"],
      address: "Anantnag, Jammu & Kashmir",
      dateOfBirth: "2002-12-10",
      gender: "Male",
      category: "General",
      parentName: "Abdul Rahman",
      parentPhone: "+91 9876543215"
    },
    {
      id: 4,
      rollNumber: "ITEP2023004",
      name: "Sneha Devi",
      email: "sneha.devi@student.jk.gov.in",
      phone: "+91 9876543216",
      program: "ITEP",
      semester: 1,
      enrolledCredits: 16,
      electiveCount: 2,
      status: "Active",
      electives: ["psychology", "guidance"],
      address: "Udhampur, Jammu & Kashmir",
      dateOfBirth: "2003-03-18",
      gender: "Female",
      category: "SC",
      parentName: "Ram Singh",
      parentPhone: "+91 9876543217"
    },
    {
      id: 5,
      rollNumber: "BED2022005",
      name: "Rahul Gupta",
      email: "rahul.gupta@student.jk.gov.in",
      phone: "+91 9876543218",
      program: "B.Ed.",
      semester: 4,
      enrolledCredits: 24,
      electiveCount: 5,
      status: "Inactive",
      electives: ["philosophy", "sociology", "technology", "measurement", "curriculum"],
      address: "Kathua, Jammu & Kashmir",
      dateOfBirth: "2000-11-25",
      gender: "Male",
      category: "General",
      parentName: "Vijay Gupta",
      parentPhone: "+91 9876543219"
    },
    {
      id: 6,
      rollNumber: "MED2022006",
      name: "Anjali Thakur",
      email: "anjali.thakur@student.jk.gov.in",
      phone: "+91 9876543220",
      program: "M.Ed.",
      semester: 4,
      enrolledCredits: 26,
      electiveCount: 4,
      status: "Graduated",
      electives: ["administration", "curriculum", "measurement", "guidance"],
      address: "Doda, Jammu & Kashmir",
      dateOfBirth: "1998-07-08",
      gender: "Female",
      category: "ST",
      parentName: "Mohan Thakur",
      parentPhone: "+91 9876543221"
    },
    {
      id: 7,
      rollNumber: "FYUP2023007",
      name: "Arjun Singh",
      email: "arjun.singh@student.jk.gov.in",
      phone: "+91 9876543222",
      program: "FYUP",
      semester: 2,
      enrolledCredits: 14,
      electiveCount: 1,
      status: "Active",
      electives: ["technology"],
      address: "Poonch, Jammu & Kashmir",
      dateOfBirth: "2002-09-14",
      gender: "Male",
      category: "EWS",
      parentName: "Baldev Singh",
      parentPhone: "+91 9876543223"
    },
    {
      id: 8,
      rollNumber: "BED2023008",
      name: "Kavita Sharma",
      email: "kavita.sharma@student.jk.gov.in",
      phone: "+91 9876543224",
      program: "B.Ed.",
      semester: 1,
      enrolledCredits: 12,
      electiveCount: 2,
      status: "Active",
      electives: ["psychology", "sociology"],
      address: "Rajouri, Jammu & Kashmir",
      dateOfBirth: "2001-01-30",
      gender: "Female",
      category: "General",
      parentName: "Ashok Sharma",
      parentPhone: "+91 9876543225"
    }
  ];

  useEffect(() => {
    setStudents(mockStudents);
    setFilteredStudents(mockStudents);
  }, []);

  const handleStudentSelect = (studentId, isSelected) => {
    setSelectedStudents(prev => 
      isSelected 
        ? [...prev, studentId]
        : prev?.filter(id => id !== studentId)
    );
  };

  const handleSelectAll = (isSelected) => {
    setSelectedStudents(isSelected ? filteredStudents?.map(s => s?.id) : []);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBulkAction = (action) => {
    console.log(`Applying ${action} to ${selectedStudents?.length} students`);
    // Implement bulk action logic here
    setSelectedStudents([]);
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const handleEditStudent = (studentId, field, value) => {
    if (field && value !== undefined) {
      // Inline edit
      setStudents(prev => prev?.map(student => 
        student?.id === studentId 
          ? { ...student, [field]: field === 'semester' || field === 'enrolledCredits' ? parseInt(value) : value }
          : student
      ));
    } else {
      // Open modal for full edit
      const student = students?.find(s => s?.id === studentId);
      setEditingStudent(student);
      setModalMode('edit');
      setIsStudentModalOpen(true);
    }
  };

  const handleViewProfile = (studentId) => {
    navigate(`/student-portal?id=${studentId}`);
  };

  const handleAddStudent = () => {
    setEditingStudent(null);
    setModalMode('add');
    setIsStudentModalOpen(true);
  };

  const handleSaveStudent = (studentData) => {
    if (modalMode === 'edit') {
      setStudents(prev => prev?.map(student => 
        student?.id === studentData?.id ? studentData : student
      ));
    } else {
      setStudents(prev => [...prev, { ...studentData, id: Date.now() }]);
    }
  };

  const handleImport = (file) => {
    console.log('Importing file:', file?.name);
    // Implement import logic here
  };

  const handleExport = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Implement export logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <Breadcrumb />
              <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
              <p className="text-muted-foreground">
                Manage student enrollment, elective choices, and academic records across all NEP 2020 programs.
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                onClick={() => setShowStats(!showStats)}
                iconName={showStats ? "EyeOff" : "Eye"}
                iconPosition="left"
              >
                {showStats ? 'Hide Stats' : 'Show Stats'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsImportModalOpen(true)}
                iconName="Upload"
                iconPosition="left"
              >
                Import
              </Button>
              
              <Button
                onClick={handleAddStudent}
                iconName="Plus"
                iconPosition="left"
              >
                Add Student
              </Button>
            </div>
          </div>

          {/* Statistics Panel */}
          {showStats && (
            <div className="mb-8">
              <StudentStats students={students} />
            </div>
          )}

          {/* Bulk Actions */}
          <BulkActions
            selectedCount={selectedStudents?.length}
            onBulkAction={handleBulkAction}
            onClearSelection={handleClearSelection}
          />

          {/* Student Table */}
          <StudentTable
            students={students}
            selectedStudents={selectedStudents}
            onStudentSelect={handleStudentSelect}
            onSelectAll={handleSelectAll}
            onEditStudent={handleEditStudent}
            onViewProfile={handleViewProfile}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Quick Actions */}
          <QuickActions
            context="student"
            onExport={handleExport}
            onSave={() => console.log('Save action')}
            onShare={() => console.log('Share action')}
            onPrint={() => console.log('Print action')}
          />
        </div>
      </main>
      {/* Modals */}
      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImport}
      />
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        onSave={handleSaveStudent}
        student={editingStudent}
        mode={modalMode}
      />
    </div>
  );
};

export default StudentManagement;