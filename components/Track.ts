// mixpanelUtils.ts

export const pageTrack = (a: string) => {
  if (typeof mixpanel !== "undefined") {
    const label = a.toLowerCase() + " page view";
    mixpanel.track(label, { component: "page" });
  }
};

export const btnTrack = (a: React.MouseEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLButtonElement;
    const label = target.textContent?.toLowerCase() + " button click";
    mixpanel.track(label?.trim(), { component: "button" });
  }
};

export const linkTrack = (a: React.MouseEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLAnchorElement;
    const label = target.textContent?.toLowerCase() + " link click";
    mixpanel.track(label?.trim(), { component: "link" });
  }
};

export const formTrack = (a: React.FormEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLFormElement;
    const label = target.textContent?.toLowerCase() + " form submit";
    mixpanel.track(label?.trim(), { component: "form" });
  }
};

export const inputTrack = (a: React.FormEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLInputElement;
    const label = target.textContent?.toLowerCase() + " user input";
    mixpanel.track(label?.trim(), { component: "input" });
  }
};

export const selectTrack = (a: React.FormEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLSelectElement;
    const label = target.textContent?.toLowerCase() + " dropdown select";
    mixpanel.track(label?.trim(), { component: "select" });
  }
};

export const textareaTrack = (a: React.FormEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLTextAreaElement;
    const label = target.textContent?.toLowerCase() + " user long input";
    mixpanel.track(label?.trim(), { component: "textarea" });
  }
};

export const checkboxTrack = (a: React.FormEvent) => {
  if (typeof mixpanel !== "undefined") {
    const target = a.target as HTMLInputElement;
    const label = target.textContent?.toLowerCase() + " checkbox click";
    mixpanel.track(label?.trim(), { component: "checkbox" });
  }
};
