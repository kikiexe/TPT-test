import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Button from './Button';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, title, message, onConfirm, onCancel, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-gray-600 mb-8">{message}</p>
          <div className="flex justify-end space-x-3">
            <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
              Batal
            </Button>
            <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
