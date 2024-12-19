import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//! todo: add types
//@ts-ignore
import mixpanel from "mixpanel-browser";

// ? https://mixpanel.com/project/3276012/app/settings#project/3276012
const MIXPANEL_TOKEN = process.env.REACT_APP_MIXPANEL_TOKEN || "7c02ad22ae575ab4e15cdd052cd730fb";

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn("Mixpanel token is missing! Check your .env file.");
    return;
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: {
      pageview: "full-url",
      click: true,
      input: true,
      scroll: true,
      submit: true,
      capture_text_content: true	  
    },
    record_sessions_percent: 100,
    record_block_selector: "none",
    record_collect_fonts: true,
    record_mask_text_selector: "none",
    record_block_class: "none",
  });
};

export const trackPageView = (url: any) => {
  mixpanel.track_pageview({ url });
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
