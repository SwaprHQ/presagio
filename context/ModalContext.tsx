'use client';

import { createContext, useContext, ReactNode, useMemo, useReducer } from 'react';

export enum ModalId {
  WAITING_TRANSACTION = 'waiting_transaction',
  CONFIRM_SWAP = 'confirm_swap',
  AGENT_DETAILS = 'agent_details',
}

enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

type ModalKey = ModalId | string;

export interface ModalContextProps {
  closeModal: (id: ModalKey) => void;
  openModal: (id: ModalKey) => void;
  isModalOpen: (id: ModalKey) => boolean;
}

export const ModalContext = createContext<ModalContextProps>({
  closeModal: (id: ModalKey) => {},
  openModal: (id: ModalKey) => {},
  isModalOpen: (id: ModalKey) => false,
});

export interface ModalProviderProps {
  children: ReactNode;
}

type Action = { id: ModalKey; type: ActionType };

function ModalReducer(openModals: ModalKey[], action: Action) {
  switch (action.type) {
    case ActionType.ADD: {
      return [...openModals, action.id];
    }
    case ActionType.REMOVE: {
      return openModals.filter((modal: string) => modal !== action.id);
    }
    default: {
      console.error('Unknown modal action: ' + action.type);
      return openModals;
    }
  }
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [openModals, dispatch] = useReducer(ModalReducer, []);

  const openModal = (modalId: ModalKey) => {
    dispatch({
      type: ActionType.ADD,
      id: modalId,
    });
  };

  const closeModal = (modalId: ModalKey) => {
    dispatch({
      type: ActionType.REMOVE,
      id: modalId,
    });
  };

  const modalContext = useMemo(() => {
    const isModalOpen = (modalId: ModalKey) => openModals.includes(modalId);

    return {
      closeModal,
      openModal,
      isModalOpen,
    };
  }, [openModals]);

  return <ModalContext.Provider value={modalContext}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
