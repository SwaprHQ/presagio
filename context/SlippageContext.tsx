import { PropsWithChildren, createContext, useContext, useState } from 'react';

export interface SlippageContextProps {
  slippage: number;
  updateSlippage: (slippage: number) => void;
}

const DEFAULT_SLIPPAGE = 0.0001;

const SlippageContext = createContext<SlippageContextProps>({
  slippage: DEFAULT_SLIPPAGE,
  updateSlippage: () => {},
});

export const useSlippage = () => useContext(SlippageContext);

export const SlippageProvider = ({ children }: PropsWithChildren) => {
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);

  const updateSlippage = (newSlippage: number) => {
    setSlippage(newSlippage);
  };

  return (
    <SlippageContext.Provider value={{ slippage, updateSlippage }}>
      {children}
    </SlippageContext.Provider>
  );
};
