
import React, { useState } from 'react';
import { Trash2, Eye, Download } from 'lucide-react';
import { GalleryImage } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface GalleryGridProps {
  images: GalleryImage[];
  onDelete: (imageId: string) => void;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, onDelete }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay imágenes subidas aún.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="aspect-square relative overflow-hidden bg-gray-50">
              <img
                src={image.url}
                alt={image.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white text-purple-700 hover:bg-purple-100 h-8 w-8"
                  onClick={() => setSelectedImage(image)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onDelete(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-2">
              <p className="text-sm font-medium truncate">{image.name}</p>
              <p className="text-xs text-gray-500">{formatBytes(image.fileSize)}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-purple-800">{selectedImage.name}</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                className="max-h-[60vh] object-contain mb-4"
              />
              <div className="w-full bg-purple-50 p-3 rounded-md text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-gray-500">Tipo: <span className="text-purple-700">{selectedImage.fileType}</span></p>
                    <p className="text-gray-500">Tamaño: <span className="text-purple-700">{formatBytes(selectedImage.fileSize)}</span></p>
                  </div>
                  <div>
                    <p className="text-gray-500">Subida: <span className="text-purple-700">{formatDate(selectedImage.uploadDate)}</span></p>
                    <p className="text-gray-500">ID: <span className="text-purple-700">{selectedImage.id}</span></p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <Button 
                  variant="outline" 
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                  onClick={() => window.open(selectedImage.url, '_blank')}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    onDelete(selectedImage.id);
                    setSelectedImage(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default GalleryGrid;
