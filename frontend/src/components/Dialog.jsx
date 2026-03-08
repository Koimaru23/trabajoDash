import React, { useState } from 'react';
import { Button, ButtonDanger, ButtonWarning } from './Button';
import { Input, Label, Select } from './Form';

export const DialogExistsWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export const Dialog = ({ isOpen, onClose, title, children }) => {
  return (
    <DialogExistsWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        {children}
      </div>
    </DialogExistsWrapper>
  );
};

export const AlertDialog = ({ isOpen, onClose, title, description, onConfirm, isDangerous }) => {
  return (
    <DialogExistsWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} className="bg-gray-400">
            Cancelar
          </Button>
          {isDangerous ? (
            <ButtonDanger onClick={onConfirm}>
              Eliminar
            </ButtonDanger>
          ) : (
            <Button onClick={onConfirm}>
              Confirmar
            </Button>
          )}
        </div>
      </div>
    </DialogExistsWrapper>
  );
};
