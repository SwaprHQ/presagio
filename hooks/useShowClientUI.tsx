"use client";

import { useEffect, useState } from "react";

export const useShowClientUI = () => {
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so we can safely show the UI when component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};
