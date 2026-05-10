export type Dictionary = {
  nav: {
    home: string;
    about: string;
    projects: string;
    contact: string;
    impressum: string;
  };
  footer: {
    company: string;
    address: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    titleLead: string;
    titleHighlight: string;
    intro: string;
    introMandates: string;
    ctaProjects: string;
    ctaContact: string;
    ctaTeam: string;
    whyTitle: string;
    whyItems: string[];
    whoWeServeTitle: string;
    clientTypes: { title: string; subtitle: string; detail: string }[];
    deliverTitle: string;
    capabilities: { label: string; detail: string }[];
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    intro: string;
    capabilitiesTitle: string;
    capabilities: string[];
    twinBadge: string;
    twinHeading: string;
    twinIntro: string;
    twinNote: string;
    partnerRoles: { kadir: string; sanz: string; dubin: string; baltin: string };
    partnerBios: { kadir: string; sanz: string; dubin: string; baltin: string };
    linkedin: string;
    twinPlaceholder: string;
  };
  projects: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    intro: string;
    disclaimer: string;
    readMore: string;
  };
  projectDetail: {
    backToProjects: string;
    clientType: string;
    challengeTitle: string;
    approachTitle: string;
    deliverablesTitle: string;
    outcomesTitle: string;
    cta: string;
    ctaLink: string;
  };
  contacts: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    intro: string;
    primaryContact: string;
    name: string;
    phone: string;
    email: string;
    office: string;
    addressValue: string;
    form: {
      heading: string;
      nameLabel: string;
      emailLabel: string;
      companyLabel: string;
      messageLabel: string;
      sending: string;
      send: string;
      successTitle: string;
      successBody: string;
      unexpectedError: string;
      submissionFailed: string;
    };
  };
  ai: {
    metaTitle: string;
    metaDescription: string;
    badge: string;
    title: string;
    intro: string;
    languageNote: string;
  };
  chat: {
    starter: string;
    placeholder: string;
    thinking: string;
    poweredBy: string;
    send: string;
    chatFailed: string;
    unexpectedError: string;
  };
  languageSwitcher: {
    label: string;
  };
};
