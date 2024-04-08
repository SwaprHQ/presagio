"use client";

import { Button, IconButton } from "swapr-ui";
import { SwapInput } from "./ui/SwapInput";
import { useState } from "react";

export const Swapbox = () => {
  const [tokenInAmount, setTokenInAmount] = useState("");
  const [tokenOutAmount, setTokenOutAmount] = useState("");

  return (
    <div className="space-y-2 relative">
      <SwapInput
        title="You Swap"
        value={tokenInAmount}
        onChange={(event) => {
          setTokenInAmount(event.target.value);
        }}
        onClick={() => console.log("I want to change token")}
      >
        <div className="flex text-sm items-center justify-end space-x-1.5">
          <p className="text-text-low-em">Balance: 5400</p>
          <Button
            variant="ghost"
            className="text-sm font-semibold text-text-primary-main"
          >
            Use MAX
          </Button>
        </div>
      </SwapInput>
      <IconButton
        name="swap-vertical"
        variant="outline"
        className="absolute top-[100px] left-[calc(50%_-_20px)]"
      />
      <SwapInput
        title="To Receive"
        value={tokenOutAmount}
        onChange={(event) => {
          setTokenOutAmount(event.target.value);
        }}
      />
    </div>
  );
};
