import type { Locale } from "./i18n/config";

type LocalizedString = Record<Locale, string>;
type LocalizedStringList = Record<Locale, string[]>;

export type LocalizedProject = {
  slug: string;
  title: LocalizedString;
  tagline: LocalizedString;
  summary: LocalizedString;
  clientType: LocalizedString;
  tags: string[];
  challenge: LocalizedString;
  approach: LocalizedString;
  deliverables: LocalizedStringList;
  outcomes: LocalizedStringList;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  clientType: string;
  tags: string[];
  challenge: string;
  approach: string;
  deliverables: string[];
  outcomes: string[];
};

export const localizedProjects: LocalizedProject[] = [
  {
    slug: "t1-settlement-readiness",
    title: {
      en: "T+1 Readiness and Post-Trade Optimization",
      de: "T+1-Readiness und Post-Trade-Optimierung",
    },
    tagline: {
      en: "Accelerating settlement cycles without adding operational risk",
      de: "Beschleunigung der Settlement-Zyklen ohne Erhöhung des operationellen Risikos",
    },
    summary: {
      en: "Assessment and redesign of trade, clearing, and settlement workflows to support accelerated cycles and liquidity resilience.",
      de: "Bewertung und Neugestaltung der Trade-, Clearing- und Settlement-Workflows zur Unterstützung beschleunigter Zyklen und Liquiditätsresilienz.",
    },
    clientType: {
      en: "CCP / Market Infrastructure Provider",
      de: "CCP / Marktinfrastruktur-Anbieter",
    },
    tags: ["T+1", "Settlement", "Post-Trade", "Liquidity"],
    challenge: {
      en: "A European CCP faced pressure to align with accelerated T+1 settlement mandates while managing increased intraday liquidity demands and minimising settlement fails risk across participant segments.",
      de: "Ein europäischer CCP stand unter dem Druck, sich an beschleunigte T+1-Settlement-Vorgaben anzupassen, gleichzeitig erhöhte Intraday-Liquiditätsanforderungen zu bewältigen und das Risiko von Settlement Fails über alle Teilnehmersegmente zu minimieren.",
    },
    approach: {
      en: "We conducted an end-to-end trade lifecycle review across onboarding, affirmation, netting, and settlement finality. We mapped operational bottlenecks using exception data and participant flow analysis, then designed a phased readiness roadmap aligned with regulatory timelines.",
      de: "Wir führten einen End-to-End-Review des Trade-Lifecycles über Onboarding, Affirmation, Netting und Settlement Finality durch. Operative Engpässe wurden anhand von Exception-Daten und Teilnehmerfluss-Analysen kartiert. Daraus entstand eine stufenweise Readiness-Roadmap im Einklang mit regulatorischen Fristen.",
    },
    deliverables: {
      en: [
        "Settlement workflow diagnostic with bottleneck heatmap",
        "Liquidity stress scenarios calibrated to compressed settlement cycle",
        "Operational playbook for participant onboarding under T+1",
        "Governance framework for ongoing settlement quality monitoring",
      ],
      de: [
        "Settlement-Workflow-Diagnose mit Heatmap der Engpässe",
        "Liquiditätsstressszenarien, kalibriert auf den verkürzten Settlement-Zyklus",
        "Operatives Playbook für das Onboarding von Teilnehmern unter T+1",
        "Governance-Rahmen für die laufende Überwachung der Settlement-Qualität",
      ],
    },
    outcomes: {
      en: [
        "Roadmap delivered within 8-week programme timeline",
        "Identified three critical process gaps ahead of regulatory deadline",
        "Playbook adopted across back-office and risk teams",
      ],
      de: [
        "Roadmap innerhalb des 8-wöchigen Programmzeitrahmens geliefert",
        "Drei kritische Prozesslücken vor der regulatorischen Frist identifiziert",
        "Playbook im Back Office und in den Risikoteams etabliert",
      ],
    },
  },
  {
    slug: "emir-fmi-risk-framework",
    title: {
      en: "EMIR and FMI Risk Framework Programs",
      de: "EMIR- und FMI-Risikorahmenwerk-Programme",
    },
    tagline: {
      en: "Supervisory-grade margin and default fund methodology",
      de: "Aufsichtskonforme Margin- und Default-Fund-Methodik",
    },
    summary: {
      en: "Engineering and validation of initial margin and default fund methodologies aligned with EMIR and supervisory requirements.",
      de: "Entwicklung und Validierung von Initial-Margin- und Default-Fund-Methodiken im Einklang mit EMIR und aufsichtlichen Anforderungen.",
    },
    clientType: {
      en: "Central Counterparty (CCP)",
      de: "Zentraler Kontrahent (CCP)",
    },
    tags: ["EMIR", "Initial Margin", "Default Fund", "Model Validation"],
    challenge: {
      en: "A central counterparty required independent review and rebuild of its initial margin and default fund models ahead of a supervisory examination, with full audit trails and model risk documentation required.",
      de: "Ein zentraler Kontrahent benötigte einen unabhängigen Review und Neuaufbau seiner Initial-Margin- und Default-Fund-Modelle im Vorfeld einer aufsichtlichen Prüfung, mit vollständigen Audit Trails und Modellrisiko-Dokumentation.",
    },
    approach: {
      en: "The engagement covered model architecture review, parameter recalibration, independent back-testing, and stress scenario design. We delivered governance documentation aligned with CPMI-IOSCO principles and EMIR RTS requirements.",
      de: "Das Mandat umfasste die Überprüfung der Modellarchitektur, Parameter-Rekalibrierung, unabhängiges Back-Testing und das Design von Stressszenarien. Wir lieferten Governance-Dokumentation im Einklang mit CPMI-IOSCO-Prinzipien und den Anforderungen der EMIR-RTS.",
    },
    deliverables: {
      en: [
        "Model validation report covering IM and default fund methodologies",
        "Recalibrated stress scenarios and lookback period analysis",
        "MRM policy and model inventory documentation",
        "Regulator-ready technical appendix",
      ],
      de: [
        "Modellvalidierungsbericht zu IM- und Default-Fund-Methodiken",
        "Rekalibrierte Stressszenarien und Analyse der Lookback-Perioden",
        "MRM-Policy und Modellinventar-Dokumentation",
        "Aufsichtskonformer technischer Anhang",
      ],
    },
    outcomes: {
      en: [
        "Passed supervisory review with no major findings",
        "Model documentation adopted as the firm's ongoing governance standard",
        "Stress scenario library extended to cover five additional asset classes",
      ],
      de: [
        "Aufsichtliche Prüfung ohne wesentliche Feststellungen bestanden",
        "Modelldokumentation als laufender Governance-Standard des Unternehmens etabliert",
        "Stressszenario-Bibliothek auf fünf zusätzliche Anlageklassen erweitert",
      ],
    },
  },
  {
    slug: "banking-book-risk-transformation",
    title: {
      en: "Banking Book Risk Transformation",
      de: "Transformation des Bankbuch-Risikos",
    },
    tagline: {
      en: "Integrated IFRS 9, IRRBB, and ICAAP delivery",
      de: "Integrierte Lieferung von IFRS 9, IRRBB und ICAAP",
    },
    summary: {
      en: "Design and implementation of IFRS 9, IRRBB/CSRBB, and integrated ICAAP/ILAAP frameworks with robust governance controls.",
      de: "Konzeption und Umsetzung von IFRS 9, IRRBB/CSRBB sowie integrierten ICAAP/ILAAP-Rahmenwerken mit robusten Governance-Kontrollen.",
    },
    clientType: {
      en: "Mid-Tier Bank",
      de: "Mittelständische Bank",
    },
    tags: ["IFRS 9", "IRRBB", "CSRBB", "ICAAP", "ILAAP", "Basel"],
    challenge: {
      en: "A mid-tier European bank needed to rebuild its banking book risk infrastructure following a regulatory review that identified inadequate model governance, fragmented stress testing, and gaps in IRRBB/CSRBB measurement.",
      de: "Eine mittelständische europäische Bank musste ihre Bankbuch-Risikoinfrastruktur nach einer aufsichtlichen Prüfung neu aufstellen. Diese hatte unzureichende Modellgovernance, fragmentierte Stresstests und Lücken in der IRRBB/CSRBB-Messung festgestellt.",
    },
    approach: {
      en: "We led a cross-functional team covering credit risk modelling (IFRS 9 PD/LGD/EAD), interest rate risk (EVE/NII shocks), and ICAAP capital allocation. The engagement combined model build, governance design, and senior management reporting integration.",
      de: "Wir leiteten ein bereichsübergreifendes Team für Kreditrisikomodellierung (IFRS 9 PD/LGD/EAD), Zinsänderungsrisiko (EVE/NII-Schocks) und ICAAP-Kapitalallokation. Das Mandat verband Modellaufbau, Governance-Design und die Integration des Senior-Management-Reportings.",
    },
    deliverables: {
      en: [
        "Rebuilt IFRS 9 parameter models with stage allocation logic",
        "IRRBB/CSRBB measurement suite with regulatory shock scenarios",
        "Integrated ICAAP capital template aligned with EBA guidelines",
        "Board-level risk appetite statement and limit framework",
      ],
      de: [
        "Neu aufgebaute IFRS-9-Parametermodelle mit Stage-Allokationslogik",
        "IRRBB/CSRBB-Messsuite mit regulatorischen Schockszenarien",
        "Integrierte ICAAP-Kapitalvorlage im Einklang mit den EBA-Leitlinien",
        "Risikoappetit-Statement und Limitrahmen auf Vorstandsebene",
      ],
    },
    outcomes: {
      en: [
        "Regulatory findings closed within six-month remediation window",
        "IFRS 9 provisions recalibrated with audit-ready model documentation",
        "ILAAP submission accepted by supervisory authority without revision",
      ],
      de: [
        "Aufsichtliche Feststellungen innerhalb des sechsmonatigen Remediationsfensters geschlossen",
        "IFRS-9-Risikovorsorge mit prüfungssicherer Modelldokumentation rekalibriert",
        "ILAAP-Einreichung von der Aufsichtsbehörde ohne Überarbeitung akzeptiert",
      ],
    },
  },
  {
    slug: "portfolio-analytics-platform",
    title: {
      en: "Portfolio Analytics Platforms for Asset Managers",
      de: "Portfolio-Analytik-Plattformen für Asset Manager",
    },
    tagline: {
      en: "Production analytics for institutional investment teams",
      de: "Produktive Analytik für institutionelle Investmentteams",
    },
    summary: {
      en: "Delivery of stress, liquidity, attribution, and ESG overlays with scalable analytics and decision-support dashboards.",
      de: "Lieferung von Stress-, Liquiditäts-, Attribution- und ESG-Overlays mit skalierbarer Analytik und entscheidungsunterstützenden Dashboards.",
    },
    clientType: {
      en: "Asset Manager / Institutional Investor",
      de: "Asset Manager / Institutioneller Investor",
    },
    tags: ["Portfolio Analytics", "Attribution", "ESG", "Liquidity", "Python"],
    challenge: {
      en: "An institutional asset manager required a consolidated analytics platform to replace spreadsheet-based attribution, stress, and liquidity reporting that was creating operational risk and limiting investment decision support.",
      de: "Ein institutioneller Asset Manager benötigte eine konsolidierte Analytik-Plattform, um spreadsheetbasiertes Attribution-, Stress- und Liquiditätsreporting abzulösen, das operationelle Risiken erzeugte und die Investmententscheidung einschränkte.",
    },
    approach: {
      en: "We designed and implemented a modular Python-based analytics library covering factor attribution, liquidity scoring, ESG overlay integration, and tail risk stress testing. The platform was integrated with the firm's order management and data warehouse systems.",
      de: "Wir konzipierten und implementierten eine modulare Python-Analytik-Bibliothek für Faktor-Attribution, Liquiditäts-Scoring, ESG-Overlay-Integration und Tail-Risk-Stresstests. Die Plattform wurde mit dem Order-Management- und dem Data-Warehouse-System des Hauses integriert.",
    },
    deliverables: {
      en: [
        "Modular attribution engine (Brinson-Fachler with factor overlay)",
        "Liquidity scoring model calibrated to redemption horizon",
        "ESG integration framework with score normalisation and reporting",
        "Interactive dashboard with portfolio manager drill-down",
      ],
      de: [
        "Modulare Attribution-Engine (Brinson-Fachler mit Faktor-Overlay)",
        "Liquiditäts-Scoring-Modell, kalibriert auf den Rücknahmehorizont",
        "ESG-Integrationsrahmen mit Score-Normalisierung und Reporting",
        "Interaktives Dashboard mit Portfolio-Manager-Drill-down",
      ],
    },
    outcomes: {
      en: [
        "Weekly reporting cycle reduced from 3 days to 4 hours",
        "Platform adopted by three portfolio management desks at go-live",
        "ESG overlay enabled two new mandates with sustainability constraints",
      ],
      de: [
        "Wöchentlicher Reportingzyklus von 3 Tagen auf 4 Stunden reduziert",
        "Plattform von drei Portfolio-Management-Desks zum Go-Live übernommen",
        "ESG-Overlay ermöglichte zwei neue Mandate mit Nachhaltigkeitsvorgaben",
      ],
    },
  },
  {
    slug: "ai-acceleration-capital-markets",
    title: {
      en: "AI Acceleration for Capital Markets",
      de: "KI-Beschleunigung für Kapitalmärkte",
    },
    tagline: {
      en: "From use-case discovery to governed production deployment",
      de: "Von der Use-Case-Identifikation zum kontrollierten Produktiveinsatz",
    },
    summary: {
      en: "Discovery, prototyping, and operationalization of high-value AI use cases with governance and model traceability by design.",
      de: "Identifikation, Prototyping und Operationalisierung hochwertiger KI-Use-Cases mit Governance und Modell-Nachvollziehbarkeit von Anfang an.",
    },
    clientType: {
      en: "Investment Bank / Market Infrastructure",
      de: "Investmentbank / Marktinfrastruktur",
    },
    tags: ["AI", "LLM", "MLOps", "Model Governance", "Capital Markets"],
    challenge: {
      en: "A capital markets firm had identified multiple AI use-case candidates but lacked a structured approach to evaluate feasibility, manage model risk, and transition from prototype to production in a regulated environment.",
      de: "Ein Kapitalmarktunternehmen hatte mehrere KI-Use-Case-Kandidaten identifiziert, verfügte jedoch über keinen strukturierten Ansatz, um Machbarkeit zu bewerten, Modellrisiken zu steuern und in einem regulierten Umfeld vom Prototyp in die Produktion zu überführen.",
    },
    approach: {
      en: "We ran a structured discovery sprint across front office, operations, and risk to prioritise use cases by value and regulatory complexity. For selected use cases, we delivered MVPs with embedded model governance, explainability requirements, and audit logging designed from day one.",
      de: "Wir führten einen strukturierten Discovery-Sprint über Front Office, Operations und Risiko durch, um Use Cases nach Wert und regulatorischer Komplexität zu priorisieren. Für ausgewählte Use Cases lieferten wir MVPs mit eingebetteter Modellgovernance, Anforderungen an Erklärbarkeit und Audit-Logging, von Tag eins an mitgedacht.",
    },
    deliverables: {
      en: [
        "AI use-case register with feasibility and risk scoring",
        "Two production MVPs: trade surveillance alert triage and document extraction",
        "AI model risk policy aligned with EBA/BaFin guidance",
        "MLOps pipeline template with model versioning and drift monitoring",
      ],
      de: [
        "KI-Use-Case-Register mit Machbarkeits- und Risiko-Scoring",
        "Zwei produktive MVPs: Triage von Handelsüberwachungs-Alerts und Dokumentenextraktion",
        "KI-Modellrisiko-Policy im Einklang mit EBA-/BaFin-Vorgaben",
        "MLOps-Pipeline-Template mit Modellversionierung und Drift-Monitoring",
      ],
    },
    outcomes: {
      en: [
        "Trade surveillance MVP reduced false positive rate by 34%",
        "Document extraction use case replaced 2.5 FTE of manual processing",
        "AI governance framework adopted as firm-wide standard",
      ],
      de: [
        "Handelsüberwachungs-MVP reduzierte die Fehlalarmrate um 34 %",
        "Dokumentenextraktions-Use-Case ersetzte 2,5 FTE manueller Bearbeitung",
        "KI-Governance-Rahmen unternehmensweit als Standard etabliert",
      ],
    },
  },
  {
    slug: "ccp-stress-testing-liquidity",
    title: {
      en: "CCP Stress Testing and Liquidity Risk Enhancement",
      de: "CCP-Stresstests und Liquiditätsrisiko-Optimierung",
    },
    tagline: {
      en: "Extreme-but-plausible scenario design for systemic resilience",
      de: "Design extremer, aber plausibler Szenarien für systemische Resilienz",
    },
    summary: {
      en: "Design and calibration of cover-2 stress testing scenarios and liquidity risk metrics for a central counterparty's recovery and resolution planning.",
      de: "Konzeption und Kalibrierung von Cover-2-Stresstestszenarien und Liquiditätsrisiko-Kennzahlen für die Recovery- und Resolution-Planung eines zentralen Kontrahenten.",
    },
    clientType: {
      en: "Central Counterparty (CCP)",
      de: "Zentraler Kontrahent (CCP)",
    },
    tags: ["Stress Testing", "Liquidity Risk", "Cover-2", "Recovery Planning", "CPMI-IOSCO"],
    challenge: {
      en: "Following updates to CPMI-IOSCO guidance, a CCP was required to demonstrate that its stress testing framework reflected current market dynamics and covered extreme-but-plausible scenarios including correlated member defaults and liquidity shortfalls.",
      de: "Nach Aktualisierungen der CPMI-IOSCO-Leitlinien musste ein CCP nachweisen, dass sein Stresstest-Rahmenwerk aktuelle Marktdynamiken abbildet und extreme, aber plausible Szenarien einschließlich korrelierter Teilnehmerausfälle und Liquiditätsengpässe abdeckt.",
    },
    approach: {
      en: "We redesigned the scenario generation methodology, introduced concentration and correlation adjustments to the cover-2 framework, and delivered a liquidity stress tool integrating funding, settlement, and investment liquidity across multiple currencies.",
      de: "Wir gestalteten die Szenariogenerierungs-Methodik neu, führten Konzentrations- und Korrelationsanpassungen im Cover-2-Rahmenwerk ein und lieferten ein Liquiditätsstress-Tool, das Funding-, Settlement- und Investment-Liquidität über mehrere Währungen integriert.",
    },
    deliverables: {
      en: [
        "Redesigned cover-2 scenario library with current market calibration",
        "Intraday liquidity stress model with multi-currency waterfall",
        "Recovery plan financial analysis with trigger mapping",
        "Board reporting pack with executive narrative",
      ],
      de: [
        "Neu gestaltete Cover-2-Szenario-Bibliothek mit aktueller Marktkalibrierung",
        "Intraday-Liquiditätsstressmodell mit Multi-Currency-Wasserfall",
        "Finanzanalyse zum Recovery-Plan mit Trigger-Mapping",
        "Vorstands-Reportingpaket mit Executive Narrative",
      ],
    },
    outcomes: {
      en: [
        "Framework aligned with updated CPMI-IOSCO standards",
        "Liquidity stress model identified previously unmeasured FX concentration risk",
        "Recovery planning documentation approved by supervisory college",
      ],
      de: [
        "Rahmenwerk im Einklang mit den aktualisierten CPMI-IOSCO-Standards",
        "Liquiditätsstressmodell identifizierte zuvor unerfasstes FX-Konzentrationsrisiko",
        "Recovery-Planungsdokumentation vom aufsichtlichen Kollegium genehmigt",
      ],
    },
  },
];

export function getProjectsForLocale(locale: Locale): Project[] {
  return localizedProjects.map((p) => projectForLocale(p, locale));
}

export function getProject(
  slug: string,
  locale: Locale,
): Project | undefined {
  const lp = localizedProjects.find((p) => p.slug === slug);
  return lp ? projectForLocale(lp, locale) : undefined;
}

export function getAllSlugs(): string[] {
  return localizedProjects.map((p) => p.slug);
}

function projectForLocale(p: LocalizedProject, locale: Locale): Project {
  return {
    slug: p.slug,
    title: p.title[locale],
    tagline: p.tagline[locale],
    summary: p.summary[locale],
    clientType: p.clientType[locale],
    tags: p.tags,
    challenge: p.challenge[locale],
    approach: p.approach[locale],
    deliverables: p.deliverables[locale],
    outcomes: p.outcomes[locale],
  };
}
