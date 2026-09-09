'use client';

import React from 'react';
import { ConfirmDialogProps } from '@/types';
import Modal from './Modal';

/**
 * ConfirmDialog component
 * Displays a confirmation dialog with confirm and cancel actions
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-4">
        <p className="text-gray-300">{message}</p>
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: '#16213e',
              color: '#a0a0a0',
              border: '1px solid #0f3460',
            }}
          >
            {cancelLabel}
          </button>
          
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{
              backgroundColor: '#e94560',
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}