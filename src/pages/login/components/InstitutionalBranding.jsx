import React from 'react';
import Icon from '../../../components/AppIcon';

const InstitutionalBranding = () => {
  const certifications = [
    {
      title: "Government of J&K",
      subtitle: "Higher Education Department",
      icon: "Shield",
      color: "text-primary"
    },
    {
      title: "NEP 2020",
      subtitle: "Compliant System",
      icon: "Award",
      color: "text-success"
    },
    {
      title: "Secure Access",
      subtitle: "Enterprise Grade",
      icon: "Lock",
      color: "text-accent"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Logo Section */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 elevation-2">
          <Icon name="Calendar" size={32} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          NEP Timetable Generator
        </h1>
        <p className="text-muted-foreground text-sm">
          AI-Powered Academic Scheduling System
        </p>
      </div>
      {/* Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {certifications?.map((cert, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card border border-border rounded-lg elevation-1"
          >
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2`}>
              <Icon name={cert?.icon} size={20} className={cert?.color} />
            </div>
            <h3 className="font-medium text-sm text-foreground">{cert?.title}</h3>
            <p className="text-xs text-muted-foreground">{cert?.subtitle}</p>
          </div>
        ))}
      </div>
      {/* Features List */}
      <div className="space-y-3">
        <h3 className="font-medium text-foreground text-center mb-4">System Features</h3>
        <div className="space-y-2">
          {[
            "Automated conflict-free scheduling",
            "Multi-program timetable generation",
            "Real-time collaboration tools",
            "NEP 2020 guideline compliance"
          ]?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Support Information */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground mb-2">
          Need help? Contact technical support
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Mail" size={12} />
            <span>support@jk.gov.in</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Phone" size={12} />
            <span>+91-194-2123456</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalBranding;