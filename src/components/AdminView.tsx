
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'overview' | 'users' | 'feedback'>('overview');

  const stats = [
    {
      title: "Utilisateurs inscrits",
      value: "120",
      icon: "👥",
      color: "bg-blue-500",
      trend: "+12 ce mois"
    },
    {
      title: "Offres actives",
      value: "15",
      icon: "💼",
      color: "bg-green-500",
      trend: "+3 cette semaine"
    },
    {
      title: "Candidatures reçues",
      value: "42",
      icon: "📋",
      color: "bg-purple-500",
      trend: "+8 aujourd'hui"
    }
  ];

  const users = [
    { id: 1, name: "Ahmed Benaissa", email: "ahmed@email.com", role: "Étudiant", status: "Actif" },
    { id: 2, name: "TechAlger", email: "contact@techalger.com", role: "Entreprise", status: "Actif" },
    { id: 3, name: "Fatima Zahra", email: "fatima@email.com", role: "Étudiant", status: "Inactif" },
    { id: 4, name: "Yacine Medjahdi", email: "yacine@email.com", role: "Étudiant", status: "Actif" },
  ];

  const feedbacks = [
    { id: 1, user: "Ahmed B.", message: "Plateforme très intuitive, merci!", rating: 5, date: "2024-01-15" },
    { id: 2, user: "TechAlger", message: "Excellent pour recruter des talents", rating: 4, date: "2024-01-14" },
    { id: 3, user: "Fatima Z.", message: "J'ai trouvé mon stage grâce à vous!", rating: 5, date: "2024-01-13" },
    { id: 4, user: "Yacine M.", message: "Interface moderne et rapide", rating: 4, date: "2024-01-12" },
  ];

  const renderStars = (rating: number) => {
    return "⭐".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Statistiques Générales</h2>
          <p className="text-gray-600">Vue d'ensemble de la plateforme LevelUp</p>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex space-x-2">
        <Button
          variant={activeSection === 'overview' ? 'default' : 'outline'}
          onClick={() => setActiveSection('overview')}
          className="hover:scale-105 transition-all duration-200"
        >
          📊 Vue d'ensemble
        </Button>
        <Button
          variant={activeSection === 'users' ? 'default' : 'outline'}
          onClick={() => setActiveSection('users')}
          className="hover:scale-105 transition-all duration-200"
        >
          👥 Gérer les comptes
        </Button>
        <Button
          variant={activeSection === 'feedback' ? 'default' : 'outline'}
          onClick={() => setActiveSection('feedback')}
          className="hover:scale-105 transition-all duration-200"
        >
          💬 Consulter les feedbacks
        </Button>
      </div>

      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 ${stat.color} rounded-lg flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600">{stat.trend}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:scale-105 transition-all duration-200">
                  <span className="text-2xl">📧</span>
                  <span className="text-sm">Envoyer notification</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:scale-105 transition-all duration-200">
                  <span className="text-2xl">📊</span>
                  <span className="text-sm">Générer rapport</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:scale-105 transition-all duration-200">
                  <span className="text-2xl">🔧</span>
                  <span className="text-sm">Paramètres système</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col space-y-2 hover:scale-105 transition-all duration-200">
                  <span className="text-2xl">🚀</span>
                  <span className="text-sm">Publier mise à jour</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Users Management Section */}
      {activeSection === 'users' && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Gestion des comptes utilisateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Actif' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Éditer</Button>
                        <Button size="sm" variant="destructive">Suspendre</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Feedback Section */}
      {activeSection === 'feedback' && (
        <div className="space-y-4 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle>Feedbacks des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedbacks.map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">{feedback.user}</span>
                          <span className="text-sm text-gray-500">{feedback.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{feedback.message}</p>
                        <div className="text-sm text-yellow-600">
                          {renderStars(feedback.rating)}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Répondre
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminView;
