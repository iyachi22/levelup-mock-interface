
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import StudentView from './StudentView';
import CompanyView from './CompanyView';
import AdminView from './AdminView';
import ChatSupport from './ChatSupport';
import NotificationBell from './NotificationBell';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('student');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">LU</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LevelUp</h1>
                <p className="text-sm text-gray-500">Tableau de bord</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <NotificationBell />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">Utilisateur Demo</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 mx-auto">
            <TabsTrigger value="student" className="flex items-center space-x-2">
              <span>👨‍🎓</span>
              <span>Étudiant</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <span>🏢</span>
              <span>Entreprise</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <span>⚙️</span>
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="animate-fade-in">
            <StudentView />
          </TabsContent>

          <TabsContent value="company" className="animate-fade-in">
            <CompanyView />
          </TabsContent>

          <TabsContent value="admin" className="animate-fade-in">
            <AdminView />
          </TabsContent>
        </Tabs>
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

export default Dashboard;
