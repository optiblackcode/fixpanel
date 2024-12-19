"use client";

import { useEffect } from "react";
import { initMixpanel } from '../lib/utils';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return <>{children}</>;
}