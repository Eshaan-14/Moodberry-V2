import React from 'react';
import { CuratedImage } from '../src/types';

interface ImageGridProps {
  images: CuratedImage[];
  selectedIds: string[];
  onToggle: (image: CuratedImage) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, selectedIds, onToggle }) => {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
      {images.map((img) => {
        const isSelected = selectedIds.includes(img.id);
        return (
          <div
            key={img.id}
            className={`relative break-inside-avoid cursor-pointer group transition-all duration-500 rounded-3xl overflow-hidden bg-slate-900 ${
              isSelected 
              ? 'ring-[6px] ring-indigo-500 ring-offset-4 ring-offset-slate-950 scale-[0.97] z-10' 
              : 'hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'
            }`}
            onClick={() => onToggle(img)}
          >
            <div className={`relative overflow-hidden aspect-[3/4] transition-all duration-700 ${isSelected ? 'opacity-70' : 'group-hover:opacity-100'}`}>
              <img
                src={img.url}
                alt={img.description}
                className={`w-full h-full object-cover transition-all duration-[1500ms] ease-out ${
                  isSelected ? 'scale-110' : 'group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0'
                }`}
                loading="lazy"
                decoding="async"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Selection Checkmark */}
              {isSelected && (
                <div className="absolute top-6 right-6 z-20 animate-in fade-in zoom-in duration-300">
                  <div className="bg-white text-slate-950 p-2.5 rounded-2xl shadow-2xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Description Preview on Hover (Tags removed) */}
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/90 drop-shadow-lg line-clamp-2 leading-relaxed">
                  {img.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageGrid;