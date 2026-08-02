import React, { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { compressImageUnder1MB, formatFileSize, getDataUrlByteSize } from '../utils/imageCompressor';

interface ImageUploaderProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Foto / Gambar',
  placeholder = 'https://...'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressionInfo, setCompressionInfo] = useState<string | null>(null);

  const processFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, WebP, dll)');
      return;
    }

    setIsCompressing(true);
    setCompressionInfo(null);

    try {
      const result = await compressImageUnder1MB(file, 1024 * 1024); // Force under 1MB
      onChange(result.dataUrl);
      if (result.infoText) {
        setCompressionInfo(result.infoText);
      }
    } catch (error) {
      console.error('Compression error:', error);
      alert('Gagal mengompres gambar. Silakan coba file lain.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
      // reset file input
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const currentSize = value && value.startsWith('data:') ? getDataUrlByteSize(value) : null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-slate-700 text-xs">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          {showUrlInput ? 'Gunakan Upload File' : 'Gunakan URL Gambar'}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {isCompressing ? (
        <div className="border-2 border-dashed border-emerald-400 bg-emerald-50/60 rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-7 h-7 text-emerald-600 animate-spin" />
          <p className="text-xs font-bold text-emerald-900">Mengompres Gambar...</p>
          <p className="text-[11px] text-emerald-700">Memastikan ukuran file berada di bawah 1 MB</p>
        </div>
      ) : value ? (
        <div className="space-y-1">
          <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 flex items-center justify-center">
            <img
              src={value}
              alt="Preview"
              referrerPolicy="no-referrer"
              className="w-full h-44 object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/90 hover:bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <Upload className="w-3.5 h-3.5 text-emerald-600" /> Ganti Gambar
              </button>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setCompressionInfo(null);
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-md cursor-pointer transition-transform active:scale-95"
              >
                <X className="w-3.5 h-3.5" /> Hapus
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {compressionInfo || (currentSize ? `Ukuran: ${formatFileSize(currentSize)} (< 1MB)` : 'Gambar Siap')}
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              &lt; 1 MB
            </span>
          </div>
        </div>
      ) : showUrlInput ? (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
          <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-1.5 ${isDragging
            ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01]'
            : 'border-slate-300 hover:border-emerald-500 hover:bg-slate-50'
            }`}
        >
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">
              Klik untuk Upload File Gambar
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Gambar otomatis dikompres ke bawah 1 MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

