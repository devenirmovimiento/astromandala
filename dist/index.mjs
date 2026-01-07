import { useState, useCallback, useMemo, useRef, useEffect, createElement } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

// src/components/AstroMandala/AstroMandala.tsx

// src/constants/translations.ts
var TRANSLATIONS = {
  en: {
    // Angle labels
    ASC: "ASC",
    DSC: "DSC",
    MC: "MC",
    IC: "IC",
    // UI labels
    settings: "Settings",
    close: "Close",
    expand: "Expand",
    showSynastry: "Show Synastry (Two Charts)",
    showAspects: "Show Aspects",
    showDegrees: "Show Degrees",
    showHouses: "Show Houses",
    showChart2Houses: "Show Chart 2 Houses",
    showPlanetProjections: "Show Planet Projections",
    showChartInfo: "Show Chart Info Panel",
    includeAnglesInSynastry: "Include AC/MC in Synastry Aspects",
    aspectTypes: "Aspect Types",
    majorAspects: "Major Aspects",
    minorAspects: "Minor Aspects",
    theme: "Theme",
    language: "Language",
    light: "Light",
    dark: "Dark",
    english: "English",
    spanish: "Espa\xF1ol",
    // Aspect names
    conjunction: "Conjunction",
    opposition: "Opposition",
    trine: "Trine",
    square: "Square",
    sextile: "Sextile",
    quincunx: "Quincunx",
    semisextile: "Semisextile",
    semisquare: "Semisquare",
    sesquiquadrate: "Sesquiquadrate",
    quintile: "Quintile",
    biquintile: "Biquintile",
    // Chart labels
    chart1: "Chart 1",
    chart2: "Chart 2",
    innerChart: "Inner Chart",
    outerChart: "Outer Chart",
    // Size labels
    desktop: "Desktop",
    tablet: "Tablet",
    mobile: "Mobile",
    // Legend
    legend: "Legend",
    aspectColors: "Aspect colors",
    // Birth data display
    showBirthData: "Show Birth Data on Chart",
    downloadImage: "Download Image",
    birthDate: "Date",
    birthTime: "Time",
    birthLocation: "Location",
    // Educational mode
    infoMode: "Info Mode",
    infoModeDescription: "Click on any element of the chart to learn more",
    clickToLearnMore: "Click to learn more",
    showMore: "Show more",
    showLess: "Show less",
    element: "Element",
    sign: "Sign",
    house: "House",
    planet: "Planet",
    aspect: "Aspect",
    retrograde: "Retrograde",
    coreTheme: "Core Theme",
    lightQualities: "Light Qualities",
    shadowQualities: "Shadow Aspects",
    questions: "Reflective Questions",
    chartHints: "Chart Hints",
    relatedPositions: "Related Positions",
    aspectsTable: "Aspects",
    inSign: "in",
    inHouse: "in House",
    atDegree: "at",
    isRetrograde: "is retrograde",
    balance: "Balance",
    balanced: "Balanced",
    excess: "Excess",
    lack: "Lack",
    microTip: "Quick Tip",
    keyIdeas: "Key Ideas",
    howItFeels: "How It Feels",
    inNatalChart: "In Natal Chart",
    inTransit: "In Transit",
    notAProblem: "Remember",
    commonPatterns: "Common Patterns",
    examples: "Examples",
    intro: "Introduction",
    learning: "Learning"
  },
  es: {
    // Angle labels
    ASC: "ASC",
    DSC: "DSC",
    MC: "MC",
    IC: "IC",
    // UI labels
    settings: "Configuraci\xF3n",
    close: "Cerrar",
    expand: "Expandir",
    showSynastry: "Mostrar Sinastr\xEDa (Dos Cartas)",
    showAspects: "Mostrar Aspectos",
    showDegrees: "Mostrar Grados",
    showHouses: "Mostrar Casas",
    showChart2Houses: "Mostrar Casas de Carta 2",
    showPlanetProjections: "Mostrar Proyecciones Planetarias",
    showChartInfo: "Mostrar Panel de Info",
    includeAnglesInSynastry: "Incluir AC/MC en Aspectos de Sinastr\xEDa",
    aspectTypes: "Tipos de Aspectos",
    majorAspects: "Aspectos Mayores",
    minorAspects: "Aspectos Menores",
    theme: "Tema",
    language: "Idioma",
    light: "Claro",
    dark: "Oscuro",
    english: "English",
    spanish: "Espa\xF1ol",
    // Aspect names
    conjunction: "Conjunci\xF3n",
    opposition: "Oposici\xF3n",
    trine: "Tr\xEDgono",
    square: "Cuadratura",
    sextile: "Sextil",
    quincunx: "Quincuncio",
    semisextile: "Semisextil",
    semisquare: "Semicuadratura",
    sesquiquadrate: "Sesquicuadratura",
    quintile: "Quintil",
    biquintile: "Biquintil",
    // Chart labels
    chart1: "Carta 1",
    chart2: "Carta 2",
    innerChart: "Carta Interior",
    outerChart: "Carta Exterior",
    // Size labels
    desktop: "Escritorio",
    tablet: "Tableta",
    mobile: "M\xF3vil",
    // Legend
    legend: "Leyenda",
    aspectColors: "Colores de aspectos",
    // Birth data display
    showBirthData: "Mostrar Datos de Nacimiento",
    downloadImage: "Descargar Imagen",
    birthDate: "Fecha",
    birthTime: "Hora",
    birthLocation: "Lugar",
    // Educational mode
    infoMode: "Modo Info",
    infoModeDescription: "Haz clic en cualquier elemento del gr\xE1fico para aprender m\xE1s",
    clickToLearnMore: "Clic para m\xE1s informaci\xF3n",
    showMore: "Ver m\xE1s",
    showLess: "Ver menos",
    element: "Elemento",
    sign: "Signo",
    house: "Casa",
    planet: "Planeta",
    aspect: "Aspecto",
    retrograde: "Retr\xF3grado",
    coreTheme: "Tema Central",
    lightQualities: "Cualidades Luminosas",
    shadowQualities: "Aspectos de Sombra",
    questions: "Preguntas Reflexivas",
    chartHints: "Pistas en la Carta",
    relatedPositions: "Posiciones Relacionadas",
    aspectsTable: "Aspectos",
    inSign: "en",
    inHouse: "en Casa",
    atDegree: "a",
    isRetrograde: "est\xE1 retr\xF3grado",
    balance: "Balance",
    balanced: "Equilibrado",
    excess: "Exceso",
    lack: "Falta",
    microTip: "Tip R\xE1pido",
    keyIdeas: "Ideas Clave",
    howItFeels: "C\xF3mo Se Vive",
    inNatalChart: "En Carta Natal",
    inTransit: "En Tr\xE1nsito",
    notAProblem: "Recordar",
    commonPatterns: "Patrones Comunes",
    examples: "Ejemplos",
    intro: "Introducci\xF3n",
    learning: "Aprendizaje"
  }
};
function getTranslations(language = "en") {
  return TRANSLATIONS[language];
}

// src/constants/information.ts
var infoElementos = {
  agua: {
    id: "agua",
    label: { es: "Agua", en: "Water" },
    title: {
      es: "Agua: emoci\xF3n, v\xEDnculo y memoria",
      en: "Water: emotion, bonding, and memory"
    },
    intro: {
      es: "El elemento Agua describe c\xF3mo sentimos, c\xF3mo nos vinculamos y c\xF3mo nos afecta el mundo emocional. Habla de sensibilidad, intimidad, empat\xEDa y memoria emocional.",
      en: "The Water element describes how we feel, bond, and emotionally experience life. It relates to sensitivity, intimacy, empathy, and emotional memory."
    },
    light: {
      es: [
        "Empat\xEDa y capacidad de contenci\xF3n.",
        "Intuici\xF3n y percepci\xF3n emocional.",
        "Profundidad afectiva y lealtad.",
        "Conexi\xF3n con lo simb\xF3lico y lo imaginario."
      ],
      en: [
        "Empathy and emotional containment.",
        "Strong intuition and emotional perception.",
        "Emotional depth and loyalty.",
        "Connection to symbols and imagination."
      ]
    },
    shadow: {
      es: [
        "Hipersensibilidad y susceptibilidad.",
        "Fusi\xF3n emocional o dependencia.",
        "Evasi\xF3n emocional o idealizaci\xF3n.",
        "Cambios de \xE1nimo intensos."
      ],
      en: [
        "Hypersensitivity and emotional overwhelm.",
        "Emotional fusion or dependency.",
        "Emotional avoidance or idealization.",
        "Intense mood fluctuations."
      ]
    },
    balance: {
      balanced: {
        es: "El Agua equilibrada permite sentir profundamente sin perder l\xEDmites. Hay cuidado, ternura y capacidad de sost\xE9n emocional.",
        en: "Balanced Water allows deep feeling without losing boundaries. There is care, tenderness, and emotional stability."
      },
      excess: {
        es: "El exceso de Agua puede llevar a desborde emocional, dependencia o dificultad para sostener estructura.",
        en: "Excess Water can lead to emotional overwhelm, dependency, or difficulty maintaining structure."
      },
      lack: {
        es: "La falta de Agua puede manifestarse como dificultad para registrar emociones o intimar emocionalmente.",
        en: "Lack of Water may appear as difficulty recognizing emotions or forming emotional intimacy."
      }
    },
    questions: {
      es: [
        "\xBFQu\xE9 emoci\xF3n estoy evitando sentir?",
        "\xBFD\xF3nde necesito poner un l\xEDmite emocional?",
        "\xBFEstoy cuidando o fusion\xE1ndome?"
      ],
      en: [
        "Which emotion am I avoiding?",
        "Where do I need an emotional boundary?",
        "Am I caring or merging?"
      ]
    },
    chartHints: {
      es: [
        "Planetas en C\xE1ncer, Escorpio o Piscis.",
        "\xC9nfasis en casas 4, 8 o 12.",
        "Aspectos fuertes a la Luna o Neptuno."
      ],
      en: [
        "Planets in Cancer, Scorpio, or Pisces.",
        "Emphasis on houses 4, 8, or 12.",
        "Strong aspects to the Moon or Neptune."
      ]
    },
    microTip: {
      es: "Regular el Agua implica cuerpo y pausa: respiraci\xF3n consciente, escritura emocional o contacto con agua.",
      en: "Regulating Water involves body and pause: conscious breathing, emotional writing, or contact with water."
    }
  },
  tierra: {
    id: "tierra",
    label: { es: "Tierra", en: "Earth" },
    title: {
      es: "Tierra: realidad, cuerpo y construcci\xF3n",
      en: "Earth: reality, body, and construction"
    },
    intro: {
      es: "La Tierra representa lo concreto: el cuerpo, los recursos, el trabajo y la capacidad de construir estabilidad.",
      en: "Earth represents the concrete: the body, resources, work, and the ability to build stability."
    },
    light: {
      es: [
        "Constancia y coherencia.",
        "Capacidad de materializar.",
        "Sentido pr\xE1ctico y realismo.",
        "Cuidado del cuerpo y los recursos."
      ],
      en: [
        "Consistency and coherence.",
        "Ability to materialize ideas.",
        "Practical sense and realism.",
        "Care for the body and resources."
      ]
    },
    shadow: {
      es: [
        "Rigidez y miedo al cambio.",
        "Control excesivo o perfeccionismo.",
        "Apego a lo seguro.",
        "Materialismo."
      ],
      en: [
        "Rigidity and fear of change.",
        "Excessive control or perfectionism.",
        "Attachment to security.",
        "Materialism."
      ]
    },
    balance: {
      balanced: {
        es: "La Tierra equilibrada permite construir con flexibilidad y sostener procesos a largo plazo.",
        en: "Balanced Earth allows long-term building with flexibility."
      },
      excess: {
        es: "El exceso de Tierra puede generar estancamiento o resistencia al cambio.",
        en: "Excess Earth can create stagnation or resistance to change."
      },
      lack: {
        es: "La falta de Tierra puede manifestarse como dispersi\xF3n, desorden o dificultad para concretar.",
        en: "Lack of Earth may show as dispersion, disorganization, or difficulty materializing."
      }
    },
    questions: {
      es: [
        "\xBFQu\xE9 acci\xF3n concreta puedo hacer hoy?",
        "\xBFQu\xE9 h\xE1bito me sostiene?",
        "\xBFEstoy evitando cambiar por miedo?"
      ],
      en: [
        "What concrete action can I take today?",
        "Which habit supports me?",
        "Am I avoiding change out of fear?"
      ]
    },
    chartHints: {
      es: [
        "Planetas en Tauro, Virgo o Capricornio.",
        "\xC9nfasis en casas 2, 6 o 10.",
        "Saturno fuerte o aspectado."
      ],
      en: [
        "Planets in Taurus, Virgo, or Capricorn.",
        "Emphasis on houses 2, 6, or 10.",
        "Strong or emphasized Saturn."
      ]
    },
    microTip: {
      es: "La Tierra se fortalece con rutinas simples y acciones peque\xF1as pero sostenidas.",
      en: "Earth is strengthened through simple routines and small, consistent actions."
    }
  },
  fuego: {
    id: "fuego",
    label: { es: "Fuego", en: "Fire" },
    title: {
      es: "Fuego: deseo, vitalidad y direcci\xF3n",
      en: "Fire: desire, vitality, and direction"
    },
    intro: {
      es: "El Fuego representa el impulso vital, la motivaci\xF3n, el deseo y la capacidad de afirmarse.",
      en: "Fire represents vital impulse, motivation, desire, and self-assertion."
    },
    light: {
      es: [
        "Entusiasmo y coraje.",
        "Iniciativa y liderazgo.",
        "Creatividad y confianza.",
        "Capacidad de inspirar."
      ],
      en: [
        "Enthusiasm and courage.",
        "Initiative and leadership.",
        "Creativity and confidence.",
        "Ability to inspire."
      ]
    },
    shadow: {
      es: [
        "Impulsividad y reactividad.",
        "Egocentrismo o ansiedad.",
        "Exceso de intensidad.",
        "Poca tolerancia a la frustraci\xF3n."
      ],
      en: [
        "Impulsiveness and reactivity.",
        "Ego inflation or anxiety.",
        "Excessive intensity.",
        "Low frustration tolerance."
      ]
    },
    balance: {
      balanced: {
        es: "El Fuego equilibrado impulsa la acci\xF3n con conciencia y prop\xF3sito.",
        en: "Balanced Fire drives action with awareness and purpose."
      },
      excess: {
        es: "El exceso de Fuego puede generar agotamiento o conflicto.",
        en: "Excess Fire may lead to burnout or conflict."
      },
      lack: {
        es: "La falta de Fuego se expresa como apat\xEDa, duda o dificultad para iniciar.",
        en: "Lack of Fire appears as apathy, doubt, or difficulty initiating."
      }
    },
    questions: {
      es: [
        "\xBFQu\xE9 deseo es aut\xE9ntico?",
        "\xBFQu\xE9 me enciende?",
        "\xBFD\xF3nde necesito animarme?"
      ],
      en: [
        "Which desire is authentic?",
        "What ignites me?",
        "Where do I need courage?"
      ]
    },
    chartHints: {
      es: [
        "Planetas en Aries, Leo o Sagitario.",
        "\xC9nfasis en casas 1, 5 o 9.",
        "Sol, Marte o J\xFApiter destacados."
      ],
      en: [
        "Planets in Aries, Leo, or Sagittarius.",
        "Emphasis on houses 1, 5, or 9.",
        "Strong Sun, Mars, or Jupiter."
      ]
    },
    microTip: {
      es: "El Fuego necesita movimiento y direcci\xF3n: acci\xF3n breve con intenci\xF3n clara.",
      en: "Fire needs movement and direction: short action with clear intention."
    }
  },
  aire: {
    id: "aire",
    label: { es: "Aire", en: "Air" },
    title: {
      es: "Aire: mente, ideas y comunicaci\xF3n",
      en: "Air: mind, ideas, and communication"
    },
    intro: {
      es: "El Aire representa el pensamiento, la palabra, el intercambio y la capacidad de tomar perspectiva.",
      en: "Air represents thinking, language, exchange, and perspective."
    },
    light: {
      es: [
        "Agilidad mental y curiosidad.",
        "Comunicaci\xF3n clara.",
        "Capacidad de vincular ideas.",
        "Objetividad."
      ],
      en: [
        "Mental agility and curiosity.",
        "Clear communication.",
        "Ability to connect ideas.",
        "Objectivity."
      ]
    },
    shadow: {
      es: [
        "Exceso de pensamiento.",
        "Dispersi\xF3n o inconstancia.",
        "Intelectualizaci\xF3n de la emoci\xF3n.",
        "Par\xE1lisis por an\xE1lisis."
      ],
      en: [
        "Overthinking.",
        "Dispersion or inconsistency.",
        "Intellectualizing emotions.",
        "Analysis paralysis."
      ]
    },
    balance: {
      balanced: {
        es: "El Aire equilibrado permite pensar, comunicar y decidir con claridad.",
        en: "Balanced Air allows thinking, communicating, and deciding with clarity."
      },
      excess: {
        es: "El exceso de Aire puede generar ansiedad mental o desconexi\xF3n emocional.",
        en: "Excess Air may create mental anxiety or emotional disconnection."
      },
      lack: {
        es: "La falta de Aire se manifiesta como confusi\xF3n o dificultad para expresarse.",
        en: "Lack of Air appears as confusion or difficulty expressing oneself."
      }
    },
    questions: {
      es: [
        "\xBFQu\xE9 historia me estoy contando?",
        "\xBFQu\xE9 conversaci\xF3n necesito tener?",
        "\xBFQu\xE9 decisi\xF3n estoy postergando?"
      ],
      en: [
        "What story am I telling myself?",
        "Which conversation do I need to have?",
        "Which decision am I postponing?"
      ]
    },
    chartHints: {
      es: [
        "Planetas en G\xE9minis, Libra o Acuario.",
        "\xC9nfasis en casas 3, 7 u 11.",
        "Mercurio o Urano destacados."
      ],
      en: [
        "Planets in Gemini, Libra, or Aquarius.",
        "Emphasis on houses 3, 7, or 11.",
        "Strong Mercury or Uranus."
      ]
    },
    microTip: {
      es: "El Aire se ordena escribiendo y eligiendo una idea para accionar.",
      en: "Air is organized by writing and choosing one idea to act on."
    }
  }
};
var infoSignos = {
  aries: {
    id: "aries",
    label: { es: "Aries", en: "Aries" },
    element: "fire",
    modality: "cardinal",
    coreTheme: {
      es: "Iniciar, afirmarse, existir",
      en: "Initiation, self-assertion, existence"
    },
    light: {
      es: ["Coraje", "Iniciativa", "Acci\xF3n directa"],
      en: ["Courage", "Initiative", "Direct action"]
    },
    shadow: {
      es: ["Impulsividad", "Reactividad", "Falta de paciencia"],
      en: ["Impulsiveness", "Reactivity", "Lack of patience"]
    },
    learning: {
      es: "Aprender a sostener el impulso sin quemarse ni atropellar.",
      en: "Learning to sustain impulse without burning out or overpowering."
    },
    questions: {
      es: ["\xBFQu\xE9 quiero iniciar?", "\xBFDesde d\xF3nde act\xFAo?"],
      en: ["What do I want to start?", "From where do I act?"]
    },
    chartHint: {
      es: "Zona de deseo, acci\xF3n y liderazgo.",
      en: "Area of desire, action, and leadership."
    }
  },
  tauro: {
    id: "tauro",
    label: { es: "Tauro", en: "Taurus" },
    element: "earth",
    modality: "fixed",
    coreTheme: {
      es: "Sostener, valorar, construir seguridad",
      en: "Sustain, value, build security"
    },
    light: {
      es: ["Constancia", "Paciencia", "Capacidad de disfrute"],
      en: ["Consistency", "Patience", "Ability to enjoy"]
    },
    shadow: {
      es: ["Rigidez", "Apego", "Resistencia al cambio"],
      en: ["Rigidity", "Attachment", "Resistance to change"]
    },
    learning: {
      es: "Aprender a soltar sin perder estabilidad.",
      en: "Learning to let go without losing stability."
    },
    questions: {
      es: ["\xBFQu\xE9 me da seguridad real?", "\xBFQu\xE9 necesito actualizar?"],
      en: ["What gives me real security?", "What needs to be updated?"]
    },
    chartHint: {
      es: "Relaci\xF3n con valores, recursos y cuerpo.",
      en: "Relationship with values, resources, and the body."
    }
  },
  geminis: {
    id: "geminis",
    label: { es: "G\xE9minis", en: "Gemini" },
    element: "air",
    modality: "mutable",
    coreTheme: {
      es: "Aprender, comunicar, conectar",
      en: "Learn, communicate, connect"
    },
    light: {
      es: ["Curiosidad", "Agilidad mental", "Adaptabilidad"],
      en: ["Curiosity", "Mental agility", "Adaptability"]
    },
    shadow: {
      es: ["Dispersi\xF3n", "Superficialidad", "Inconstancia"],
      en: ["Dispersion", "Superficiality", "Inconsistency"]
    },
    learning: {
      es: "Aprender a profundizar y sostener foco.",
      en: "Learning to deepen and maintain focus."
    },
    questions: {
      es: ["\xBFQu\xE9 necesito integrar?", "\xBFQu\xE9 conversaci\xF3n es clave?"],
      en: ["What do I need to integrate?", "Which conversation is key?"]
    },
    chartHint: {
      es: "Zona de estudio, intercambio y v\xEDnculos cercanos.",
      en: "Area of learning, exchange, and close connections."
    }
  },
  cancer: {
    id: "cancer",
    label: { es: "C\xE1ncer", en: "Cancer" },
    element: "water",
    modality: "cardinal",
    coreTheme: {
      es: "Cuidar, proteger, pertenecer",
      en: "Care, protect, belong"
    },
    light: {
      es: ["Empat\xEDa", "Contenci\xF3n", "Sensibilidad"],
      en: ["Empathy", "Nurturing", "Sensitivity"]
    },
    shadow: {
      es: ["Apego", "Dependencia emocional", "Miedo a la p\xE9rdida"],
      en: ["Attachment", "Emotional dependency", "Fear of loss"]
    },
    learning: {
      es: "Aprender a cuidar sin anularse.",
      en: "Learning to care without self-neglect."
    },
    questions: {
      es: ["\xBFD\xF3nde busco seguridad?", "\xBFQu\xE9 emoci\xF3n pide lugar?"],
      en: ["Where do I seek safety?", "Which emotion needs space?"]
    },
    chartHint: {
      es: "Zona de ra\xEDces, familia y mundo emocional.",
      en: "Area of roots, family, and emotional world."
    }
  },
  leo: {
    id: "leo",
    label: { es: "Leo", en: "Leo" },
    element: "fire",
    modality: "fixed",
    coreTheme: {
      es: "Brillar, crear, expresar identidad",
      en: "Shine, create, express identity"
    },
    light: {
      es: ["Creatividad", "Confianza", "Calidez"],
      en: ["Creativity", "Confidence", "Warmth"]
    },
    shadow: {
      es: ["Egocentrismo", "Necesidad de reconocimiento", "Orgullo r\xEDgido"],
      en: ["Egocentrism", "Need for validation", "Rigid pride"]
    },
    learning: {
      es: "Aprender a brillar desde adentro.",
      en: "Learning to shine from within."
    },
    questions: {
      es: ["\xBFDesde d\xF3nde me expreso?", "\xBFQu\xE9 me hace sentir vivx?"],
      en: ["From where do I express myself?", "What makes me feel alive?"]
    },
    chartHint: {
      es: "Zona de creatividad, autoestima y expresi\xF3n personal.",
      en: "Area of creativity, self-worth, and personal expression."
    }
  },
  virgo: {
    id: "virgo",
    label: { es: "Virgo", en: "Virgo" },
    element: "earth",
    modality: "mutable",
    coreTheme: {
      es: "Ordenar, mejorar, servir",
      en: "Organize, improve, serve"
    },
    light: {
      es: ["Discernimiento", "Precisi\xF3n", "Capacidad de servicio"],
      en: ["Discernment", "Precision", "Service orientation"]
    },
    shadow: {
      es: ["Autoexigencia", "Cr\xEDtica excesiva", "Perfeccionismo"],
      en: ["Self-criticism", "Excessive criticism", "Perfectionism"]
    },
    learning: {
      es: "Aprender a aceptar la imperfecci\xF3n.",
      en: "Learning to accept imperfection."
    },
    questions: {
      es: ["\xBFQu\xE9 puedo mejorar sin exigirme?", "\xBFQu\xE9 necesita orden?"],
      en: ["What can I improve gently?", "What needs organizing?"]
    },
    chartHint: {
      es: "Zona de h\xE1bitos, trabajo y cuidado del cuerpo.",
      en: "Area of habits, work, and body care."
    }
  },
  libra: {
    id: "libra",
    label: { es: "Libra", en: "Libra" },
    element: "air",
    modality: "cardinal",
    coreTheme: {
      es: "Vincular, equilibrar, armonizar",
      en: "Relate, balance, harmonize"
    },
    light: {
      es: ["Diplomacia", "Empat\xEDa mental", "Sentido de justicia"],
      en: ["Diplomacy", "Mental empathy", "Sense of justice"]
    },
    shadow: {
      es: ["Indecisi\xF3n", "Complacencia", "Evitar el conflicto"],
      en: ["Indecision", "People-pleasing", "Conflict avoidance"]
    },
    learning: {
      es: "Aprender a elegir sin perder el v\xEDnculo.",
      en: "Learning to choose without losing connection."
    },
    questions: {
      es: ["\xBFQu\xE9 deseo realmente?", "\xBFD\xF3nde no me estoy eligiendo?"],
      en: ["What do I truly want?", "Where am I not choosing myself?"]
    },
    chartHint: {
      es: "Zona de v\xEDnculos, acuerdos y proyecci\xF3n en el otro.",
      en: "Area of relationships, agreements, and projection."
    }
  },
  escorpio: {
    id: "escorpio",
    label: { es: "Escorpio", en: "Scorpio" },
    element: "water",
    modality: "fixed",
    coreTheme: {
      es: "Transformar, profundizar, regenerar",
      en: "Transform, deepen, regenerate"
    },
    light: {
      es: ["Intensidad", "Capacidad de transformaci\xF3n", "Lealtad profunda"],
      en: ["Intensity", "Transformational capacity", "Deep loyalty"]
    },
    shadow: {
      es: ["Control", "Celos", "Miedo a la p\xE9rdida"],
      en: ["Control", "Jealousy", "Fear of loss"]
    },
    learning: {
      es: "Aprender a soltar el control y confiar.",
      en: "Learning to release control and trust."
    },
    questions: {
      es: ["\xBFQu\xE9 necesito soltar?", "\xBFD\xF3nde me resisto al cambio?"],
      en: ["What do I need to release?", "Where do I resist change?"]
    },
    chartHint: {
      es: "Zona de crisis, transformaci\xF3n y poder personal.",
      en: "Area of crisis, transformation, and personal power."
    }
  },
  sagitario: {
    id: "sagitario",
    label: { es: "Sagitario", en: "Sagittarius" },
    element: "fire",
    modality: "mutable",
    coreTheme: {
      es: "Expandir, creer, buscar sentido",
      en: "Expand, believe, seek meaning"
    },
    light: {
      es: ["Optimismo", "Visi\xF3n", "Esp\xEDritu aventurero"],
      en: ["Optimism", "Vision", "Adventurous spirit"]
    },
    shadow: {
      es: ["Exceso de confianza", "Dogmatismo", "Falta de l\xEDmites"],
      en: ["Overconfidence", "Dogmatism", "Lack of boundaries"]
    },
    learning: {
      es: "Aprender a integrar visi\xF3n con responsabilidad.",
      en: "Learning to integrate vision with responsibility."
    },
    questions: {
      es: ["\xBFQu\xE9 sentido busco?", "\xBFQu\xE9 creencia necesita revisi\xF3n?"],
      en: ["What meaning am I seeking?", "Which belief needs revision?"]
    },
    chartHint: {
      es: "Zona de expansi\xF3n, creencias y b\xFAsqueda de sentido.",
      en: "Area of expansion, beliefs, and meaning."
    }
  },
  capricornio: {
    id: "capricornio",
    label: { es: "Capricornio", en: "Capricorn" },
    element: "earth",
    modality: "cardinal",
    coreTheme: {
      es: "Construir, responsabilizarse, madurar",
      en: "Build, take responsibility, mature"
    },
    light: {
      es: ["Disciplina", "Responsabilidad", "Capacidad de logro"],
      en: ["Discipline", "Responsibility", "Capacity for achievement"]
    },
    shadow: {
      es: ["Rigidez", "Autoexigencia extrema", "Desconexi\xF3n emocional"],
      en: ["Rigidity", "Extreme self-demand", "Emotional disconnection"]
    },
    learning: {
      es: "Aprender a incluir sensibilidad en la ambici\xF3n.",
      en: "Learning to include sensitivity within ambition."
    },
    questions: {
      es: ["\xBFQu\xE9 meta es aut\xE9ntica?", "\xBFQu\xE9 carga no me corresponde?"],
      en: ["Which goal is authentic?", "Which burden is not mine?"]
    },
    chartHint: {
      es: "Zona de metas, vocaci\xF3n y estructura.",
      en: "Area of goals, vocation, and structure."
    }
  },
  acuario: {
    id: "acuario",
    label: { es: "Acuario", en: "Aquarius" },
    element: "air",
    modality: "fixed",
    coreTheme: {
      es: "Liberar, innovar, diferenciarse",
      en: "Liberate, innovate, differentiate"
    },
    light: {
      es: ["Originalidad", "Visi\xF3n colectiva", "Independencia"],
      en: ["Originality", "Collective vision", "Independence"]
    },
    shadow: {
      es: ["Desapego extremo", "Rebeld\xEDa reactiva", "Rigidez mental"],
      en: ["Emotional detachment", "Reactive rebellion", "Mental rigidity"]
    },
    learning: {
      es: "Aprender a integrar emoci\xF3n y pertenencia.",
      en: "Learning to integrate emotion and belonging."
    },
    questions: {
      es: ["\xBFD\xF3nde necesito ser aut\xE9nticx?", "\xBFQu\xE9 me diferencia?"],
      en: ["Where do I need to be authentic?", "What makes me different?"]
    },
    chartHint: {
      es: "Zona de grupos, futuro y conciencia colectiva.",
      en: "Area of groups, future, and collective awareness."
    }
  },
  piscis: {
    id: "piscis",
    label: { es: "Piscis", en: "Pisces" },
    element: "water",
    modality: "mutable",
    coreTheme: {
      es: "Disolver, empatizar, trascender",
      en: "Dissolve, empathize, transcend"
    },
    light: {
      es: ["Compasi\xF3n", "Sensibilidad espiritual", "Imaginaci\xF3n"],
      en: ["Compassion", "Spiritual sensitivity", "Imagination"]
    },
    shadow: {
      es: ["Evasi\xF3n", "Confusi\xF3n", "L\xEDmites difusos"],
      en: ["Escapism", "Confusion", "Blurred boundaries"]
    },
    learning: {
      es: "Aprender a poner l\xEDmites sin perder sensibilidad.",
      en: "Learning to set boundaries without losing sensitivity."
    },
    questions: {
      es: ["\xBFQu\xE9 estoy evitando?", "\xBFD\xF3nde necesito anclarme?"],
      en: ["What am I avoiding?", "Where do I need grounding?"]
    },
    chartHint: {
      es: "Zona de espiritualidad, inconsciente y entrega.",
      en: "Area of spirituality, unconscious, and surrender."
    }
  }
};
var infoCasas = {
  casa1: {
    id: 1,
    label: { es: "Casa 1", en: "House 1" },
    coreTheme: {
      es: "Identidad, inicio, presencia",
      en: "Identity, beginnings, presence"
    },
    intro: {
      es: "La Casa 1 habla de c\xF3mo iniciamos la vida y c\xF3mo nos presentamos al mundo. Describe la identidad visible, el temperamento y la forma espont\xE1nea de actuar.",
      en: "House 1 describes how we begin life and present ourselves to the world. It reflects visible identity, temperament, and spontaneous behavior."
    },
    light: {
      es: ["Autenticidad", "Iniciativa", "Vitalidad"],
      en: ["Authenticity", "Initiative", "Vitality"]
    },
    shadow: {
      es: ["Egocentrismo", "Reactividad", "Impulsividad"],
      en: ["Egocentrism", "Reactivity", "Impulsiveness"]
    },
    questions: {
      es: ["\xBFQui\xE9n soy cuando empiezo algo?", "\xBFC\xF3mo me muestro?"],
      en: ["Who am I when I start something?", "How do I show myself?"]
    }
  },
  casa2: {
    id: 2,
    label: { es: "Casa 2", en: "House 2" },
    coreTheme: {
      es: "Recursos, valor, seguridad",
      en: "Resources, value, security"
    },
    intro: {
      es: "La Casa 2 se relaciona con los recursos materiales y simb\xF3licos. Habla del dinero, la autoestima y aquello que sentimos como propio.",
      en: "House 2 relates to material and symbolic resources. It speaks of money, self-worth, and what we consider ours."
    },
    light: {
      es: ["Autovaloraci\xF3n", "Estabilidad", "Capacidad de sost\xE9n"],
      en: ["Self-worth", "Stability", "Ability to sustain"]
    },
    shadow: {
      es: ["Apego", "Miedo a la carencia", "Materialismo"],
      en: ["Attachment", "Fear of scarcity", "Materialism"]
    },
    questions: {
      es: ["\xBFQu\xE9 valoro?", "\xBFQu\xE9 me da seguridad?"],
      en: ["What do I value?", "What gives me security?"]
    }
  },
  casa3: {
    id: 3,
    label: { es: "Casa 3", en: "House 3" },
    coreTheme: {
      es: "Comunicaci\xF3n, aprendizaje, entorno cercano",
      en: "Communication, learning, close environment"
    },
    intro: {
      es: "La Casa 3 representa la mente concreta, el intercambio cotidiano, el aprendizaje temprano y la forma de comunicar.",
      en: "House 3 represents practical thinking, daily exchange, early learning, and communication style."
    },
    light: {
      es: ["Curiosidad", "Capacidad de aprendizaje", "Intercambio fluido"],
      en: ["Curiosity", "Learning ability", "Fluid exchange"]
    },
    shadow: {
      es: ["Dispersi\xF3n", "Superficialidad", "Ruido mental"],
      en: ["Dispersion", "Superficiality", "Mental noise"]
    },
    questions: {
      es: ["\xBFC\xF3mo me comunico?", "\xBFQu\xE9 necesito aprender?"],
      en: ["How do I communicate?", "What do I need to learn?"]
    }
  },
  casa4: {
    id: 4,
    label: { es: "Casa 4", en: "House 4" },
    coreTheme: {
      es: "Ra\xEDces, hogar, base emocional",
      en: "Roots, home, emotional foundation"
    },
    intro: {
      es: "La Casa 4 habla del origen, la familia, la infancia y la base emocional desde la cual nos construimos.",
      en: "House 4 speaks of origin, family, childhood, and the emotional base from which we build ourselves."
    },
    light: {
      es: ["Contenci\xF3n", "Pertenencia", "Intimidad"],
      en: ["Emotional support", "Belonging", "Intimacy"]
    },
    shadow: {
      es: ["Apego", "Dependencia emocional", "Encierro"],
      en: ["Attachment", "Emotional dependency", "Withdrawal"]
    },
    questions: {
      es: ["\xBFD\xF3nde me siento en casa?", "\xBFQu\xE9 necesito cuidar?"],
      en: ["Where do I feel at home?", "What needs care?"]
    }
  },
  casa5: {
    id: 5,
    label: { es: "Casa 5", en: "House 5" },
    coreTheme: {
      es: "Creatividad, disfrute, expresi\xF3n personal",
      en: "Creativity, pleasure, self-expression"
    },
    intro: {
      es: "La Casa 5 se vincula con la expresi\xF3n del yo, la creatividad, el juego, el romance y la capacidad de disfrutar.",
      en: "House 5 relates to self-expression, creativity, play, romance, and enjoyment."
    },
    light: {
      es: ["Creatividad", "Alegr\xEDa", "Autoexpresi\xF3n"],
      en: ["Creativity", "Joy", "Self-expression"]
    },
    shadow: {
      es: ["Egocentrismo", "B\xFAsqueda de aprobaci\xF3n", "Exceso de dramatismo"],
      en: ["Egocentrism", "Need for approval", "Excess drama"]
    },
    questions: {
      es: ["\xBFQu\xE9 me da placer?", "\xBFDesde d\xF3nde me expreso?"],
      en: ["What brings me pleasure?", "From where do I express myself?"]
    }
  },
  casa6: {
    id: 6,
    label: { es: "Casa 6", en: "House 6" },
    coreTheme: {
      es: "Trabajo, h\xE1bitos, servicio",
      en: "Work, habits, service"
    },
    intro: {
      es: "La Casa 6 habla del trabajo cotidiano, la organizaci\xF3n, la salud y la relaci\xF3n con el servicio y la utilidad.",
      en: "House 6 speaks of daily work, organization, health, and service."
    },
    light: {
      es: ["Disciplina", "Responsabilidad", "Capacidad de mejora"],
      en: ["Discipline", "Responsibility", "Ability to improve"]
    },
    shadow: {
      es: ["Autoexigencia", "Rutina opresiva", "Desgaste"],
      en: ["Overwork", "Oppressive routine", "Burnout"]
    },
    questions: {
      es: ["\xBFC\xF3mo me organizo?", "\xBFQu\xE9 necesita ajuste?"],
      en: ["How do I organize myself?", "What needs adjustment?"]
    }
  },
  casa7: {
    id: 7,
    label: { es: "Casa 7", en: "House 7" },
    coreTheme: {
      es: "V\xEDnculos, pareja, el otro",
      en: "Relationships, partnership, the other"
    },
    intro: {
      es: "La Casa 7 representa las relaciones significativas y aquello que proyectamos en el otro.",
      en: "House 7 represents significant relationships and what we project onto others."
    },
    light: {
      es: ["Cooperaci\xF3n", "Complementariedad", "Di\xE1logo"],
      en: ["Cooperation", "Complementarity", "Dialogue"]
    },
    shadow: {
      es: ["Dependencia", "Proyecci\xF3n", "Conflictos relacionales"],
      en: ["Dependency", "Projection", "Relational conflict"]
    },
    questions: {
      es: ["\xBFQu\xE9 busco en el otro?", "\xBFQu\xE9 proyecto?"],
      en: ["What do I seek in others?", "What do I project?"]
    }
  },
  casa8: {
    id: 8,
    label: { es: "Casa 8", en: "House 8" },
    coreTheme: {
      es: "Transformaci\xF3n, intimidad, poder",
      en: "Transformation, intimacy, power"
    },
    intro: {
      es: "La Casa 8 se asocia a los procesos de crisis, muerte y renacimiento simb\xF3lico, as\xED como a los recursos compartidos.",
      en: "House 8 is linked to crisis, symbolic death and rebirth, and shared resources."
    },
    light: {
      es: ["Profundidad", "Capacidad de transformaci\xF3n", "Intimidad real"],
      en: ["Depth", "Transformational ability", "True intimacy"]
    },
    shadow: {
      es: ["Control", "Miedo a perder", "Manipulaci\xF3n"],
      en: ["Control", "Fear of loss", "Manipulation"]
    },
    questions: {
      es: ["\xBFQu\xE9 necesito soltar?", "\xBFD\xF3nde me transformo?"],
      en: ["What do I need to release?", "Where do I transform?"]
    }
  },
  casa9: {
    id: 9,
    label: { es: "Casa 9", en: "House 9" },
    coreTheme: {
      es: "Sentido, creencias, expansi\xF3n",
      en: "Meaning, beliefs, expansion"
    },
    intro: {
      es: "La Casa 9 habla de la b\xFAsqueda de sentido, la filosof\xEDa de vida, los viajes y la expansi\xF3n de conciencia.",
      en: "House 9 speaks of the search for meaning, life philosophy, travel, and expansion of consciousness."
    },
    light: {
      es: ["Visi\xF3n", "Fe", "Apertura mental"],
      en: ["Vision", "Faith", "Open-mindedness"]
    },
    shadow: {
      es: ["Dogmatismo", "Exceso de idealismo", "Falta de l\xEDmites"],
      en: ["Dogmatism", "Excessive idealism", "Lack of limits"]
    },
    questions: {
      es: ["\xBFQu\xE9 sentido le doy a mi vida?", "\xBFQu\xE9 creencia reviso?"],
      en: ["What meaning do I give my life?", "Which belief needs review?"]
    }
  },
  casa10: {
    id: 10,
    label: { es: "Casa 10", en: "House 10" },
    coreTheme: {
      es: "Vocaci\xF3n, rol social, prop\xF3sito",
      en: "Vocation, social role, purpose"
    },
    intro: {
      es: "La Casa 10 se vincula con la vocaci\xF3n, la imagen p\xFAblica y el lugar que ocupamos en la sociedad.",
      en: "House 10 relates to vocation, public image, and our place in society."
    },
    light: {
      es: ["Responsabilidad", "Ambici\xF3n consciente", "Autoridad interna"],
      en: ["Responsibility", "Conscious ambition", "Inner authority"]
    },
    shadow: {
      es: ["Rigidez", "Exceso de control", "Desconexi\xF3n emocional"],
      en: ["Rigidity", "Excess control", "Emotional disconnection"]
    },
    questions: {
      es: ["\xBFQu\xE9 quiero construir?", "\xBFQu\xE9 rol asumo?"],
      en: ["What do I want to build?", "Which role do I assume?"]
    }
  },
  casa11: {
    id: 11,
    label: { es: "Casa 11", en: "House 11" },
    coreTheme: {
      es: "Grupos, futuro, visi\xF3n colectiva",
      en: "Groups, future, collective vision"
    },
    intro: {
      es: "La Casa 11 se relaciona con los grupos, las redes, los proyectos a futuro y la conciencia colectiva.",
      en: "House 11 relates to groups, networks, future projects, and collective awareness."
    },
    light: {
      es: ["Cooperaci\xF3n", "Innovaci\xF3n", "Visi\xF3n compartida"],
      en: ["Cooperation", "Innovation", "Shared vision"]
    },
    shadow: {
      es: ["Desapego", "Idealizaci\xF3n de grupos", "Rigidez ideol\xF3gica"],
      en: ["Detachment", "Group idealization", "Ideological rigidity"]
    },
    questions: {
      es: ["\xBFCon qui\xE9n construyo futuro?", "\xBFQu\xE9 aporto al colectivo?"],
      en: ["With whom do I build the future?", "What do I contribute to the collective?"]
    }
  },
  casa12: {
    id: 12,
    label: { es: "Casa 12", en: "House 12" },
    coreTheme: {
      es: "Inconsciente, cierre, trascendencia",
      en: "Unconscious, closure, transcendence"
    },
    intro: {
      es: "La Casa 12 habla de lo invisible, el inconsciente, los finales de ciclo y la entrega.",
      en: "House 12 speaks of the invisible, the unconscious, cycle endings, and surrender."
    },
    light: {
      es: ["Compasi\xF3n", "Sensibilidad espiritual", "Capacidad de cierre"],
      en: ["Compassion", "Spiritual sensitivity", "Ability to close cycles"]
    },
    shadow: {
      es: ["Evasi\xF3n", "Confusi\xF3n", "Sacrificio inconsciente"],
      en: ["Escapism", "Confusion", "Unconscious sacrifice"]
    },
    questions: {
      es: ["\xBFQu\xE9 necesito soltar?", "\xBFQu\xE9 ciclo se cierra?"],
      en: ["What do I need to release?", "Which cycle is ending?"]
    }
  }
};
var infoCuerpos = {
  sol: {
    id: "sun",
    label: { es: "Sol", en: "Sun" },
    category: "planet",
    coreTheme: {
      es: "Identidad, voluntad, prop\xF3sito",
      en: "Identity, will, purpose"
    },
    intro: {
      es: "El Sol describe el centro de gravedad de la personalidad: lo que ven\xEDs a desarrollar, sostener y expresar. Habla de voluntad, vitalidad y direcci\xF3n.",
      en: "The Sun describes the center of gravity of the personality: what you\u2019re here to develop, sustain, and express. It speaks to will, vitality, and direction."
    },
    light: {
      es: ["Claridad de prop\xF3sito", "Confianza", "Creatividad", "Liderazgo interno"],
      en: ["Clarity of purpose", "Confidence", "Creativity", "Inner leadership"]
    },
    shadow: {
      es: ["Orgullo r\xEDgido", "Necesidad de reconocimiento", "Ego defensivo", "Autoimagen fr\xE1gil"],
      en: ["Rigid pride", "Need for validation", "Defensive ego", "Fragile self-image"]
    },
    questions: {
      es: ["\xBFQu\xE9 quiero ser y sostener?", "\xBFD\xF3nde pongo mi energ\xEDa vital?"],
      en: ["What do I want to become and sustain?", "Where do I place my vital energy?"]
    },
    chartHint: {
      es: "El signo muestra el estilo de identidad; la casa, el \xE1rea donde brill\xE1s y te afirm\xE1s; los aspectos, c\xF3mo se integra tu voluntad.",
      en: "The sign shows identity style; the house shows where you shine and assert yourself; aspects show how your will integrates."
    }
  },
  luna: {
    id: "moon",
    label: { es: "Luna", en: "Moon" },
    category: "planet",
    coreTheme: {
      es: "Emoci\xF3n, necesidad, seguridad",
      en: "Emotion, needs, security"
    },
    intro: {
      es: "La Luna representa el mundo emocional, las necesidades b\xE1sicas y c\xF3mo buscamos seguridad. Tambi\xE9n habla de h\xE1bitos afectivos y memoria.",
      en: "The Moon represents the emotional world, basic needs, and how we seek safety. It also speaks to emotional habits and memory."
    },
    light: {
      es: ["Empat\xEDa", "Contenci\xF3n", "Intuici\xF3n", "Capacidad de nutrir"],
      en: ["Empathy", "Nurturing", "Intuition", "Ability to nourish"]
    },
    shadow: {
      es: ["Reactividad emocional", "Apego", "Dependencia", "Cambios de \xE1nimo intensos"],
      en: ["Emotional reactivity", "Attachment", "Dependency", "Intense mood swings"]
    },
    questions: {
      es: ["\xBFQu\xE9 necesito para sentirme segurx?", "\xBFQu\xE9 emoci\xF3n pide ser escuchada?"],
      en: ["What do I need to feel safe?", "Which emotion needs to be heard?"]
    },
    chartHint: {
      es: "El signo muestra tu estilo emocional; la casa, d\xF3nde busc\xE1s refugio; los aspectos, qu\xE9 tan f\xE1cil o complejo es regularte.",
      en: "The sign shows your emotional style; the house shows where you seek refuge; aspects show how easy or complex regulation is."
    }
  },
  mercurio: {
    id: "mercury",
    label: { es: "Mercurio", en: "Mercury" },
    category: "planet",
    coreTheme: {
      es: "Mente, lenguaje, aprendizaje",
      en: "Mind, language, learning"
    },
    intro: {
      es: "Mercurio describe c\xF3mo pens\xE1s, c\xF3mo proces\xE1s informaci\xF3n y c\xF3mo comunic\xE1s. Es la l\xF3gica, la curiosidad y el puente entre ideas y palabras.",
      en: "Mercury describes how you think, process information, and communicate. It\u2019s logic, curiosity, and the bridge between ideas and words."
    },
    light: {
      es: ["Curiosidad", "Adaptabilidad mental", "Claridad", "Habilidad para aprender"],
      en: ["Curiosity", "Mental adaptability", "Clarity", "Learning ability"]
    },
    shadow: {
      es: ["Sobrepensar", "Ansiedad mental", "Dispersi\xF3n", "Doble discurso"],
      en: ["Overthinking", "Mental anxiety", "Scattering", "Mixed messages"]
    },
    questions: {
      es: ["\xBFQu\xE9 dato me falta?", "\xBFEstoy diciendo lo que realmente pienso?"],
      en: ["What information is missing?", "Am I saying what I truly think?"]
    },
    chartHint: {
      es: "El signo muestra tu estilo mental; la casa indica d\xF3nde negoci\xE1s, estudi\xE1s o habl\xE1s; los aspectos muestran tu tono mental.",
      en: "The sign shows your mental style; the house indicates where you negotiate, study, or speak; aspects show your mental tone."
    }
  },
  venus: {
    id: "venus",
    label: { es: "Venus", en: "Venus" },
    category: "planet",
    coreTheme: {
      es: "V\xEDnculo, deseo afectivo, valor",
      en: "Bonding, affection, value"
    },
    intro: {
      es: "Venus habla de c\xF3mo am\xE1s, qu\xE9 te atrae, c\xF3mo disfrut\xE1s y qu\xE9 valor\xE1s. Tambi\xE9n se relaciona con autoestima y placer.",
      en: "Venus speaks to how you love, what attracts you, how you enjoy, and what you value. It also relates to self-worth and pleasure."
    },
    light: {
      es: ["Afecto", "Armon\xEDa", "Sensualidad", "Capacidad de disfrute"],
      en: ["Affection", "Harmony", "Sensuality", "Ability to enjoy"]
    },
    shadow: {
      es: ["Complacencia", "Dependencia afectiva", "Indecisi\xF3n", "B\xFAsqueda de aprobaci\xF3n"],
      en: ["People-pleasing", "Emotional dependency", "Indecision", "Need for validation"]
    },
    questions: {
      es: ["\xBFQu\xE9 valoro de verdad?", "\xBFC\xF3mo recibo amor?"],
      en: ["What do I truly value?", "How do I receive love?"]
    },
    chartHint: {
      es: "El signo muestra tu est\xE9tica y lenguaje afectivo; la casa muestra d\xF3nde busc\xE1s placer y armon\xEDa.",
      en: "The sign shows your aesthetic and love language; the house shows where you seek pleasure and harmony."
    }
  },
  marte: {
    id: "mars",
    label: { es: "Marte", en: "Mars" },
    category: "planet",
    coreTheme: {
      es: "Acci\xF3n, deseo, l\xEDmites",
      en: "Action, desire, boundaries"
    },
    intro: {
      es: "Marte simboliza el impulso para actuar, defenderte y conquistar objetivos. Habla del deseo, la energ\xEDa, el enojo y los l\xEDmites.",
      en: "Mars symbolizes the drive to act, defend yourself, and pursue goals. It speaks to desire, energy, anger, and boundaries."
    },
    light: {
      es: ["Determinaci\xF3n", "Coraje", "Energ\xEDa", "Capacidad de decisi\xF3n"],
      en: ["Determination", "Courage", "Energy", "Decision-making"]
    },
    shadow: {
      es: ["Impulsividad", "Agresividad", "Irritaci\xF3n", "Competencia destructiva"],
      en: ["Impulsiveness", "Aggression", "Irritability", "Destructive competition"]
    },
    questions: {
      es: ["\xBFQu\xE9 quiero y qu\xE9 hago al respecto?", "\xBFD\xF3nde necesito poner un l\xEDmite?"],
      en: ["What do I want and what am I doing about it?", "Where do I need a boundary?"]
    },
    chartHint: {
      es: "El signo muestra c\xF3mo luch\xE1s y dese\xE1s; la casa indica d\xF3nde vas al frente; aspectos muestran tu forma de manejar enojo/energ\xEDa.",
      en: "The sign shows how you fight and desire; the house shows where you lead with force; aspects show how you handle anger/drive."
    }
  },
  jupiter: {
    id: "jupiter",
    label: { es: "J\xFApiter", en: "Jupiter" },
    category: "planet",
    coreTheme: {
      es: "Expansi\xF3n, sentido, confianza",
      en: "Expansion, meaning, confidence"
    },
    intro: {
      es: "J\xFApiter amplifica: abre puertas, expande creencias y aumenta la confianza. Muestra d\xF3nde buscamos crecer y encontrar sentido.",
      en: "Jupiter amplifies: it opens doors, expands beliefs, and increases confidence. It shows where we seek growth and meaning."
    },
    light: {
      es: ["Optimismo", "Generosidad", "Visi\xF3n", "Fe"],
      en: ["Optimism", "Generosity", "Vision", "Faith"]
    },
    shadow: {
      es: ["Exceso", "Indulgencia", "Prometer de m\xE1s", "Dogmatismo"],
      en: ["Excess", "Indulgence", "Overpromising", "Dogmatism"]
    },
    questions: {
      es: ["\xBFD\xF3nde quiero crecer?", "\xBFQu\xE9 creencia me expande o me limita?"],
      en: ["Where do I want to grow?", "Which belief expands me or limits me?"]
    },
    chartHint: {
      es: "El signo muestra tu estilo de crecimiento; la casa, el \xE1rea donde la vida pide expansi\xF3n; aspectos muestran tu medida.",
      en: "The sign shows your growth style; the house shows where life asks for expansion; aspects show your sense of measure."
    }
  },
  saturno: {
    id: "saturn",
    label: { es: "Saturno", en: "Saturn" },
    category: "planet",
    coreTheme: {
      es: "L\xEDmite, responsabilidad, madurez",
      en: "Limits, responsibility, maturity"
    },
    intro: {
      es: "Saturno estructura: muestra d\xF3nde necesitamos compromiso, paciencia y trabajo real. Tambi\xE9n se\xF1ala miedos, pruebas y el lugar donde se gana autoridad interna.",
      en: "Saturn structures: it shows where commitment, patience, and real work are needed. It also points to fears, tests, and where inner authority is earned."
    },
    light: {
      es: ["Disciplina", "Madurez", "Consistencia", "Autoridad interna"],
      en: ["Discipline", "Maturity", "Consistency", "Inner authority"]
    },
    shadow: {
      es: ["Rigidez", "Miedo al error", "Pesimismo", "Autoexigencia extrema"],
      en: ["Rigidity", "Fear of failure", "Pessimism", "Extreme self-demand"]
    },
    questions: {
      es: ["\xBFQu\xE9 estoy construyendo a largo plazo?", "\xBFQu\xE9 miedo necesito atravesar?"],
      en: ["What am I building long-term?", "Which fear do I need to face?"]
    },
    chartHint: {
      es: "El signo muestra tu estilo de responsabilidad; la casa, el \xE1rea donde hay lecci\xF3n y maestr\xEDa; aspectos muestran tensi\xF3n o solidez.",
      en: "The sign shows your responsibility style; the house shows the area of lesson and mastery; aspects show tension or stability."
    }
  },
  urano: {
    id: "uranus",
    label: { es: "Urano", en: "Uranus" },
    category: "planet",
    coreTheme: {
      es: "Cambio, libertad, innovaci\xF3n",
      en: "Change, freedom, innovation"
    },
    intro: {
      es: "Urano despierta: rompe patrones, impulsa cambios y pide autenticidad. Se\xF1ala d\xF3nde necesitamos libertad y originalidad.",
      en: "Uranus awakens: it breaks patterns, drives change, and demands authenticity. It shows where we need freedom and originality."
    },
    light: {
      es: ["Innovaci\xF3n", "Independencia", "Genialidad", "Visi\xF3n de futuro"],
      en: ["Innovation", "Independence", "Brilliance", "Future vision"]
    },
    shadow: {
      es: ["Inestabilidad", "Rebeld\xEDa reactiva", "Cortes abruptos", "Ansiedad por libertad"],
      en: ["Instability", "Reactive rebellion", "Abrupt breaks", "Freedom anxiety"]
    },
    questions: {
      es: ["\xBFQu\xE9 necesito liberar?", "\xBFQu\xE9 cambio estoy evitando?"],
      en: ["What do I need to liberate?", "Which change am I avoiding?"]
    },
    chartHint: {
      es: "La casa muestra el \xE1rea donde la vida trae giros; el signo muestra el estilo de innovaci\xF3n; aspectos intensifican despertares.",
      en: "The house shows where life brings turns; the sign shows the innovation style; aspects intensify awakenings."
    }
  },
  neptuno: {
    id: "neptune",
    label: { es: "Neptuno", en: "Neptune" },
    category: "planet",
    coreTheme: {
      es: "Inspiraci\xF3n, fe, disoluci\xF3n del ego",
      en: "Inspiration, faith, ego dissolution"
    },
    intro: {
      es: "Neptuno sensibiliza: abre la intuici\xF3n, la imaginaci\xF3n y lo espiritual. Tambi\xE9n puede nublar, idealizar o diluir l\xEDmites.",
      en: "Neptune sensitizes: it opens intuition, imagination, and spirituality. It can also blur, idealize, or dissolve boundaries."
    },
    light: {
      es: ["Compasi\xF3n", "Inspiraci\xF3n", "Intuici\xF3n", "Conexi\xF3n espiritual"],
      en: ["Compassion", "Inspiration", "Intuition", "Spiritual connection"]
    },
    shadow: {
      es: ["Evasi\xF3n", "Idealizaci\xF3n", "Confusi\xF3n", "L\xEDmites difusos"],
      en: ["Escapism", "Idealization", "Confusion", "Blurred boundaries"]
    },
    questions: {
      es: ["\xBFQu\xE9 estoy idealizando?", "\xBFQu\xE9 l\xEDmite necesito poner con amor?"],
      en: ["What am I idealizing?", "Which boundary do I need to set with compassion?"]
    },
    chartHint: {
      es: "La casa muestra d\xF3nde so\xF1\xE1s o te dilu\xEDs; el signo muestra el estilo de sensibilidad; aspectos indican claridad vs neblina.",
      en: "The house shows where you dream or dissolve; the sign shows sensitivity style; aspects indicate clarity vs fog."
    }
  },
  pluton: {
    id: "pluto",
    label: { es: "Plut\xF3n", en: "Pluto" },
    category: "planet",
    coreTheme: {
      es: "Poder, transformaci\xF3n, verdad profunda",
      en: "Power, transformation, deep truth"
    },
    intro: {
      es: "Plut\xF3n intensifica: revela lo oculto, empuja a crisis transformadoras y pide autenticidad radical. Es muerte y renacimiento simb\xF3lico.",
      en: "Pluto intensifies: it reveals what\u2019s hidden, pushes transformative crises, and demands radical authenticity. Symbolic death and rebirth."
    },
    light: {
      es: ["Regeneraci\xF3n", "Profundidad", "Valent\xEDa emocional", "Poder interno"],
      en: ["Regeneration", "Depth", "Emotional courage", "Inner power"]
    },
    shadow: {
      es: ["Control", "Obsesi\xF3n", "Manipulaci\xF3n", "Miedo a perder"],
      en: ["Control", "Obsession", "Manipulation", "Fear of loss"]
    },
    questions: {
      es: ["\xBFQu\xE9 ya no puede seguir igual?", "\xBFD\xF3nde me aferro por miedo?"],
      en: ["What can no longer stay the same?", "Where do I cling out of fear?"]
    },
    chartHint: {
      es: "La casa muestra la zona de metamorfosis; el signo muestra el estilo generacional; aspectos activan intensidad personal.",
      en: "The house shows the area of metamorphosis; the sign shows the generational style; aspects activate personal intensity."
    }
  },
  quiron: {
    id: "chiron",
    label: { es: "Quir\xF3n", en: "Chiron" },
    category: "point",
    coreTheme: {
      es: "Herida, aprendizaje, medicina personal",
      en: "Wound, learning, personal medicine"
    },
    intro: {
      es: "Quir\xF3n se\xF1ala una herida sensible (a veces dif\xEDcil de nombrar) que, al integrarse, se vuelve sabidur\xEDa y medicina para otros.",
      en: "Chiron points to a tender wound (sometimes hard to name) that, when integrated, becomes wisdom and medicine for others."
    },
    light: {
      es: ["Sabidur\xEDa", "Humildad", "Capacidad de acompa\xF1ar", "Sanaci\xF3n consciente"],
      en: ["Wisdom", "Humility", "Ability to support others", "Conscious healing"]
    },
    shadow: {
      es: ["Verg\xFCenza", "Sensaci\xF3n de falta", "Hipersensibilidad", "Querer \u2018arreglar\u2019 a todos"],
      en: ["Shame", "Sense of deficiency", "Hypersensitivity", "Trying to \u2018fix\u2019 everyone"]
    },
    questions: {
      es: ["\xBFQu\xE9 me duele de forma antigua?", "\xBFQu\xE9 medicina nace de eso?"],
      en: ["What feels like an old pain?", "What medicine is born from it?"]
    },
    chartHint: {
      es: "La casa muestra d\xF3nde duele y se aprende; el signo muestra el estilo de la herida y la cura.",
      en: "The house shows where it hurts and where learning happens; the sign shows the style of wound and remedy."
    }
  },
  lilith: {
    id: "lilith",
    label: { es: "Lilith (Luna Negra)", en: "Lilith (Black Moon)" },
    category: "point",
    coreTheme: {
      es: "Instinto, sombra, autonom\xEDa",
      en: "Instinct, shadow, autonomy"
    },
    intro: {
      es: "Lilith representa lo instintivo, lo no domesticado y aquello que a veces fue reprimido o juzgado. Habla de deseo crudo, l\xEDmites y autonom\xEDa.",
      en: "Lilith represents the instinctive, the untamed, and what may have been repressed or judged. It speaks of raw desire, boundaries, and autonomy."
    },
    light: {
      es: ["Autenticidad instintiva", "Poder personal", "L\xEDmites claros", "Deseo honesto"],
      en: ["Instinctive authenticity", "Personal power", "Clear boundaries", "Honest desire"]
    },
    shadow: {
      es: ["Rebeld\xEDa reactiva", "Verg\xFCenza", "Polarizaci\xF3n", "Relaciones de control"],
      en: ["Reactive rebellion", "Shame", "Polarization", "Control dynamics"]
    },
    questions: {
      es: ["\xBFQu\xE9 parte m\xEDa fue silenciada?", "\xBFD\xF3nde necesito decir \u2018no\u2019 con firmeza?"],
      en: ["Which part of me was silenced?", "Where do I need to say \u2018no\u2019 firmly?"]
    },
    chartHint: {
      es: "La casa muestra d\xF3nde se activa el tab\xFA o la potencia; el signo muestra el estilo de independencia y deseo.",
      en: "The house shows where taboo/power gets activated; the sign shows the style of independence and desire."
    }
  },
  nodoNorte: {
    id: "north_node",
    label: { es: "Nodo Norte", en: "North Node" },
    category: "node",
    coreTheme: {
      es: "Direcci\xF3n evolutiva, crecimiento",
      en: "Evolutionary direction, growth"
    },
    intro: {
      es: "El Nodo Norte se\xF1ala un rumbo de aprendizaje: cualidades a desarrollar, experiencias nuevas y expansi\xF3n de conciencia. No siempre es c\xF3modo, pero s\xED nutritivo.",
      en: "The North Node points to a learning direction: qualities to develop, new experiences, and expansion of consciousness. Not always comfortable, but deeply nourishing."
    },
    light: {
      es: ["Crecimiento", "Apertura", "Nuevas habilidades", "Sentido de destino"],
      en: ["Growth", "Openness", "New skills", "Sense of direction"]
    },
    shadow: {
      es: ["Miedo a lo desconocido", "Autosabotaje", "Volver a lo f\xE1cil", "Resistencia al cambio"],
      en: ["Fear of the unknown", "Self-sabotage", "Staying in the easy", "Resistance to change"]
    },
    questions: {
      es: ["\xBFQu\xE9 me pide aprender la vida?", "\xBFQu\xE9 nuevo m\xFAsculo estoy desarrollando?"],
      en: ["What is life asking me to learn?", "Which new muscle am I building?"]
    },
    chartHint: {
      es: "El signo muestra el tipo de cualidad a desarrollar; la casa, el \xE1rea de vida donde se encarna el aprendizaje.",
      en: "The sign shows the quality to develop; the house shows the life area where learning is embodied."
    }
  },
  nodoSur: {
    id: "south_node",
    label: { es: "Nodo Sur", en: "South Node" },
    category: "node",
    coreTheme: {
      es: "Zona conocida, memoria, talento autom\xE1tico",
      en: "Familiar zone, memory, automatic talent"
    },
    intro: {
      es: "El Nodo Sur describe patrones aprendidos, talentos disponibles y una forma conocida de moverte por la vida. Es sabidur\xEDa\u2026 y tambi\xE9n puede volverse zona de estancamiento.",
      en: "The South Node describes learned patterns, available talents, and a familiar way of moving through life. It\u2019s wisdom\u2026 and it can also become a stagnation zone."
    },
    light: {
      es: ["Talento natural", "Experiencia", "Memoria de recursos", "Sabidur\xEDa"],
      en: ["Natural talent", "Experience", "Resource memory", "Wisdom"]
    },
    shadow: {
      es: ["Inercia", "Repetici\xF3n", "Apego al pasado", "Evitar desaf\xEDos nuevos"],
      en: ["Inertia", "Repetition", "Attachment to the past", "Avoiding new challenges"]
    },
    questions: {
      es: ["\xBFQu\xE9 me sale f\xE1cil pero ya no me alcanza?", "\xBFD\xF3nde repito por inercia?"],
      en: ["What comes easily but no longer serves me?", "Where am I repeating out of inertia?"]
    },
    chartHint: {
      es: "El signo muestra el patr\xF3n c\xF3modo; la casa muestra d\xF3nde tend\xE9s a quedarte en lo conocido.",
      en: "The sign shows the comfortable pattern; the house shows where you tend to stay in the familiar."
    }
  },
  parteFortuna: {
    id: "part_of_fortune",
    label: { es: "Parte de la Fortuna", en: "Part of Fortune" },
    category: "point",
    coreTheme: {
      es: "Fluidez, bienestar, facilidad",
      en: "Flow, wellbeing, ease"
    },
    intro: {
      es: "La Parte de la Fortuna se\xF1ala d\xF3nde la vida tiende a fluir con m\xE1s naturalidad: un punto de goce, bienestar y \u2018click\u2019 interno cuando est\xE1s alineadx.",
      en: "The Part of Fortune points to where life tends to flow more naturally: a place of enjoyment, wellbeing, and inner \u2018click\u2019 when aligned."
    },
    light: {
      es: ["Fluidez", "Goce", "Bienestar", "Confianza tranquila"],
      en: ["Flow", "Enjoyment", "Wellbeing", "Quiet confidence"]
    },
    shadow: {
      es: ["Buscar suerte sin acci\xF3n", "Idealizar facilidad", "Dormirse en lo c\xF3modo"],
      en: ["Chasing luck without action", "Idealizing ease", "Getting stuck in comfort"]
    },
    questions: {
      es: ["\xBFD\xF3nde siento que todo encaja?", "\xBFQu\xE9 me da alegr\xEDa simple?"],
      en: ["Where does everything feel aligned?", "What gives me simple joy?"]
    },
    chartHint: {
      es: "El signo indica el estilo de goce; la casa, el \xE1rea donde se activa bienestar y plenitud.",
      en: "The sign indicates the style of enjoyment; the house indicates where wellbeing and fulfillment activate."
    }
  },
  vertice: {
    id: "vertex",
    label: { es: "V\xE9rtice", en: "Vertex" },
    category: "point",
    coreTheme: {
      es: "Encuentros significativos, giros de destino",
      en: "Fated encounters, turning points"
    },
    intro: {
      es: "El V\xE9rtice se asocia a encuentros y situaciones que se sienten \u201Cdestinadas\u201D o muy movilizantes. No es controlable: se activa por eventos y v\xEDnculos clave.",
      en: "The Vertex is linked to encounters and situations that feel \u2018fated\u2019 or highly activating. It\u2019s not fully controllable; it\u2019s triggered by key events and relationships."
    },
    light: {
      es: ["Sincronicidades", "Encuentros clave", "Apertura a lo nuevo"],
      en: ["Synchronicities", "Key encounters", "Openness to the new"]
    },
    shadow: {
      es: ["Proyecci\xF3n intensa", "Sentir que no eleg\xEDs", "Dramatizar el destino"],
      en: ["Intense projection", "Feeling powerless", "Over-dramatizing fate"]
    },
    questions: {
      es: ["\xBFQu\xE9 me est\xE1 mostrando este encuentro?", "\xBFQu\xE9 cambio me est\xE1 pidiendo la vida?"],
      en: ["What is this encounter showing me?", "What change is life asking of me?"]
    },
    chartHint: {
      es: "El signo muestra el tono de los encuentros; la casa, el \xE1rea donde aparecen giros y personas clave.",
      en: "The sign shows the tone of encounters; the house shows the life area where turning points and key people appear."
    }
  }
};
var infoRetrogradacion = {
  retrograde: {
    intro: {
      es: "Astrol\xF3gicamente, un planeta retr\xF3grado indica que su funci\xF3n se vive de manera m\xE1s interna, reflexiva o no lineal. No es \u201Cmalo\u201D: suele pedir revisi\xF3n, integraci\xF3n y un ritmo propio. Astron\xF3micamente es un efecto aparente desde la Tierra (parece ir hacia atr\xE1s), pero simb\xF3licamente se lee como un movimiento hacia adentro.",
      en: "Astrologically, a retrograde planet suggests its function is expressed in a more internal, reflective, or non-linear way. It\u2019s not \u201Cbad\u201D: it often asks for review, integration, and a personal pace. Astronomically it\u2019s an apparent effect from Earth (it looks like it moves backward), but symbolically it\u2019s read as a movement inward."
    },
    keyIdeas: {
      es: [
        "M\xE1s introspecci\xF3n que impulso directo.",
        "Procesos en espiral: volver sobre lo mismo para entenderlo distinto.",
        "Tiempo de revisi\xF3n, reparaci\xF3n o re-encuadre.",
        "Expresi\xF3n menos obvia hacia afuera; m\xE1s elaboraci\xF3n interna."
      ],
      en: [
        "More introspection than direct push.",
        "Spiral processes: revisiting the same theme to understand it differently.",
        "A period of review, repair, or reframing.",
        "Less obvious outward expression; more inner processing."
      ]
    }}
};
var infoTransitosAspectos = {
  conjuncion: {
    id: "conjunction",
    angle: 0,
    label: { es: "Conjunci\xF3n", en: "Conjunction" },
    coreTheme: {
      es: "Fusi\xF3n, inicio, activaci\xF3n",
      en: "Fusion, initiation, activation"
    },
    intro: {
      es: "La conjunci\xF3n ocurre cuando dos planetas se encuentran en el mismo grado o signo. Fusiona energ\xEDas y marca comienzos, \xE9nfasis y activaci\xF3n intensa.",
      en: "A conjunction occurs when two planets meet at the same degree or sign. It fuses energies and marks beginnings, emphasis, and strong activation."
    },
    light: {
      es: ["Inicio de ciclo", "Potencia concentrada", "Enfoque"],
      en: ["Cycle beginning", "Concentrated power", "Focus"]
    },
    shadow: {
      es: ["Exceso", "Identificaci\xF3n total", "Falta de perspectiva"],
      en: ["Excess", "Over-identification", "Lack of perspective"]
    },
    questions: {
      es: ["\xBFQu\xE9 se est\xE1 iniciando?", "\xBFD\xF3nde estoy poniendo toda mi energ\xEDa?"],
      en: ["What is beginning?", "Where am I placing all my energy?"]
    }
  },
  oposicion: {
    id: "opposition",
    angle: 180,
    label: { es: "Oposici\xF3n", en: "Opposition" },
    coreTheme: {
      es: "Polaridad, espejo, conciencia",
      en: "Polarity, mirror, awareness"
    },
    intro: {
      es: "La oposici\xF3n enfrenta dos energ\xEDas opuestas. Trae conciencia a trav\xE9s del contraste, especialmente mediante v\xEDnculos y situaciones externas.",
      en: "An opposition confronts two opposing energies. It brings awareness through contrast, often via relationships or external situations."
    },
    light: {
      es: ["Conciencia", "Complementariedad", "Aprendizaje vincular"],
      en: ["Awareness", "Complementarity", "Relational learning"]
    },
    shadow: {
      es: ["Proyecci\xF3n", "Conflicto", "Tirar de la cuerda"],
      en: ["Projection", "Conflict", "Tug of war"]
    },
    questions: {
      es: ["\xBFQu\xE9 veo en el otro que tambi\xE9n es m\xEDo?", "\xBFC\xF3mo integro ambos polos?"],
      en: ["What do I see in the other that is also mine?", "How can I integrate both poles?"]
    }
  },
  cuadratura: {
    id: "square",
    angle: 90,
    label: { es: "Cuadratura", en: "Square" },
    coreTheme: {
      es: "Tensi\xF3n, desaf\xEDo, acci\xF3n",
      en: "Tension, challenge, action"
    },
    intro: {
      es: "La cuadratura genera fricci\xF3n y conflicto interno o externo. Es un motor de cambio que exige decisi\xF3n y movimiento.",
      en: "A square creates friction and inner or outer conflict. It\u2019s a driver of change that demands decision and action."
    },
    light: {
      es: ["Motivaci\xF3n", "Crecimiento", "Desarrollo de car\xE1cter"],
      en: ["Motivation", "Growth", "Character development"]
    },
    shadow: {
      es: ["Estr\xE9s", "Bloqueo", "Reactividad"],
      en: ["Stress", "Blockage", "Reactivity"]
    },
    questions: {
      es: ["\xBFQu\xE9 conflicto pide acci\xF3n?", "\xBFD\xF3nde necesito madurar?"],
      en: ["Which conflict calls for action?", "Where do I need to mature?"]
    }
  },
  trigono: {
    id: "trine",
    angle: 120,
    label: { es: "Tr\xEDgono", en: "Trine" },
    coreTheme: {
      es: "Fluidez, talento, facilidad",
      en: "Flow, talent, ease"
    },
    intro: {
      es: "El tr\xEDgono conecta energ\xEDas afines. Facilita el flujo natural y muestra talentos disponibles sin demasiado esfuerzo.",
      en: "A trine connects compatible energies. It facilitates natural flow and reveals talents available with little effort."
    },
    light: {
      es: ["Armon\xEDa", "Confianza", "Facilidad"],
      en: ["Harmony", "Confidence", "Ease"]
    },
    shadow: {
      es: ["Comodidad excesiva", "Falta de desaf\xEDo", "Desaprovechar potencial"],
      en: ["Too much comfort", "Lack of challenge", "Wasted potential"]
    },
    questions: {
      es: ["\xBFQu\xE9 talento puedo usar mejor?", "\xBFD\xF3nde me estoy acomodando?"],
      en: ["Which talent can I use better?", "Where am I getting too comfortable?"]
    }
  },
  sextil: {
    id: "sextile",
    angle: 60,
    label: { es: "Sextil", en: "Sextile" },
    coreTheme: {
      es: "Oportunidad, cooperaci\xF3n, elecci\xF3n",
      en: "Opportunity, cooperation, choice"
    },
    intro: {
      es: "El sextil abre oportunidades que requieren iniciativa. No act\xFAa solo: pide participaci\xF3n consciente.",
      en: "A sextile opens opportunities that require initiative. It doesn\u2019t act alone; it asks for conscious participation."
    },
    light: {
      es: ["Colaboraci\xF3n", "Aprendizaje", "Posibilidades"],
      en: ["Collaboration", "Learning", "Possibilities"]
    },
    shadow: {
      es: ["Pasividad", "Oportunidades no tomadas"],
      en: ["Passivity", "Missed opportunities"]
    },
    questions: {
      es: ["\xBFQu\xE9 oportunidad puedo activar?", "\xBFCon qui\xE9n puedo cooperar?"],
      en: ["Which opportunity can I activate?", "Who can I cooperate with?"]
    }
  },
  quincuncio: {
    id: "quincunx",
    angle: 150,
    label: { es: "Quincuncio", en: "Quincunx / Inconjunci\xF3n" },
    coreTheme: {
      es: "Ajuste, incomodidad, recalibraci\xF3n",
      en: "Adjustment, discomfort, recalibration"
    },
    intro: {
      es: "El quincuncio conecta energ\xEDas que no se entienden naturalmente. Pide ajustes finos, cambios de h\xE1bito y conciencia corporal o pr\xE1ctica.",
      en: "A quincunx links energies that don\u2019t naturally understand each other. It asks for fine adjustments, habit changes, and practical awareness."
    },
    light: {
      es: ["Adaptaci\xF3n", "Conciencia", "Ajuste preciso"],
      en: ["Adaptation", "Awareness", "Precise adjustment"]
    },
    shadow: {
      es: ["Incomodidad persistente", "Sensaci\xF3n de desajuste"],
      en: ["Persistent discomfort", "Feeling out of sync"]
    },
    questions: {
      es: ["\xBFQu\xE9 necesito ajustar?", "\xBFQu\xE9 h\xE1bito ya no funciona?"],
      en: ["What needs adjustment?", "Which habit no longer works?"]
    }
  },
  quintil: {
    id: "quintile",
    angle: 72,
    label: { es: "Quintil", en: "Quintile" },
    coreTheme: {
      es: "Creatividad, talento \xFAnico, expresi\xF3n",
      en: "Creativity, unique talent, expression"
    },
    intro: {
      es: "El quintil se asocia a la creatividad consciente y al talento especial. Indica capacidad de dar forma personal a una energ\xEDa.",
      en: "The quintile is linked to conscious creativity and special talent. It indicates the ability to shape energy in a personal way."
    },
    light: {
      es: ["Creatividad", "Ingenio", "Expresi\xF3n original"],
      en: ["Creativity", "Ingenuity", "Original expression"]
    },
    shadow: {
      es: ["Autoexigencia creativa", "Sentirse incomprendido"],
      en: ["Creative self-pressure", "Feeling misunderstood"]
    },
    questions: {
      es: ["\xBFQu\xE9 talento quiere expresarse?", "\xBFC\xF3mo puedo crear algo propio?"],
      en: ["Which talent wants to be expressed?", "How can I create something of my own?"]
    }
  },
  biquintil: {
    id: "biquintile",
    angle: 144,
    label: { es: "Biquintil", en: "Biquintile" },
    coreTheme: {
      es: "Maestr\xEDa creativa, integraci\xF3n",
      en: "Creative mastery, integration"
    },
    intro: {
      es: "El biquintil profundiza la creatividad del quintil. Habla de talento trabajado, refinado y puesto al servicio de algo mayor.",
      en: "The biquintile deepens quintile creativity. It speaks of refined talent, developed over time and put at the service of something greater."
    },
    light: {
      es: ["Maestr\xEDa", "Creatividad madura", "Integraci\xF3n"],
      en: ["Mastery", "Mature creativity", "Integration"]
    },
    shadow: {
      es: ["Exigencia excesiva", "Perfeccionismo creativo"],
      en: ["Excessive demands", "Creative perfectionism"]
    },
    questions: {
      es: ["\xBFQu\xE9 s\xE9 hacer muy bien?", "\xBFC\xF3mo pongo este talento en acci\xF3n?"],
      en: ["What do I do very well?", "How can I put this talent into action?"]
    }
  }
};
var infoEjesAngulares = {
  ascendente: {
    id: "ascendant",
    label: { es: "Ascendente", en: "Ascendant" },
    coreTheme: {
      es: "Identidad visible, inicio, forma de estar en el mundo",
      en: "Visible identity, beginnings, way of being in the world"
    },
    intro: {
      es: "El Ascendente marca el comienzo de la carta natal. Describe c\xF3mo iniciamos la vida, c\xF3mo reaccionamos espont\xE1neamente y la forma en que nos mostramos al mundo. Es una energ\xEDa que se aprende a habitar con el tiempo.",
      en: "The Ascendant marks the beginning of the natal chart. It describes how we start things, how we react instinctively, and how we present ourselves to the world. It\u2019s an energy we grow into over time."
    },
    light: {
      es: [
        "Presencia aut\xE9ntica",
        "Capacidad de iniciativa",
        "Vitalidad y estilo personal",
        "Adaptaci\xF3n al entorno"
      ],
      en: [
        "Authentic presence",
        "Initiative",
        "Vitality and personal style",
        "Adaptation to the environment"
      ]
    },
    shadow: {
      es: [
        "Identificaci\xF3n excesiva con la imagen",
        "Reactividad",
        "Actuar en autom\xE1tico",
        "Confundir apariencia con esencia"
      ],
      en: [
        "Over-identification with image",
        "Reactivity",
        "Operating on autopilot",
        "Confusing appearance with essence"
      ]
    },
    questions: {
      es: [
        "\xBFC\xF3mo enfrento la vida cuando algo empieza?",
        "\xBFQu\xE9 imagen doy sin darme cuenta?",
        "\xBFDesde d\xF3nde reacciono?"
      ],
      en: [
        "How do I face life when something begins?",
        "What image do I project unconsciously?",
        "From where do I react?"
      ]
    },
    chartHint: {
      es: "El signo del Ascendente muestra el estilo de entrada a la vida; su regente indica c\xF3mo se desarrolla esa identidad; los planetas en Casa 1 la intensifican.",
      en: "The Ascendant sign shows your entry style into life; its ruler shows how that identity develops; planets in House 1 intensify it."
    }
  },
  descendente: {
    id: "descendant",
    label: { es: "Descendente", en: "Descendant" },
    coreTheme: {
      es: "V\xEDnculos, proyecci\xF3n, el otro significativo",
      en: "Relationships, projection, the significant other"
    },
    intro: {
      es: "El Descendente muestra c\xF3mo nos vinculamos, qu\xE9 buscamos en el otro y qu\xE9 cualidades solemos proyectar en parejas y asociaciones. Es un espejo que revela partes no del todo integradas.",
      en: "The Descendant shows how we relate, what we seek in others, and which qualities we tend to project onto partners and associations. It acts as a mirror revealing unintegrated parts."
    },
    light: {
      es: [
        "Capacidad de complementar",
        "Aprendizaje a trav\xE9s del v\xEDnculo",
        "Encuentro genuino con el otro",
        "Cooperaci\xF3n"
      ],
      en: [
        "Ability to complement",
        "Learning through relationships",
        "Genuine encounters",
        "Cooperation"
      ]
    },
    shadow: {
      es: [
        "Proyecci\xF3n inconsciente",
        "Dependencia vincular",
        "Conflictos repetidos",
        "Perderse en el otro"
      ],
      en: [
        "Unconscious projection",
        "Relational dependency",
        "Repeated conflicts",
        "Losing oneself in others"
      ]
    },
    questions: {
      es: [
        "\xBFQu\xE9 busco en mis v\xEDnculos?",
        "\xBFQu\xE9 parte m\xEDa proyecto en el otro?",
        "\xBFC\xF3mo me relaciono desde la igualdad?"
      ],
      en: [
        "What do I seek in relationships?",
        "Which part of me do I project onto others?",
        "How do I relate from equality?"
      ]
    },
    chartHint: {
      es: "El signo del Descendente muestra el tipo de v\xEDnculo que atra\xE9s; su regente indica c\xF3mo se viven las relaciones; planetas all\xED intensifican la tem\xE1tica.",
      en: "The Descendant sign shows the type of relationships you attract; its ruler indicates how relationships are lived; planets there intensify the theme."
    }
  },
  medioCielo: {
    id: "midheaven",
    label: { es: "Medio Cielo", en: "Midheaven (MC)" },
    coreTheme: {
      es: "Vocaci\xF3n, prop\xF3sito social, direcci\xF3n",
      en: "Vocation, social purpose, direction"
    },
    intro: {
      es: "El Medio Cielo representa la proyecci\xF3n social, la vocaci\xF3n y el camino de realizaci\xF3n p\xFAblica. Habla de metas, aspiraciones y del rol que buscamos ocupar en el mundo.",
      en: "The Midheaven represents social projection, vocation, and the path of public realization. It speaks of goals, aspirations, and the role we seek in the world."
    },
    light: {
      es: [
        "Sentido de prop\xF3sito",
        "Ambici\xF3n consciente",
        "Autoridad interna",
        "Direcci\xF3n clara"
      ],
      en: [
        "Sense of purpose",
        "Conscious ambition",
        "Inner authority",
        "Clear direction"
      ]
    },
    shadow: {
      es: [
        "Sobreidentificaci\xF3n con el rol",
        "Exceso de exigencia",
        "Buscar validaci\xF3n externa",
        "Desconexi\xF3n emocional"
      ],
      en: [
        "Over-identification with status",
        "Excessive pressure",
        "Seeking external validation",
        "Emotional disconnection"
      ]
    },
    questions: {
      es: [
        "\xBFQu\xE9 quiero construir en el mundo?",
        "\xBFQu\xE9 imagen profesional sostengo?",
        "\xBFMi meta es aut\xE9ntica?"
      ],
      en: [
        "What do I want to build in the world?",
        "Which professional image do I uphold?",
        "Is my goal authentic?"
      ]
    },
    chartHint: {
      es: "El signo del MC muestra el estilo vocacional; su regente indica el camino profesional; planetas cerca del MC vuelven visible esta energ\xEDa.",
      en: "The MC sign shows vocational style; its ruler indicates the professional path; planets near the MC make this energy visible."
    }
  },
  fondoCielo: {
    id: "imum_coeli",
    label: { es: "Fondo del Cielo", en: "Imum Coeli (IC)" },
    coreTheme: {
      es: "Ra\xEDces, base emocional, intimidad",
      en: "Roots, emotional foundation, intimacy"
    },
    intro: {
      es: "El Fondo del Cielo se\xF1ala el origen emocional, la historia familiar y la base ps\xEDquica desde la cual nos desarrollamos. Es el lugar de refugio y pertenencia.",
      en: "The Imum Coeli points to emotional origins, family history, and the psychic base from which we develop. It is a place of refuge and belonging."
    },
    light: {
      es: [
        "Sentido de pertenencia",
        "Ra\xEDces internas",
        "Intimidad",
        "Capacidad de sost\xE9n emocional"
      ],
      en: [
        "Sense of belonging",
        "Inner roots",
        "Intimacy",
        "Emotional support capacity"
      ]
    },
    shadow: {
      es: [
        "Apego al pasado",
        "Heridas familiares no resueltas",
        "Encierro emocional",
        "Miedo a salir al mundo"
      ],
      en: [
        "Attachment to the past",
        "Unresolved family wounds",
        "Emotional withdrawal",
        "Fear of exposure"
      ]
    },
    questions: {
      es: [
        "\xBFD\xF3nde me siento en casa?",
        "\xBFQu\xE9 herencia emocional cargo?",
        "\xBFQu\xE9 necesito cuidar internamente?"
      ],
      en: [
        "Where do I feel at home?",
        "Which emotional inheritance do I carry?",
        "What do I need to nurture internally?"
      ]
    },
    chartHint: {
      es: "El signo del IC muestra la base emocional; su regente indica c\xF3mo se vive la intimidad; planetas all\xED marcan temas familiares profundos.",
      en: "The IC sign shows the emotional foundation; its ruler indicates how intimacy is lived; planets there mark deep family themes."
    }
  }
};

