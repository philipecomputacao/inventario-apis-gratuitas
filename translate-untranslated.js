#!/usr/bin/env node
/**
 * translate-untranslated.js
 *
 * Le untranslated.json e gera traducoes EN/ES das 210 linhas usando regras
 * de substituicao por padroes comuns (APIs brasileiras de fintech, IoT,
 * IA/ML, etc). Salva o resultado de volta no untranslated.json.
 *
 * Estrategia: dicionario PT->EN e PT->ES de termos tecnicos, mais alguns
 * mapeamentos string-completa pra casos especificos.
 *
 * Uso: node translate-untranslated.js  (sobrescreve untranslated.json)
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROWS_PATH = path.join(__dirname, 'untranslated.json');
const rows = JSON.parse(fs.readFileSync(ROWS_PATH, 'utf8'));

// === Mapas de tradução ===

const CAT = {
  'Fontes Complementares': {
    en: 'Complementary Sources',
    es: 'Fuentes Complementarias',
  },
};

const TIER = {
  'Ilimitado': { en: 'Unlimited', es: 'Ilimitado' },
  'Público': { en: 'Public', es: 'Público' },
  'Sandbox': { en: 'Sandbox', es: 'Sandbox' },
  'Tier gratuito': { en: 'Free tier', es: 'Capa gratis' },
  'Free tier': { en: 'Free tier', es: 'Capa gratis' },
  'Open-source': { en: 'Open-source', es: 'Open-source' },
  'Trial': { en: 'Trial', es: 'Prueba' },
  'Variável': { en: 'Variable', es: 'Variable' },
  'MAU free': { en: 'MAU free', es: 'MAU gratis' },
  'Free tier 2 meses': { en: 'Free tier (2 months)', es: 'Capa gratis (2 meses)' },
  '4 dominios': { en: '4 domains', es: '4 dominios' },
};

// tiers numéricos: "X req/mês", "X emails/dia", etc -> swap das unidades
function translateTier(pt) {
  if (TIER[pt]) return TIER[pt];
  let en = pt
    .replace(/req\/mês/g, 'req/month')
    .replace(/req\/dia/g, 'req/day')
    .replace(/req\/min/g, 'req/min')
    .replace(/emails\/mês/g, 'emails/month')
    .replace(/emails\/dia/g, 'emails/day')
    .replace(/msg\/mês/g, 'msg/month')
    .replace(/msg\/dia/g, 'msg/day')
    .replace(/chars\/mês/g, 'chars/month')
    .replace(/NF\/mês/g, 'NF/month')
    .replace(/devices/g, 'devices')
    .replace(/one-time/g, 'one-time')
    .replace(/free/g, 'free')
    .replace(/platform credits/g, 'platform credits')
    .replace(/€2 free/g, '€2 free');
  let es = pt
    .replace(/req\/mês/g, 'req/mes')
    .replace(/req\/dia/g, 'req/día')
    .replace(/req\/min/g, 'req/min')
    .replace(/emails\/mês/g, 'emails/mes')
    .replace(/emails\/dia/g, 'emails/día')
    .replace(/msg\/mês/g, 'msg/mes')
    .replace(/msg\/dia/g, 'msg/día')
    .replace(/chars\/mês/g, 'chars/mes')
    .replace(/NF\/mês/g, 'NF/mes');
  return { en, es };
}

// === Dicionário de tradução para OBS ===
// Mapeia strings PT completas conhecidas para EN/ES.
// (Coloca primeiro pra ter precedência sobre regras pattern-based)
const OBS_FULL = {
  'Gera CNPJ alfanumérico (novo formato 2026)': {
    en: 'Generates alphanumeric CNPJ (new 2026 format)',
    es: 'Genera CNPJ alfanumérico (nuevo formato 2026)',
  },
  'Busca CEP com latitude/longitude': {
    en: 'CEP lookup with latitude/longitude',
    es: 'Búsqueda de CEP con latitud/longitud',
  },
  'Estados, municípios, regiões, mesorregiões, microrregiões do Brasil': {
    en: 'Brazilian states, municipalities, regions, mesoregions, microregions',
    es: 'Estados, municipios, regiones, mesoregiones, microrregiones de Brasil',
  },
  'Agregados estatísticos do SIDRA (Censo, PNAD, POF)': {
    en: 'SIDRA statistical aggregates (Census, PNAD, POF)',
    es: 'Agregados estadísticos del SIDRA (Censo, PNAD, POF)',
  },
  'Frequência de nomes por década e região': {
    en: 'Name frequency by decade and region',
    es: 'Frecuencia de nombres por década y región',
  },
  'Estimativas populacionais dos municípios': {
    en: 'Population estimates for municipalities',
    es: 'Estimaciones poblacionales de los municipios',
  },
  'Consulta CNPJ alternativa - 3 req/min gratuitas': {
    en: 'Alternative CNPJ lookup - 3 free req/min',
    es: 'Consulta CNPJ alternativa - 3 req/min gratis',
  },
  'Rastreamento de objetos dos Correios via scraping': {
    en: 'Correios package tracking via scraping',
    es: 'Seguimiento de envíos Correios vía scraping',
  },
  'API de CNPJ com dados adicionais (QSA, CNAE)': {
    en: 'CNPJ API with additional data (QSA, CNAE)',
    es: 'API de CNPJ con datos adicionales (QSA, CNAE)',
  },
  'Consulta CNPJ gratuita - 100 req/mês': {
    en: 'Free CNPJ lookup - 100 req/month',
    es: 'Consulta CNPJ gratis - 100 req/mes',
  },
  'API Minha Receita (dados públicos de CNPJ)': {
    en: 'Minha Receita API (public CNPJ data)',
    es: 'API Minha Receita (datos públicos de CNPJ)',
  },
  'Emissão de NF-e com tier gratuito': {
    en: 'NF-e issuance with free tier',
    es: 'Emisión de NF-e con capa gratis',
  },
  'API para emissão de NFe, NFCe, CTe, MDFe': {
    en: 'API for issuing NFe, NFCe, CTe, MDFe',
    es: 'API para emisión de NFe, NFCe, CTe, MDFe',
  },
  'API para emissão de NFS-e em prefeituras': {
    en: 'API for NFS-e issuance at city halls',
    es: 'API para emisión de NFS-e en municipios',
  },
  'Gateway de pagamento brasileiro - ambiente sandbox gratuito': {
    en: 'Brazilian payment gateway - free sandbox environment',
    es: 'Pasarela de pago brasileña - ambiente sandbox gratis',
  },
  'Link de pagamento recorrente': {
    en: 'Recurring payment link',
    es: 'Enlace de pago recurrente',
  },
  'API completa do MercadoPago (PIX, cartão, boleto)': {
    en: 'Full MercadoPago API (PIX, card, boleto)',
    es: 'API completa de MercadoPago (PIX, tarjeta, boleto)',
  },
  'API de cobranças e pagamentos brasileiros (PIX, boleto, cartão)': {
    en: 'Brazilian billing and payments API (PIX, boleto, card)',
    es: 'API de cobros y pagos brasileños (PIX, boleto, tarjeta)',
  },
  'API de PIX e boletos - 30 dias gratuitos': {
    en: 'PIX and boleto API - 30 free days',
    es: 'API de PIX y boletos - 30 días gratis',
  },
  'Gateway de pagamento LATAM': {
    en: 'LATAM payment gateway',
    es: 'Pasarela de pago LATAM',
  },
  'API PagSeguro com sandbox gratuito': {
    en: 'PagSeguro API with free sandbox',
    es: 'API PagSeguro con sandbox gratis',
  },
  'API PicPay para pagamentos': {
    en: 'PicPay API for payments',
    es: 'API PicPay para pagos',
  },
  'API e-commerce Cielo (Visa, Master, Elo)': {
    en: 'Cielo e-commerce API (Visa, Master, Elo)',
    es: 'API e-commerce Cielo (Visa, Master, Elo)',
  },
  'API Rede Itaú (cartões de crédito/débito)': {
    en: 'Rede Itaú API (credit/debit cards)',
    es: 'API Rede Itaú (tarjetas de crédito/débito)',
  },
  'API Stone para pagamentos': {
    en: 'Stone API for payments',
    es: 'API Stone para pagos',
  },
  'API PIX com split de pagamentos': {
    en: 'PIX API with payment split',
    es: 'API PIX con división de pagos',
  },
  'API de PIX completa': {
    en: 'Complete PIX API',
    es: 'API de PIX completa',
  },
  'API de banking com PIX, boleto, transferência': {
    en: 'Banking API with PIX, boleto, transfers',
    es: 'API de banca con PIX, boleto, transferencia',
  },
  'API completa do Banco Inter (PIX, cobrança, conta)': {
    en: 'Full Banco Inter API (PIX, billing, account)',
    es: 'API completa de Banco Inter (PIX, cobro, cuenta)',
  },
  'API Itaú Open Banking': { en: 'Itaú Open Banking API', es: 'API Itaú Open Banking' },
  'API Bradesco (cobrança, pagamentos)': {
    en: 'Bradesco API (billing, payments)',
    es: 'API Bradesco (cobros, pagos)',
  },
  'API Santander Open Banking': { en: 'Santander Open Banking API', es: 'API Santander Open Banking' },
  'API BB (boletos, PIX, Open Finance)': {
    en: 'BB API (boletos, PIX, Open Finance)',
    es: 'API BB (boletos, PIX, Open Finance)',
  },
  'API Caixa Econômica (boletos, FGTS)': {
    en: 'Caixa Econômica API (boletos, FGTS)',
    es: 'API Caixa Econômica (boletos, FGTS)',
  },
  'API Sicredi Open Banking': { en: 'Sicredi Open Banking API', es: 'API Sicredi Open Banking' },
  'API Banco Original Open Finance': {
    en: 'Banco Original Open Finance API',
    es: 'API Banco Original Open Finance',
  },
  'API BTG Pactual banking': { en: 'BTG Pactual banking API', es: 'API BTG Pactual banking' },
  'API de pagamentos e PIX': { en: 'Payments and PIX API', es: 'API de pagos y PIX' },
  'API da exchange Mercado Bitcoin': {
    en: 'Mercado Bitcoin exchange API',
    es: 'API del exchange Mercado Bitcoin',
  },
  'API da exchange NovaDAX': { en: 'NovaDAX exchange API', es: 'API del exchange NovaDAX' },
  'API da Binance (válida globalmente)': {
    en: 'Binance API (globally valid)',
    es: 'API de Binance (válida globalmente)',
  },
  'Cotação de criptomoedas em BRL': {
    en: 'Cryptocurrency quotes in BRL',
    es: 'Cotización de criptomonedas en BRL',
  },
  'Índice de preço de Bitcoin em BRL': {
    en: 'Bitcoin price index in BRL',
    es: 'Índice de precio de Bitcoin en BRL',
  },
  'Open Finance agregador': { en: 'Open Finance aggregator', es: 'Open Finance agregador' },
  'Open Finance LATAM': { en: 'Open Finance LATAM', es: 'Open Finance LATAM' },
  'Integração PIX via Belvo': { en: 'PIX integration via Belvo', es: 'Integración PIX vía Belvo' },
  'API de Open Finance Brasil': { en: 'Open Finance Brazil API', es: 'API de Open Finance Brasil' },
  'API de pagamento e conciliação': { en: 'Payment and reconciliation API', es: 'API de pago y conciliación' },
  'API de pagamento marketplace': { en: 'Marketplace payment API', es: 'API de pago marketplace' },
  'API Wirecard (moip) pagamentos': { en: 'Wirecard (moip) payments API', es: 'API Wirecard (moip) pagos' },
  'API Moip para pagamentos': { en: 'Moip API for payments', es: 'API Moip para pagos' },
  'API Conductor de pagamentos': { en: 'Conductor payments API', es: 'API Conductor de pagos' },
  'Gateway de pagamento brasileiro': { en: 'Brazilian payment gateway', es: 'Pasarela de pago brasileña' },
  'API de boletos e PIX recorrente': { en: 'Recurring boleto and PIX API', es: 'API de boletos y PIX recurrente' },
  'API de pagamento para maquininhas': { en: 'Card terminal payment API', es: 'API de pago para terminales' },
  'API Safra pagamento': { en: 'Safra payment API', es: 'API Safra pago' },
  'Corretora para investir em ações EUA': { en: 'Brokerage to invest in US stocks', es: 'Corredora para invertir en acciones EE.UU.' },
  'API de investimentos XP': { en: 'XP investments API', es: 'API de inversiones XP' },
  'API da corretora Toro': { en: 'Toro brokerage API', es: 'API de la corredora Toro' },
  'API Warren de investimentos': { en: 'Warren investments API', es: 'API Warren de inversiones' },
  'API de investimentos internacionais': { en: 'International investments API', es: 'API de inversiones internacionales' },
  'API Modal de investimentos': { en: 'Modal investments API', es: 'API Modal de inversiones' },
  'API Genial de investimentos': { en: 'Genial investments API', es: 'API Genial de inversiones' },
  'API Clear investimentos': { en: 'Clear investments API', es: 'API Clear inversiones' },
  'API Rico investimentos': { en: 'Rico investments API', es: 'API Rico inversiones' },
  'API Nova Futuros (B3)': { en: 'Nova Futuros API (B3)', es: 'API Nova Futuros (B3)' },
  'API Trybe de educação tech': { en: 'Trybe tech education API', es: 'API Trybe de educación tech' },
  'API Alura (educação)': { en: 'Alura API (education)', es: 'API Alura (educación)' },
  'API Rocketseat (educação)': { en: 'Rocketseat API (education)', es: 'API Rocketseat (educación)' },
  'API Digital House Brasil': { en: 'Digital House Brazil API', es: 'API Digital House Brasil' },
  'API de ficção científica brasileira': { en: 'Brazilian science fiction API', es: 'API de ciencia ficción brasileña' },
  'API de games brasileira': { en: 'Brazilian games API', es: 'API de juegos brasileña' },
  'Embeddings GPT-3.5 - tier gratuito limitado': { en: 'GPT-3.5 embeddings - limited free tier', es: 'Embeddings GPT-3.5 - capa gratis limitada' },
  'Roda modelos no HuggingFace via API': { en: 'Run models on HuggingFace via API', es: 'Ejecuta modelos en HuggingFace vía API' },
  'Trial key gratuita com 1k req/mês': { en: 'Free trial key with 1k req/month', es: 'Clave trial gratis con 1k req/mes' },
  'API Claude com créditos iniciais': { en: 'Claude API with initial credits', es: 'API Claude con créditos iniciales' },
  'API Mistral com free tier': { en: 'Mistral API with free tier', es: 'API Mistral con capa gratis' },
  'API Gemini com 60 req/min gratuitas': { en: 'Gemini API with 60 free req/min', es: 'API Gemini con 60 req/min gratis' },
  'API Groq (LPU) - super rápida, free tier generoso': { en: 'Groq API (LPU) - super fast, generous free tier', es: 'API Groq (LPU) - super rápida, capa gratis generosa' },
  'API Together AI - $5 créditos': { en: 'Together AI API - $5 credits', es: 'API Together AI - $5 créditos' },
  'API Fireworks (open-source LLMs)': { en: 'Fireworks API (open-source LLMs)', es: 'API Fireworks (LLMs open-source)' },
  'API Replicate (roda modelos open-source)': { en: 'Replicate API (runs open-source models)', es: 'API Replicate (ejecuta modelos open-source)' },
  'API Ollama (LLMs locais na nuvem)': { en: 'Ollama API (local LLMs in the cloud)', es: 'API Ollama (LLMs locales en la nube)' },
  'API OpenRouter (multi-modelo)': { en: 'OpenRouter API (multi-model)', es: 'API OpenRouter (multi-modelo)' },
  'API Perplexity (busca com IA)': { en: 'Perplexity API (AI search)', es: 'API Perplexity (búsqueda con IA)' },
  'API DeepInfra (LLMs open-source)': { en: 'DeepInfra API (open-source LLMs)', es: 'API DeepInfra (LLMs open-source)' },
  'API Lepton AI (LLMs na nuvem)': { en: 'Lepton AI API (cloud LLMs)', es: 'API Lepton AI (LLMs en la nube)' },
  'API AI21 (Jamba models)': { en: 'AI21 API (Jamba models)', es: 'API AI21 (modelos Jamba)' },
  'API Cerebrium (deploy de modelos)': { en: 'Cerebrium API (model deployment)', es: 'API Cerebrium (despliegue de modelos)' },
  'API Modal (serverless GPU)': { en: 'Modal API (serverless GPU)', es: 'API Modal (GPU serverless)' },
  'API Banana (deploy de modelos ML)': { en: 'Banana API (ML model deployment)', es: 'API Banana (despliegue de modelos ML)' },
  'API Beam (deploy GPU)': { en: 'Beam API (GPU deployment)', es: 'API Beam (despliegue GPU)' },
  'Cog - containerizar modelos ML': { en: 'Cog - containerize ML models', es: 'Cog - contenerizar modelos ML' },
  'API OctoML (deploy otimizado)': { en: 'OctoML API (optimized deployment)', es: 'API OctoML (despliegue optimizado)' },
  'ML na AWS com free tier': { en: 'ML on AWS with free tier', es: 'ML en AWS con capa gratis' },
  'ML na Azure com free tier': { en: 'ML on Azure with free tier', es: 'ML en Azure con capa gratis' },
  'Vertex AI no GCP': { en: 'Vertex AI on GCP', es: 'Vertex AI en GCP' },
  'Geocoding via OSM - rate limit 1 req/s': { en: 'Geocoding via OSM - rate limit 1 req/s', es: 'Geocodificación vía OSM - rate limit 1 req/s' },
  'Query avançada em dados OSM': { en: 'Advanced query on OSM data', es: 'Consulta avanzada en datos OSM' },
  'Geocoding Mapbox com tier gratuito': { en: 'Mapbox geocoding with free tier', es: 'Geocodificación Mapbox con capa gratis' },
  'Geocoding HERE Maps com 250k req/mês': { en: 'HERE Maps geocoding with 250k req/month', es: 'Geocodificación HERE Maps con 250k req/mes' },
  'Geocoding baseado em OSM - 5k/dia': { en: 'OSM-based geocoding - 5k/day', es: 'Geocodificación basada en OSM - 5k/día' },
  'Geocoding, routing, isolines': { en: 'Geocoding, routing, isolines', es: 'Geocodificación, rutas, isolíneas' },
  'Forward + reverse geocoding': { en: 'Forward + reverse geocoding', es: 'Geocodificación directa + inversa' },
  'Geocoding baseado em OSM premium': { en: 'OSM-based premium geocoding', es: 'Geocodificación premium basada en OSM' },
  'IP geolocation API': { en: 'IP geolocation API', es: 'API de geolocalización IP' },
  'IP geolocation - 50k/mês free': { en: 'IP geolocation - 50k/month free', es: 'Geolocalización IP - 50k/mes gratis' },
  'IP info - 1k/dia': { en: 'IP info - 1k/day', es: 'Info IP - 1k/día' },
  'IP geolocation - 30k/mês': { en: 'IP geolocation - 30k/month', es: 'Geolocalización IP - 30k/mes' },
  'IP geolocation - 500/mês': { en: 'IP geolocation - 500/month', es: 'Geolocalización IP - 500/mes' },
  'IP geolocation - 10k/mês': { en: 'IP geolocation - 10k/month', es: 'Geolocalización IP - 10k/mes' },
  'IP geolocation (lite)': { en: 'IP geolocation (lite)', es: 'Geolocalización IP (lite)' },
  'IP to City - 50k/mês free': { en: 'IP to City - 50k/month free', es: 'IP a Ciudad - 50k/mes gratis' },
  'API SMS, voz, telefonia global': { en: 'SMS, voice, global telephony API', es: 'API SMS, voz, telefonía global' },
  'API omnichannel (SMS, WhatsApp, email)': { en: 'Omnichannel API (SMS, WhatsApp, email)', es: 'API omnicanal (SMS, WhatsApp, email)' },
  'API de voz e SMS': { en: 'Voice and SMS API', es: 'API de voz y SMS' },
  'API de SMS, voz, WhatsApp': { en: 'SMS, voice, WhatsApp API', es: 'API de SMS, voz, WhatsApp' },
  'API de SMS, voz, número': { en: 'SMS, voice, number API', es: 'API de SMS, voz, número' },
  'API SMS, voz, verify': { en: 'SMS, voice, verify API', es: 'API SMS, voz, verify' },
  'SMPP - protocolo de SMS': { en: 'SMPP - SMS protocol', es: 'SMPP - protocolo SMS' },
  'API email marketing - 6k/mês': { en: 'Email marketing API - 6k/month', es: 'API email marketing - 6k/mes' },
  'Email + SMTP - 500/mês free': { en: 'Email + SMTP - 500/month free', es: 'Email + SMTP - 500/mes gratis' },
  'Email marketing API': { en: 'Email marketing API', es: 'API de email marketing' },
  'API email - 12k/mês': { en: 'Email API - 12k/month', es: 'API email - 12k/mes' },
  'API email + SMS - 300/dia': { en: 'Email + SMS API - 300/day', es: 'API email + SMS - 300/día' },
  'API email transacional - 5k/mês free trial': { en: 'Transactional email API - 5k/month free trial', es: 'API email transaccional - 5k/mes trial gratis' },
  'Email transacional - 100/mês': { en: 'Transactional email - 100/month', es: 'Email transaccional - 100/mes' },
  'Email transacional - 500/mês': { en: 'Transactional email - 500/month', es: 'Email transaccional - 500/mes' },
  'Email API - 100/mês free trial': { en: 'Email API - 100/month free trial', es: 'API email - 100/mes trial gratis' },
  'Email SES - 62k/mês from EC2': { en: 'Email SES - 62k/month from EC2', es: 'Email SES - 62k/mes desde EC2' },
  'Email - 100/dia forever free': { en: 'Email - 100/day forever free', es: 'Email - 100/día gratis para siempre' },
  'Push notifications - ilimitado': { en: 'Push notifications - unlimited', es: 'Notificaciones push - ilimitado' },
  'Push notifications - free tier': { en: 'Push notifications - free tier', es: 'Notificaciones push - capa gratis' },
  'Push notifications - $5 one-time': { en: 'Push notifications - $5 one-time', es: 'Notificaciones push - $5 una vez' },
  'Push notifications - 2k/dia': { en: 'Push notifications - 2k/day', es: 'Notificaciones push - 2k/día' },
  'Notificações in-app + email + push': { en: 'In-app + email + push notifications', es: 'Notificaciones in-app + email + push' },
  'Notification infrastructure': { en: 'Notification infrastructure', es: 'Infraestructura de notificaciones' },
  'Open-source notification infrastructure': { en: 'Open-source notification infrastructure', es: 'Infraestructura de notificaciones open-source' },
  'Chat open-source self-hosted': { en: 'Open-source self-hosted chat', es: 'Chat open-source self-hosted' },
  'Chat self-hosted open-source': { en: 'Self-hosted open-source chat', es: 'Chat self-hosted open-source' },
  'Chat in-app com free tier': { en: 'In-app chat with free tier', es: 'Chat in-app con capa gratis' },
  'Chat in-app - MAU gratuito': { en: 'In-app chat - free MAU', es: 'Chat in-app - MAU gratis' },
  'Chat API - 500 MAU free': { en: 'Chat API - 500 free MAU', es: 'API de chat - 500 MAU gratis' },
  'Real-time messaging - 200 devices': { en: 'Real-time messaging - 200 devices', es: 'Mensajería en tiempo real - 200 dispositivos' },
  'Real-time messaging - 6M/mês': { en: 'Real-time messaging - 6M/month', es: 'Mensajería en tiempo real - 6M/mes' },
  'Real-time messaging - 200k/dia': { en: 'Real-time messaging - 200k/day', es: 'Mensajería en tiempo real - 200k/día' },
  'Activity feeds + chat': { en: 'Activity feeds + chat', es: 'Feeds de actividad + chat' },
  'Chat in-app + push': { en: 'In-app chat + push', es: 'Chat in-app + push' },
  'Chat in-app': { en: 'In-app chat', es: 'Chat in-app' },
  'Live chat API': { en: 'Live chat API', es: 'API de live chat' },
  'Customer messaging': { en: 'Customer messaging', es: 'Mensajería al cliente' },
  'Conversational marketing': { en: 'Conversational marketing', es: 'Marketing conversacional' },
  'Live chat - 14 dias trial': { en: 'Live chat - 14-day trial', es: 'Live chat - 14 días trial' },
  'Live chat gratuito ilimitado': { en: 'Free unlimited live chat', es: 'Live chat gratis ilimitado' },
  'Live chat com IA': { en: 'Live chat with AI', es: 'Live chat con IA' },
  'Live chat gratuito': { en: 'Free live chat', es: 'Live chat gratis' },
  'Live chat': { en: 'Live chat', es: 'Live chat' },
  'Live chat premium': { en: 'Premium live chat', es: 'Live chat premium' },
  'API Khan Academy (dados de exercícios/vídeos)': { en: 'Khan Academy API (exercise/video data)', es: 'API Khan Academy (datos de ejercicios/videos)' },
  'API Coursera para cursos': { en: 'Coursera API for courses', es: 'API Coursera para cursos' },
  'API edX cursos': { en: 'edX courses API', es: 'API edX cursos' },
  'API Udemy cursos': { en: 'Udemy courses API', es: 'API Udemy cursos' },
  'API OpenClassrooms': { en: 'OpenClassrooms API', es: 'API OpenClassrooms' },
  'API farmácia CVS': { en: 'CVS pharmacy API', es: 'API farmacia CVS' },
  'Preços de medicamentos': { en: 'Drug pricing', es: 'Precios de medicamentos' },
  'API clínica Mayo': { en: 'Mayo Clinic API', es: 'API clínica Mayo' },
  'API Zocdoc de agendamento': { en: 'Zocdoc scheduling API', es: 'API Zocdoc de agendamiento' },
  'API de saúde Practo': { en: 'Practo health API', es: 'API de salud Practo' },
  'Weather API com IA - 500/dia': { en: 'Weather API with AI - 500/day', es: 'API de clima con IA - 500/día' },
  'Weather marinho - 50/dia': { en: 'Marine weather - 50/day', es: 'Clima marino - 50/día' },
  'Weather API': { en: 'Weather API', es: 'API de clima' },
  'Weather API hyperlocal': { en: 'Hyperlocal weather API', es: 'API de clima hiperlocal' },
  'API compatível com Dark Sky': { en: 'Dark Sky compatible API', es: 'API compatible con Dark Sky' },
  'DNS 1.1.1.1 - API gratuita': { en: 'DNS 1.1.1.1 - free API', es: 'DNS 1.1.1.1 - API gratis' },
  'DNS hosting gratuito': { en: 'Free DNS hosting', es: 'Hosting DNS gratis' },
  'DNS hosting gratuito com API': { en: 'Free DNS hosting with API', es: 'Hosting DNS gratis con API' },
  'DNS hosting - 4 dominios free': { en: 'DNS hosting - 4 free domains', es: 'Hosting DNS - 4 dominios gratis' },
  'DNS privacy-first': { en: 'Privacy-first DNS', es: 'DNS privacy-first' },
  'Headless browser API': { en: 'Headless browser API', es: 'API de navegador headless' },
  'Web scraping API': { en: 'Web scraping API', es: 'API de web scraping' },
  'Web scraping + headless': { en: 'Web scraping + headless', es: 'Web scraping + headless' },
  'Web data extraction com IA': { en: 'Web data extraction with AI', es: 'Extracción de datos web con IA' },
  'Web scraping com LLM': { en: 'Web scraping with LLM', es: 'Web scraping con LLM' },
  'Web scraping profissional': { en: 'Professional web scraping', es: 'Web scraping profesional' },
  'Web scraping platform': { en: 'Web scraping platform', es: 'Plataforma de web scraping' },
  'Headless browser serverless': { en: 'Serverless headless browser', es: 'Navegador headless serverless' },
  'Headless browser + scraping': { en: 'Headless browser + scraping', es: 'Navegador headless + scraping' },
  'API IoT Tuya - 10k/mês': { en: 'Tuya IoT API - 10k/month', es: 'API IoT Tuya - 10k/mes' },
  'API IoT Particle': { en: 'Particle IoT API', es: 'API IoT Particle' },
  'API IoT Blynk - 2k req/min': { en: 'Blynk IoT API - 2k req/min', es: 'API IoT Blynk - 2k req/min' },
  'IoT analytics MathWorks': { en: 'MathWorks IoT analytics', es: 'Analítica IoT MathWorks' },
  'API IoT Ubidots - 3 devices': { en: 'Ubidots IoT API - 3 devices', es: 'API IoT Ubidots - 3 dispositivos' },
  'IoT platform': { en: 'IoT platform', es: 'Plataforma IoT' },
  'Eclipse IoT stack': { en: 'Eclipse IoT stack', es: 'Stack IoT Eclipse' },
  'IoT Adafruit - 30 dados/min': { en: 'Adafruit IoT - 30 data/min', es: 'IoT Adafruit - 30 datos/min' },
  'Arduino IoT Cloud': { en: 'Arduino IoT Cloud', es: 'Arduino IoT Cloud' },
  'ESPHome - firmware IoT': { en: 'ESPHome - IoT firmware', es: 'ESPHome - firmware IoT' },
  'Tasmota - firmware IoT alternativo': { en: 'Tasmota - alternative IoT firmware', es: 'Tasmota - firmware IoT alternativo' },
  'Tradução DeepL - 500k/mês free': { en: 'DeepL translation - 500k/month free', es: 'Traducción DeepL - 500k/mes gratis' },
  'Tradução Yandex - 1M/mês': { en: 'Yandex translation - 1M/month', es: 'Traducción Yandex - 1M/mes' },
  'Tradução Microsoft - 2M/mês free': { en: 'Microsoft translation - 2M/month free', es: 'Traducción Microsoft - 2M/mes gratis' },
  'Tradução Amazon - 2M/mês (12 meses)': { en: 'Amazon translation - 2M/month (12 months)', es: 'Traducción Amazon - 2M/mes (12 meses)' },
  'Tradução adaptativa': { en: 'Adaptive translation', es: 'Traducción adaptativa' },
  'API Reverso tradução': { en: 'Reverso translation API', es: 'API Reverso traducción' },
  'Traduções contextuais': { en: 'Contextual translations', es: 'Traducciones contextuales' },
};

// === Aplica traducoes ===
let translated = 0, missed = 0;
for (const row of rows) {
  // cat
  const catKey = row.cat.pt;
  if (CAT[catKey]) {
    row.cat.en = CAT[catKey].en;
    row.cat.es = CAT[catKey].es;
  }
  // tier
  const tierTrans = translateTier(row.tier.pt);
  row.tier.en = tierTrans.en;
  row.tier.es = tierTrans.es;
  // obs
  const obsKey = row.obs.pt;
  if (OBS_FULL[obsKey]) {
    row.obs.en = OBS_FULL[obsKey].en;
    row.obs.es = OBS_FULL[obsKey].es;
    translated++;
  } else {
    // fallback: mantém pt em todos
    row.obs.en = row.obs.pt;
    row.obs.es = row.obs.pt;
    missed++;
    console.log(`MISS: "${obsKey}"`);
  }
}

fs.writeFileSync(ROWS_PATH, JSON.stringify(rows, null, 2));
console.log(`\nTraduzidas: ${translated}, fallback PT: ${missed}`);
