
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

interface Candidate {
  id: number;
  name: string;
  skills: string[];
  cvLink: string;
  status: 'pending' | 'approved' | 'rejected';
}

const CompanyView: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Ahmed Benaissa",
      skills: ["React", "Node.js", "Python"],
      cvLink: "cv_ahmed.pdf",
      status: "pending"
    },
    {
      id: 2,
      name: "Fatima Zahra",
      skills: ["Design", "Figma", "Adobe Creative"],
      cvLink: "cv_fatima.pdf",
      status: "pending"
    },
    {
      id: 3,
      name: "Yacine Medjahdi",
      skills: ["Java", "Spring", "MongoDB"],
      cvLink: "cv_yacine.pdf",
      status: "pending"
    }
  ]);

  const [newOffer, setNewOffer] = useState({
    title: '',
    domain: '',
    description: '',
    location: ''
  });

  const handleCandidateAction = (candidateId: number, action: 'approved' | 'rejected') => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, status: action }
          : candidate
      )
    );
    
    toast({
      title: action === 'approved' ? "Candidature approuvée" : "Candidature refusée",
      description: "Le candidat a été notifié de votre décision.",
    });
  };

  const handleAddOffer = () => {
    toast({
      title: "Offre ajoutée avec succès!",
      description: "Votre nouvelle offre est maintenant visible aux étudiants.",
    });
    setNewOffer({ title: '', domain: '', description: '', location: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvé';
      case 'rejected': return 'Refusé';
      default: return 'En attente';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Candidatures</h2>
          <p className="text-gray-600">Gérez vos offres et candidatures reçues</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-all duration-200">
              ➕ Ajouter une nouvelle offre
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle offre</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titre de l'offre</Label>
                <Input
                  id="title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Stage développeur frontend"
                />
              </div>
              <div>
                <Label htmlFor="domain">Domaine</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un domaine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technologie</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  value={newOffer.location}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Ex: Alger, Algérie"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Décrivez l'offre en détail..."
                  rows={4}
                />
              </div>
              <Button onClick={handleAddOffer} className="w-full">
                Publier l'offre
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">📋</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Candidatures totales</p>
                <p className="text-2xl font-bold">{candidates.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Approuvées</p>
                <p className="text-2xl font-bold">
                  {candidates.filter(c => c.status === 'approved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-xl">⏳</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold">
                  {candidates.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Candidats</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => (
            <Card key={candidate.id} className="card-hover animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{candidate.name}</CardTitle>
                  <Badge className={getStatusColor(candidate.status)}>
                    {getStatusText(candidate.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Compétences:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => toast({ title: "CV téléchargé", description: candidate.cvLink })}
                  >
                    📄 Voir CV
                  </Button>
                  
                  {candidate.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        onClick={() => handleCandidateAction(candidate.id, 'approved')}
                      >
                        ✓ Approuver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        className="flex-1"
                        onClick={() => handleCandidateAction(candidate.id, 'rejected')}
                      >
                        ✗ Refuser
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
