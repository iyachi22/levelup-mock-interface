
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Offer {
  id: number;
  title: string;
  location: string;
  company: string;
  type: 'stage' | 'bourse';
  description: string;
}

const StudentView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentOfferSet, setCurrentOfferSet] = useState(0);
  const [applicationData, setApplicationData] = useState({
    cv: '',
    motivationLetter: ''
  });

  const offerSets = [
    [
      {
        id: 1,
        title: "Stage en développement web",
        location: "Alger",
        company: "TechAlger",
        type: "stage" as const,
        description: "Développement d'applications web modernes avec React et Node.js"
      }
    ],
    [],
    [
      {
        id: 2,
        title: "Bourse Erasmus+",
        location: "France",
        company: "Union Européenne",
        type: "bourse" as const,
        description: "Programme d'échange universitaire en Europe"
      }
    ]
  ];

  const refreshOffers = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentOfferSet((prev) => (prev + 1) % offerSets.length);
      setIsLoading(false);
    }, 1500);
  };

  const handleApplication = (offerId: number) => {
    setTimeout(() => {
      toast({
        title: "Candidature envoyée avec succès!",
        description: "Votre candidature a été transmise à l'entreprise.",
      });
      setApplicationData({ cv: '', motivationLetter: '' });
    }, 1000);
  };

  const currentOffers = offerSets[currentOfferSet];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offres de Stage et Bourses</h2>
          <p className="text-gray-600">Découvrez les opportunités qui vous correspondent</p>
        </div>
        <Button 
          onClick={refreshOffers}
          disabled={isLoading}
          className="hover:scale-105 transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Chargement...</span>
            </div>
          ) : (
            '🔄 Rafraîchir les offres'
          )}
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : currentOffers.length === 0 ? (
        <Card className="text-center py-12 animate-bounce-in">
          <CardContent>
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">Aucune offre disponible</h3>
            <p className="text-gray-600">Aucune offre disponible pour le moment.</p>
            <p className="text-sm text-gray-500 mt-2">Revenez plus tard ou rafraîchissez la page</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentOffers.map((offer) => (
            <Card key={offer.id} className="card-hover animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <Badge variant={offer.type === 'stage' ? 'default' : 'secondary'}>
                    {offer.type === 'stage' ? '💼 Stage' : '🎓 Bourse'}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">📍 {offer.location}</p>
                  <p className="text-sm font-medium text-primary">{offer.company}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full hover:scale-105 transition-all duration-200">
                      Appliquer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Candidature - {offer.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cv">CV (Fichier)</Label>
                        <Input
                          id="cv"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="motivation">Lettre de motivation</Label>
                        <Textarea
                          id="motivation"
                          placeholder="Expliquez votre motivation..."
                          value={applicationData.motivationLetter}
                          onChange={(e) => setApplicationData(prev => ({
                            ...prev,
                            motivationLetter: e.target.value
                          }))}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                      <Button 
                        onClick={() => handleApplication(offer.id)}
                        className="w-full"
                      >
                        Envoyer la candidature
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentView;
