import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory store for Admin Stats & Leads simulation
const adminData = {
  activeDrivers: 87420,
  analyzedRides: 14892300,
  savedMoneyUSD: 7240000,
  savedMoneyBRL: 38400000,
  conversionRate: 14.8,
  subscribers: {
    monthly: 4230,
    quarterly: 8910,
    annual: 18450,
  },
  countryStats: [
    { code: "BR", name: "Brasil", drivers: 48500, conversion: "16.2%" },
    { code: "MX", name: "México", drivers: 14200, conversion: "14.5%" },
    { code: "US", name: "United States", drivers: 9800, conversion: "12.8%" },
    { code: "CO", name: "Colombia", drivers: 5400, conversion: "13.9%" },
    { code: "AR", name: "Argentina", drivers: 4100, conversion: "15.1%" },
    { code: "ES", name: "España / UE", drivers: 3100, conversion: "11.4%" },
  ],
  leads: [
    { id: "1", name: "Carlos Silva", email: "carlos.uber@gmail.com", phone: "+55 11 98822-1100", country: "BR", city: "São Paulo", platform: "Uber/99", plan: "Anual", status: "Ativo", date: "2026-07-31" },
    { id: "2", name: "Miguel Rodríguez", email: "miguel.didi@hotmail.com", phone: "+52 55 4123-8899", country: "MX", city: "Ciudad de México", platform: "DiDi/Uber", plan: "Mensual", status: "Trial 7d", date: "2026-07-31" },
    { id: "3", name: "David Miller", email: "david.lyft@yahoo.com", phone: "+1 312 555-0192", country: "US", city: "Chicago", platform: "Uber/Lyft", plan: "Anual", status: "Ativo", date: "2026-07-30" },
    { id: "4", name: "Mateo Gómez", email: "mateo.rappi@gmail.com", phone: "+57 300 456-7890", country: "CO", city: "Bogotá", platform: "InDrive/Uber", plan: "Trimestral", status: "Ativo", date: "2026-07-30" },
    { id: "5", name: "Luciana Rossi", email: "lulu.cabify@gmail.com", phone: "+54 11 4455-6677", country: "AR", city: "Buenos Aires", platform: "Cabify/Uber", plan: "Trial 7d", date: "2026-07-29" },
  ]
};

// API: Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "GranApp Engine", version: "1.0.0" });
});

// In-memory store for Authorized Admins
const authorizedAdmins = new Set(["deuwyrobert@gmail.com", "admin@granapp.com"]);

// API: Get Admin Stats
app.get("/api/admin/stats", (_req, res) => {
  res.json({
    ...adminData,
    authorizedAdmins: Array.from(authorizedAdmins)
  });
});

// API: Authorize or Revoke Admin Privileges (Admin-only)
app.post("/api/admin/authorize-admin", (req, res) => {
  const { email, makeAdmin } = req.body;
  if (!email) {
    return res.status(400).json({ error: "E-mail é obrigatório" });
  }

  const cleanEmail = email.toLowerCase().trim();
  if (makeAdmin) {
    authorizedAdmins.add(cleanEmail);
  } else {
    authorizedAdmins.delete(cleanEmail);
  }

  const lead = adminData.leads.find(l => l.email.toLowerCase() === cleanEmail);
  if (lead) {
    (lead as any).role = makeAdmin ? "Admin" : "User";
    lead.status = makeAdmin ? "Admin Autorizado" : "Uso Grátis (Sem Pagamento)";
  }

  res.json({
    success: true,
    email: cleanEmail,
    isAdmin: authorizedAdmins.has(cleanEmail),
    authorizedAdmins: Array.from(authorizedAdmins)
  });
});

// API: Update user status (Autorizar uso sem necessidade de pagamento)
app.post("/api/admin/update-user-status", (req, res) => {
  const { id, status } = req.body;
  const lead = adminData.leads.find(l => l.id === id);
  if (!lead) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  lead.status = status;
  res.json({ success: true, lead });
});

// API: Save new lead / registration
app.post("/api/admin/leads", (req, res) => {
  const { name, email, phone, country, city, platform, plan } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório" });
  }

  const newLead = {
    id: Date.now().toString(),
    name: name || "Conductor GranApp",
    email,
    phone: phone || "-",
    country: country || "BR",
    city: city || "N/A",
    platform: platform || "Uber",
    plan: plan || "Trial 7d",
    status: "Trial 7d",
    date: new Date().toISOString().split("T")[0],
  };

  adminData.leads.unshift(newLead);
  adminData.activeDrivers += 1;
  res.json({ success: true, lead: newLead });
});

// API: Gemini Ride Analyzer Endpoint (Server-Side key handling)
app.post("/api/gemini/analyze-ride", async (req, res) => {
  try {
    const { rideDetails, countryCode, currency, fuelCost, lang } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY não configurada no servidor. Usando fallback de cálculo local.",
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Você é o GranBot, um especialista sênior em rentabilidade de motoristas de aplicativo (Uber, 99, DiDi, Lyft, Cabify, Bolt).
Analise a seguinte oferta de corrida enviada pelo motorista:
- Detalhes fornecidos: "${rideDetails}"
- País: ${countryCode || "BR"}
- Moeda: ${currency || "R$"}
- Custo de combustível informado: ${fuelCost || "Padrão local"}
- Idioma da resposta: ${lang || "pt"}

Responda EXCLUSIVAMENTE em formato JSON com a seguinte estrutura:
{
  "granScore": (número de 0 a 100),
  "verdict": ("ACEITAR" | "AVALIAR" | "REJEITAR"),
  "reason": (frase curta e direta justificando),
  "netProfitPerHour": (valor numérico estimado de lucro por hora nessa corrida),
  "fuelCostEst": (valor numérico estimado de combustível consumido),
  "realPlatformFeeEst": (porcentagem estimada que a plataforma tá retendo, ex: "28%"),
  "expertTip": (dica de ouro estratégica para o motorista referente a rota, segurança ou próxima chamada)
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const responseText = response.text || "{}";
    const parsedData = JSON.parse(responseText);

    adminData.analyzedRides += 1;

    res.json({
      success: true,
      analysis: parsedData,
    });
  } catch (error: any) {
    console.error("Erro na rota Gemini:", error);
    res.status(500).json({ error: error.message || "Erro ao processar análise do GranBot" });
  }
});

// Serve Vite dev or static prod files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GranApp Server rodando na porta ${PORT}`);
  });
}

startServer();
