'use client';

import { useState, useEffect } from 'react';
import { NovoAtendimentoModal } from '@/components/NovoAtendimentoModal';

interface ClientWrapperProps {
  children: React.ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1); // Força o refresh das listas
  };

  useEffect(() => {
    const handleModalOpen = () => setIsModalOpen(true);
    const modalButtons = document.querySelectorAll('[data-modal-open]');

    modalButtons.forEach(button => {
      button.addEventListener('click', handleModalOpen);
    });

    return () => {
      modalButtons.forEach(button => {
        button.removeEventListener('click', handleModalOpen);
      });
    };
  }, []);

  return (
    <>
      {children}
      <NovoAtendimentoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
}
