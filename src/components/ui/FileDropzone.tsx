import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadIcon, FileIcon, XIcon } from 'lucide-react';

interface FileDropzoneProps {
  onFilesAdded: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: string[];
  uploadedFiles?: string[];
  onFileRemove?: (index: number) => void;
}

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFilesAdded,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx'],
  uploadedFiles = [],
  onFileRemove
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAdded(acceptedFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-yellow-400 bg-yellow-50'
            : 'border-gray-300 hover:border-yellow-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <UploadIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <div className="text-gray-600">
          <p className="text-lg font-medium mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="text-sm">
            or <span className="text-yellow-600 font-medium">browse</span> to choose files
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Supports: {accept.join(', ')} (Max {formatFileSize(maxSize)} each)
          </p>
        </div>
      </div>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-red-800 font-medium mb-2">Some files were rejected:</h4>
          <ul className="text-red-700 text-sm space-y-1">
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {errors.map(e => e.message).join(', ')}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          {uploadedFiles.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3"
            >
              <div className="flex items-center">
                <FileIcon className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-green-800">{fileName}</span>
              </div>
              {onFileRemove && (
                <button
                  onClick={() => onFileRemove(index)}
                  className="text-green-600 hover:text-green-800"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};