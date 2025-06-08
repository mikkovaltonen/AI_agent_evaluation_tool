import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storageService, ERPDocument } from '../lib/storageService';
import { useAuth } from '../hooks/useAuth';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Upload, FileSpreadsheet, AlertCircle, Database } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ERPUploadProps {
  onUploadComplete?: (document: ERPDocument) => void;
}

export const ERPUpload: React.FC<ERPUploadProps> = ({
  onUploadComplete
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!user) {
      setError('Please log in to upload files');
      return;
    }

    const file = acceptedFiles[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setError('Only Excel (.xlsx, .xls) files are supported');
      return;
    }

    // Validate file size (25MB limit for Excel files)
    if (file.size > 25 * 1024 * 1024) {
      setError('File size must be less than 25MB');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const uploadedDoc = await storageService.uploadERPDocument(file, user.uid);
      onUploadComplete?.(uploadedDoc);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [user, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: false,
    disabled: uploading || !user
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          ERP/P2P Data Upload
        </CardTitle>
        <CardDescription>
          Upload your structured Excel file to simulate ERP integration
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300'}
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            ${!user ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          
          {uploading ? (
            <p className="text-gray-600">Processing Excel file...</p>
          ) : !user ? (
            <p className="text-gray-600">Please log in to upload files</p>
          ) : isDragActive ? (
            <p className="text-primary">Drop the file here...</p>
          ) : (
            <>
              <p className="text-gray-600 mb-2">
                Drag & drop an Excel file here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports .xlsx and .xls files up to 25MB
              </p>
            </>
          )}
        </div>

        <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 className="font-medium text-orange-800 mb-2">⚠️ Important: Data Structure Requirements</h4>
          <p className="text-sm text-orange-700 mb-3">
            Your Excel data must follow <strong>exactly the same structure</strong> as our example template for proper AI analysis:
          </p>
          <div className="mb-3">
            <a 
              href="/example_purchase_orders.xlsx" 
              download
              className="inline-flex items-center px-3 py-2 bg-orange-100 hover:bg-orange-200 border border-orange-300 rounded text-sm font-medium text-orange-800 transition-colors"
            >
              📥 Download Example Template (Excel)
            </a>
          </div>
          <div className="text-sm text-orange-700">
            <p className="mb-2"><strong>🤖 Need help converting your data?</strong></p>
            <p className="text-xs bg-white p-2 rounded border border-orange-300 font-mono">
              "Convert my Excel data to match this structure: [paste example template structure]. 
              Keep the same column names and data formats."
            </p>
            <p className="text-xs mt-1">Copy your data and this prompt to ChatGPT for automatic conversion.</p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">📊 What happens to your data:</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Excel files are parsed and converted to structured data</li>
            <li>• Column headers and data are extracted automatically</li>
            <li>• Data becomes available for AI analysis and queries</li>
            <li>• Files are stored securely in your personal workspace</li>
            <li>• You can download processed data as CSV format</li>
          </ul>
        </div>

        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 Best practices:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ensure first row contains column headers</li>
            <li>• Remove merged cells and complex formatting</li>
            <li>• Use consistent data types in columns</li>
            <li>• Keep file sizes reasonable for faster processing</li>
            <li>• Test with sample data first</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};