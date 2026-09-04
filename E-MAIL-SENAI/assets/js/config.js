/**
 * config.js — Configuração do app standalone E-MAIL-SENAI.
 * Apenas chaves públicas (anon key). A chave da API do Resend NÃO fica aqui:
 * ela vive criptografada no Supabase Vault e é lida somente pela função
 * `sincronizar_resend()`, dentro do banco.
 */

export const CONFIG = {
  SUPABASE_URL: 'https://jwasbzdbkbryncpvfujc.supabase.co',
  SUPABASE_ANON_KEY:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YXNiemRia2JyeW5jcHZmdWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzA3ODEsImV4cCI6MjA2MjQwNjc4MX0.Bz7aZ6yG6DUTtWQ4WdeNbslWzE4qU81zzblUeHdTduU',

  /** Função RPC no Postgres que fala com a API do Resend. */
  RPC_SINCRONIZAR: 'sincronizar_resend',

  /** Chave da sessão no localStorage. */
  STORAGE_KEY: 'emailsenai.session',
};

export const STATUS_SYNC = {
  PENDENTE: { rotulo: 'Pendente', classe: 'badge--pendente' },
  SINCRONIZADO: { rotulo: 'Sincronizado', classe: 'badge--ok' },
  ERRO: { rotulo: 'Erro', classe: 'badge--erro' },
};
