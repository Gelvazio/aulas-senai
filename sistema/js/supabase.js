// ── Configuração e Funções Supabase ───────────────────

const SUPABASE = {
  URL: "https://jwasbzdbkbryncpvfujc.supabase.co",
  KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YXNiemRia2JyeW5jcHZmdWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MzA3ODEsImV4cCI6MjA2MjQwNjc4MX0.Bz7aZ6yG6DUTtWQ4WdeNbslWzE4qU81zzblUeHdTduU",
};

function sbH() {
  return {
    apikey: SUPABASE.KEY,
    Authorization: "Bearer " + SUPABASE.KEY,
    "Content-Type": "application/json",
  };
}

async function sbGet(table, qs = "") {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    headers: sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbPost(table, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}`, {
    method: "POST",
    headers: { ...sbH(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbPatch(table, pk, pkVal, body) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${pk}=eq.${pkVal}`, {
    method: "PATCH",
    headers: { ...sbH(), Prefer: "return=representation" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

async function sbDelete(table, qs) {
  const r = await fetch(`${SUPABASE.URL}/rest/v1/${table}?${qs}`, {
    method: "DELETE",
    headers: sbH(),
  });
  if (!r.ok) throw new Error(await r.text());
}
