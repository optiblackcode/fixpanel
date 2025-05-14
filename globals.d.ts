declare var mixpanel: any;

import 'mixpanel-browser';

declare module 'mixpanel-browser' {
  interface OverridedMixpanel {
    flags: {
      // Define the structure of your flags interface here.
      get_feature_data: (experimentId: string) => Promise<any>;
      [key: string]: any;
    };
  }
}

declare global {
  interface Window {
    /**
     * Our debug helper installed by initMixpanel()
     */
    RESET: () => void;

    /**
     * Exposed Mixpanel instance
     */
    mixpanel: any;
  }
}