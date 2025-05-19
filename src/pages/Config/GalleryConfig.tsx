
import React, { useState } from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import ImageUploader from './Gallery/ImageUploader';
import GalleryGrid from './Gallery/GalleryGrid';
import { GalleryImage } from '@/types/gallery';

// Mock gallery data
const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    name: 'restaurant-interior.jpg',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    fileType: 'image/jpeg',
    fileSize: 1024000,
    uploadDate: '2023-05-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'menu-item.jpg',
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    fileType: 'image/jpeg',
    fileSize: 845000,
    uploadDate: '2023-06-12T09:15:00Z'
  },
  {
    id: '3',
    name: 'chef-special.png',
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    fileType: 'image/png',
    fileSize: 1345000,
    uploadDate: '2023-07-05T16:45:00Z'
  }
];

const GalleryConfig = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(initialGalleryImages);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (newImages: GalleryImage[]) => {
    setGalleryImages([...newImages, ...galleryImages]);
  };

  const handleDeleteImage = (imageId: string) => {
    setGalleryImages(galleryImages.filter(img => img.id !== imageId));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-purple-800 mb-2">Galería de Imágenes</h1>
        <p className="text-gray-600 mb-6">Gestione las imágenes de su negocio</p>
      </div>

      <Alert className="bg-purple-50 border-purple-200">
        <AlertDescription>
          Sube y gestiona imágenes en formato JPG o PNG para utilizarlas en tu sitio.
        </AlertDescription>
      </Alert>

      <ImageUploader 
        onUploadComplete={handleImageUpload} 
        uploading={uploading}
        setUploading={setUploading}
      />

      <div>
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Imágenes Subidas</h2>
        <GalleryGrid images={galleryImages} onDelete={handleDeleteImage} />
      </div>
    </div>
  );
};

export default GalleryConfig;