// src/constants/index.ts
var ZODIAC_SYMBOLS = {
  Aries: "\u2648",
  Taurus: "\u2649",
  Gemini: "\u264A",
  Cancer: "\u264B",
  Leo: "\u264C",
  Virgo: "\u264D",
  Libra: "\u264E",
  Scorpio: "\u264F",
  Sagittarius: "\u2650",
  Capricorn: "\u2651",
  Aquarius: "\u2652",
  Pisces: "\u2653"
};
var PLANET_SYMBOLS = {
  Sun: "\u2609",
  Moon: "\u263D",
  Mercury: "\u263F",
  Venus: "\u2640",
  Mars: "\u2642",
  Jupiter: "\u2643",
  Saturn: "\u2644",
  Uranus: "\u2645",
  Neptune: "\u2646",
  Pluto: "\u2BD3",
  NorthNode: "\u260A",
  SouthNode: "\u260B",
  Chiron: "\u26B7",
  Lilith: "\u26B8",
  Ascendant: "AC",
  Midheaven: "MC"
};
var SIGN_START_DEGREES = {
  Aries: 0,
  Taurus: 30,
  Gemini: 60,
  Cancer: 90,
  Leo: 120,
  Virgo: 150,
  Libra: 180,
  Scorpio: 210,
  Sagittarius: 240,
  Capricorn: 270,
  Aquarius: 300,
  Pisces: 330
};
var ZODIAC_ORDER = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces"
];
var ELEMENT_COLORS = {
  fire: "#e63946",
  // Aries, Leo, Sagittarius
  earth: "#588157",
  // Taurus, Virgo, Capricorn
  air: "#457b9d",
  // Gemini, Libra, Aquarius
  water: "#5a9fd4"
  // Cancer, Scorpio, Pisces - lighter blue for visibility
};
var SIGN_ELEMENTS = {
  Aries: "fire",
  Taurus: "earth",
  Gemini: "air",
  Cancer: "water",
  Leo: "fire",
  Virgo: "earth",
  Libra: "air",
  Scorpio: "water",
  Sagittarius: "fire",
  Capricorn: "earth",
  Aquarius: "air",
  Pisces: "water"
};
var DEFAULT_ASPECT_COLORS = {
  conjunction: "#ffcc00",
  opposition: "#ff0000",
  trine: "#00cc00",
  square: "#cc0000",
  sextile: "#0066cc",
  quincunx: "#9933cc",
  semisextile: "#66cc99",
  semisquare: "#cc6666",
  sesquiquadrate: "#cc9966",
  quintile: "#cc66cc",
  biquintile: "#66cccc"
};
var ASPECT_ANGLES = {
  conjunction: 0,
  opposition: 180,
  trine: 120,
  square: 90,
  sextile: 60,
  quincunx: 150,
  semisextile: 30,
  semisquare: 45,
  sesquiquadrate: 135,
  quintile: 72,
  biquintile: 144
};
var ASPECT_LINE_STYLES = {
  conjunction: { strokeWidth: 2 },
  opposition: { strokeWidth: 2 },
  trine: { strokeWidth: 1.5 },
  square: { strokeWidth: 1.5 },
  sextile: { strokeWidth: 1 },
  quincunx: { dashArray: "5,3", strokeWidth: 1 },
  semisextile: { dashArray: "3,3", strokeWidth: 0.75 },
  semisquare: { dashArray: "4,2", strokeWidth: 0.75 },
  sesquiquadrate: { dashArray: "4,2", strokeWidth: 0.75 },
  quintile: { dashArray: "2,2", strokeWidth: 0.75 },
  biquintile: { dashArray: "2,2", strokeWidth: 0.75 }
};

// src/utils/geometry.ts
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}
function getAbsoluteDegree(sign, degree) {
  return SIGN_START_DEGREES[sign] + degree;
}
function normalizeAngle(angle) {
  let normalized = angle % 360;
  if (normalized < 0) {
    normalized += 360;
  }
  return normalized;
}
function getMandalaAngle(absoluteDegree, ascendantDegree) {
  const offset = ascendantDegree ?? 0;
  return normalizeAngle(absoluteDegree - offset + 180);
}
function getPointOnCircle(centerX, centerY, radius, angleDegrees) {
  const angleRadians = degreesToRadians(angleDegrees);
  return {
    x: centerX + radius * Math.cos(angleRadians),
    y: centerY - radius * Math.sin(angleRadians)
    // Negative because SVG y-axis is inverted
  };
}
function getPlanetAbsoluteDegree(planet) {
  return getAbsoluteDegree(planet.sign, planet.degree);
}
function formatDegree(degree) {
  const wholeDegrees = Math.floor(degree);
  const minutes = Math.round((degree - wholeDegrees) * 60);
  return `${wholeDegrees}\xB0${minutes.toString().padStart(2, "0")}'`;
}
var ANGLE_LABEL_ZONES = [
  { house: 1, label: "AS", relativeOffset: 0 },
  // Ascendant at 0°
  { house: 4, label: "IC", relativeOffset: 270 },
  // IC at 270° (bottom)
  { house: 7, label: "DS", relativeOffset: 180 },
  // Descendant at 180°
  { house: 10, label: "MC", relativeOffset: 90 }
  // Midheaven at 90° (top)
];
function isInAngleLabelZone(displayAngle, ascendantDegree, threshold = 10) {
  for (const zone of ANGLE_LABEL_ZONES) {
    const zoneDegree = normalizeAngle(zone.relativeOffset);
    const diff = displayAngle - zoneDegree;
    const normalizedDiff = (diff + 180) % 360 - 180;
    if (Math.abs(normalizedDiff) < threshold) {
      return {
        inZone: true,
        pushDirection: normalizedDiff > 0 ? 1 : -1,
        zoneDegree
      };
    }
  }
  return { inZone: false, pushDirection: 0, zoneDegree: 0 };
}
function adjustPlanetPositions(planets, threshold = 8, ascendantDegree = 0) {
  if (planets.length === 0) return [];
  if (planets.length === 1) {
    const p = planets[0];
    const displayAngle = getMandalaAngle(p.absoluteDegree, ascendantDegree);
    const angleCheck = isInAngleLabelZone(displayAngle, ascendantDegree, 10);
    const offset = angleCheck.inZone ? angleCheck.pushDirection * 12 : 0;
    return [{ ...p, offset }];
  }
  const result = planets.map((p) => ({
    ...p,
    offset: 0,
    displayDegree: p.absoluteDegree,
    displayAngle: getMandalaAngle(p.absoluteDegree, ascendantDegree)
  }));
  result.sort((a, b) => a.absoluteDegree - b.absoluteDegree);
  const minSpacing = threshold;
  const maxIterations = 80;
  const angleLabelThreshold = 10;
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let hasCollision = false;
    result.forEach((p) => {
      p.displayDegree = normalizeAngle(p.absoluteDegree + p.offset);
      p.displayAngle = getMandalaAngle(p.displayDegree, ascendantDegree);
    });
    for (const planet of result) {
      const angleCheck = isInAngleLabelZone(planet.displayAngle, ascendantDegree, angleLabelThreshold);
      if (angleCheck.inZone) {
        hasCollision = true;
        planet.offset += angleCheck.pushDirection * 2;
      }
    }
    const sortedByDisplay = [...result].sort((a, b) => a.displayDegree - b.displayDegree);
    for (let i = 0; i < sortedByDisplay.length; i++) {
      const current = sortedByDisplay[i];
      const next = sortedByDisplay[(i + 1) % sortedByDisplay.length];
      let distance = next.displayDegree - current.displayDegree;
      if (distance < 0) distance += 360;
      if (distance < minSpacing && distance > 0) {
        hasCollision = true;
        const overlap = minSpacing - distance;
        const pushAmount = overlap / 2 + 0.5;
        current.offset -= pushAmount;
        next.offset += pushAmount;
      }
    }
    if (!hasCollision) break;
    result.forEach((p) => {
      p.offset *= 0.92;
    });
  }
  const maxOffset = 30;
  result.forEach((p) => {
    p.offset = Math.max(-maxOffset, Math.min(maxOffset, p.offset));
  });
  return result;
}

// src/types/index.ts
var DEFAULT_ORBS = {
  luminaries: 10,
  personal: 8,
  social: 6,
  transpersonal: 5,
  points: 5,
  angles: 5
};
var PLANET_CATEGORIES = {
  Sun: "luminaries",
  Moon: "luminaries",
  Mercury: "personal",
  Venus: "personal",
  Mars: "personal",
  Jupiter: "social",
  Saturn: "social",
  Uranus: "transpersonal",
  Neptune: "transpersonal",
  Pluto: "transpersonal",
  NorthNode: "points",
  SouthNode: "points",
  Chiron: "points",
  Lilith: "points",
  Ascendant: "angles",
  Midheaven: "angles"
};

// src/utils/horoscopeConverter.ts
var SIGN_KEY_MAP = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpio",
  sagittarius: "Sagittarius",
  capricorn: "Capricorn",
  aquarius: "Aquarius",
  pisces: "Pisces"
};
var PLANET_KEY_MAP = {
  sun: "Sun",
  moon: "Moon",
  mercury: "Mercury",
  venus: "Venus",
  mars: "Mars",
  jupiter: "Jupiter",
  saturn: "Saturn",
  uranus: "Uranus",
  neptune: "Neptune",
  pluto: "Pluto",
  northnode: "NorthNode",
  southnode: "SouthNode",
  chiron: "Chiron",
  lilith: "Lilith",
  ascendant: "Ascendant",
  midheaven: "Midheaven"
};
var ASPECT_KEY_MAP = {
  conjunction: "conjunction",
  opposition: "opposition",
  trine: "trine",
  square: "square",
  sextile: "sextile",
  quincunx: "quincunx",
  quintile: "quintile",
  septile: "semisextile",
  // septile not supported, map to semisextile
  "semi-square": "semisquare",
  "semi-sextile": "semisextile"
};
function convertSignKey(key) {
  const normalizedKey = key.toLowerCase();
  return SIGN_KEY_MAP[normalizedKey] || "Aries";
}
function convertPlanetKey(key) {
  const normalizedKey = key.toLowerCase();
  return PLANET_KEY_MAP[normalizedKey] || null;
}
function convertAspectKey(key) {
  const normalizedKey = key.toLowerCase();
  return ASPECT_KEY_MAP[normalizedKey] || null;
}
function getDegreeInSign(eclipticDegrees) {
  return eclipticDegrees % 30;
}
function getSignFromDegrees(eclipticDegrees) {
  const signs = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
  ];
  const signIndex = Math.floor(eclipticDegrees / 30) % 12;
  return signs[signIndex];
}
function convertCelestialBody(body) {
  const planetName = convertPlanetKey(body.key);
  if (!planetName) return null;
  const eclipticDegrees = body.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: body.Sign?.key ? convertSignKey(body.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees),
    retrograde: body.isRetrograde || false
  };
}
function convertCelestialPoint(point) {
  const planetName = convertPlanetKey(point.key);
  if (!planetName) return null;
  const eclipticDegrees = point.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: point.Sign?.key ? convertSignKey(point.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertAngle(angle) {
  const planetName = convertPlanetKey(angle.key);
  if (!planetName) return null;
  const eclipticDegrees = angle.ChartPosition.Ecliptic.DecimalDegrees;
  return {
    planet: planetName,
    sign: angle.Sign?.key ? convertSignKey(angle.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertHouse(house) {
  const eclipticDegrees = house.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
  return {
    house: house.id,
    sign: house.Sign?.key ? convertSignKey(house.Sign.key) : getSignFromDegrees(eclipticDegrees),
    degree: getDegreeInSign(eclipticDegrees)
  };
}
function convertAspect(aspect) {
  const planet1 = convertPlanetKey(aspect.point1Key);
  const planet2 = convertPlanetKey(aspect.point2Key);
  const aspectType = convertAspectKey(aspect.aspectKey);
  if (!planet1 || !planet2 || !aspectType) return null;
  return {
    planet1,
    planet2,
    aspect: aspectType,
    orb: aspect.orb
  };
}
function convertHoroscopeToChart(horoscope, label) {
  const planets = [];
  const houses = [];
  const aspects = [];
  if (horoscope.CelestialBodies?.all) {
    for (const body of horoscope.CelestialBodies.all) {
      const converted = convertCelestialBody(body);
      if (converted) planets.push(converted);
    }
  }
  if (horoscope.CelestialPoints?.all) {
    for (const point of horoscope.CelestialPoints.all) {
      const converted = convertCelestialPoint(point);
      if (converted) planets.push(converted);
    }
  }
  if (horoscope.Ascendant) {
    const ascendant = convertAngle(horoscope.Ascendant);
    if (ascendant) planets.push(ascendant);
  }
  if (horoscope.Midheaven) {
    const midheaven = convertAngle(horoscope.Midheaven);
    if (midheaven) planets.push(midheaven);
  }
  if (horoscope.Houses) {
    for (const house of horoscope.Houses) {
      houses.push(convertHouse(house));
    }
  }
  if (horoscope.Aspects?.all) {
    for (const aspect of horoscope.Aspects.all) {
      const converted = convertAspect(aspect);
      if (converted) aspects.push(converted);
    }
  }
  return {
    label,
    planets,
    houses,
    aspects
  };
}
var ASPECT_ANGLES2 = {
  conjunction: 0,
  opposition: 180,
  trine: 120,
  square: 90,
  sextile: 60,
  quincunx: 150,
  semisextile: 30,
  semisquare: 45,
  sesquiquadrate: 135,
  quintile: 72,
  biquintile: 144
};
function shouldSkipAspect(planet1, planet2, aspectType) {
  if (aspectType === "opposition") {
    const isNodePair = planet1 === "NorthNode" && planet2 === "SouthNode" || planet1 === "SouthNode" && planet2 === "NorthNode";
    if (isNodePair) return true;
  }
  return false;
}
function getOrbForPlanets(planet1, planet2, orbConfig = {}) {
  const config = { ...DEFAULT_ORBS, ...orbConfig };
  const cat1 = PLANET_CATEGORIES[planet1];
  const cat2 = PLANET_CATEGORIES[planet2];
  const orb1 = config[cat1];
  const orb2 = config[cat2];
  return (orb1 + orb2) / 2;
}
function getPlanetsWithDegrees(horoscope) {
  const result = [];
  if (horoscope.CelestialBodies?.all) {
    for (const body of horoscope.CelestialBodies.all) {
      result.push({ key: body.key, degrees: body.ChartPosition.Ecliptic.DecimalDegrees });
    }
  }
  if (horoscope.CelestialPoints?.all) {
    for (const point of horoscope.CelestialPoints.all) {
      result.push({ key: point.key, degrees: point.ChartPosition.Ecliptic.DecimalDegrees });
    }
  }
  if (horoscope.Ascendant) {
    result.push({ key: "ascendant", degrees: horoscope.Ascendant.ChartPosition.Ecliptic.DecimalDegrees });
  }
  if (horoscope.Midheaven) {
    result.push({ key: "midheaven", degrees: horoscope.Midheaven.ChartPosition.Ecliptic.DecimalDegrees });
  }
  return result;
}
function calculateSynastryAspects(horoscope1, horoscope2, orbConfig = {}) {
  const synastryAspects = [];
  const planets1 = getPlanetsWithDegrees(horoscope1);
  const planets2 = getPlanetsWithDegrees(horoscope2);
  for (const p1 of planets1) {
    for (const p2 of planets2) {
      const planet1 = convertPlanetKey(p1.key);
      const planet2 = convertPlanetKey(p2.key);
      if (!planet1 || !planet2) continue;
      const diff = Math.abs(p1.degrees - p2.degrees);
      const normalizedDiff = diff > 180 ? 360 - diff : diff;
      const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);
      for (const [aspectType, angle] of Object.entries(ASPECT_ANGLES2)) {
        const aspectDiff = Math.abs(normalizedDiff - angle);
        if (aspectDiff <= maxOrb) {
          if (shouldSkipAspect(planet1, planet2, aspectType)) {
            break;
          }
          synastryAspects.push({
            planet1,
            chart1Owner: "chart1",
            planet2,
            chart2Owner: "chart2",
            aspect: aspectType,
            orb: aspectDiff
          });
          break;
        }
      }
    }
  }
  return synastryAspects;
}
function calculateNatalAspects(horoscope, orbConfig = {}, aspectTypes) {
  const aspects = [];
  const planets = getPlanetsWithDegrees(horoscope);
  const typesToCheck = aspectTypes || Object.keys(ASPECT_ANGLES2);
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const p1 = planets[i];
      const p2 = planets[j];
      const planet1 = convertPlanetKey(p1.key);
      const planet2 = convertPlanetKey(p2.key);
      if (!planet1 || !planet2) continue;
      const diff = Math.abs(p1.degrees - p2.degrees);
      const normalizedDiff = diff > 180 ? 360 - diff : diff;
      const maxOrb = getOrbForPlanets(planet1, planet2, orbConfig);
      for (const aspectType of typesToCheck) {
        const angle = ASPECT_ANGLES2[aspectType];
        const aspectDiff = Math.abs(normalizedDiff - angle);
        if (aspectDiff <= maxOrb) {
          if (shouldSkipAspect(planet1, planet2, aspectType)) {
            break;
          }
          aspects.push({
            planet1,
            planet2,
            aspect: aspectType,
            orb: aspectDiff
          });
          break;
        }
      }
    }
  }
  return aspects;
}
function ZodiacWheel({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  ascendantDegree = 0,
  theme = "light",
  onSignHover,
  hoveredSign,
  onSignClick
}) {
  const signArcAngle = 30;
  const middleRadius = (outerRadius + innerRadius) / 2;
  const isDark = theme === "dark";
  const strokeColor = isDark ? "#555" : "#333";
  const segmentStroke = isDark ? "#777" : "#666";
  const markerColor = isDark ? "#666" : "#999";
  return /* @__PURE__ */ jsxs("g", { className: "zodiac-wheel", children: [
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: centerX,
        cy: centerY,
        r: outerRadius,
        fill: "none",
        stroke: strokeColor,
        strokeWidth: 1
      }
    ),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: centerX,
        cy: centerY,
        r: innerRadius,
        fill: "none",
        stroke: strokeColor,
        strokeWidth: 1
      }
    ),
    ZODIAC_ORDER.map((sign, index) => {
      const startDegree = index * signArcAngle;
      const startAngle = getMandalaAngle(startDegree, ascendantDegree);
      const endAngle = getMandalaAngle(startDegree + signArcAngle, ascendantDegree);
      const outerStart = getPointOnCircle(centerX, centerY, outerRadius, startAngle);
      const outerEnd = getPointOnCircle(centerX, centerY, outerRadius, endAngle);
      const innerStart = getPointOnCircle(centerX, centerY, innerRadius, startAngle);
      const innerEnd = getPointOnCircle(centerX, centerY, innerRadius, endAngle);
      const symbolAngle = getMandalaAngle(startDegree + signArcAngle / 2, ascendantDegree);
      const symbolPos = getPointOnCircle(centerX, centerY, middleRadius, symbolAngle);
      const element = SIGN_ELEMENTS[sign];
      const baseColor = ELEMENT_COLORS[element];
      const isHovered = hoveredSign === sign;
      const fillOpacity = isHovered ? isDark ? "70" : "55" : isDark ? "40" : "30";
      const fillColor = baseColor + fillOpacity;
      const pathD = `
          M ${outerStart.x} ${outerStart.y}
          A ${outerRadius} ${outerRadius} 0 0 0 ${outerEnd.x} ${outerEnd.y}
          L ${innerEnd.x} ${innerEnd.y}
          A ${innerRadius} ${innerRadius} 0 0 1 ${innerStart.x} ${innerStart.y}
          Z
        `;
      return /* @__PURE__ */ jsxs(
        "g",
        {
          className: `sign-segment sign-${sign.toLowerCase()}${isHovered ? " hovered" : ""}`,
          style: { cursor: "pointer" },
          onMouseEnter: () => onSignHover?.(sign),
          onMouseLeave: () => onSignHover?.(null),
          onClick: () => onSignClick?.(sign),
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: pathD,
                fill: fillColor,
                stroke: isHovered ? baseColor : segmentStroke,
                strokeWidth: isHovered ? 1.5 : 0.5,
                style: { transition: "fill 0.15s ease-out, stroke 0.15s ease-out" }
              }
            ),
            /* @__PURE__ */ jsxs(
              "text",
              {
                x: symbolPos.x,
                y: symbolPos.y,
                textAnchor: "middle",
                dominantBaseline: "central",
                fontSize: isHovered ? outerRadius * 0.095 : outerRadius * 0.08,
                fill: ELEMENT_COLORS[element],
                fontWeight: "bold",
                style: {
                  fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
                  transition: "font-size 0.15s ease-out"
                },
                children: [
                  ZODIAC_SYMBOLS[sign],
                  "\uFE0E"
                ]
              }
            )
          ]
        },
        sign
      );
    }),
    Array.from({ length: 72 }, (_, i) => {
      const degree = i * 5;
      const angle = getMandalaAngle(degree, ascendantDegree);
      const isMainDivision = degree % 30 === 0;
      const markerLength = isMainDivision ? (outerRadius - innerRadius) * 0.5 : (outerRadius - innerRadius) * 0.2;
      const outer = getPointOnCircle(centerX, centerY, innerRadius, angle);
      const inner = getPointOnCircle(centerX, centerY, innerRadius - markerLength, angle);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: outer.x,
          y1: outer.y,
          x2: inner.x,
          y2: inner.y,
          stroke: markerColor,
          strokeWidth: isMainDivision ? 1 : 0.5
        },
        `marker-${degree}`
      );
    })
  ] });
}
var ANGLE_LABELS = {
  1: "AS",
  4: "IC",
  7: "DS",
  10: "MC"
};
var HOUSE_TO_ANGLE = {
  1: "ascendant",
  4: "imum_coeli",
  7: "descendant",
  10: "midheaven"
};
function HouseWheel({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  houses,
  ascendantDegree = 0,
  isSecondChart = false,
  color,
  theme = "light",
  onHouseHover,
  hoveredHouse,
  onHouseClick,
  onAngleClick
}) {
  const sortedHouses = [...houses].sort((a, b) => a.house - b.house);
  const isDark = theme === "dark";
  const lineColor = isSecondChart ? color || "#d94a4a" : isDark ? "#ddd" : "#000";
  const textColor = isSecondChart ? color || "#d94a4a" : isDark ? "#bbb" : "#555";
  const angleLabelColor = isDark ? "#fff" : "#000";
  const nonAngularLineColor = isDark ? "#666" : "#999";
  return /* @__PURE__ */ jsx("g", { className: `house-wheel ${isSecondChart ? "house-wheel-second" : ""}`, children: sortedHouses.map((house, index) => {
    const houseDegree = getAbsoluteDegree(house.sign, house.degree);
    const angle = getMandalaAngle(houseDegree, ascendantDegree);
    const outer = getPointOnCircle(centerX, centerY, outerRadius, angle);
    const inner = getPointOnCircle(centerX, centerY, innerRadius, angle);
    const nextHouse = sortedHouses[(index + 1) % 12];
    const nextHouseDegree = getAbsoluteDegree(nextHouse.sign, nextHouse.degree);
    let midDegree = (houseDegree + nextHouseDegree) / 2;
    if (nextHouseDegree < houseDegree) {
      midDegree = (houseDegree + nextHouseDegree + 360) / 2 % 360;
    }
    const numberAngle = getMandalaAngle(midDegree, ascendantDegree);
    const numberRadius = innerRadius * 0.7;
    const numberPos = getPointOnCircle(centerX, centerY, numberRadius, numberAngle);
    const isAngularHouse = [1, 4, 7, 10].includes(house.house);
    const angleLabel = ANGLE_LABELS[house.house];
    const labelRadius = isSecondChart ? innerRadius * 0.92 : outerRadius * 1.02;
    const labelPos = getPointOnCircle(centerX, centerY, labelRadius, angle);
    return /* @__PURE__ */ jsxs("g", { className: `house-division house-${house.house}`, children: [
      /* @__PURE__ */ jsx(
        "line",
        {
          x1: outer.x,
          y1: outer.y,
          x2: inner.x,
          y2: inner.y,
          stroke: isSecondChart ? lineColor : isAngularHouse ? lineColor : nonAngularLineColor,
          strokeWidth: isAngularHouse ? isSecondChart ? 1.5 : 2 : 0.5,
          strokeDasharray: isSecondChart ? "4,2" : isAngularHouse ? void 0 : "2,2",
          opacity: isSecondChart ? 0.7 : 1
        }
      ),
      /* @__PURE__ */ jsx(
        "text",
        {
          x: numberPos.x,
          y: numberPos.y,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: outerRadius * 0.055,
          fill: textColor,
          fontWeight: isAngularHouse ? "bold" : "normal",
          style: { cursor: "pointer" },
          onMouseEnter: () => onHouseHover?.(house.house),
          onMouseLeave: () => onHouseHover?.(null),
          onClick: () => onHouseClick?.(house.house, house.sign),
          children: house.house
        }
      ),
      angleLabel && /* @__PURE__ */ jsx(
        "text",
        {
          x: labelPos.x,
          y: labelPos.y,
          textAnchor: "middle",
          dominantBaseline: "central",
          fontSize: outerRadius * (isSecondChart ? 0.05 : 0.06),
          fill: angleLabelColor,
          fontWeight: "bold",
          opacity: isSecondChart ? 0.85 : 1,
          style: { cursor: "pointer" },
          onClick: () => onAngleClick?.(HOUSE_TO_ANGLE[house.house], house.sign),
          children: angleLabel
        }
      ),
      isSecondChart && index === 0 && /* @__PURE__ */ jsx(
        "circle",
        {
          cx: centerX,
          cy: centerY,
          r: innerRadius,
          fill: "none",
          stroke: lineColor,
          strokeWidth: 0.5,
          opacity: 0.5
        }
      )
    ] }, `house-${house.house}${isSecondChart ? "-second" : ""}`);
  }) });
}
function PlanetDisplay({
  centerX,
  centerY,
  radius,
  planets,
  ascendantDegree = 0,
  color = "#4a90d9",
  showDegrees = false,
  isOuter = false,
  theme = "light",
  onPlanetHover,
  hoveredPlanet,
  highlightedSign,
  highlightedHouse,
  houses = [],
  highlightedByAspect,
  onPlanetClick
}) {
  const isPlanetInHouse = (planet, houseNumber) => {
    if (!houses || houses.length === 0) return false;
    const planetDegree = getPlanetAbsoluteDegree(planet);
    const house = houses.find((h) => h.house === houseNumber);
    const nextHouse = houses.find((h) => h.house === houseNumber % 12 + 1);
    if (!house || !nextHouse) return false;
    const houseDegree = getAbsoluteDegree(house.sign, house.degree);
    const nextHouseDegree = getAbsoluteDegree(nextHouse.sign, nextHouse.degree);
    if (nextHouseDegree < houseDegree) {
      return planetDegree >= houseDegree || planetDegree < nextHouseDegree;
    } else {
      return planetDegree >= houseDegree && planetDegree < nextHouseDegree;
    }
  };
  const filteredPlanets = planets.filter(
    (planet) => planet.planet !== "Ascendant" && planet.planet !== "Midheaven"
  );
  const planetsWithDegrees = filteredPlanets.map((planet) => ({
    planet,
    absoluteDegree: getPlanetAbsoluteDegree(planet)
  }));
  const adjustedPlanets = adjustPlanetPositions(planetsWithDegrees, 8, ascendantDegree);
  const planetRadius = isOuter ? radius * 1.08 : radius * 0.88;
  const lineRadius = isOuter ? radius * 1 : radius * 0.95;
  const degreeRadius = isOuter ? radius * 1.18 : radius * 0.78;
  return /* @__PURE__ */ jsx("g", { className: `planets ${isOuter ? "outer-planets" : "inner-planets"}`, children: adjustedPlanets.map(({ planet, absoluteDegree, offset }) => {
    const actualAngle = getMandalaAngle(absoluteDegree, ascendantDegree);
    const actualPos = getPointOnCircle(centerX, centerY, lineRadius, actualAngle);
    const displayAngle = getMandalaAngle(absoluteDegree + offset, ascendantDegree);
    const symbolPos = getPointOnCircle(centerX, centerY, planetRadius, displayAngle);
    const degreePos = getPointOnCircle(centerX, centerY, degreeRadius, displayAngle);
    const symbol = PLANET_SYMBOLS[planet.planet];
    const isAngle = planet.planet === "Ascendant" || planet.planet === "Midheaven";
    const fontSize = isAngle ? radius * 0.09 : radius * 0.14;
    const isHighlighted = highlightedSign && planet.sign === highlightedSign;
    const isInHighlightedHouse = highlightedHouse && isPlanetInHouse(planet, highlightedHouse);
    const isHighlightedByAspect = highlightedByAspect && (planet.planet === highlightedByAspect.planet1 || planet.planet === highlightedByAspect.planet2);
    const isHovered = hoveredPlanet === planet.planet;
    const baseOpacity = 1;
    let highlightOpacity = baseOpacity;
    if (highlightedSign) {
      highlightOpacity = isHighlighted ? 1 : 0.4;
    }
    if (highlightedHouse) {
      highlightOpacity = isInHighlightedHouse ? 1 : 0.4;
    }
    if (highlightedByAspect) {
      highlightOpacity = isHighlightedByAspect ? 1.2 : 0.3;
    }
    return /* @__PURE__ */ jsxs(
      "g",
      {
        className: `planet planet-${planet.planet.toLowerCase()}${isHighlighted ? " highlighted" : ""}${isHovered ? " hovered" : ""}${isInHighlightedHouse ? " in-highlighted-house" : ""}${isHighlightedByAspect ? " highlighted-by-aspect" : ""}`,
        "data-degree": absoluteDegree,
        "data-actual-x": actualPos.x,
        "data-actual-y": actualPos.y,
        style: { cursor: "pointer" },
        onMouseEnter: () => onPlanetHover?.(planet.planet),
        onMouseLeave: () => onPlanetHover?.(null),
        onClick: () => onPlanetClick?.(planet),
        opacity: highlightOpacity,
        children: [
          (isHighlighted || isInHighlightedHouse || isHighlightedByAspect) && /* @__PURE__ */ jsx(
            "circle",
            {
              cx: symbolPos.x,
              cy: symbolPos.y,
              r: fontSize * 0.8,
              fill: color,
              opacity: isHighlightedByAspect ? 0.35 : 0.25,
              style: { filter: "blur(4px)" }
            }
          ),
          Math.abs(offset) > 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "circle",
              {
                cx: actualPos.x,
                cy: actualPos.y,
                r: 2,
                fill: color,
                opacity: 0.6 * highlightOpacity
              }
            ),
            /* @__PURE__ */ jsx(
              "line",
              {
                x1: actualPos.x,
                y1: actualPos.y,
                x2: symbolPos.x,
                y2: symbolPos.y,
                stroke: color,
                strokeWidth: 0.75,
                strokeDasharray: "3,2",
                opacity: 0.5 * highlightOpacity
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "text",
            {
              x: symbolPos.x,
              y: symbolPos.y,
              textAnchor: "middle",
              dominantBaseline: "central",
              fontSize: isHighlighted || isInHighlightedHouse || isHighlightedByAspect ? fontSize * 1.15 : fontSize,
              fill: color,
              fontWeight: isAngle || isHighlighted || isInHighlightedHouse || isHighlightedByAspect ? "bold" : "normal",
              style: {
                fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
                transition: "font-size 0.15s ease-out"
              },
              children: [
                symbol,
                "\uFE0E"
              ]
            }
          ),
          planet.retrograde && /* @__PURE__ */ jsx(
            "text",
            {
              x: symbolPos.x + fontSize * 0.45,
              y: symbolPos.y - fontSize * 0.35,
              textAnchor: "start",
              dominantBaseline: "central",
              fontSize: fontSize * 0.32,
              fill: color,
              opacity: 0.9,
              style: {
                fontFamily: "Segoe UI Symbol, Symbola, sans-serif"
              },
              children: "R"
            }
          ),
          showDegrees && /* @__PURE__ */ jsx(
            "text",
            {
              x: degreePos.x,
              y: degreePos.y,
              textAnchor: "middle",
              dominantBaseline: "central",
              fontSize: fontSize * 0.35,
              fill: color,
              opacity: 0.8,
              children: formatDegree(planet.degree)
            }
          )
        ]
      },
      planet.planet
    );
  }) });
}
var ANGLE_POINTS = ["Ascendant", "Midheaven"];
function shouldSkipAspect2(planet1, planet2, aspectType) {
  if (aspectType === "opposition") {
    const isNodePair = planet1 === "NorthNode" && planet2 === "SouthNode" || planet1 === "SouthNode" && planet2 === "NorthNode";
    if (isNodePair) return true;
  }
  return false;
}
function findPlanet(planets, name) {
  return planets.find((p) => p.planet === name);
}
function AspectLines({
  centerX,
  centerY,
  radius,
  aspects = [],
  synastryAspects = [],
  planets,
  secondChartPlanets = [],
  ascendantDegree = 0,
  aspectColors = {},
  includeAnglesInSynastry = false,
  hoveredPlanet = null,
  onAspectClick
}) {
  const colors = { ...DEFAULT_ASPECT_COLORS, ...aspectColors };
  const aspectRadius = radius * 0.7;
  let filteredNatalAspects = aspects.filter((a) => !shouldSkipAspect2(a.planet1, a.planet2, a.aspect)).filter((a) => includeAnglesInSynastry || !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2));
  let filteredSynastryAspects = synastryAspects.filter((a) => !shouldSkipAspect2(a.planet1, a.planet2, a.aspect)).filter((a) => includeAnglesInSynastry || !ANGLE_POINTS.includes(a.planet1) && !ANGLE_POINTS.includes(a.planet2));
  if (hoveredPlanet) {
    filteredNatalAspects = filteredNatalAspects.filter(
      (a) => a.planet1 === hoveredPlanet || a.planet2 === hoveredPlanet
    );
    filteredSynastryAspects = filteredSynastryAspects.filter(
      (a) => a.planet1 === hoveredPlanet || a.planet2 === hoveredPlanet
    );
  }
  const getPlanetCoords = (planetName, isSecondChart = false) => {
    const planetList = isSecondChart ? secondChartPlanets : planets;
    const planet = findPlanet(planetList, planetName);
    if (!planet) return null;
    const absoluteDegree = getPlanetAbsoluteDegree(planet);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    return getPointOnCircle(centerX, centerY, aspectRadius, angle);
  };
  return /* @__PURE__ */ jsxs("g", { className: "aspect-lines", children: [
    filteredNatalAspects.map((aspect, index) => {
      const pos1 = getPlanetCoords(aspect.planet1);
      const pos2 = getPlanetCoords(aspect.planet2);
      if (!pos1 || !pos2) return null;
      const color = colors[aspect.aspect];
      const style = ASPECT_LINE_STYLES[aspect.aspect];
      const maxOrb = 10;
      const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          stroke: color,
          strokeWidth: style.strokeWidth,
          strokeDasharray: style.dashArray,
          opacity,
          className: `aspect-line aspect-${aspect.aspect}`,
          style: { cursor: onAspectClick ? "pointer" : "default" },
          onClick: () => onAspectClick?.(aspect)
        },
        `natal-${index}-${aspect.planet1}-${aspect.planet2}`
      );
    }),
    filteredSynastryAspects.map((aspect, index) => {
      const isP1SecondChart = aspect.chart1Owner === "chart2";
      const isP2SecondChart = aspect.chart2Owner === "chart2";
      const pos1 = getPlanetCoords(aspect.planet1, isP1SecondChart);
      const pos2 = getPlanetCoords(aspect.planet2, isP2SecondChart);
      if (!pos1 || !pos2) return null;
      const color = colors[aspect.aspect];
      const style = ASPECT_LINE_STYLES[aspect.aspect];
      const maxOrb = 10;
      const opacity = Math.max(0.3, 1 - aspect.orb / maxOrb);
      return /* @__PURE__ */ jsx(
        "line",
        {
          x1: pos1.x,
          y1: pos1.y,
          x2: pos2.x,
          y2: pos2.y,
          stroke: color,
          strokeWidth: style.strokeWidth * 1.2,
          strokeDasharray: style.dashArray,
          opacity,
          className: `aspect-line synastry-aspect aspect-${aspect.aspect}`,
          style: { cursor: onAspectClick ? "pointer" : "default" },
          onClick: () => onAspectClick?.(aspect)
        },
        `synastry-${index}-${aspect.planet1}-${aspect.planet2}`
      );
    })
  ] });
}
function PlanetProjections({
  centerX,
  centerY,
  outerRadius,
  innerRadius,
  planets,
  secondChartPlanets,
  ascendantDegree = 0,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a"
}) {
  const tickLength = (outerRadius - innerRadius) * 0.3;
  const filteredPlanets = planets.filter(
    (p) => p.planet !== "Ascendant" && p.planet !== "Midheaven"
  );
  const filteredSecondPlanets = secondChartPlanets?.filter(
    (p) => p.planet !== "Ascendant" && p.planet !== "Midheaven"
  );
  const renderProjection = (planet, color, isOuter, key) => {
    const absoluteDegree = getAbsoluteDegree(planet.sign, planet.degree);
    const angle = getMandalaAngle(absoluteDegree, ascendantDegree);
    const startRadius = innerRadius;
    const endRadius = innerRadius + tickLength;
    const start = getPointOnCircle(centerX, centerY, startRadius, angle);
    const end = getPointOnCircle(centerX, centerY, endRadius, angle);
    return /* @__PURE__ */ jsx(
      "line",
      {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        stroke: color,
        strokeWidth: 2,
        opacity: 0.8
      },
      key
    );
  };
  return /* @__PURE__ */ jsxs("g", { className: "planet-projections", children: [
    filteredPlanets.map(
      (planet, index) => renderProjection(planet, innerChartColor, false, `proj-1-${index}`)
    ),
    filteredSecondPlanets?.map(
      (planet, index) => renderProjection(planet, outerChartColor, true, `proj-2-${index}`)
    )
  ] });
}
function AstroMandala({
  chart,
  secondChart,
  synastryAspects,
  size = 500,
  showAspects = true,
  showDegrees = false,
  showHouses = true,
  showSecondChartHouses = false,
  showPlanetProjections = true,
  aspectTypesFilter,
  includeAnglesInSynastry = false,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a",
  aspectColors,
  theme = "light",
  className,
  onSignClick,
  onHouseClick,
  onPlanetClick,
  onAspectClick,
  onAngleClick
}) {
  const centerX = size / 2;
  const centerY = size / 2;
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [hoveredSign, setHoveredSign] = useState(null);
  const [hoveredHouse, setHoveredHouse] = useState(null);
  const handlePlanetHover = useCallback((planet) => {
    setHoveredPlanet(planet);
  }, []);
  const handleSignHover = useCallback((sign) => {
    setHoveredSign(sign);
  }, []);
  const handleHouseHover = useCallback((house) => {
    setHoveredHouse(house);
  }, []);
  const handleSvgMouseLeave = useCallback(() => {
    setHoveredPlanet(null);
    setHoveredSign(null);
    setHoveredHouse(null);
  }, []);
  const isDark = theme === "dark";
  const colors = {
    background: isDark ? "#1a1a2e" : "#fafafa",
    backgroundStroke: isDark ? "#333" : "#ddd",
    centerFill: isDark ? "#16162a" : "#fff",
    centerStroke: isDark ? "#444" : "#ccc"};
  const isSynastry = Boolean(secondChart);
  const showBothHouses = showSecondChartHouses && isSynastry && secondChart;
  const outerRadius = size * 0.45;
  const zodiacInnerRadius = size * 0.38;
  const outerHouseRingOuter = zodiacInnerRadius;
  const outerHouseRingInner = showBothHouses ? size * 0.3 : size * 0.15;
  const innerHouseRingOuter = showBothHouses ? size * 0.3 : size * 0.15;
  const innerHouseRingInner = showBothHouses ? size * 0.22 : size * 0.15;
  const planetRadius = showBothHouses ? size * 0.26 : size * 0.32;
  const centerCircleRadius = showBothHouses ? size * 0.12 : size * 0.15;
  const ascendantDegree = useMemo(() => {
    const ascendant = chart.planets.find((p) => p.planet === "Ascendant");
    if (ascendant) {
      return getAbsoluteDegree(ascendant.sign, ascendant.degree);
    }
    const firstHouse = chart.houses.find((h) => h.house === 1);
    if (firstHouse) {
      return getAbsoluteDegree(firstHouse.sign, firstHouse.degree);
    }
    return 0;
  }, [chart.planets, chart.houses]);
  const filteredChartAspects = useMemo(() => {
    if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
      return chart.aspects;
    }
    return chart.aspects.filter((a) => aspectTypesFilter.includes(a.aspect));
  }, [chart.aspects, aspectTypesFilter]);
  const filteredSynastryAspects = useMemo(() => {
    if (!synastryAspects) return void 0;
    if (!aspectTypesFilter || aspectTypesFilter.length === 0) {
      return synastryAspects;
    }
    return synastryAspects.filter((a) => aspectTypesFilter.includes(a.aspect));
  }, [synastryAspects, aspectTypesFilter]);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      className,
      onMouseLeave: handleSvgMouseLeave,
      style: {
        fontFamily: "Arial, sans-serif",
        maxWidth: "100%",
        height: "auto",
        display: "block",
        overflow: "visible",
        // Prevent external CSS from affecting the SVG
        contain: "layout style"
      },
      preserveAspectRatio: "xMidYMid meet",
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: centerX,
            cy: centerY,
            r: outerRadius + 5,
            fill: colors.background,
            stroke: colors.backgroundStroke,
            strokeWidth: 1
          }
        ),
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: centerX,
            cy: centerY,
            r: centerCircleRadius,
            fill: colors.centerFill,
            stroke: colors.centerStroke,
            strokeWidth: 0.5
          }
        ),
        /* @__PURE__ */ jsx(
          ZodiacWheel,
          {
            centerX,
            centerY,
            outerRadius,
            innerRadius: zodiacInnerRadius,
            ascendantDegree,
            theme,
            onSignHover: handleSignHover,
            hoveredSign,
            onSignClick
          }
        ),
        showPlanetProjections && /* @__PURE__ */ jsx(
          PlanetProjections,
          {
            centerX,
            centerY,
            outerRadius,
            innerRadius: zodiacInnerRadius,
            planets: chart.planets,
            secondChartPlanets: secondChart?.planets,
            ascendantDegree,
            innerChartColor,
            outerChartColor
          }
        ),
        showHouses && chart.houses.length > 0 && /* @__PURE__ */ jsx(
          HouseWheel,
          {
            centerX,
            centerY,
            outerRadius: outerHouseRingOuter,
            innerRadius: outerHouseRingInner,
            houses: chart.houses,
            ascendantDegree,
            theme,
            onHouseHover: handleHouseHover,
            hoveredHouse,
            onHouseClick,
            onAngleClick
          }
        ),
        showSecondChartHouses && showBothHouses && secondChart.houses.length > 0 && /* @__PURE__ */ jsx(
          HouseWheel,
          {
            centerX,
            centerY,
            outerRadius: innerHouseRingOuter,
            innerRadius: innerHouseRingInner,
            houses: secondChart.houses,
            ascendantDegree,
            isSecondChart: true,
            color: outerChartColor,
            theme,
            onHouseHover: handleHouseHover,
            hoveredHouse,
            onHouseClick,
            onAngleClick
          }
        ),
        showAspects && /* @__PURE__ */ jsx(
          AspectLines,
          {
            centerX,
            centerY,
            radius: planetRadius,
            aspects: filteredChartAspects,
            synastryAspects: filteredSynastryAspects,
            planets: chart.planets,
            secondChartPlanets: secondChart?.planets,
            ascendantDegree,
            aspectColors,
            includeAnglesInSynastry,
            hoveredPlanet,
            onAspectClick
          }
        ),
        /* @__PURE__ */ jsx(
          PlanetDisplay,
          {
            centerX,
            centerY,
            radius: planetRadius,
            planets: chart.planets,
            ascendantDegree,
            color: innerChartColor,
            showDegrees,
            isOuter: false,
            theme,
            onPlanetHover: handlePlanetHover,
            hoveredPlanet,
            highlightedSign: hoveredSign,
            highlightedHouse: hoveredHouse,
            houses: chart.houses,
            onPlanetClick
          }
        ),
        isSynastry && secondChart && /* @__PURE__ */ jsx(
          PlanetDisplay,
          {
            centerX,
            centerY,
            radius: planetRadius,
            planets: secondChart.planets,
            ascendantDegree,
            color: outerChartColor,
            showDegrees,
            isOuter: true,
            theme,
            onPlanetHover: handlePlanetHover,
            hoveredPlanet,
            highlightedSign: hoveredSign,
            highlightedHouse: hoveredHouse,
            houses: secondChart?.houses || [],
            onPlanetClick
          }
        )
      ]
    }
  );
}
var PLANET_NAMES = {
  en: {
    Sun: "Sun",
    Moon: "Moon",
    Mercury: "Mercury",
    Venus: "Venus",
    Mars: "Mars",
    Jupiter: "Jupiter",
    Saturn: "Saturn",
    Uranus: "Uranus",
    Neptune: "Neptune",
    Pluto: "Pluto",
    NorthNode: "Node",
    SouthNode: "S.Node",
    Chiron: "Chiron",
    Lilith: "Lilith",
    Ascendant: "ASC",
    Midheaven: "MC"
  },
  es: {
    Sun: "Sol",
    Moon: "Luna",
    Mercury: "Mercurio",
    Venus: "Venus",
    Mars: "Marte",
    Jupiter: "J\xFApiter",
    Saturn: "Saturno",
    Uranus: "Urano",
    Neptune: "Neptuno",
    Pluto: "Plut\xF3n",
    NorthNode: "Nodo",
    SouthNode: "Nodo S.",
    Chiron: "Quir\xF3n",
    Lilith: "Lilith",
    Ascendant: "ASC",
    Midheaven: "MC"
  }
};
function ChartInfoPanel({
  chart,
  secondChart,
  theme = "light",
  language = "en",
  showHouses = true,
  showElements = true,
  className
}) {
  const isDark = theme === "dark";
  const isSynastry = Boolean(secondChart);
  const chart1Color = "#4a90d9";
  const chart2Color = "#d94a4a";
  const planetOrder = [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "NorthNode",
    "Lilith",
    "Chiron"
  ];
  const sortPlanets = (planets) => {
    return [...planets].filter((p) => planetOrder.includes(p.planet)).sort((a, b) => planetOrder.indexOf(a.planet) - planetOrder.indexOf(b.planet));
  };
  const sortedPlanets1 = useMemo(() => sortPlanets(chart.planets), [chart.planets]);
  const sortedPlanets2 = useMemo(() => secondChart ? sortPlanets(secondChart.planets) : [], [secondChart]);
  const formatDegree2 = (degree) => {
    const deg = Math.floor(degree);
    const min = Math.round((degree - deg) * 60);
    return `${deg}\xB0${min.toString().padStart(2, "0")}'`;
  };
  const getPlanetName = (planet) => {
    return PLANET_NAMES[language][planet] || planet;
  };
  const containerStyle = {
    backgroundColor: isDark ? "#1a1a2e" : "#fff",
    color: isDark ? "#e0e0e0" : "#333",
    padding: "1rem",
    borderRadius: "8px",
    border: isDark ? "1px solid #333" : "1px solid #ddd",
    fontSize: "14px",
    fontFamily: "system-ui, sans-serif",
    maxWidth: isSynastry ? "420px" : "320px"
  };
  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "0.5rem",
    marginTop: "0.75rem",
    color: isDark ? "#fff" : "#333"
  };
  const symbolStyle = {
    fontFamily: "Segoe UI Symbol, Symbola, sans-serif",
    fontSize: "16px"
  };
  const cellStyle = {
    padding: "0.3rem 0.25rem",
    borderBottom: isDark ? "1px solid #333" : "1px solid #eee",
    whiteSpace: "nowrap"
  };
  const renderPosition = (planet, color) => {
    if (!planet) return null;
    return /* @__PURE__ */ jsxs("span", { style: { color }, children: [
      /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[planet.sign] }),
      " ",
      formatDegree2(planet.degree),
      planet.retrograde && /* @__PURE__ */ jsx("span", { style: { fontSize: "10px", marginLeft: "2px", color: isDark ? "#ff6b6b" : "#c00" }, children: "\u211C" })
    ] });
  };
  const houses1 = useMemo(() => [...chart.houses].sort((a, b) => a.house - b.house), [chart.houses]);
  const houses2 = useMemo(() => secondChart ? [...secondChart.houses].sort((a, b) => a.house - b.house) : [], [secondChart]);
  const getHouseLabel = (num) => {
    if (num === 1) return "ASC";
    if (num === 4) return "IC";
    if (num === 7) return "DSC";
    if (num === 10) return "MC";
    return "";
  };
  return /* @__PURE__ */ jsxs("div", { style: containerStyle, className, children: [
    isSynastry && /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "2rem",
      marginBottom: "0.5rem",
      paddingBottom: "0.5rem",
      borderBottom: isDark ? "1px solid #444" : "1px solid #ddd"
    }, children: [
      /* @__PURE__ */ jsx("div", { style: { color: chart1Color, fontWeight: "bold", fontSize: "13px", minWidth: "90px", textAlign: "center" }, children: chart.label || (language === "es" ? "Persona A" : "Person A") }),
      /* @__PURE__ */ jsx("div", { style: { color: chart2Color, fontWeight: "bold", fontSize: "13px", minWidth: "90px", textAlign: "center" }, children: secondChart?.label || (language === "es" ? "Persona B" : "Person B") })
    ] }),
    /* @__PURE__ */ jsx("table", { style: { width: "100%", borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: planetOrder.map((planetName) => {
      const planet1 = sortedPlanets1.find((p) => p.planet === planetName);
      const planet2 = sortedPlanets2.find((p) => p.planet === planetName);
      if (!planet1 && !planet2) return null;
      return /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, ...symbolStyle, color: isDark ? "#888" : "#666", width: "24px" }, children: PLANET_SYMBOLS[planetName] }),
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, fontWeight: 500, minWidth: "70px" }, children: getPlanetName(planetName) }),
        /* @__PURE__ */ jsx("td", { style: { ...cellStyle, minWidth: "90px" }, children: renderPosition(planet1, isSynastry ? chart1Color : isDark ? "#e0e0e0" : "#333") }),
        isSynastry && /* @__PURE__ */ jsx("td", { style: { ...cellStyle, minWidth: "90px" }, children: renderPosition(planet2, chart2Color) })
      ] }, planetName);
    }) }) }),
    showHouses && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: sectionTitleStyle, children: [
        language === "es" ? "Casas:" : "Houses:",
        " (Placidus)"
      ] }),
      /* @__PURE__ */ jsx("table", { style: { width: "100%", borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: [1, 4, 7, 10].map((num) => {
        const house1 = houses1.find((h) => h.house === num);
        const house2 = houses2.find((h) => h.house === num);
        const label = getHouseLabel(num);
        return /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { style: { ...cellStyle, fontWeight: "bold", width: "40px" }, children: [
            label,
            ":"
          ] }),
          /* @__PURE__ */ jsx("td", { style: { ...cellStyle, color: isSynastry ? chart1Color : isDark ? "#e0e0e0" : "#333" }, children: house1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[house1.sign] }),
            " ",
            formatDegree2(house1.degree)
          ] }) }),
          isSynastry && /* @__PURE__ */ jsx("td", { style: { ...cellStyle, color: chart2Color }, children: house2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { style: symbolStyle, children: ZODIAC_SYMBOLS[house2.sign] }),
            " ",
            formatDegree2(house2.degree)
          ] }) })
        ] }, num);
      }) }) })
    ] }),
    showElements && !isSynastry && /* @__PURE__ */ jsx(ElementsDisplay, { chart, language, isDark })
  ] });
}
function ElementsDisplay({ chart, language, isDark }) {
  const elementCounts = useMemo(() => {
    const counts = { fire: 0, earth: 0, air: 0, water: 0 };
    const mainPlanets = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];
    chart.planets.forEach((planet) => {
      if (mainPlanets.includes(planet.planet)) {
        const element = SIGN_ELEMENTS[planet.sign];
        if (element && counts[element] !== void 0) {
          counts[element]++;
        }
      }
    });
    return counts;
  }, [chart.planets]);
  const sectionTitleStyle = {
    fontWeight: "bold",
    fontSize: "14px",
    marginBottom: "0.5rem",
    marginTop: "0.75rem",
    color: isDark ? "#fff" : "#333"
  };
  const elementEmojis = { fire: "\u{1F525}", earth: "\u{1F30D}", air: "\u{1F4A8}", water: "\u{1F4A7}" };
  const elementNames = {
    fire: language === "es" ? "Fuego" : "Fire",
    earth: language === "es" ? "Tierra" : "Earth",
    air: language === "es" ? "Aire" : "Air",
    water: language === "es" ? "Agua" : "Water"
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { style: sectionTitleStyle, children: language === "es" ? "Elementos" : "Elements" }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }, children: Object.entries(elementCounts).map(([element, count]) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        count,
        "x"
      ] }),
      /* @__PURE__ */ jsx("span", { children: elementEmojis[element] }),
      /* @__PURE__ */ jsx("span", { children: elementNames[element] })
    ] }, element)) })
  ] });
}
var signToInfoKey = {
  "Aries": "aries",
  "Taurus": "tauro",
  "Gemini": "geminis",
  "Cancer": "cancer",
  "Leo": "leo",
  "Virgo": "virgo",
  "Libra": "libra",
  "Scorpio": "escorpio",
  "Sagittarius": "sagitario",
  "Capricorn": "capricornio",
  "Aquarius": "acuario",
  "Pisces": "piscis"
};
var elementToInfoKey = {
  "fire": "fuego",
  "water": "agua",
  "earth": "tierra",
  "air": "aire"
};
var planetToInfoKey = {
  "Sun": "sol",
  "Moon": "luna",
  "Mercury": "mercurio",
  "Venus": "venus",
  "Mars": "marte",
  "Jupiter": "jupiter",
  "Saturn": "saturno",
  "Uranus": "urano",
  "Neptune": "neptuno",
  "Pluto": "pluton",
  "Chiron": "quiron",
  "Lilith": "lilith",
  "NorthNode": "nodoNorte",
  "SouthNode": "nodoSur",
  "Ascendant": null,
  "Midheaven": null
};
var aspectToInfoKey = {
  "conjunction": "conjuncion",
  "opposition": "oposicion",
  "trine": "trigono",
  "square": "cuadratura",
  "sextile": "sextil",
  "quincunx": "quincuncio",
  "semisextile": "sextil",
  "semisquare": "cuadratura",
  "sesquiquadrate": "cuadratura",
  "quintile": "quintil",
  "biquintile": "biquintil"
};
var houseToInfoKey = (house) => {
  return `casa${house}`;
};
function ExpandableSection({ title, children, defaultExpanded = false, theme }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxs("div", { style: {
    marginBottom: "0.75rem",
    borderRadius: "6px",
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setExpanded(!expanded),
        style: {
          width: "100%",
          padding: "0.75rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "none",
          backgroundColor: "transparent",
          color: isDark ? "#e0e0e0" : "#333",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: 600,
          textAlign: "left"
        },
        children: [
          /* @__PURE__ */ jsx("span", { children: title }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: "12px" }, children: expanded ? "\u25BC" : "\u25B6" })
        ]
      }
    ),
    expanded && /* @__PURE__ */ jsx("div", { style: { padding: "0 0.75rem 0.75rem" }, children })
  ] });
}
function LinkItem({ label, symbol, onClick, theme, color }) {
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.25rem",
        padding: "0.25rem 0.5rem",
        margin: "0.125rem",
        borderRadius: "4px",
        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.15)",
        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        color: color || (isDark ? "#a8c8f0" : "#2563eb"),
        cursor: "pointer",
        fontSize: "13px",
        textDecoration: "none"
      },
      children: [
        symbol && /* @__PURE__ */ jsx("span", { style: { fontSize: "14px" }, children: symbol }),
        /* @__PURE__ */ jsx("span", { children: label })
      ]
    }
  );
}
function ListRenderer({ items, theme }) {
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsx("ul", { style: {
    margin: 0,
    paddingLeft: "1.25rem",
    color: isDark ? "#ccc" : "#555",
    fontSize: "13px",
    lineHeight: 1.6
  }, children: items.map((item, i) => /* @__PURE__ */ jsx("li", { children: item }, i)) });
}
function EducationalInfoPanel({
  clickedItem,
  chart,
  theme,
  language,
  onClose,
  onItemClick
}) {
  const t = useMemo(() => getTranslations(language), [language]);
  const isDark = theme === "dark";
  const lang = language === "es" ? "es" : "en";
  if (!clickedItem) return null;
  const getPlanetsInSign = (sign) => {
    return chart.planets.filter((p) => p.sign === sign && p.planet !== "Ascendant" && p.planet !== "Midheaven");
  };
  const getPlanetsInHouse = (houseNum) => {
    const sortedHouses = [...chart.houses].sort((a, b) => {
      const degA = getAbsoluteDegreeFromSign(a.sign, a.degree);
      const degB = getAbsoluteDegreeFromSign(b.sign, b.degree);
      return degA - degB;
    });
    return chart.planets.filter((p) => {
      if (p.planet === "Ascendant" || p.planet === "Midheaven") return false;
      const planetDeg = getAbsoluteDegreeFromSign(p.sign, p.degree);
      const houseIndex = sortedHouses.findIndex((h) => h.house === houseNum);
      if (houseIndex === -1) return false;
      const houseCusp = sortedHouses[houseIndex];
      const nextHouse = sortedHouses[(houseIndex + 1) % 12];
      const houseStart = getAbsoluteDegreeFromSign(houseCusp.sign, houseCusp.degree);
      const houseEnd = getAbsoluteDegreeFromSign(nextHouse.sign, nextHouse.degree);
      if (houseStart < houseEnd) {
        return planetDeg >= houseStart && planetDeg < houseEnd;
      } else {
        return planetDeg >= houseStart || planetDeg < houseEnd;
      }
    });
  };
  const getAspectsForPlanet = (planetName) => {
    return chart.aspects.filter((a) => a.planet1 === planetName || a.planet2 === planetName);
  };
  const getHouseForPlanet = (planetSign, planetDegree) => {
    const planetAbsDeg = getAbsoluteDegreeFromSign(planetSign, planetDegree);
    const sortedHouses = [...chart.houses].sort((a, b) => {
      const degA = getAbsoluteDegreeFromSign(a.sign, a.degree);
      const degB = getAbsoluteDegreeFromSign(b.sign, b.degree);
      return degA - degB;
    });
    for (let i = 0; i < sortedHouses.length; i++) {
      const houseCusp = sortedHouses[i];
      const nextHouse = sortedHouses[(i + 1) % 12];
      const houseStart = getAbsoluteDegreeFromSign(houseCusp.sign, houseCusp.degree);
      const houseEnd = getAbsoluteDegreeFromSign(nextHouse.sign, nextHouse.degree);
      if (houseStart < houseEnd) {
        if (planetAbsDeg >= houseStart && planetAbsDeg < houseEnd) {
          return houseCusp.house;
        }
      } else {
        if (planetAbsDeg >= houseStart || planetAbsDeg < houseEnd) {
          return houseCusp.house;
        }
      }
    }
    return 1;
  };
  const getAbsoluteDegreeFromSign = (sign, degree) => {
    const signStarts = {
      "Aries": 0,
      "Taurus": 30,
      "Gemini": 60,
      "Cancer": 90,
      "Leo": 120,
      "Virgo": 150,
      "Libra": 180,
      "Scorpio": 210,
      "Sagittarius": 240,
      "Capricorn": 270,
      "Aquarius": 300,
      "Pisces": 330
    };
    return signStarts[sign] + degree;
  };
  const handleItemClick = (item) => {
    onItemClick?.(item);
  };
  const renderContent = () => {
    switch (clickedItem.type) {
      case "sign":
        return renderSignInfo();
      case "planet":
        return renderPlanetInfo();
      case "house":
        return renderHouseInfo();
      case "aspect":
        return renderAspectInfo();
      case "angle":
        return renderAngleInfo();
      default:
        return null;
    }
  };
  const renderSignInfo = () => {
    if (!clickedItem.sign) return null;
    const signKey = signToInfoKey[clickedItem.sign];
    const signInfo = infoSignos[signKey];
    const element = SIGN_ELEMENTS[clickedItem.sign];
    const elementKey = elementToInfoKey[element];
    const elementInfo = infoElementos[elementKey];
    const planetsInSign = getPlanetsInSign(clickedItem.sign);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "28px" }, children: ZODIAC_SYMBOLS[clickedItem.sign] }),
          /* @__PURE__ */ jsx("h3", { style: { margin: 0, fontSize: "20px", color: isDark ? "#fff" : "#333" }, children: signInfo.label[lang] })
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: 0,
          fontSize: "14px",
          fontStyle: "italic",
          color: isDark ? "#aaa" : "#666"
        }, children: signInfo.coreTheme[lang] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(100, 200, 100, 0.1)" : "rgba(34, 197, 94, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#86efac" : "#16a34a"
          }, children: t.lightQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: signInfo.light[lang], theme })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(200, 100, 100, 0.1)" : "rgba(239, 68, 68, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#fca5a5" : "#dc2626"
          }, children: t.shadowQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: signInfo.shadow[lang], theme })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.learning, theme, children: /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: signInfo.learning[lang] }) }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.questions, theme, children: /* @__PURE__ */ jsx(ListRenderer, { items: signInfo.questions[lang], theme }) }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.chartHints, theme, children: /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: signInfo.chartHint[lang] }) }),
      /* @__PURE__ */ jsxs(ExpandableSection, { title: `${t.element}: ${elementInfo.label[lang]}`, theme, children: [
        /* @__PURE__ */ jsx("p", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: elementInfo.intro[lang] }),
        /* @__PURE__ */ jsxs("div", { style: { marginTop: "0.5rem" }, children: [
          /* @__PURE__ */ jsx("h5", { style: { margin: "0 0 0.25rem 0", fontSize: "12px", color: isDark ? "#aaa" : "#666" }, children: t.balance }),
          /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "12px", color: isDark ? "#ccc" : "#555" }, children: [
            /* @__PURE__ */ jsxs("strong", { children: [
              t.balanced,
              ":"
            ] }),
            " ",
            elementInfo.balance.balanced[lang]
          ] })
        ] })
      ] }),
      planetsInSign.length > 0 && /* @__PURE__ */ jsx(ExpandableSection, { title: `${t.relatedPositions} (${planetsInSign.length})`, theme, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.25rem" }, children: planetsInSign.map((p) => {
        const house = getHouseForPlanet(p.sign, p.degree);
        return /* @__PURE__ */ jsx(
          LinkItem,
          {
            symbol: PLANET_SYMBOLS[p.planet],
            label: `${t.inHouse} ${house}`,
            onClick: () => handleItemClick({
              type: "planet",
              planet: p.planet,
              planetSign: p.sign,
              planetDegree: p.degree,
              planetHouse: house,
              isRetrograde: p.retrograde
            }),
            theme
          },
          p.planet
        );
      }) }) })
    ] });
  };
  const renderPlanetInfo = () => {
    if (!clickedItem.planet) return null;
    const planetKey = planetToInfoKey[clickedItem.planet];
    if (!planetKey) {
      if (clickedItem.planet === "Ascendant") {
        return renderAngleInfo();
      } else if (clickedItem.planet === "Midheaven") {
        return renderAngleInfo();
      }
      return null;
    }
    const planetInfo = infoCuerpos[planetKey];
    const aspects = getAspectsForPlanet(clickedItem.planet);
    const houseNum = clickedItem.planetHouse || (clickedItem.planetSign && clickedItem.planetDegree !== void 0 ? getHouseForPlanet(clickedItem.planetSign, clickedItem.planetDegree) : 1);
    const houseKey = houseToInfoKey(houseNum);
    const houseInfo = infoCasas[houseKey];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.5rem"
        }, children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "28px" }, children: PLANET_SYMBOLS[clickedItem.planet] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { style: { margin: 0, fontSize: "20px", color: isDark ? "#fff" : "#333" }, children: planetInfo.label[lang] }),
            clickedItem.planetSign && /* @__PURE__ */ jsxs("p", { style: {
              margin: 0,
              fontSize: "13px",
              color: isDark ? "#aaa" : "#666"
            }, children: [
              t.inSign,
              " ",
              infoSignos[signToInfoKey[clickedItem.planetSign]].label[lang],
              clickedItem.planetDegree !== void 0 && ` ${t.atDegree} ${clickedItem.planetDegree.toFixed(0)}\xB0`,
              ` \u2022 ${t.inHouse} ${houseNum}`,
              clickedItem.isRetrograde && ` \u2022 \u211E ${t.retrograde}`
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: 0,
          fontSize: "14px",
          fontStyle: "italic",
          color: isDark ? "#aaa" : "#666"
        }, children: planetInfo.coreTheme[lang] })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 0.75rem 0",
        fontSize: "13px",
        color: isDark ? "#ccc" : "#555",
        lineHeight: 1.6
      }, children: planetInfo.intro[lang] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(100, 200, 100, 0.1)" : "rgba(34, 197, 94, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#86efac" : "#16a34a"
          }, children: t.lightQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: planetInfo.light[lang], theme })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(200, 100, 100, 0.1)" : "rgba(239, 68, 68, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#fca5a5" : "#dc2626"
          }, children: t.shadowQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: planetInfo.shadow[lang], theme })
        ] })
      ] }),
      clickedItem.isRetrograde && /* @__PURE__ */ jsxs(ExpandableSection, { title: `\u211E ${t.retrograde}`, theme, defaultExpanded: true, children: [
        /* @__PURE__ */ jsx("p", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: infoRetrogradacion.retrograde.intro[lang] }),
        /* @__PURE__ */ jsx(ListRenderer, { items: infoRetrogradacion.retrograde.keyIdeas[lang], theme })
      ] }),
      /* @__PURE__ */ jsxs(ExpandableSection, { title: `${t.inHouse} ${houseNum}`, theme, children: [
        /* @__PURE__ */ jsx("p", { style: { margin: "0 0 0.25rem 0", fontSize: "13px", fontStyle: "italic", color: isDark ? "#aaa" : "#666" }, children: houseInfo.coreTheme[lang] }),
        /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: houseInfo.intro[lang] })
      ] }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.questions, theme, children: /* @__PURE__ */ jsx(ListRenderer, { items: planetInfo.questions[lang], theme }) }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.chartHints, theme, children: /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: planetInfo.chartHint[lang] }) }),
      aspects.length > 0 && /* @__PURE__ */ jsx(ExpandableSection, { title: `${t.aspectsTable} (${aspects.length})`, theme, children: /* @__PURE__ */ jsx("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem"
      }, children: aspects.map((asp, i) => {
        const otherPlanet = asp.planet1 === clickedItem.planet ? asp.planet2 : asp.planet1;
        const aspectKey = aspectToInfoKey[asp.aspect];
        const aspectInfo = infoTransitosAspectos[aspectKey];
        return /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem",
              borderRadius: "4px",
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
                /* @__PURE__ */ jsx(
                  LinkItem,
                  {
                    symbol: PLANET_SYMBOLS[otherPlanet],
                    label: "",
                    onClick: () => {
                      const p = chart.planets.find((pl) => pl.planet === otherPlanet);
                      if (p) {
                        handleItemClick({
                          type: "planet",
                          planet: p.planet,
                          planetSign: p.sign,
                          planetDegree: p.degree,
                          planetHouse: getHouseForPlanet(p.sign, p.degree),
                          isRetrograde: p.retrograde
                        });
                      }
                    },
                    theme
                  }
                ),
                /* @__PURE__ */ jsx("span", { style: { fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: aspectInfo.label[lang] })
              ] }),
              /* @__PURE__ */ jsx(
                LinkItem,
                {
                  label: t.clickToLearnMore,
                  onClick: () => handleItemClick({
                    type: "aspect",
                    aspectType: asp.aspect,
                    aspectPlanet1: asp.planet1,
                    aspectPlanet2: asp.planet2
                  }),
                  theme
                }
              )
            ]
          },
          i
        );
      }) }) })
    ] });
  };
  const renderHouseInfo = () => {
    if (clickedItem.house === void 0) return null;
    const houseKey = houseToInfoKey(clickedItem.house);
    const houseInfo = infoCasas[houseKey];
    const planetsInHouse = getPlanetsInHouse(clickedItem.house);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsx("h3", { style: { margin: "0 0 0.25rem 0", fontSize: "20px", color: isDark ? "#fff" : "#333" }, children: houseInfo.label[lang] }),
        clickedItem.houseSign && /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#aaa" : "#666" }, children: [
          t.inSign,
          " ",
          infoSignos[signToInfoKey[clickedItem.houseSign]].label[lang]
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0.25rem 0 0 0",
          fontSize: "14px",
          fontStyle: "italic",
          color: isDark ? "#aaa" : "#666"
        }, children: houseInfo.coreTheme[lang] })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 0.75rem 0",
        fontSize: "13px",
        color: isDark ? "#ccc" : "#555",
        lineHeight: 1.6
      }, children: houseInfo.intro[lang] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(100, 200, 100, 0.1)" : "rgba(34, 197, 94, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#86efac" : "#16a34a"
          }, children: t.lightQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: houseInfo.light[lang], theme })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(200, 100, 100, 0.1)" : "rgba(239, 68, 68, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#fca5a5" : "#dc2626"
          }, children: t.shadowQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: houseInfo.shadow[lang], theme })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.questions, theme, children: /* @__PURE__ */ jsx(ListRenderer, { items: houseInfo.questions[lang], theme }) }),
      planetsInHouse.length > 0 && /* @__PURE__ */ jsx(ExpandableSection, { title: `${t.relatedPositions} (${planetsInHouse.length})`, theme, defaultExpanded: true, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.25rem" }, children: planetsInHouse.map((p) => /* @__PURE__ */ jsx(
        LinkItem,
        {
          symbol: PLANET_SYMBOLS[p.planet],
          label: `${p.degree.toFixed(0)}\xB0 ${ZODIAC_SYMBOLS[p.sign]}${p.retrograde ? " \u211E" : ""}`,
          onClick: () => handleItemClick({
            type: "planet",
            planet: p.planet,
            planetSign: p.sign,
            planetDegree: p.degree,
            planetHouse: clickedItem.house,
            isRetrograde: p.retrograde
          }),
          theme
        },
        p.planet
      )) }) })
    ] });
  };
  const renderAspectInfo = () => {
    if (!clickedItem.aspectType) return null;
    const aspectKey = aspectToInfoKey[clickedItem.aspectType];
    const aspectInfo = infoTransitosAspectos[aspectKey];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsx("h3", { style: { margin: "0 0 0.25rem 0", fontSize: "20px", color: isDark ? "#fff" : "#333" }, children: aspectInfo.label[lang] }),
        clickedItem.aspectPlanet1 && clickedItem.aspectPlanet2 && /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#aaa" : "#666" }, children: [
          PLANET_SYMBOLS[clickedItem.aspectPlanet1],
          " - ",
          PLANET_SYMBOLS[clickedItem.aspectPlanet2]
        ] }),
        /* @__PURE__ */ jsxs("p", { style: {
          margin: "0.25rem 0 0 0",
          fontSize: "14px",
          fontStyle: "italic",
          color: isDark ? "#aaa" : "#666"
        }, children: [
          aspectInfo.coreTheme[lang],
          " (",
          aspectInfo.angle,
          "\xB0)"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 0.75rem 0",
        fontSize: "13px",
        color: isDark ? "#ccc" : "#555",
        lineHeight: 1.6
      }, children: aspectInfo.intro[lang] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(100, 200, 100, 0.1)" : "rgba(34, 197, 94, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#86efac" : "#16a34a"
          }, children: t.lightQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: aspectInfo.light[lang], theme })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(200, 100, 100, 0.1)" : "rgba(239, 68, 68, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#fca5a5" : "#dc2626"
          }, children: t.shadowQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: aspectInfo.shadow[lang], theme })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.questions, theme, children: /* @__PURE__ */ jsx(ListRenderer, { items: aspectInfo.questions[lang], theme }) }),
      clickedItem.aspectPlanet1 && clickedItem.aspectPlanet2 && /* @__PURE__ */ jsx(ExpandableSection, { title: t.relatedPositions, theme, defaultExpanded: true, children: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.25rem" }, children: [clickedItem.aspectPlanet1, clickedItem.aspectPlanet2].map((pName) => {
        const p = chart.planets.find((pl) => pl.planet === pName);
        if (!p) return null;
        return /* @__PURE__ */ jsx(
          LinkItem,
          {
            symbol: PLANET_SYMBOLS[pName],
            label: `${t.inSign} ${ZODIAC_SYMBOLS[p.sign]}`,
            onClick: () => handleItemClick({
              type: "planet",
              planet: p.planet,
              planetSign: p.sign,
              planetDegree: p.degree,
              planetHouse: getHouseForPlanet(p.sign, p.degree),
              isRetrograde: p.retrograde
            }),
            theme
          },
          pName
        );
      }) }) })
    ] });
  };
  const angleToInfoKey = {
    "ascendant": "ascendente",
    "descendant": "descendente",
    "midheaven": "medioCielo",
    "imum_coeli": "fondoCielo",
    // Also handle planet names that are angles
    "Ascendant": "ascendente",
    "Midheaven": "medioCielo"
  };
  const renderAngleInfo = () => {
    let angleKey;
    if (clickedItem.angle) {
      angleKey = angleToInfoKey[clickedItem.angle];
    } else if (clickedItem.planet) {
      angleKey = angleToInfoKey[clickedItem.planet];
    }
    if (!angleKey) {
      return null;
    }
    const angleInfo = infoEjesAngulares[angleKey];
    if (!angleInfo) {
      return null;
    }
    const sign = clickedItem.angleSign || clickedItem.planetSign;
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { style: { marginBottom: "1rem" }, children: [
        /* @__PURE__ */ jsx("h3", { style: { margin: "0 0 0.25rem 0", fontSize: "20px", color: isDark ? "#fff" : "#333" }, children: angleInfo.label[lang] }),
        sign && /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#aaa" : "#666" }, children: [
          t.inSign,
          " ",
          infoSignos[signToInfoKey[sign]].label[lang],
          " ",
          ZODIAC_SYMBOLS[sign]
        ] }),
        /* @__PURE__ */ jsx("p", { style: {
          margin: "0.25rem 0 0 0",
          fontSize: "14px",
          fontStyle: "italic",
          color: isDark ? "#aaa" : "#666"
        }, children: angleInfo.coreTheme[lang] })
      ] }),
      /* @__PURE__ */ jsx("p", { style: {
        margin: "0 0 0.75rem 0",
        fontSize: "13px",
        color: isDark ? "#ccc" : "#555",
        lineHeight: 1.6
      }, children: angleInfo.intro[lang] }),
      /* @__PURE__ */ jsxs("div", { style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0.5rem",
        marginBottom: "0.75rem"
      }, children: [
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(100, 200, 100, 0.1)" : "rgba(34, 197, 94, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#86efac" : "#16a34a"
          }, children: t.lightQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: angleInfo.light[lang], theme })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: {
          padding: "0.5rem",
          borderRadius: "6px",
          backgroundColor: isDark ? "rgba(200, 100, 100, 0.1)" : "rgba(239, 68, 68, 0.1)"
        }, children: [
          /* @__PURE__ */ jsx("h4", { style: {
            margin: "0 0 0.25rem 0",
            fontSize: "12px",
            color: isDark ? "#fca5a5" : "#dc2626"
          }, children: t.shadowQualities }),
          /* @__PURE__ */ jsx(ListRenderer, { items: angleInfo.shadow[lang], theme })
        ] })
      ] }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.questions, theme, children: /* @__PURE__ */ jsx(ListRenderer, { items: angleInfo.questions[lang], theme }) }),
      /* @__PURE__ */ jsx(ExpandableSection, { title: t.chartHints, theme, children: /* @__PURE__ */ jsx("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: angleInfo.chartHint[lang] }) }),
      sign && /* @__PURE__ */ jsxs(ExpandableSection, { title: `${t.sign}: ${infoSignos[signToInfoKey[sign]].label[lang]}`, theme, children: [
        /* @__PURE__ */ jsxs("p", { style: { margin: 0, fontSize: "13px", color: isDark ? "#ccc" : "#555" }, children: [
          /* @__PURE__ */ jsxs("strong", { children: [
            t.coreTheme,
            ":"
          ] }),
          " ",
          infoSignos[signToInfoKey[sign]].coreTheme[lang]
        ] }),
        /* @__PURE__ */ jsx("div", { style: { marginTop: "0.5rem" }, children: /* @__PURE__ */ jsx(
          LinkItem,
          {
            symbol: ZODIAC_SYMBOLS[sign],
            label: t.clickToLearnMore,
            onClick: () => handleItemClick({ type: "sign", sign }),
            theme
          }
        ) })
      ] })
    ] });
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: isDark ? "#1a1a2e" : "#fff",
    color: isDark ? "#e0e0e0" : "#333",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: isDark ? "0 4px 20px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.15)"
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 1rem",
      borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)"
    }, children: [
      /* @__PURE__ */ jsxs("span", { style: {
        fontSize: "13px",
        fontWeight: 500,
        color: isDark ? "#a8c8f0" : "#2563eb",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
      }, children: [
        "\u2139\uFE0F ",
        t.infoMode
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onClose,
          style: {
            background: "none",
            border: "none",
            color: isDark ? "#aaa" : "#666",
            cursor: "pointer",
            fontSize: "18px",
            padding: "0.25rem",
            lineHeight: 1
          },
          children: "\u2715"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { style: {
      flex: 1,
      overflowY: "auto",
      padding: "1rem"
    }, children: renderContent() })
  ] });
}
var MODAL_CSS_RESET = `
  .astromandala-modal-root,
  .astromandala-modal-root *,
  .astromandala-modal-root *::before,
  .astromandala-modal-root *::after {
    box-sizing: border-box !important;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  }
  .astromandala-modal-root {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    z-index: 2147483647 !important;
    isolation: isolate !important;
  }
  .astromandala-modal-root button {
    font-family: inherit !important;
    cursor: pointer !important;
  }
  .astromandala-modal-root select {
    font-family: inherit !important;
    cursor: pointer !important;
  }
  .astromandala-modal-root input[type="checkbox"] {
    cursor: pointer !important;
    width: 16px !important;
    height: 16px !important;
  }
  .astromandala-modal-root label {
    cursor: pointer !important;
  }
  body.astromandala-modal-open {
    overflow: hidden !important;
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
  }
`;
var ALL_ASPECT_TYPES = [
  "conjunction",
  "opposition",
  "trine",
  "square",
  "sextile",
  "quincunx",
  "semisextile",
  "semisquare",
  "sesquiquadrate",
  "quintile",
  "biquintile"
];
var MAJOR_ASPECTS = ["conjunction", "opposition", "trine", "square", "sextile"];
function AstroMandalaWithModal({
  chart,
  secondChart,
  synastryAspects,
  size = 500,
  showAspects: initialShowAspects = true,
  showDegrees: initialShowDegrees = false,
  showHouses: initialShowHouses = true,
  showSecondChartHouses: initialShowSecondChartHouses = true,
  showPlanetProjections: initialShowPlanetProjections = true,
  showChartInfo: initialShowChartInfo = false,
  chartInfoPosition = "right",
  showBirthData: initialShowBirthData = false,
  aspectTypesFilter: initialAspectTypesFilter,
  includeAnglesInSynastry: initialIncludeAnglesInSynastry = false,
  innerChartColor = "#4a90d9",
  outerChartColor = "#d94a4a",
  aspectColors,
  theme: initialTheme = "light",
  language: initialLanguage = "en",
  className,
  showExpandButton = true,
  title,
  birthData,
  secondBirthData,
  onSettingsChange
}) {
  const portalContainerRef = useRef(null);
  const mandalaContainerRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 600, height: 600 });
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  useEffect(() => {
    if (!isMounted) return;
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w <= 600);
      setWindowSize({ width: w, height: h });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isMounted]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalSettings, setShowModalSettings] = useState(false);
  const [isInfoModeActive, setIsInfoModeActive] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);
  useEffect(() => {
    if (!isMounted) return;
    if (isModalOpen) {
      scrollPositionRef.current = window.scrollY;
      const container = document.createElement("div");
      container.id = "astromandala-modal-portal";
      document.body.appendChild(container);
      portalContainerRef.current = container;
      const styleElement = document.createElement("style");
      styleElement.id = "astromandala-modal-styles";
      styleElement.textContent = MODAL_CSS_RESET;
      document.head.appendChild(styleElement);
      document.body.classList.add("astromandala-modal-open");
      document.body.style.top = `-${scrollPositionRef.current}px`;
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      return () => {
        if (portalContainerRef.current && document.body.contains(portalContainerRef.current)) {
          document.body.removeChild(portalContainerRef.current);
          portalContainerRef.current = null;
        }
        const styleEl = document.getElementById("astromandala-modal-styles");
        if (styleEl) {
          document.head.removeChild(styleEl);
        }
        document.body.classList.remove("astromandala-modal-open");
        document.body.style.top = "";
        window.scrollTo(0, scrollPositionRef.current);
      };
    }
  }, [isModalOpen, isMounted]);
  useEffect(() => {
    if (!isModalOpen || !isMounted) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isModalOpen, isMounted]);
  useEffect(() => {
    if (isModalOpen && !isMobile) {
      setShowModalSettings(true);
    }
  }, [isModalOpen, isMobile]);
  const [showChartInfo, setShowChartInfo] = useState(initialShowChartInfo);
  const modalMandalaSize = useMemo(() => {
    if (!isModalOpen) return 500;
    const width = windowSize.width;
    const height = windowSize.height;
    if (isMobile) {
      const headerHeight = 45;
      const padding = 24;
      const chartInfoHeight = showChartInfo ? Math.min(height * 0.3, 200) : 0;
      const availableWidth = width - padding;
      const availableHeight = height - headerHeight - chartInfoHeight - padding;
      const size2 = Math.min(availableWidth, availableHeight);
      return Math.max(size2, 250);
    } else {
      const availableWidth = showModalSettings ? width - 320 : width - 40;
      const availableHeight = height - 120;
      return Math.min(availableWidth, availableHeight);
    }
  }, [isMobile, windowSize, showModalSettings, isModalOpen, showChartInfo]);
  const [showAspects, setShowAspects] = useState(initialShowAspects);
  const [showDegrees, setShowDegrees] = useState(initialShowDegrees);
  const [showHouses, setShowHouses] = useState(initialShowHouses);
  const [showSecondChartHouses, setShowSecondChartHouses] = useState(initialShowSecondChartHouses);
  const [showPlanetProjections, setShowPlanetProjections] = useState(initialShowPlanetProjections);
  const [showBirthDataOnChart, setShowBirthDataOnChart] = useState(initialShowBirthData);
  const [includeAnglesInSynastry, setIncludeAnglesInSynastry] = useState(initialIncludeAnglesInSynastry);
  const [theme, setTheme] = useState(initialTheme);
  const [language, setLanguage] = useState(initialLanguage);
  const downloadChartAsImage = useCallback(async () => {
    if (!mandalaContainerRef.current) return;
    try {
      const container = mandalaContainerRef.current;
      const svg = container.querySelector("svg");
      if (!svg) return;
      const svgClone = svg.cloneNode(true);
      const svgSize = parseInt(svg.getAttribute("width") || "500");
      if (showBirthDataOnChart && birthData) {
        const textGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const isDarkTheme = theme === "dark";
        const textColor = isDarkTheme ? "#e0e0e0" : "#333";
        const fontSize = Math.max(10, svgSize * 0.022);
        let yOffset = svgSize + fontSize + 5;
        const addTextLine = (text) => {
          const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
          textEl.setAttribute("x", (svgSize / 2).toString());
          textEl.setAttribute("y", yOffset.toString());
          textEl.setAttribute("text-anchor", "middle");
          textEl.setAttribute("fill", textColor);
          textEl.setAttribute("font-size", fontSize.toString());
          textEl.setAttribute("font-family", "Arial, sans-serif");
          textEl.textContent = text;
          textGroup.appendChild(textEl);
          yOffset += fontSize + 4;
        };
        if (birthData.name) addTextLine(birthData.name);
        if (birthData.date) addTextLine(birthData.date + (birthData.time ? ` - ${birthData.time}` : ""));
        if (birthData.location) addTextLine(birthData.location);
        if (secondBirthData) {
          yOffset += 5;
          if (secondBirthData.name) addTextLine(secondBirthData.name);
          if (secondBirthData.date) addTextLine(secondBirthData.date + (secondBirthData.time ? ` - ${secondBirthData.time}` : ""));
          if (secondBirthData.location) addTextLine(secondBirthData.location);
        }
        const extraHeight = yOffset - svgSize;
        svgClone.setAttribute("height", (svgSize + extraHeight).toString());
        svgClone.setAttribute("viewBox", `0 0 ${svgSize} ${svgSize + extraHeight}`);
        svgClone.appendChild(textGroup);
      }
      const svgData = new XMLSerializer().serializeToString(svgClone);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = 2;
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = theme === "dark" ? "#1a1a2e" : "#fafafa";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        let fileName = "astromandala_chart.png";
        const sanitize = (str) => str.replace(/[^a-zA-Z0-9áéíóúñÁÉÍÓÚÑ\s]/g, "").replace(/\s+/g, "_").trim();
        if (title && birthData?.name && secondBirthData?.name) {
          fileName = `${sanitize(title)}_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
        } else if (title && birthData?.name) {
          fileName = `${sanitize(title)}_${sanitize(birthData.name)}.png`;
        } else if (birthData?.name && secondBirthData?.name) {
          fileName = `sinastria_${sanitize(birthData.name)}_${sanitize(secondBirthData.name)}.png`;
        } else if (title) {
          fileName = `${sanitize(title)}.png`;
        } else if (birthData?.name) {
          fileName = `carta_${sanitize(birthData.name)}.png`;
        }
        link.download = fileName;
        link.href = canvas.toDataURL("image/png");
        link.click();
        URL.revokeObjectURL(svgUrl);
      };
      img.src = svgUrl;
    } catch (error) {
      console.error("Error downloading chart:", error);
    }
  }, [showBirthDataOnChart, birthData, secondBirthData, theme, title]);
  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);
  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);
  const [aspectFilters, setAspectFilters] = useState(() => {
    const filters = {};
    ALL_ASPECT_TYPES.forEach((aspect) => {
      filters[aspect] = initialAspectTypesFilter ? initialAspectTypesFilter.includes(aspect) : MAJOR_ASPECTS.includes(aspect);
    });
    return filters;
  });
  const t = useMemo(() => getTranslations(language), [language]);
  const isDark = theme === "dark";
  const isSynastry = Boolean(secondChart);
  const aspectTypesFilter = useMemo(() => {
    return ALL_ASPECT_TYPES.filter((aspect) => aspectFilters[aspect]);
  }, [aspectFilters]);
  const toggleAspectFilter = useCallback((aspect) => {
    setAspectFilters((prev) => ({ ...prev, [aspect]: !prev[aspect] }));
  }, []);
  useCallback(() => {
    if (onSettingsChange) {
      onSettingsChange({
        showAspects,
        showDegrees,
        showHouses,
        showSecondChartHouses,
        showPlanetProjections,
        showChartInfo,
        showBirthData: showBirthDataOnChart,
        includeAnglesInSynastry,
        aspectTypesFilter,
        theme,
        language
      });
    }
  }, [showAspects, showDegrees, showHouses, showSecondChartHouses, showPlanetProjections, showChartInfo, showBirthDataOnChart, includeAnglesInSynastry, aspectTypesFilter, theme, language, onSettingsChange]);
  const handleSignClick = useCallback((sign) => {
    if (!isInfoModeActive) return;
    setClickedItem({ type: "sign", sign });
  }, [isInfoModeActive]);
  const handleHouseClick = useCallback((house, houseSign) => {
    if (!isInfoModeActive) return;
    setClickedItem({ type: "house", house, houseSign });
  }, [isInfoModeActive]);
  const handlePlanetClick = useCallback((planet) => {
    if (!isInfoModeActive) return;
    const sortedHouses = [...chart.houses].sort((a, b) => {
      const getAbsoluteDeg = (sign, deg) => {
        const signStarts = {
          "Aries": 0,
          "Taurus": 30,
          "Gemini": 60,
          "Cancer": 90,
          "Leo": 120,
          "Virgo": 150,
          "Libra": 180,
          "Scorpio": 210,
          "Sagittarius": 240,
          "Capricorn": 270,
          "Aquarius": 300,
          "Pisces": 330
        };
        return signStarts[sign] + deg;
      };
      return getAbsoluteDeg(a.sign, a.degree) - getAbsoluteDeg(b.sign, b.degree);
    });
    const planetAbsDeg = (() => {
      const signStarts = {
        "Aries": 0,
        "Taurus": 30,
        "Gemini": 60,
        "Cancer": 90,
        "Leo": 120,
        "Virgo": 150,
        "Libra": 180,
        "Scorpio": 210,
        "Sagittarius": 240,
        "Capricorn": 270,
        "Aquarius": 300,
        "Pisces": 330
      };
      return signStarts[planet.sign] + planet.degree;
    })();
    let houseNum = 1;
    for (let i = 0; i < sortedHouses.length; i++) {
      const getAbsoluteDeg = (sign, deg) => {
        const signStarts = {
          "Aries": 0,
          "Taurus": 30,
          "Gemini": 60,
          "Cancer": 90,
          "Leo": 120,
          "Virgo": 150,
          "Libra": 180,
          "Scorpio": 210,
          "Sagittarius": 240,
          "Capricorn": 270,
          "Aquarius": 300,
          "Pisces": 330
        };
        return signStarts[sign] + deg;
      };
      const houseCusp = sortedHouses[i];
      const nextHouse = sortedHouses[(i + 1) % 12];
      const houseStart = getAbsoluteDeg(houseCusp.sign, houseCusp.degree);
      const houseEnd = getAbsoluteDeg(nextHouse.sign, nextHouse.degree);
      if (houseStart < houseEnd) {
        if (planetAbsDeg >= houseStart && planetAbsDeg < houseEnd) {
          houseNum = houseCusp.house;
          break;
        }
      } else {
        if (planetAbsDeg >= houseStart || planetAbsDeg < houseEnd) {
          houseNum = houseCusp.house;
          break;
        }
      }
    }
    if (planet.planet === "Ascendant") {
      setClickedItem({ type: "angle", angle: "ascendant", angleSign: planet.sign });
    } else if (planet.planet === "Midheaven") {
      setClickedItem({ type: "angle", angle: "midheaven", angleSign: planet.sign });
    } else {
      setClickedItem({
        type: "planet",
        planet: planet.planet,
        planetSign: planet.sign,
        planetDegree: planet.degree,
        planetHouse: houseNum,
        isRetrograde: planet.retrograde
      });
    }
  }, [isInfoModeActive, chart.houses]);
  const handleAspectClick = useCallback((aspect) => {
    if (!isInfoModeActive) return;
    setClickedItem({
      type: "aspect",
      aspectType: aspect.aspect,
      aspectPlanet1: aspect.planet1,
      aspectPlanet2: aspect.planet2
    });
  }, [isInfoModeActive]);
  const handleAngleClick = useCallback((angle, sign) => {
    if (!isInfoModeActive) return;
    setClickedItem({ type: "angle", angle, angleSign: sign });
  }, [isInfoModeActive]);
  const handleInfoPanelClose = useCallback(() => {
    setClickedItem(null);
  }, []);
  const handleInfoPanelItemClick = useCallback((item) => {
    setClickedItem(item);
  }, []);
  const modalMandalaProps = {
    chart,
    secondChart,
    synastryAspects,
    showAspects,
    showDegrees,
    showHouses,
    showSecondChartHouses,
    showPlanetProjections,
    aspectTypesFilter,
    includeAnglesInSynastry,
    innerChartColor,
    outerChartColor,
    aspectColors,
    theme,
    language,
    // Click handlers for educational mode
    ...isInfoModeActive ? {
      onSignClick: handleSignClick,
      onHouseClick: handleHouseClick,
      onPlanetClick: handlePlanetClick,
      onAspectClick: handleAspectClick,
      onAngleClick: handleAngleClick
    } : {}
  };
  const mainMandalaProps = {
    chart,
    secondChart,
    synastryAspects,
    showAspects: initialShowAspects,
    showDegrees: initialShowDegrees,
    showHouses: initialShowHouses,
    showSecondChartHouses: initialShowSecondChartHouses,
    showPlanetProjections: initialShowPlanetProjections,
    aspectTypesFilter: initialAspectTypesFilter,
    includeAnglesInSynastry: initialIncludeAnglesInSynastry,
    innerChartColor,
    outerChartColor,
    aspectColors,
    theme: initialTheme,
    language: initialLanguage
  };
  const buttonStyle = {
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
    color: isDark ? "#fff" : "#333",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "0.25rem"
  };
  const expandButtonStyle = {
    ...buttonStyle,
    backgroundColor: isDark ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.85)",
    border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.15)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    zIndex: 10
  };
  const checkboxLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0.25rem 0"
  };
  const sectionStyle = {
    marginBottom: "1rem",
    padding: "0.75rem",
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
    borderRadius: "6px"
  };
  const modalContent = isModalOpen && isMounted && portalContainerRef.current ? /* @__PURE__ */ jsxs(
    "div",
    {
      className: "astromandala-modal-root",
      style: {
        backgroundColor: isDark ? "#121212" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: isMobile ? "auto" : "hidden"
      },
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: isMobile ? "0.25rem 0.5rem" : "0.5rem 1rem",
              borderBottom: isDark ? "1px solid #333" : "1px solid #ddd",
              backgroundColor: isDark ? "#1a1a1a" : "#f5f5f5",
              flexShrink: 0,
              minHeight: isMobile ? "40px" : "48px",
              maxHeight: isMobile ? "40px" : "48px",
              width: "100%",
              boxSizing: "border-box",
              overflow: isMobile ? "auto" : "hidden"
            },
            children: [
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: isMobile ? "0.25rem" : "1rem", flexShrink: 1, overflow: "hidden" }, children: [
                title && /* @__PURE__ */ jsx("h1", { style: {
                  margin: 0,
                  fontSize: isMobile ? "14px" : "18px",
                  fontWeight: 600,
                  color: isDark ? "#fff" : "#333",
                  whiteSpace: "nowrap",
                  overflow: isMobile ? "auto" : "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: isMobile ? "120px" : "300px"
                }, children: title }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => setShowModalSettings(!showModalSettings),
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0
                    },
                    title: t.settings,
                    children: [
                      "\u2699",
                      isMobile ? "" : ` ${showModalSettings ? "\u25BC" : "\u25B6"} ${t.settings}`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: language,
                    onChange: (e) => setLanguage(e.target.value),
                    style: {
                      padding: isMobile ? "0.25rem" : "0.5rem",
                      borderRadius: "4px",
                      border: isDark ? "1px solid #444" : "1px solid #ccc",
                      backgroundColor: isDark ? "#333" : "#fff",
                      color: isDark ? "#fff" : "#333",
                      cursor: "pointer",
                      fontSize: isMobile ? "14px" : "14px",
                      minWidth: isMobile ? "auto" : void 0
                    },
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "en", children: isMobile ? "\u{1F1EC}\u{1F1E7}" : "\u{1F1EC}\u{1F1E7} English" }),
                      /* @__PURE__ */ jsx("option", { value: "es", children: isMobile ? "\u{1F1EA}\u{1F1F8}" : "\u{1F1EA}\u{1F1F8} Espa\xF1ol" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setTheme(theme === "light" ? "dark" : "light"),
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0
                    },
                    children: isDark ? "\u2600\uFE0F" : "\u{1F319}"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: downloadChartAsImage,
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0,
                      backgroundColor: isDark ? "rgba(74, 144, 217, 0.3)" : "rgba(74, 144, 217, 0.15)"
                    },
                    title: t.downloadImage,
                    children: [
                      "\u{1F4E5}",
                      isMobile ? "" : ` ${t.downloadImage}`
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    onClick: () => {
                      setIsInfoModeActive(!isInfoModeActive);
                      if (isInfoModeActive) {
                        setClickedItem(null);
                      }
                    },
                    style: {
                      ...buttonStyle,
                      padding: isMobile ? "0.25rem 0.4rem" : buttonStyle.padding,
                      fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                      minWidth: isMobile ? "auto" : void 0,
                      backgroundColor: isInfoModeActive ? isDark ? "rgba(147, 51, 234, 0.5)" : "rgba(147, 51, 234, 0.25)" : isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.08)",
                      border: isInfoModeActive ? isDark ? "2px solid rgba(147, 51, 234, 0.8)" : "2px solid rgba(147, 51, 234, 0.5)" : "none"
                    },
                    title: t.infoMode,
                    children: [
                      "\u2139\uFE0F",
                      isMobile ? "" : ` ${t.infoMode}`
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => setIsModalOpen(false),
                  style: {
                    ...buttonStyle,
                    backgroundColor: isDark ? "#c53030" : "#e53e3e",
                    color: "#fff",
                    padding: isMobile ? "0.25rem 0.5rem" : buttonStyle.padding,
                    fontSize: isMobile ? "14px" : buttonStyle.fontSize,
                    minWidth: isMobile ? "auto" : void 0,
                    flexShrink: 0,
                    marginLeft: isMobile ? "0.25rem" : void 0
                  },
                  children: "\u2715"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              overflow: isMobile ? "auto" : "hidden"
            },
            children: [
              showModalSettings && /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    width: "280px",
                    minWidth: "280px",
                    padding: "1rem",
                    overflowY: "auto",
                    borderRight: isDark ? "1px solid #333" : "1px solid #ddd",
                    backgroundColor: isDark ? "#1a1a1a" : "#fafafa",
                    color: isDark ? "#e0e0e0" : "#333"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
                      /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", textTransform: "uppercase", opacity: 0.7 }, children: t.settings }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showAspects,
                            onChange: (e) => setShowAspects(e.target.checked)
                          }
                        ),
                        t.showAspects
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showDegrees,
                            onChange: (e) => setShowDegrees(e.target.checked)
                          }
                        ),
                        t.showDegrees
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showHouses,
                            onChange: (e) => setShowHouses(e.target.checked)
                          }
                        ),
                        t.showHouses
                      ] }),
                      isSynastry && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showSecondChartHouses,
                            onChange: (e) => setShowSecondChartHouses(e.target.checked)
                          }
                        ),
                        t.showChart2Houses
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showPlanetProjections,
                            onChange: (e) => setShowPlanetProjections(e.target.checked)
                          }
                        ),
                        t.showPlanetProjections
                      ] }),
                      /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showChartInfo,
                            onChange: (e) => setShowChartInfo(e.target.checked)
                          }
                        ),
                        t.showChartInfo
                      ] }),
                      (birthData || secondBirthData) && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: showBirthDataOnChart,
                            onChange: (e) => setShowBirthDataOnChart(e.target.checked)
                          }
                        ),
                        t.showBirthData
                      ] }),
                      isSynastry && showAspects && /* @__PURE__ */ jsxs("label", { style: checkboxLabelStyle, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: includeAnglesInSynastry,
                            onChange: (e) => setIncludeAnglesInSynastry(e.target.checked)
                          }
                        ),
                        t.includeAnglesInSynastry
                      ] })
                    ] }),
                    showAspects && /* @__PURE__ */ jsxs("div", { style: sectionStyle, children: [
                      /* @__PURE__ */ jsx("h4", { style: { margin: "0 0 0.5rem 0", fontSize: "13px", textTransform: "uppercase", opacity: 0.7 }, children: t.aspectTypes }),
                      /* @__PURE__ */ jsx("div", { style: { marginBottom: "0.5rem" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", opacity: 0.6 }, children: t.majorAspects }) }),
                      MAJOR_ASPECTS.map((aspect) => /* @__PURE__ */ jsxs("label", { style: { ...checkboxLabelStyle, fontSize: "13px" }, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: aspectFilters[aspect],
                            onChange: () => toggleAspectFilter(aspect)
                          }
                        ),
                        t[aspect]
                      ] }, aspect)),
                      /* @__PURE__ */ jsx("div", { style: { marginTop: "0.75rem", marginBottom: "0.5rem" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: "12px", opacity: 0.6 }, children: t.minorAspects }) }),
                      ALL_ASPECT_TYPES.filter((a) => !MAJOR_ASPECTS.includes(a)).map((aspect) => /* @__PURE__ */ jsxs("label", { style: { ...checkboxLabelStyle, fontSize: "13px" }, children: [
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "checkbox",
                            checked: aspectFilters[aspect],
                            onChange: () => toggleAspectFilter(aspect)
                          }
                        ),
                        t[aspect]
                      ] }, aspect))
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: isMobile ? "flex-start" : "center",
                    alignItems: "center",
                    padding: isMobile ? "0.5rem" : "1rem",
                    backgroundColor: isDark ? "#0d0d1a" : "#f0f0f0",
                    overflow: isMobile ? "auto" : "hidden",
                    boxSizing: "border-box",
                    minHeight: 0,
                    gap: "0.5rem",
                    width: "100%",
                    maxWidth: "100%"
                  },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        ref: mandalaContainerRef,
                        style: {
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "0.5rem"
                        },
                        children: [
                          isInfoModeActive && /* @__PURE__ */ jsxs("div", { style: {
                            backgroundColor: isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.1)",
                            border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.4)" : "rgba(99, 102, 241, 0.3)"}`,
                            borderRadius: "8px",
                            padding: "0.5rem 1rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: isDark ? "#a5b4fc" : "#4f46e5",
                            fontSize: "13px",
                            maxWidth: modalMandalaSize,
                            textAlign: "center"
                          }, children: [
                            /* @__PURE__ */ jsx("span", { style: { fontSize: "16px" }, children: "\u{1F4D6}" }),
                            /* @__PURE__ */ jsx("span", { children: t.infoModeDescription || "Click on any element to learn more about it" })
                          ] }),
                          /* @__PURE__ */ jsx("div", { style: {
                            width: modalMandalaSize,
                            height: modalMandalaSize,
                            maxWidth: "100%",
                            maxHeight: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexShrink: 1
                          }, children: /* @__PURE__ */ createElement(
                            AstroMandala,
                            {
                              ...modalMandalaProps,
                              size: modalMandalaSize,
                              key: `modal-mandala-${modalMandalaSize}-${showChartInfo}`
                            }
                          ) }),
                          showBirthDataOnChart && (birthData || secondBirthData) && /* @__PURE__ */ jsxs("div", { style: {
                            textAlign: "center",
                            color: isDark ? "#e0e0e0" : "#333",
                            fontSize: isMobile ? "11px" : "13px",
                            lineHeight: 1.4,
                            maxWidth: modalMandalaSize,
                            padding: "0.5rem"
                          }, children: [
                            birthData && /* @__PURE__ */ jsxs("div", { style: { marginBottom: secondBirthData ? "0.5rem" : 0, color: innerChartColor }, children: [
                              birthData.name && /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: birthData.name }),
                              (birthData.date || birthData.time) && /* @__PURE__ */ jsxs("div", { children: [
                                birthData.date,
                                birthData.time ? ` - ${birthData.time}` : ""
                              ] }),
                              birthData.location && /* @__PURE__ */ jsx("div", { children: birthData.location })
                            ] }),
                            secondBirthData && /* @__PURE__ */ jsxs("div", { style: { color: outerChartColor }, children: [
                              secondBirthData.name && /* @__PURE__ */ jsx("div", { style: { fontWeight: 600 }, children: secondBirthData.name }),
                              (secondBirthData.date || secondBirthData.time) && /* @__PURE__ */ jsxs("div", { children: [
                                secondBirthData.date,
                                secondBirthData.time ? ` - ${secondBirthData.time}` : ""
                              ] }),
                              secondBirthData.location && /* @__PURE__ */ jsx("div", { children: secondBirthData.location })
                            ] })
                          ] })
                        ]
                      }
                    ),
                    showChartInfo && !isMobile && chartInfoPosition === "right" && /* @__PURE__ */ jsx("div", { style: {
                      alignSelf: "center",
                      maxHeight: modalMandalaSize * 0.85,
                      overflowY: "auto"
                    }, children: /* @__PURE__ */ jsx(
                      ChartInfoPanel,
                      {
                        chart,
                        secondChart,
                        theme,
                        language
                      }
                    ) }),
                    !isMobile && isInfoModeActive && clickedItem && /* @__PURE__ */ jsx("div", { style: {
                      alignSelf: "center",
                      maxHeight: modalMandalaSize * 0.85,
                      overflowY: "auto",
                      width: "auto",
                      maxWidth: "400px"
                    }, children: /* @__PURE__ */ jsx(
                      EducationalInfoPanel,
                      {
                        clickedItem,
                        chart,
                        secondChart,
                        theme,
                        language,
                        onClose: handleInfoPanelClose,
                        onItemClick: handleInfoPanelItemClick
                      }
                    ) }),
                    isMobile && isInfoModeActive && clickedItem && /* @__PURE__ */ jsx("div", { style: {
                      width: "100%",
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "center",
                      order: 2
                      // Ensure it comes before Chart Info Panel
                    }, children: /* @__PURE__ */ jsx("div", { style: { width: "100%", maxWidth: "100%" }, children: /* @__PURE__ */ jsx(
                      EducationalInfoPanel,
                      {
                        clickedItem,
                        chart,
                        secondChart,
                        theme,
                        language,
                        onClose: handleInfoPanelClose,
                        onItemClick: handleInfoPanelItemClick
                      }
                    ) }) }),
                    showChartInfo && (isMobile || chartInfoPosition === "bottom") && /* @__PURE__ */ jsx("div", { style: {
                      width: "100%",
                      maxWidth: "100%",
                      display: "flex",
                      justifyContent: "center",
                      order: 3
                      // Ensure it comes after Educational Info Panel
                    }, children: /* @__PURE__ */ jsx(
                      ChartInfoPanel,
                      {
                        chart,
                        secondChart,
                        theme,
                        language
                      }
                    ) })
                  ]
                }
              )
            ]
          }
        )
      ]
    }
  ) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block" }, className, children: [
      showExpandButton && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsModalOpen(true),
          style: expandButtonStyle,
          title: t.expand,
          children: "\u26F6"
        }
      ),
      /* @__PURE__ */ jsx(AstroMandala, { ...mainMandalaProps, size })
    ] }),
    modalContent && portalContainerRef.current && createPortal(modalContent, portalContainerRef.current)
  ] });
}

export { ASPECT_ANGLES, AspectLines, AstroMandala, AstroMandalaWithModal, DEFAULT_ASPECT_COLORS, DEFAULT_ORBS, ELEMENT_COLORS, HouseWheel, PLANET_CATEGORIES, PLANET_SYMBOLS, PlanetDisplay, SIGN_ELEMENTS, SIGN_START_DEGREES, TRANSLATIONS, ZODIAC_ORDER, ZODIAC_SYMBOLS, ZodiacWheel, calculateNatalAspects, calculateSynastryAspects, convertHoroscopeToChart, formatDegree, getAbsoluteDegree, getMandalaAngle, getOrbForPlanets, getPlanetAbsoluteDegree, getPointOnCircle, getTranslations, normalizeAngle };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map