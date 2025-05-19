
import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GalleryImage } from '@/types/gallery';
import { toast } from 'sonner';

interface ImageUploaderProps {
  onUploadComplete: (images: GalleryImage[]) => void;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onUploadComplete, 
  uploading,
  setUploading
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    await processFiles(Array.from(e.target.files));
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files?.length) {
      await processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'image/jpeg' || 
      file.type === 'image/png' || 
      file.type === 'image/jpg'
    );

    if (validFiles.length !== files.length) {
      toast.error('Algunos archivos no son válidos. Solo se permiten JPG y PNG.');
    }

    if (validFiles.length === 0) return;

    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const uploadedImages: GalleryImage[] = validFiles.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return {
          id: `new-${Date.now()}-${index}`,
          name: file.name,
          url: imageUrl,
          fileType: file.type,
          fileSize: file.size,
          uploadDate: new Date().toISOString()
        };
      });

      onUploadComplete(uploadedImages);
      toast.success(`${uploadedImages.length} imágenes subidas con éxito.`);

      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      toast.error('Error al subir las imágenes.');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        dragActive ? 'border-purple-500 bg-purple-50' : 'border-purple-200'
      } transition-colors`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-purple-100 p-4 rounded-full">
          <Upload className="h-8 w-8 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-purple-700">
            Arrastra y suelta o haz clic para subir imágenes
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Solo se permiten archivos JPG y PNG
          </p>
        </div>
        <Input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <Button
          type="button"
          variant="outline"
          className="border-purple-300 text-purple-700 hover:bg-purple-50"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? 'Subiendo...' : 'Seleccionar Archivos'}
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
