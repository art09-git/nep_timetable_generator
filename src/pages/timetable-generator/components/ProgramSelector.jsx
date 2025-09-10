import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ProgramSelector = ({ selectedPrograms, onProgramChange }) => {
  const programs = [
    { 
      id: 'bed', 
      name: 'B.Ed.', 
      fullName: 'Bachelor of Education',
      description: 'Two-year teacher education program',
      color: 'bg-blue-100 text-blue-800',
      students: 120
    },
    { 
      id: 'med', 
      name: 'M.Ed.', 
      fullName: 'Master of Education',
      description: 'Two-year postgraduate teacher education',
      color: 'bg-green-100 text-green-800',
      students: 80
    },
    { 
      id: 'fyup', 
      name: 'FYUP', 
      fullName: 'Four-Year Undergraduate Programme',
      description: 'Multidisciplinary undergraduate program',
      color: 'bg-purple-100 text-purple-800',
      students: 200
    },
    { 
      id: 'itep', 
      name: 'ITEP', 
      fullName: 'Integrated Teacher Education Programme',
      description: 'Four-year integrated B.A./B.Sc. B.Ed.',
      color: 'bg-orange-100 text-orange-800',
      students: 150
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 elevation-1">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="GraduationCap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Program Selection</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs?.map((program) => (
          <div key={program?.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-smooth">
            <div className="flex items-start space-x-3">
              <Checkbox
                checked={selectedPrograms?.includes(program?.id)}
                onChange={(e) => onProgramChange(program?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-foreground">{program?.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${program?.color}`}>
                    {program?.students} students
                  </span>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{program?.fullName}</p>
                <p className="text-xs text-muted-foreground">{program?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-accent" />
          <p className="text-sm text-accent">
            Select multiple programs to generate integrated timetables with shared resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramSelector;