import { Testimonial, FaqItem } from '../types';

export const PRESS_OUTLETS = [
  { name: 'Exame', logoText: 'EXAME' },
  { name: 'Forbes', logoText: 'Forbes' },
  { name: 'TechCrunch', logoText: 'TechCrunch' },
  { name: 'G1', logoText: 'g1' },
  { name: 'El País', logoText: 'EL PAÍS' },
  { name: 'Estadão', logoText: 'ESTADÃO' },
  { name: 'Driver Mag', logoText: 'DRIVER MAG' },
  { name: 'Infobae', logoText: 'infobae' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Marcos Vinícius',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    role: 'Motorista Uber Black / 99',
    countryCode: 'BR',
    city: 'São Paulo - SP',
    vehicle: 'Chevrolet Onix Plus 1.0 Turbo',
    extraIncome: '+R$ 1.850,00/mês',
    rating: 5,
    platform: 'Uber / 99',
    quote: {
      pt: 'O GranScore abriu meus olhos. Eu aceitava corridas de R$ 12 achando que estava lucrando, mas depois do GranApp vi que gastava metade em combustível. Hoje só rodo no verde!',
      es: 'GranScore me abrió los ojos. Aceptaba viajes de $12 pensando que ganaba, pero con GranApp vi que gastaba la mitad en gasolina. ¡Hoy solo hago viajes en verde!',
      en: 'GranScore opened my eyes. I used to accept $12 rides thinking I was making money, but GranApp showed me half was spent on gas. Now I only drive green rides!'
    }
  },
  {
    id: '2',
    name: 'Rodrigo "El Rayo" Morales',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor DiDi Premier',
    countryCode: 'MX',
    city: 'Ciudad de México',
    vehicle: 'Nissan Versa 1.6',
    extraIncome: '+$ 4,200 MXN/mes',
    rating: 5,
    platform: 'DiDi / Uber',
    quote: {
      pt: 'O calculador instantâneo me ajuda nos semáforos. Antes eu ficava em dúvida em 5 segundos, agora o GranScore pisca verde e eu aceito na hora sem prejuízo.',
      es: 'La calculadora en el semáforo es salvadora. Antes dudaba en 5 segundos, ahora GranScore me muestra verde y acepto con total seguridad de ganancia neta.',
      en: 'The quick calculator saves me at traffic lights. I used to hesitate in 5 seconds, now GranScore flashes green and I accept with total confidence.'
    }
  },
  {
    id: '3',
    name: 'Juliana Camargo',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    role: 'Motorista Uber Comfort & iFood',
    countryCode: 'BR',
    city: 'Curitiba - PR',
    vehicle: 'Hyundai HB20',
    extraIncome: '+R$ 1.420,00/mês',
    rating: 5,
    platform: 'Uber / iFood',
    quote: {
      pt: 'A Meta Tracker me dá uma paz de espírito surreal. Chego nos R$ 300 diários com menos Km rodados do que antes. Economizo pneu, óleo e tempo com minha família.',
      es: 'El Meta Tracker me da una tranquilidad increíble. Llego a la meta diaria con menos Km recorridos. Ahorro neumáticos, aceite y tiempo con mi familia.',
      en: 'The Meta Tracker gives me total peace of mind. I hit my daily target with fewer miles driven, saving tires, gas, and getting home early.'
    }
  },
  {
    id: '4',
    name: 'Michael Davis',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=200',
    role: 'Lyft & UberXL Driver',
    countryCode: 'US',
    city: 'Miami, FL',
    vehicle: 'Toyota Camry Hybrid',
    extraIncome: '+$ 680 USD/mo',
    rating: 5,
    platform: 'Uber / Lyft',
    quote: {
      pt: 'Em Miami o trânsito mata o lucro por hora. O GranApp calcula exatamente o lucro por hora real contando o horário de pico.',
      es: 'En Miami el tráfico arruina la ganancia por hora. GranApp calcula exactamente la ganancia neta real considerando las horas pico.',
      en: 'In Miami traffic eats away your hourly rate. GranApp calculates the exact net hourly profit factoring in real-time peak traffic.'
    }
  },
  {
    id: '5',
    name: 'Sebastián Osorio',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor InDrive & Cabify',
    countryCode: 'CO',
    city: 'Medellín',
    vehicle: 'Renault Logan',
    extraIncome: '+$ 480.000 COP/mes',
    rating: 5,
    platform: 'InDrive / Cabify',
    quote: {
      pt: 'A Cámara Secreta mostrou que a plataforma estava tirando até 32% das minhas viagens curtas. Mudei minha estratégia e faturei muito mais.',
      es: 'La Cámara Secreta me demostró cómo las plataformas se quedaban con hasta el 32% en viajes cortos. Cambié mi estrategia y aumenté mis ingresos.',
      en: 'The Secret Chamber proved apps were keeping up to 32% on short rides. I changed my accepting strategy and boosted my net earnings.'
    }
  },
  {
    id: '6',
    name: 'Eduardo "Lalo" Fernández',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor Uber & PedidosYa',
    countryCode: 'AR',
    city: 'Buenos Aires',
    vehicle: 'Fiat Cronos',
    extraIncome: '+$ 115.000 ARS/mes',
    rating: 5,
    platform: 'Uber / PedidosYa',
    quote: {
      pt: 'Com a inflação do combustível na Argentina, o GranApp recalcula o custo por Km instantaneamente. Não perco mais dinheiro!',
      es: 'Con la inflación del combustible en Argentina, GranApp me recalcula el costo por Km al instante. ¡Ya no pierdo plata!',
      en: 'With fuel price changes in Argentina, GranApp recalculates cost per Km instantly. I never lose money anymore!'
    }
  },
  {
    id: '7',
    name: 'Carlos Ruiz',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor Cabify & Bolt',
    countryCode: 'ES',
    city: 'Madrid',
    vehicle: 'Toyota Corolla Electric Hybrid',
    extraIncome: '+€ 340 / mes',
    rating: 5,
    platform: 'Cabify / Bolt',
    quote: {
      pt: 'Instalei a PWA no iPhone em 10 segundos. O visual escuro com roxo e dourado é top demais e consome pouca bateria enquanto dirijo.',
      es: 'Instalé la PWA en mi iPhone en 10 segundos. El diseño en modo oscuro púrpura y dorado es impecable y ahorra batería mientras conduzco.',
      en: 'Installed the PWA on my iPhone in 10 seconds. Dark mode with purple & gold looks slick and saves phone battery while driving.'
    }
  },
  {
    id: '8',
    name: 'Guilherme Siqueira',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    role: 'Motorista 99Pop & UberX',
    countryCode: 'BR',
    city: 'Belo Horizonte - MG',
    vehicle: 'Volkswagen Voyage 1.6 Flex',
    extraIncome: '+R$ 2.100,00/mês',
    rating: 5,
    platform: '99 / Uber',
    quote: {
      pt: 'Assinei o plano anual no primeiro dia e se pagou na primeira semana só rejeitando 4 corridas prejuízo. Recomendo pra todo grupo de ZAP de motorista!',
      es: 'Contraté el plan anual el primer día y se pagó solo en la primera semana rechazando 4 viajes con pérdidas. ¡Lo recomiendo a todos los grupos!',
      en: 'Subscribed to the annual plan on day one and it paid for itself in week one by rejecting 4 money-losing rides!'
    }
  },
  {
    id: '9',
    name: 'Diego Benítez',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor InDrive & Yango',
    countryCode: 'PE',
    city: 'Lima',
    vehicle: 'Kia Rio Sedan',
    extraIncome: '+$ 390 PEN/mes',
    rating: 5,
    platform: 'InDrive / DiDi',
    quote: {
      pt: 'O assistente de IA GranBot me avisa até quando a tarifa dinâmica de retorno vale a pena. Não fico mais preso em bairro sem corrida.',
      es: 'El asistente de IA GranBot me alerta si vale la pena el viaje de regreso. Ya no me quedo tirado en zonas sin viajes de vuelta.',
      en: 'The GranBot AI assistant alerts me if return trip surges are worth it. I never get stuck in dead zones anymore.'
    }
  },
  {
    id: '10',
    name: 'Fernando Castro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    role: 'Conductor Uber & Rappi',
    countryCode: 'CL',
    city: 'Santiago de Chile',
    vehicle: 'Chevrolet Sail',
    extraIncome: '+$ 110.000 CLP/mes',
    rating: 5,
    platform: 'Uber / Rappi',
    quote: {
      pt: 'Adaptação perfeita pro Chile e moedas da América Latina. O painel da meta diária me motiva todos os dias.',
      es: 'Adaptación perfecta para Chile y monedas de Latinoamérica. El panel de la meta diaria me motiva cada mañana.',
      en: 'Perfect adaptation for Chile and Latin America currencies. The daily target panel keeps me motivated every single morning.'
    }
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'granscore',
    question: {
      pt: 'O que é o GranScore e como ele é calculado?',
      es: '¿Qué es el GranScore y cómo se calcula?',
      en: 'What is GranScore and how is it calculated?'
    },
    answer: {
      pt: 'O GranScore é uma nota inteligente de 0 a 100 baseada no Lucro Líquido Real da corrida. O algoritmo analisa o valor bruto da viagem, a distância até o passageiro (Km rodado a vazio), a distância do trajeto, a duração estimada no trânsito e o custo exato do seu combustível por Km.',
      es: 'El GranScore es una calificación inteligente de 0 a 100 basada en la Ganancia Neta Real del viaje. El algoritmo analiza el valor bruto, la distancia de recogida (Km vacíos), la distancia de viaje, la duración estimada en tráfico y el costo de tu combustible.',
      en: 'GranScore is a smart 0-100 score based on your Real Net Profit. The algorithm evaluates gross pay, pickup distance (deadhead miles), trip distance, estimated traffic duration, and exact fuel cost per mile.'
    }
  },
  {
    id: 'faq-2',
    category: 'pwa',
    question: {
      pt: 'Preciso baixar pela Google Play Store ou Apple App Store?',
      es: '¿Necesito descargarlo desde Google Play Store o Apple App Store?',
      en: 'Do I need to download from Google Play Store or Apple App Store?'
    },
    answer: {
      pt: 'Não! O GranApp é um PWA (Progressive Web App) de última geração. Você pode instalá-lo diretamente pelo navegador do seu celular (Chrome ou Safari) clicando no botão "Instalar PWA". Ele ocupa quase zero memória e atualiza sozinho sem precisar ir na loja de aplicativos.',
      es: '¡No! GranApp es una PWA de última generación. Puedes instalarla directamente desde el navegador de tu celular (Chrome o Safari) haciendo clic en "Instalar PWA". No ocupa memoria y se actualiza sola sin usar tiendas de apps.',
      en: 'No! GranApp is a cutting-edge PWA. You install it directly from your phone browser (Chrome/Safari) with one tap. Uses minimal storage and updates automatically.'
    }
  },
  {
    id: 'faq-3',
    category: 'granscore',
    question: {
      pt: 'Como funciona a adaptação automática por país e moeda?',
      es: '¿Cómo funciona la adaptación automática por país y moneda?',
      en: 'How does automatic country & currency adaptation work?'
    },
    answer: {
      pt: 'O GranApp detecta automaticamente a sua localização, idioma e moeda local (R$, US$, €, MX$, COP, ARS, S/, CLP, £) ao abrir o app. As plataformas exibidas (Uber, 99, DiDi, Lyft, Bolt, Cabify, inDriver, iFood, Rappi) e os custos médios de combustível são configurados para a sua cidade automaticamente.',
      es: 'GranApp detecta automáticamente tu ubicación, idioma y moneda local (R$, US$, €, MX$, COP, ARS, S/, CLP, £) al ingresar. Las plataformas locales y precios promedio de combustible se configuran solos.',
      en: 'GranApp detects your location, language, and local currency (R$, US$, €, MX$, COP, ARS, S/, CLP, £) automatically. Local ride apps and default gas prices adapt immediately.'
    }
  },
  {
    id: 'faq-4',
    category: 'pwa',
    question: {
      pt: 'O GranApp funciona sem internet / offline?',
      es: '¿GranApp funciona sin internet / offline?',
      en: 'Does GranApp work offline without internet connection?'
    },
    answer: {
      pt: 'Sim! Graças à tecnologia PWA com Service Worker, a Calculadora GranScore e o Meta Tracker funcionam perfeitamente em modo offline ou em locais de sinal fraco. Suas corridas ficam salvas na memória do celular e sincronizam assim que o sinal voltar.',
      es: '¡Sí! Gracias a la tecnología PWA con Service Worker, la Calculadora GranScore y Meta Tracker funcionan sin conexión. Tus viajes se guardan localmente y se sincronizan cuando vuelve la señal.',
      en: 'Yes! Powered by Service Worker PWA technology, the GranScore calculator and Meta Tracker work offline in low signal areas. Data saves locally and syncs automatically.'
    }
  },
  {
    id: 'faq-5',
    category: 'seguranca',
    question: {
      pt: 'O GranApp violará os termos de uso da Uber, 99 ou DiDi?',
      es: '¿GranApp viola los términos de uso de Uber, 99 o DiDi?',
      en: 'Will GranApp violate terms of service of Uber, Lyft or DiDi?'
    },
    answer: {
      pt: 'Jamais. O GranApp é uma ferramenta independente de auxílio financeiro e cálculo para o motorista. Ele não intercepta dados privados das contas nem faz ações automáticas de aceite sem seu consentimento.',
      es: 'Jamás. GranApp es una herramienta independiente de cálculo financiero para el conductor. No intercepta contraseñas ni realiza acciones no autorizadas.',
      en: 'Never. GranApp is an independent driver financial calculator. It never accesses your private login credentials or performs unauthorized auto-accept actions.'
    }
  },
  {
    id: 'faq-6',
    category: 'granscore',
    question: {
      pt: 'O que significa cada cor no GranScore (🟢, 🟡, 🔴)?',
      es: '¿Qué significa cada color en el GranScore (🟢, 🟡, 🔴)?',
      en: 'What does each color mean in GranScore (🟢, 🟡, 🔴)?'
    },
    answer: {
      pt: '🟢 Verde (Score 75-100): Corrida de Ouro! Lucro alto por Km e por hora. Aceite imediatamente!\n🟡 Amarelo (Score 50-74): Corrida Regular. Vale a pena se estiver no caminho de volta para casa ou em momento de pouco movimento.\n🔴 Vermelho (Score 0-49): Corrida Prejuízo! O custo de combustível + desgaste do veículo consumirá seu ganho. Rejeite!',
      es: '🟢 Verde (75-100): ¡Viaje de Oro! Alta ganancia por Km y por hora. ¡Acepta de inmediato!\n🟡 Amarillo (50-74): Viaje Regular. Vale si está de regreso a casa o en horas de poca demanda.\n🔴 Rojo (0-49): ¡Viaje Pérdida! El combustible y desgaste devorarán tu ingreso. ¡Rechaza!',
      en: '🟢 Green (75-100): Gold Ride! High hourly & per-mile profit. Accept right away!\n🟡 Yellow (50-74): Average Ride. Good if heading towards home or slow hours.\n🔴 Red (0-49): Money Loser! Gas and car wear will eat all pay. Reject!'
    }
  },
  {
    id: 'faq-7',
    category: 'seguranca',
    question: {
      pt: 'O que é a Cámara Secreta dos Motoristas?',
      es: '¿Qué es la Cámara Secreta de los Conductores?',
      en: 'What is the Driver Secret Chamber?'
    },
    answer: {
      pt: 'A Cámara Secreta é uma seção exclusiva com comparativos reais da taxa de retenção oculta das plataformas (Uber, 99, DiDi, Lyft), mapa de zonas de perigo vs zonas com dinâmica garantida, e a calculadora de depreciação oculta por Km (pneus, freios e desvalorização do veículo).',
      es: 'La Cámara Secreta es una sección exclusiva con comparativos reales de las comisiones ocultas de apps, mapa de zonas de peligro vs zonas con tarifa dinámica asegurada, y calculadora de depreciación del vehículo.',
      en: 'The Secret Chamber is an exclusive module comparing actual app hidden commission rates, danger zones vs guaranteed dynamic surge areas, and car depreciation per mile.'
    }
  },
  {
    id: 'faq-8',
    category: 'pagamentos',
    question: {
      pt: 'Como funcionam os 7 dias grátis?',
      es: '¿Cómo funcionan los 7 días gratis?',
      en: 'How does the 7-day free trial work?'
    },
    answer: {
      pt: 'Você pode testar todas as funções do GranApp (GranScore ilimitado, Meta Tracker, Cámara Secreta e IA GranBot) por 7 dias corridos sem compromisso. Se não aumentar seus ganhos líquidos nesse período, pode cancelar com 1 clique.',
      es: 'Puedes probar todas las funciones de GranApp (GranScore ilimitado, Meta Tracker, Cámara Secreta e IA GranBot) por 7 días sin compromiso. Si no aumentas tus ingresos, cancelas con 1 clic.',
      en: 'You can test all features (Unlimited GranScore, Meta Tracker, Secret Chamber, GranBot AI) for 7 full days risk-free. Cancel anytime with 1 click.'
    }
  },
  {
    id: 'faq-9',
    category: 'pagamentos',
    question: {
      pt: 'Quais formas de pagamento são aceitas?',
      es: '¿Qué métodos de pago son aceptados?',
      en: 'Which payment methods are accepted?'
    },
    answer: {
      pt: 'Aceitamos Pix (no Brasil), Cartões de Crédito e Débito (todas as bandeiras), Google Pay, Apple Pay, PayPal e transferência local dependendo do seu país.',
      es: 'Aceptamos Tarjetas de Crédito/Débito, Pix (Brasil), Mercado Pago, PayPal, Google Pay y Apple Pay según tu país.',
      en: 'We accept Credit/Debit Cards, Pix (Brazil), Apple Pay, Google Pay, and PayPal worldwide.'
    }
  },
  {
    id: 'faq-10',
    category: 'pwa',
    question: {
      pt: 'Como funciona no iPhone / iOS?',
      es: '¿Cómo funciona en iPhone / iOS?',
      en: 'How does it work on iPhone / iOS?'
    },
    answer: {
      pt: 'No iPhone, abra o Safari, toque no ícone de compartilhamento (quadrado com seta para cima) e escolha "Adicionar à Tela de Início". O ícone do GranApp aparecerá na sua tela principal como um app nativo.',
      es: 'En iPhone, abre Safari, toca el ícono de compartir (cuadrado con flecha) y selecciona "Agregar a Inicio". El ícono de GranApp aparecerá en tu pantalla como app nativa.',
      en: 'On iPhone, open Safari, tap the Share icon (square with arrow) and select "Add to Home Screen". GranApp will install as a native home app.'
    }
  },
  {
    id: 'faq-11',
    category: 'granscore',
    question: {
      pt: 'O assistente GranBot com IA responde na hora?',
      es: '¿El asistente GranBot con IA responde al instante?',
      en: 'Does GranBot AI assistant respond instantly?'
    },
    answer: {
      pt: 'Sim! O GranBot é alimentado pelo Gemini AI de última geração. Você pode digitar o resumo da corrida (ex: "UberX 18 reais 10km 20min") ou tirar dúvida de segurança que a IA analisa o custo e emite um veredito em menos de 2 segundos.',
      es: '¡Sí! GranBot está impulsado por Gemini AI de última generación. Puedes escribir los datos del viaje y la IA calcula el costo y emite un veredicto en menos de 2 segundos.',
      en: 'Yes! GranBot is powered by Gemini AI. Enter ride details and the AI calculates costs and delivers a verdict in under 2 seconds.'
    }
  },
  {
    id: 'faq-12',
    category: 'pagamentos',
    question: {
      pt: 'Qual a diferença dos planos Mensal, Trimestral e Anual?',
      es: '¿Cuál es la diferencia entre los planes Mensual, Trimestral y Anual?',
      en: 'What is the difference between Monthly, Quarterly, and Annual plans?'
    },
    answer: {
      pt: 'O plano Anual garante 24% de desconto e trava o menor preço na sua moeda local com prioridade no suporte VIP via WhatsApp. O Trimestral tem 7% OFF. Todos os planos dão acesso total às ferramentas.',
      es: 'El plan Anual ofrece un 24% de descuento, asegura el precio más bajo en tu moneda local y soporte VIP prioritario por WhatsApp. El Trimestral tiene un 7% OFF.',
      en: 'The Annual plan includes a 24% discount, locks the best local rate, and gives priority VIP WhatsApp support. The Quarterly plan gives 7% OFF.'
    }
  },
  {
    id: 'faq-13',
    category: 'seguranca',
    question: {
      pt: 'Como posso falar com o suporte do GranApp?',
      es: '¿Cómo puedo hablar con el soporte de GranApp?',
      en: 'How can I contact GranApp support?'
    },
    answer: {
      pt: 'Temos atendimento humanizado direto pelo botão flutuante do WhatsApp no canto inferior direito do app, disponível todos os dias para ajudar motoristas com dúvidas.',
      es: 'Tenemos atención directa por WhatsApp en el botón flotante del app, disponible todos los días para ayudar a los conductores.',
      en: 'We offer live support directly via the floating WhatsApp button in the app, available daily to assist driver members.'
    }
  }
];

export const SECRET_CHAMBER_DATA = {
  hiddenFees: [
    { platform: 'Uber', advertisedFee: '20% - 25%', realObservedFee: '28% - 38%', note: 'Taxas dinâmicas frequentemente absorvidas pela plataforma nas corridas curtas.' },
    { platform: '99 / 99Pop', advertisedFee: '19.9%', realObservedFee: '24% - 31%', note: 'Tarifa mínima variável e taxas de seguro de terceiros imbutidas.' },
    { platform: 'DiDi', advertisedFee: '18% - 22%', realObservedFee: '23% - 29%', note: 'Flutuação de taxa conforme o horário e alta de demanda.' },
    { platform: 'Lyft', advertisedFee: '20%', realObservedFee: '27% - 35%', note: 'Service fees e booking fee ajustados por zonas aeroportuárias.' },
    { platform: 'Cabify', advertisedFee: '15% - 20%', realObservedFee: '20% - 26%', note: 'Taxas mais estáveis, mas com menor volume em horários de pico.' }
  ],
  dangerZoneAlerts: [
    { title: 'Zonas de Deslocamento Vazio', text: 'Locais onde você roda mais de 5km sem passageiro no retorno. O GranScore penaliza em 35% essas rotas.' },
    { title: 'Falsas Tarifas Dinâmicas', text: 'Zonas roxas/vermelhas nos mapas que duram menos de 2 minutos apenas para atrair motoristas e baixar a tarifa final.' },
    { title: 'Horários de Ilha de Lucro', text: 'Das 06:15 às 08:45 e das 17:30 às 20:15 são as janelas de maior lucro líquido por Km rodado nas capitais.' }
  ]
};
