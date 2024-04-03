"use client";

import Image from "next/image";
import { Logo } from "swapr-ui";

import { OutcomeBar } from "@/app/components";
import { Card } from "@/app/components/ui";

export const CardMarket = () => (
  <Card>
    <section className="p-4 h-[160px] flex flex-col justify-between">
      <div className="flex space-x-4 ">
        <div className="size-[40px] bg-text-low-em rounded-8 bg-gradient-to-r from-[#cb8fc1] to-[#b459c6]" />
        <p className="flex-1 font-semibold text-text-high-em">
          Will Tether collapse and take down the whole crypto market before the
          end of 2024?
        </p>
      </div>
      <OutcomeBar />
    </section>
    <section className="flex items-center h-[40px] px-4 border-t border-outline-base-em">
      <div className="flex items-center justify-between w-full space-x-4">
        <div className="flex items-center space-x-2">
          <Logo
            src="https://raw.githubusercontent.com/SmolDapp/tokenAssets/main/tokens/100/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee/logo-128.png"
            alt="token logo"
            size="xs"
          />
          <p className="text-sm font-semibold text-text-med-em">
            14,34,000 <span>Vol</span>
          </p>
        </div>
        <p className="text-sm text-text-low-em">8 months remaining</p>
      </div>
    </section>
  </Card>
);
