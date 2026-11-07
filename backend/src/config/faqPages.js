// Pages of the website that can show a FAQ section. The console reads this list
// (GET /faq/pages) so the "Page" selector and the validation stay in one place.
// `value` is what the website passes to <FaqSection page="..." />.
export const FAQ_PAGES = [
  { value: "home", label: "Home (/)" },
  { value: "services", label: "Services (/services)" },
  { value: "digital-marketing", label: "Digital Marketing (/digital-marketing)" },
  { value: "software-development", label: "Software Development (/software-as-a-service)" },
  { value: "business-automation", label: "Business Automation (/automation)" },
  { value: "croissix", label: "Croissix AI (/croissix)" },
  { value: "zentovix", label: "Zentovix (/zentovix)" },
  { value: "company", label: "Company (/company)" },
  { value: "careers", label: "Careers (/careers)" },
  { value: "articles", label: "Articles (/articles)" },
  { value: "client-case-study", label: "Our Clients (/client-case-study)" },
  { value: "case-studies", label: "Client Case Studies (/case-studies and each case study)" },
];

export const FAQ_PAGE_VALUES = FAQ_PAGES.map((p) => p.value);
