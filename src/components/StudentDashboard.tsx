
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import NotificationBell from './NotificationBell';
import ChatSupport from './ChatSupport';
import StudentView from './StudentView';

interface StudentDashboardProps {
  onLogout: () => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ onLogout }) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-lg text-white">👨‍🎓</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LevelUp - Étudiant</h1>
                <p className="text-sm text-gray-500">Tableau de bord étudiant</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-300 rounded-full flex items-center justify-center">
                  <span className="text-sm">👨‍🎓</span>
                </div>
                <span className="text-sm font-medium">Étudiant Demo</span>
              </div>
              <Button onClick={onLogout} variant="outline" size="sm">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StudentView />
      </main>

      {/* Chat Support Button */}
      <Button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-all duration-200"
        size="icon"
      >
        💬
      </Button>

      {/* Chat Support Panel */}
      {showChat && (
        <ChatSupport onClose={() => setShowChat(false)} />
      )}
    </div>
  );
};

export default StudentDashboard;
