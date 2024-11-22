'use client';

import { createContext, useContext, ReactNode, useMemo, useReducer } from 'react';

export enum ModalId {
  WAITING_TRANSACTION = 'waiting_transaction',
  CONFIRM_SWAP = 'confirm_swap',
  EMBED_MARKET = 'embed_market',
  LIFI_WIDGET = 'lifi_widget',
  CONFIRM_LIQUIDITY = 'confirm_liquidity',
}

enum ActionType {
  ADD = 'add',
  REMOVE = 'remove',
}

export interface ModalContextProps {
  closeModal: (id: ModalId) => void;
  openModal: (id: ModalId) => void;
  isModalOpen: (id: ModalId) => boolean;
}

export const ModalContext = createContext<ModalContextProps>({
  closeModal: (id: ModalId) => {},
  openModal: (id: ModalId) => {},
  isModalOpen: (id: ModalId) => false,
});

export interface ModalProviderProps {
  children: ReactNode;
}

type Action = { id: ModalId; type: ActionType };

function ModalReducer(openModals: ModalId[], action: Action) {
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

  const openModal = (modalId: ModalId) => {
    dispatch({
      type: ActionType.ADD,
      id: modalId,
    });
  };

  const closeModal = (modalId: ModalId) => {
    dispatch({
      type: ActionType.REMOVE,
      id: modalId,
    });
  };

  const modalContext = useMemo(() => {
    const isModalOpen = (modalId: ModalId) => openModals.includes(modalId);

    return {
      closeModal,
      openModal,
      isModalOpen,
    };
  }, [openModals]);

  return <ModalContext.Provider value={modalContext}>{children}</ModalContext.Provider>;
};

export const useModal = () => useContext(ModalContext);
