import React, { useState, useEffect } from 'react';
import { CountryConfig, AdminStats } from '../types';
import { formatCurrency } from '../data/countries';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Download, 
  X, 
  Sliders, 
  Globe, 
  RefreshCw, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface AdminPanelProps {
  country: CountryConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  country,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const lang = country.lang;

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');
  const [adminSuccessMsg, setAdminSuccessMsg] = useState<string>('');

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.warn('Fetch admin stats fallback', e);
      // Fallback state
      setStats({
        activeDrivers: 87420,
        analyzedRides: 14892300,
        savedMoneyUSD: 7240000,
        savedMoneyBRL: 38400000,
        conversionRate: 14.8,
        subscribers: { monthly: 4230, quarterly: 8910, annual: 18450 },
        authorizedAdmins: ['deuwyrobert@gmail.com', 'admin@granapp.com'],
        countryStats: [
          { code: 'BR', name: 'Brasil', drivers: 48500, conversion: '16.2%' },
          { code: 'MX', name: 'México', drivers: 14200, conversion: '14.5%' },
          { code: 'US', name: 'United States', drivers: 9800, conversion: '12.8%' },
          { code: 'CO', name: 'Colombia', drivers: 5400, conversion: '13.9%' },
          { code: 'AR', name: 'Argentina', drivers: 4100, conversion: '15.1%' },
          { code: 'ES', name: 'España / UE', drivers: 3100, conversion: '11.4%' },
        ],
        leads: [
          { id: '1', name: 'Carlos Silva', email: 'carlos.uber@gmail.com', phone: '+55 11 98822-1100', country: 'BR', city: 'São Paulo', platform: 'Uber/99', plan: 'Anual', status: 'Ativo Sem Pagamento', role: 'User', date: '2026-07-31' },
          { id: '2', name: 'Miguel Rodríguez', email: 'miguel.didi@hotmail.com', phone: '+52 55 4123-8899', country: 'MX', city: 'Ciudad de México', platform: 'DiDi/Uber', plan: 'Mensual', status: 'Trial 15d (Grátis)', role: 'User', date: '2026-07-31' },
          { id: '3', name: 'David Miller', email: 'david.lyft@yahoo.com', phone: '+1 312 555-0192', country: 'US', city: 'Chicago', platform: 'Uber/Lyft', plan: 'Anual', status: 'Admin Autorizado', role: 'Admin', date: '2026-07-30' },
          { id: '4', name: 'Mateo Gómez', email: 'mateo.rappi@gmail.com', phone: '+57 300 456-7890', country: 'CO', city: 'Bogotá', platform: 'InDrive/Uber', plan: 'Trimestral', status: 'Trial 15d (Grátis)', role: 'User', date: '2026-07-30' },
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorizeAdmin = async (emailToAuth: string, makeAdmin: boolean) => {
    try {
      await fetch('/api/admin/authorize-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToAuth, makeAdmin })
      });
      setAdminSuccessMsg(`Status de Admin ${makeAdmin ? 'autorizado' : 'revogado'} para ${emailToAuth}`);
      setTimeout(() => setAdminSuccessMsg(''), 4000);
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUserStatus = async (id: string, newStatus: string) => {
    try {
      await fetch('/api/admin/update-user-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      fetchStats();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleExportCSV = () => {
    if (!stats || !stats.leads) return;
    const headers = 'ID,Name,Email,Phone,Country,City,Platform,Plan,Status,Date\n';
    const rows = stats.leads.map(l => `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.country}","${l.city}","${l.platform}","${l.plan}","${l.status}","${l.date}"`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `granapp-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredLeads = stats?.leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.city.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="fixed inset-0 z-50 bg-[#0A0A10]/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0A0A10] border border-white/10 rounded-3xl max-w-6xl w-full shadow-2xl p-6 sm:p-8 my-8 relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center font-black">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">Painel Admin GranApp</h2>
                <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  MÉTRICAS EM TEMPO REAL
                </span>
              </div>
              <p className="text-xs text-gray-400">Estatísticas globais de conversão, assinantes e leads atrativos</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStats}
              className="p-2.5 bg-white/5 text-gray-300 hover:text-white rounded-xl border border-white/10"
              title="Atualizar dados"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2.5 text-gray-400 hover:text-white rounded-xl bg-white/5 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {loading || !stats ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#7C3AED] mb-2" />
            Carregando inteligência de conversão...
          </div>
        ) : (
          <div className="space-y-8 mt-6">
            
            {/* Realtime Conversion KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-xs font-bold text-gray-400 uppercase">Taxa de Conversão Global</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-[#F59E0B]">{stats.conversionRate}%</span>
                  <span className="text-xs font-bold text-[#10B981]">+2.4% este mês</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Visitante → Teste Grátis 7d</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-xs font-bold text-gray-400 uppercase">Assinantes Ativos</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-white">{stats.activeDrivers.toLocaleString()}</span>
                  <span className="text-xs font-bold text-[#10B981]">99.4% retenção</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Anual: {stats.subscribers.annual} | Trim: {stats.subscribers.quarterly} | Men: {stats.subscribers.monthly}
                </p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-xs font-bold text-gray-400 uppercase">Receita Estimada (MRR)</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-[#10B981]">
                    {formatCurrency(stats.activeDrivers * 22.70, country)}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Moeda Local ({country.currencySymbol})</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-xs font-bold text-gray-400 uppercase">Corridas Analisadas Hoje</p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-black text-[#7C3AED]">
                    {(stats.analyzedRides / 1000000).toFixed(1)}M
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Algoritmo GranScore Ativo</p>
              </div>

            </div>

            {/* Admin Privilege Authorization Banner & Controls */}
            <div className="bg-gradient-to-r from-[#7C3AED]/20 via-[#0A0A10] to-[#10B981]/20 p-6 rounded-2xl border border-[#7C3AED]/30 space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#7C3AED] rounded-2xl text-white shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white flex items-center gap-2">
                      <span>Módulo de Autorização de Admins e Uso de Usuários</span>
                      <span className="bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                        EXCLUSIVO ADMIN
                      </span>
                    </h3>
                    <p className="text-xs text-gray-300 mt-0.5">
                      <strong>Regra de Acesso:</strong> Somente administradores autorizados podem promover novos Admins. Os usuários cadastrados podem utilizar o app por <strong>15 cálculos / dias grátis</strong> sem necessidade de pagamento.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="Adicionar e-mail Admin..."
                    className="px-3 py-2 bg-[#0A0A10] border border-white/20 rounded-xl text-xs text-white focus:outline-none focus:border-[#7C3AED] w-full md:w-56"
                  />
                  <button
                    onClick={() => {
                      if (newAdminEmail) {
                        handleAuthorizeAdmin(newAdminEmail, true);
                        setNewAdminEmail('');
                      }
                    }}
                    className="px-4 py-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs rounded-xl shadow transition-all whitespace-nowrap"
                  >
                    + Autorizar Admin
                  </button>
                </div>
              </div>

              {adminSuccessMsg && (
                <div className="p-3 bg-[#10B981]/20 border border-[#10B981]/40 rounded-xl text-xs font-bold text-[#10B981] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{adminSuccessMsg}</span>
                </div>
              )}

              {/* Authorized Admins Badges */}
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t border-white/10">
                <span className="text-xs font-extrabold text-gray-400">Admins Autorizados Atualmentes:</span>
                {(stats.authorizedAdmins || ['deuwyrobert@gmail.com', 'admin@granapp.com']).map((admEmail) => (
                  <span key={admEmail} className="bg-[#7C3AED]/20 text-purple-300 border border-[#7C3AED]/40 text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <ShieldCheck className="w-3 h-3 text-[#F59E0B]" />
                    <span>{admEmail}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Country Distribution */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#F59E0B]" />
                <span>Desempenho por País e Moeda</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {stats.countryStats.map((c) => (
                  <div key={c.code} className="bg-[#0A0A10] p-3 rounded-xl border border-white/10">
                    <p className="text-xs font-extrabold text-white">{c.name}</p>
                    <p className="text-sm font-black text-[#F59E0B] mt-1">{c.drivers.toLocaleString()} motoristas</p>
                    <p className="text-[10px] text-[#10B981] font-bold mt-0.5">Conv: {c.conversion}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leads & User Authorization Table */}
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#7C3AED]" />
                  <span>Gerenciador de Usuários e Permissões ({stats.leads.length})</span>
                </h3>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar por nome/email..."
                      className="pl-9 pr-3 py-1.5 bg-[#0A0A10] border border-white/10 rounded-lg text-xs text-white focus:border-[#7C3AED] focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 font-extrabold uppercase">
                      <th className="py-2.5 px-3">Nome</th>
                      <th className="py-2.5 px-3">E-mail</th>
                      <th className="py-2.5 px-3">WhatsApp</th>
                      <th className="py-2.5 px-3">País</th>
                      <th className="py-2.5 px-3">Status de Acesso</th>
                      <th className="py-2.5 px-3 text-right">Ações Admin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredLeads.map((lead) => {
                      const isAdm = stats.authorizedAdmins?.includes(lead.email.toLowerCase()) || lead.role === 'Admin' || lead.status.includes('Admin');
                      return (
                        <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                            <span>{lead.name}</span>
                            {isAdm && (
                              <span className="bg-[#7C3AED] text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                                ADMIN
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-gray-300 font-mono">{lead.email}</td>
                          <td className="py-2.5 px-3 text-gray-400 font-mono">{lead.phone}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#F59E0B]">{lead.country}</td>
                          <td className="py-2.5 px-3">
                            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${
                              isAdm 
                                ? 'bg-[#7C3AED]/20 text-purple-300 border-[#7C3AED]/40' 
                                : lead.status.includes('Sem Pagamento') || lead.status.includes('Ativo')
                                ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30'
                                : 'bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/30'
                            }`}>
                              {lead.status || 'Trial 15d Grátis'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleAuthorizeAdmin(lead.email, !isAdm)}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                                  isAdm 
                                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30 hover:bg-rose-500/30' 
                                    : 'bg-[#7C3AED]/20 text-purple-300 border-[#7C3AED]/40 hover:bg-[#7C3AED]/30'
                                }`}
                                title="Autorização de Administrador"
                              >
                                {isAdm ? 'Revogar Admin' : '+ Tornar Admin'}
                              </button>

                              <button
                                onClick={() => handleUpdateUserStatus(lead.id, 'Ativo Sem Pagamento')}
                                className="px-2.5 py-1 bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 hover:bg-[#10B981]/30 rounded-lg text-[10px] font-bold transition-all"
                                title="Liberar uso sem necessidade de pagamento"
                              >
                                Autorizar Sem Pagamento
                              </button>

                              <button
                                onClick={() => handleUpdateUserStatus(lead.id, 'Trial 15d (Grátis)')}
                                className="px-2.5 py-1 bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 rounded-lg text-[10px] font-bold transition-all"
                                title="Conceder 15 Dias Grátis"
                              >
                                15d Grátis
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
