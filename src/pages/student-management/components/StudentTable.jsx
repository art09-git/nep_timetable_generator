import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  selectedStudents, 
  onStudentSelect, 
  onSelectAll, 
  onEditStudent, 
  onViewProfile,
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange 
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState('');

  const programOptions = [
    { value: '', label: 'All Programs' },
    { value: 'B.Ed.', label: 'B.Ed.' },
    { value: 'M.Ed.', label: 'M.Ed.' },
    { value: 'FYUP', label: 'FYUP' },
    { value: 'ITEP', label: 'ITEP' }
  ];

  const semesterOptions = [
    { value: '', label: 'All Semesters' },
    { value: '1', label: 'Semester 1' },
    { value: '2', label: 'Semester 2' },
    { value: '3', label: 'Semester 3' },
    { value: '4', label: 'Semester 4' },
    { value: '5', label: 'Semester 5' },
    { value: '6', label: 'Semester 6' },
    { value: '7', label: 'Semester 7' },
    { value: '8', label: 'Semester 8' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Graduated', label: 'Graduated' },
    { value: 'Suspended', label: 'Suspended' }
  ];

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students?.filter(student => {
      const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                          student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesProgram = !filters?.program || student?.program === filters?.program;
      const matchesSemester = !filters?.semester || student?.semester?.toString() === filters?.semester;
      const matchesStatus = !filters?.status || student?.status === filters?.status;
      
      const matchesCredits = (!filters?.minCredits || student?.enrolledCredits >= parseInt(filters?.minCredits)) &&
                           (!filters?.maxCredits || student?.enrolledCredits <= parseInt(filters?.maxCredits));

      return matchesSearch && matchesProgram && matchesSemester && matchesStatus && matchesCredits;
    });

    if (sortConfig?.key) {
      filtered?.sort((a, b) => {
        let aValue = a?.[sortConfig?.key];
        let bValue = b?.[sortConfig?.key];
        
        if (typeof aValue === 'string') {
          aValue = aValue?.toLowerCase();
          bValue = bValue?.toLowerCase();
        }
        
        if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [students, searchTerm, filters, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCellEdit = (studentId, field, currentValue) => {
    setEditingCell(`${studentId}-${field}`);
    setEditValue(currentValue?.toString());
  };

  const handleCellSave = (studentId, field) => {
    onEditStudent(studentId, field, editValue);
    setEditingCell(null);
    setEditValue('');
  };

  const handleCellCancel = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Active': 'bg-success/10 text-success border-success/20',
      'Inactive': 'bg-warning/10 text-warning border-warning/20',
      'Graduated': 'bg-primary/10 text-primary border-primary/20',
      'Suspended': 'bg-error/10 text-error border-error/20'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusConfig?.[status] || 'bg-muted text-muted-foreground'}`}>
        {status}
      </span>
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search by name, roll number, or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              options={programOptions}
              value={filters?.program}
              onChange={(value) => onFilterChange('program', value)}
              placeholder="Program"
              className="min-w-32"
            />
            <Select
              options={semesterOptions}
              value={filters?.semester}
              onChange={(value) => onFilterChange('semester', value)}
              placeholder="Semester"
              className="min-w-32"
            />
            <Select
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => onFilterChange('status', value)}
              placeholder="Status"
              className="min-w-32"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Credits:</span>
            <Input
              type="number"
              placeholder="Min"
              value={filters?.minCredits}
              onChange={(e) => onFilterChange('minCredits', e?.target?.value)}
              className="w-20"
            />
            <span className="text-muted-foreground">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={filters?.maxCredits}
              onChange={(e) => onFilterChange('maxCredits', e?.target?.value)}
              className="w-20"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>{filteredAndSortedStudents?.length} students found</span>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="p-4 text-left">
                  <Checkbox
                    checked={selectedStudents?.length === filteredAndSortedStudents?.length && filteredAndSortedStudents?.length > 0}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                  />
                </th>
                {[
                  { key: 'rollNumber', label: 'Roll Number' },
                  { key: 'name', label: 'Student Name' },
                  { key: 'program', label: 'Program' },
                  { key: 'semester', label: 'Semester' },
                  { key: 'enrolledCredits', label: 'Credits' },
                  { key: 'electiveCount', label: 'Electives' },
                  { key: 'status', label: 'Status' }
                ]?.map((column) => (
                  <th key={column?.key} className="p-4 text-left">
                    <button
                      onClick={() => handleSort(column?.key)}
                      className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                    >
                      <span>{column?.label}</span>
                      <Icon name={getSortIcon(column?.key)} size={14} />
                    </button>
                  </th>
                ))}
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedStudents?.map((student) => (
                <tr key={student?.id} className="border-b border-border hover:bg-muted/30 transition-smooth">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={(e) => onStudentSelect(student?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">{student?.rollNumber}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-foreground">{student?.name}</div>
                      <div className="text-sm text-muted-foreground">{student?.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm font-medium">
                      {student?.program}
                    </span>
                  </td>
                  <td className="p-4">
                    {editingCell === `${student?.id}-semester` ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e?.target?.value)}
                          className="w-16"
                          min="1"
                          max="8"
                        />
                        <Button size="xs" onClick={() => handleCellSave(student?.id, 'semester')}>
                          <Icon name="Check" size={12} />
                        </Button>
                        <Button size="xs" variant="ghost" onClick={handleCellCancel}>
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCellEdit(student?.id, 'semester', student?.semester)}
                        className="hover:bg-muted px-2 py-1 rounded transition-smooth"
                      >
                        {student?.semester}
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    {editingCell === `${student?.id}-enrolledCredits` ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e?.target?.value)}
                          className="w-20"
                          min="0"
                          max="30"
                        />
                        <Button size="xs" onClick={() => handleCellSave(student?.id, 'enrolledCredits')}>
                          <Icon name="Check" size={12} />
                        </Button>
                        <Button size="xs" variant="ghost" onClick={handleCellCancel}>
                          <Icon name="X" size={12} />
                        </Button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCellEdit(student?.id, 'enrolledCredits', student?.enrolledCredits)}
                        className="hover:bg-muted px-2 py-1 rounded transition-smooth"
                      >
                        {student?.enrolledCredits}
                      </button>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{student?.electiveCount}</span>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(student?.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onViewProfile(student?.id)}
                        title="View Profile"
                      >
                        <Icon name="Eye" size={14} />
                      </Button>
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => onEditStudent(student?.id)}
                        title="Edit Student"
                      >
                        <Icon name="Edit" size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-3">
        {filteredAndSortedStudents?.map((student) => (
          <div key={student?.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedStudents?.includes(student?.id)}
                  onChange={(e) => onStudentSelect(student?.id, e?.target?.checked)}
                />
                <div>
                  <div className="font-medium text-foreground">{student?.name}</div>
                  <div className="text-sm text-muted-foreground font-mono">{student?.rollNumber}</div>
                </div>
              </div>
              {getStatusBadge(student?.status)}
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div>
                <span className="text-muted-foreground">Program:</span>
                <div className="font-medium">{student?.program}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Semester:</span>
                <div className="font-medium">{student?.semester}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Credits:</span>
                <div className="font-medium">{student?.enrolledCredits}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Electives:</span>
                <div className="font-medium">{student?.electiveCount}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-sm text-muted-foreground">{student?.email}</div>
              <div className="flex items-center space-x-2">
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() => onViewProfile(student?.id)}
                >
                  View
                </Button>
                <Button
                  size="xs"
                  onClick={() => onEditStudent(student?.id)}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedStudents?.length === 0 && (
        <div className="text-center py-12 bg-card border border-border rounded-lg">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>
  );
};

export default StudentTable;