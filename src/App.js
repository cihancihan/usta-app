import React, { useState, useEffect, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';

// ============================================================
// ⚙️  SUPABASE BAĞLANTISI — kendi bilgilerinizi girin
// ============================================================
const SUPABASE_URL = 'https://gxtigwlaazddthvjroru.supabase.co'; // ← değiştir
const SUPABASE_ANON_KEY = 'sb_publishable_XRnHj3NIcj6Is73OxM1R3A_v-UbYr6U'; // ← değiştir

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// HELPERS
// ============================================================
const TODAY = new Date().toISOString().split('T')[0];
const DAYS_TR = [
  'Pazar',
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
];
const MONTHS_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
];
const todayObj = new Date(TODAY);
const todayLabel = `${todayObj.getDate()} ${MONTHS_TR[todayObj.getMonth()]} ${
  DAYS_TR[todayObj.getDay()]
}`;
const formatDate = (d) => {
  if (!d) return '';
  const [y, m, day] = d.split('-');
  return `${day}.${m}.${y}`;
};
const formatMoney = (n) => `${Number(n || 0).toLocaleString('tr-TR')} TL`;

// ============================================================
// ICONS
// ============================================================
const Icon = ({ name, size = 20, color = 'currentColor' }) => {
  const icons = {
    home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />,
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    wallet: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        <path d="M22 10v4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    map: (
      <>
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </>
    ),
    message: (
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    chevronUp: <polyline points="18 15 12 9 6 15" />,
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    arrowLeft: (
      <>
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </>
    ),
    arrowUp: (
      <>
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </>
    ),
    arrowDown: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="19 12 12 19 5 12" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    trash: (
      <>
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </>
    ),
    package: (
      <>
        <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <line x1="12" y1="20" x2="12.01" y2="20" />
      </>
    ),
    loader: (
      <>
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

// ============================================================
// LOADING SPINNER
// ============================================================
const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
    <div
      style={{
        width: 36,
        height: 36,
        border: '3px solid #f0f0f0',
        borderTop: '3px solid #FF6B35',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// ============================================================
// SETUP SCREEN (Supabase credentials not set)
// ============================================================
const SetupScreen = ({ onSave }) => {
  const [url, setUrl] = useState(localStorage.getItem('sb_url') || '');
  const [key, setKey] = useState(localStorage.getItem('sb_key') || '');
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState('');

  const test = async () => {
    if (!url || !key) return setError('Her iki alanı da doldurun.');
    setTesting(true);
    setError('');
    try {
      const client = createClient(url, key);
      const { error: e } = await client.from('customers').select('id').limit(1);
      if (e) throw new Error(e.message);
      localStorage.setItem('sb_url', url);
      localStorage.setItem('sb_key', key);
      onSave();
    } catch (e) {
      setError('Bağlantı başarısız: ' + e.message);
    }
    setTesting(false);
  };

  return (
    <div
      style={{
        padding: '32px 20px',
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100vh',
        background: '#f8f8fc',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔧</div>
        <h1
          style={{ fontSize: 24, fontWeight: 800, color: '#1a1a2e', margin: 0 }}
        >
          Usta Takip
        </h1>
        <p style={{ color: '#888', marginTop: 8, fontSize: 14 }}>
          Supabase bağlantısını yapılandırın
        </p>
      </div>

      <div
        style={{
          background: '#EFF6FF',
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
          fontSize: 13,
          lineHeight: 1.7,
          color: '#1e40af',
        }}
      >
        <strong>📋 Kurulum Adımları:</strong>
        <br />
        1.{' '}
        <a
          href="https://supabase.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#1e40af' }}
        >
          supabase.com
        </a>
        'da ücretsiz hesap açın
        <br />
        2. Yeni proje oluşturun
        <br />
        3. <strong>SQL Editor</strong>'da <code>supabase-schema.sql</code>{' '}
        dosyasını çalıştırın
        <br />
        4. <strong>Settings → API</strong>'den URL ve anon key kopyalayın
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '20px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#666',
              marginBottom: 6,
            }}
          >
            SUPABASE PROJECT URL
          </label>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://xxxx.supabase.co"
            style={{
              width: '100%',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 600,
              color: '#666',
              marginBottom: 6,
            }}
          >
            ANON PUBLIC KEY
          </label>
          <input
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="eyJhbGciOiJ..."
            style={{
              width: '100%',
              border: '1.5px solid #e5e7eb',
              borderRadius: 10,
              padding: '10px 12px',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
        {error && (
          <div
            style={{
              background: '#FEF2F2',
              color: '#EF4444',
              fontSize: 13,
              padding: '10px 12px',
              borderRadius: 10,
              marginBottom: 14,
            }}
          >
            {error}
          </div>
        )}
        <button
          onClick={test}
          disabled={testing}
          style={{
            width: '100%',
            background: '#FF6B35',
            color: '#fff',
            border: 'none',
            borderRadius: 14,
            padding: '14px',
            fontSize: 16,
            fontWeight: 700,
            cursor: testing ? 'not-allowed' : 'pointer',
            opacity: testing ? 0.7 : 1,
            fontFamily: 'inherit',
          }}
        >
          {testing ? '⏳ Test ediliyor...' : '🚀 Bağlan'}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// MODAL & FORM COMPONENTS
// ============================================================
const Modal = ({ title, onClose, children }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: '#fff',
        borderRadius: '20px 20px 0 0',
        width: '100%',
        maxWidth: 460,
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '24px 20px 40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <h2
          style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', margin: 0 }}
        >
          {title}
        </h2>
        <button
          onClick={onClose}
          style={{
            background: '#f1f1f1',
            border: 'none',
            borderRadius: 20,
            width: 32,
            height: 32,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="x" size={16} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

const Inp = ({ label, value, onChange, type = 'text', placeholder, req }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: '#666',
          marginBottom: 6,
        }}
      >
        {label}
        {req && ' *'}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
      }}
    />
  </div>
);

const Sel = ({ label, value, onChange, options }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: '#666',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        background: '#fff',
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

const Txt = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div style={{ marginBottom: 14 }}>
    {label && (
      <label
        style={{
          display: 'block',
          fontSize: 12,
          fontWeight: 600,
          color: '#666',
          marginBottom: 6,
        }}
      >
        {label}
      </label>
    )}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        border: '1.5px solid #e5e7eb',
        borderRadius: 10,
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        resize: 'none',
      }}
    />
  </div>
);

const Btn = ({
  onClick,
  children,
  color = '#FF6B35',
  text = '#fff',
  outline,
  small,
  full,
  disabled,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: outline ? 'transparent' : color,
      color: outline ? color : text,
      border: `2px solid ${color}`,
      borderRadius: 12,
      padding: small ? '8px 16px' : '12px 20px',
      fontSize: small ? 13 : 15,
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'inherit',
      width: full ? '100%' : 'auto',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
    }}
  >
    {children}
  </button>
);

const StatusBadge = ({ status }) => {
  const cfg = {
    bekliyor: ['#FFF7ED', '#F97316', 'Bekliyor'],
    devam: ['#EFF6FF', '#3B82F6', 'Devam'],
    tamamlandı: ['#F0FDF4', '#22C55E', 'Tamamlandı'],
    iptal: ['#FEF2F2', '#EF4444', 'İptal'],
  };
  const [bg, col, label] = cfg[status] || cfg.bekliyor;
  return (
    <span
      style={{
        background: bg,
        color: col,
        fontSize: 11,
        fontWeight: 700,
        padding: '3px 10px',
        borderRadius: 20,
      }}
    >
      {label}
    </span>
  );
};

// ============================================================
// JOB DETAIL MODAL
// ============================================================
const JobDetailModal = ({ job, customers, parts, onClose, onUpdate }) => {
  const customer = customers.find((c) => c.id === job.customer_id) || {};
  const [status, setStatus] = useState(job.status);
  const [price, setPrice] = useState(String(job.price || ''));
  const [notes, setNotes] = useState(job.notes || '');
  const [usedParts, setUsedParts] = useState(job.parts || []);
  const [addingPart, setAddingPart] = useState(false);
  const [selPart, setSelPart] = useState('');
  const [partQty, setPartQty] = useState(1);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await supabase
      .from('jobs')
      .update({ status, price: Number(price), notes, parts: usedParts })
      .eq('id', job.id);
    setSaving(false);
    onUpdate();
    onClose();
  };

  const addPart = () => {
    const p = parts.find((x) => x.id === selPart);
    if (!p) return;
    setUsedParts((prev) => [
      ...prev,
      { id: p.id, name: p.name, price: p.sell_price * partQty, qty: partQty },
    ]);
    setAddingPart(false);
    setSelPart('');
    setPartQty(1);
  };

  return (
    <Modal title="İş Detayı" onClose={onClose}>
      <div
        style={{
          background: '#f8f8fc',
          borderRadius: 12,
          padding: 14,
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 16 }}>{customer.name}</div>
        <div style={{ color: '#666', fontSize: 13, marginTop: 2 }}>
          {customer.district} · {customer.address}
        </div>
        <div style={{ color: '#444', fontSize: 14, fontWeight: 500 }}>
          {customer.phone}
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
          marginBottom: 14,
        }}
      >
        <div style={{ background: '#f8f8fc', borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>
            CİHAZ
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
            {job.device}
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>
            {job.brand} {job.model}
          </div>
        </div>
        <div style={{ background: '#f8f8fc', borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>
            SORUN
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>
            {job.problem}
          </div>
        </div>
      </div>

      <Sel
        label="Durum"
        value={status}
        onChange={setStatus}
        options={[
          { value: 'bekliyor', label: 'Bekliyor' },
          { value: 'devam', label: 'Devam Ediyor' },
          { value: 'tamamlandı', label: 'Tamamlandı' },
          { value: 'iptal', label: 'İptal' },
        ]}
      />

      <div style={{ marginBottom: 14 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <label style={{ fontSize: 12, fontWeight: 600, color: '#666' }}>
            KULLANILAN PARÇALAR
          </label>
          <button
            onClick={() => setAddingPart(true)}
            style={{
              background: '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Ekle
          </button>
        </div>
        {usedParts.length === 0 && (
          <div
            style={{
              color: '#aaa',
              fontSize: 13,
              textAlign: 'center',
              padding: '8px 0',
            }}
          >
            Henüz parça eklenmedi
          </div>
        )}
        {usedParts.map((p, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <span style={{ fontSize: 13 }}>
              {p.name}
              {p.qty > 1 ? ` x${p.qty}` : ''}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>
                {formatMoney(p.price)}
              </span>
              <button
                onClick={() =>
                  setUsedParts((prev) => prev.filter((_, j) => j !== i))
                }
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Icon name="x" size={14} color="#ef4444" />
              </button>
            </div>
          </div>
        ))}
        {addingPart && (
          <div
            style={{
              background: '#f8f8fc',
              borderRadius: 10,
              padding: 12,
              marginTop: 8,
            }}
          >
            <Sel
              label="Parça Seç"
              value={selPart}
              onChange={setSelPart}
              options={[
                { value: '', label: 'Seçiniz...' },
                ...parts.map((p) => ({
                  value: p.id,
                  label: `${p.name} (Stok: ${p.stock}) - ${formatMoney(
                    p.sell_price
                  )}`,
                })),
              ]}
            />
            <Inp
              label="Adet"
              type="number"
              value={String(partQty)}
              onChange={(v) => setPartQty(Number(v))}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn onClick={addPart} small color="#22C55E">
                Ekle
              </Btn>
              <Btn
                onClick={() => setAddingPart(false)}
                small
                outline
                color="#666"
              >
                İptal
              </Btn>
            </div>
          </div>
        )}
      </div>

      <Inp
        label="Toplam Ücret (TL)"
        type="number"
        value={price}
        onChange={setPrice}
        placeholder="0"
      />
      <Txt
        label="Notlar"
        value={notes}
        onChange={setNotes}
        placeholder="İş hakkında not..."
      />

      <Btn onClick={save} full disabled={saving}>
        {saving ? 'Kaydediliyor...' : '💾 Kaydet'}
      </Btn>

      <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
        <a
          href={`tel:${customer.phone}`}
          style={{
            flex: 1,
            background: '#22C55E',
            color: '#fff',
            borderRadius: 12,
            padding: '11px',
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Icon name="phone" size={16} color="#fff" /> Ara
        </a>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            (customer.address || '') + ' ' + (customer.district || '')
          )}`}
          target="_blank"
          rel="noreferrer"
          style={{
            flex: 1,
            background: '#3B82F6',
            color: '#fff',
            borderRadius: 12,
            padding: '11px',
            fontSize: 14,
            fontWeight: 600,
            textAlign: 'center',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <Icon name="map" size={16} color="#fff" /> Harita
        </a>
      </div>
    </Modal>
  );
};

// ============================================================
// ADD JOB MODAL
// ============================================================
const AddJobModal = ({ onClose, onAdd, customers, prefillCustomer }) => {
  const [customerId, setCustomerId] = useState(prefillCustomer || '');
  const [date, setDate] = useState(TODAY);
  const [time, setTime] = useState('09:00');
  const [device, setDevice] = useState('Çamaşır Makinesi');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [problem, setProblem] = useState('');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!customerId || !problem) return alert('Müşteri ve sorun zorunludur.');
    setSaving(true);
    await supabase
      .from('jobs')
      .insert({
        customer_id: customerId,
        date,
        time,
        device,
        brand,
        model,
        problem,
        status: 'bekliyor',
        price: 0,
        notes: '',
        parts: [],
      });
    setSaving(false);
    onAdd();
    onClose();
  };

  return (
    <Modal title="Yeni İş Ekle" onClose={onClose}>
      <Sel
        label="Müşteri *"
        value={customerId}
        onChange={setCustomerId}
        options={[
          { value: '', label: 'Müşteri seçin...' },
          ...customers.map((c) => ({
            value: c.id,
            label: `${c.name} - ${c.district}`,
          })),
        ]}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Inp label="Tarih" type="date" value={date} onChange={setDate} />
        <Inp label="Saat" type="time" value={time} onChange={setTime} />
      </div>
      <Sel
        label="Cihaz Türü"
        value={device}
        onChange={setDevice}
        options={[
          'Çamaşır Makinesi',
          'Bulaşık Makinesi',
          'Kombi',
          'Klima',
          'Buzdolabı',
          'Fırın',
          'Diğer',
        ].map((d) => ({ value: d, label: d }))}
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <Inp
          label="Marka"
          value={brand}
          onChange={setBrand}
          placeholder="Arçelik"
        />
        <Inp
          label="Model"
          value={model}
          onChange={setModel}
          placeholder="9101"
        />
      </div>
      <Txt
        label="Sorun / Arıza *"
        value={problem}
        onChange={setProblem}
        placeholder="Müşterinin tarif ettiği sorunu..."
        rows={2}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <Btn onClick={onClose} outline color="#666" full>
          İptal
        </Btn>
        <Btn onClick={save} full disabled={saving}>
          {saving ? 'Ekleniyor...' : 'Ekle'}
        </Btn>
      </div>
    </Modal>
  );
};

// ============================================================
// ADD / EDIT CUSTOMER MODAL
// ============================================================
const CustomerModal = ({ onClose, onAdd, editCustomer }) => {
  const [name, setName] = useState(editCustomer?.name || '');
  const [phone, setPhone] = useState(editCustomer?.phone || '');
  const [district, setDistrict] = useState(editCustomer?.district || '');
  const [address, setAddress] = useState(editCustomer?.address || '');
  const [notes, setNotes] = useState(editCustomer?.notes || '');
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!name || !phone) return alert('Ad ve telefon zorunludur.');
    setSaving(true);
    if (editCustomer) {
      await supabase
        .from('customers')
        .update({ name, phone, district, address, notes })
        .eq('id', editCustomer.id);
    } else {
      await supabase
        .from('customers')
        .insert({ name, phone, district, address, notes, city: 'İstanbul' });
    }
    setSaving(false);
    onAdd();
    onClose();
  };

  return (
    <Modal
      title={editCustomer ? 'Müşteriyi Düzenle' : 'Yeni Müşteri'}
      onClose={onClose}
    >
      <Inp
        label="Ad Soyad *"
        value={name}
        onChange={setName}
        placeholder="Ayşe Yılmaz"
        req
      />
      <Inp
        label="Telefon *"
        value={phone}
        onChange={setPhone}
        placeholder="0532 123 45 67"
        type="tel"
        req
      />
      <Inp
        label="Mahalle/İlçe"
        value={district}
        onChange={setDistrict}
        placeholder="Kadıköy"
      />
      <Inp
        label="Açık Adres"
        value={address}
        onChange={setAddress}
        placeholder="Moda Cad. No:12 D:3"
      />
      <Txt
        label="Notlar"
        value={notes}
        onChange={setNotes}
        placeholder="Kapı zili bozuk, 3. katta..."
        rows={2}
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <Btn onClick={onClose} outline color="#666" full>
          İptal
        </Btn>
        <Btn onClick={save} full disabled={saving}>
          {saving
            ? editCustomer
              ? 'Güncelleniyor...'
              : 'Kaydediliyor...'
            : editCustomer
            ? 'Güncelle'
            : 'Kaydet'}
        </Btn>
      </div>
    </Modal>
  );
};

// ============================================================
// ADD EXPENSE MODAL
// ============================================================
const ExpenseModal = ({ onClose, onAdd }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Benzin');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(TODAY);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!amount) return alert('Tutar zorunludur.');
    setSaving(true);
    await supabase
      .from('expenses')
      .insert({ date, category, amount: Number(amount), note });
    setSaving(false);
    onAdd();
    onClose();
  };

  return (
    <Modal title="Gider Ekle" onClose={onClose}>
      <Inp label="Tarih" type="date" value={date} onChange={setDate} />
      <Sel
        label="Kategori"
        value={category}
        onChange={setCategory}
        options={['Benzin', 'Yemek', 'Parça', 'Otopark', 'Diğer'].map((c) => ({
          value: c,
          label: c,
        }))}
      />
      <Inp
        label="Tutar (TL) *"
        type="number"
        value={amount}
        onChange={setAmount}
        placeholder="0"
        req
      />
      <Inp
        label="Not"
        value={note}
        onChange={setNote}
        placeholder="Açıklama..."
      />
      <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
        <Btn onClick={onClose} outline color="#666" full>
          İptal
        </Btn>
        <Btn onClick={save} full disabled={saving}>
          {saving ? 'Ekleniyor...' : 'Ekle'}
        </Btn>
      </div>
    </Modal>
  );
};

// ============================================================
// HOME SCREEN
// ============================================================
const HomeScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState(TODAY);
  const [showAddJob, setShowAddJob] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [j, c, p] = await Promise.all([
      supabase.from('jobs').select('*').order('time'),
      supabase.from('customers').select('*'),
      supabase.from('parts').select('*'),
    ]);
    setJobs(j.data || []);
    setCustomers(c.data || []);
    setParts(p.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const todayJobs = jobs
    .filter((j) => j.date === filterDate)
    .sort((a, b) => a.time.localeCompare(b.time));
  const lowStock = parts.filter((p) => p.stock === 0).length;

  return (
    <div style={{ padding: '20px 16px', paddingBottom: 90 }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{ fontSize: 26, fontWeight: 800, color: '#1a1a2e', margin: 0 }}
        >
          Günaydın, Usta 👋
        </h1>
        <p style={{ color: '#888', margin: '4px 0 0', fontSize: 14 }}>
          {todayLabel}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          marginBottom: 24,
        }}
      >
        <div
          style={{
            background: '#FF6B35',
            borderRadius: 16,
            padding: '18px 16px',
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>
            {todayJobs.length}
          </div>
          <div
            style={{
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            Bugünkü İşler
          </div>
        </div>
        <div
          style={{
            background: '#FFF7ED',
            borderRadius: 16,
            padding: '18px 16px',
            border: '1.5px solid #FED7AA',
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 800,
              color: lowStock > 0 ? '#F97316' : '#22C55E',
            }}
          >
            {lowStock}
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#92400E',
              fontWeight: 600,
              marginTop: 2,
            }}
          >
            Stokta Biten
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
        }}
      >
        <h2
          style={{ fontSize: 17, fontWeight: 700, color: '#1a1a2e', margin: 0 }}
        >
          Günün Rotası
        </h2>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{
            border: '1.5px solid #e5e7eb',
            borderRadius: 10,
            padding: '6px 10px',
            fontSize: 13,
            fontFamily: 'inherit',
          }}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : todayJobs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 0', color: '#aaa' }}>
          <Icon name="calendar" size={40} color="#ddd" />
          <p style={{ marginTop: 12 }}>Bu tarihte iş yok</p>
        </div>
      ) : (
        todayJobs.map((job) => {
          const customer =
            customers.find((c) => c.id === job.customer_id) || {};
          return (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              style={{
                background: '#fff',
                borderRadius: 16,
                padding: '14px 16px',
                marginBottom: 12,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#3B82F6',
                    background: '#EFF6FF',
                    padding: '3px 10px',
                    borderRadius: 20,
                  }}
                >
                  {job.time}
                </span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <StatusBadge status={job.status} />
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(
                      (customer.address || '') + ' ' + (customer.district || '')
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="map" size={18} color="#94A3B8" />
                  </a>
                  <a
                    href={`tel:${customer.phone}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name="message" size={18} color="#94A3B8" />
                  </a>
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {customer.name}
              </div>
              <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>
                {customer.district}
              </div>
              <div
                style={{
                  background: '#f8f8fc',
                  borderRadius: 10,
                  padding: '8px 12px',
                  fontSize: 13,
                }}
              >
                {job.problem}
              </div>
            </div>
          );
        })
      )}

      <button
        onClick={() => setShowAddJob(true)}
        style={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: '#FF6B35',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <Icon name="plus" size={24} color="#fff" />
      </button>

      {showAddJob && (
        <AddJobModal
          onClose={() => setShowAddJob(false)}
          onAdd={load}
          customers={customers}
        />
      )}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onUpdate={load}
          customers={customers}
          parts={parts}
        />
      )}
    </div>
  );
};

// ============================================================
// CUSTOMERS SCREEN
// ============================================================
const CustomersScreen = () => {
  const [customers, setCustomers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Tümü');
  const [expanded, setExpanded] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);
  const [showAddJob, setShowAddJob] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [c, j] = await Promise.all([
      supabase.from('customers').select('*').order('name'),
      supabase.from('jobs').select('*').order('date', { ascending: false }),
    ]);
    setCustomers(c.data || []);
    setJobs(j.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const devices = [
    'Tümü',
    'Çamaşır Makinesi',
    'Kombi',
    'Bulaşık Makinesi',
    'Klima',
  ];

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const ok =
      c.name.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      (c.district || '').toLowerCase().includes(q);
    if (!ok) return false;
    if (filter === 'Tümü') return true;
    return jobs.some((j) => j.customer_id === c.id && j.device === filter);
  });

  const del = async (id) => {
    if (!window.confirm('Bu müşteriyi silmek istediğinizden emin misiniz?'))
      return;
    await supabase.from('customers').delete().eq('id', id);
    load();
  };

  return (
    <div style={{ paddingBottom: 90 }}>
      <div
        style={{
          padding: '20px 16px 12px',
          background: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <h1
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#1a1a2e',
              margin: 0,
            }}
          >
            Müşteri Rehberi
          </h1>
        </div>
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <div
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <Icon name="search" size={16} color="#aaa" />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="İsim, telefon veya mahalle ara..."
            style={{
              width: '100%',
              border: '1.5px solid #e5e7eb',
              borderRadius: 12,
              padding: '10px 12px 10px 36px',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
          }}
        >
          {devices.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              style={{
                flexShrink: 0,
                background: filter === d ? '#FF6B35' : '#f1f1f1',
                color: filter === d ? '#fff' : '#333',
                border: 'none',
                borderRadius: 20,
                padding: '6px 14px',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 0' }}>
        {loading ? (
          <Spinner />
        ) : (
          filtered.map((c) => {
            const cJobs = jobs.filter((j) => j.customer_id === c.id);
            const isOpen = expanded === c.id;
            return (
              <div
                key={c.id}
                style={{
                  background: '#fff',
                  borderRadius: 16,
                  marginBottom: 12,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: '14px 16px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                      >
                        <span style={{ fontWeight: 700, fontSize: 16 }}>
                          {c.name}
                        </span>
                        {cJobs.length > 0 && (
                          <span
                            style={{
                              background: '#FFF7ED',
                              color: '#F97316',
                              fontSize: 11,
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 10,
                            }}
                          >
                            {cJobs.length} İŞLEM
                          </span>
                        )}
                      </div>
                      <div
                        style={{ color: '#888', fontSize: 13, marginTop: 2 }}
                      >
                        📍 {c.district}, {c.city}
                      </div>
                      <div
                        style={{
                          color: '#333',
                          fontSize: 14,
                          fontWeight: 500,
                          marginTop: 4,
                        }}
                      >
                        {c.phone}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <a
                        href={`tel:${c.phone}`}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          background: '#22C55E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name="phone" size={16} color="#fff" />
                      </a>
                      <button
                        onClick={() => setExpanded(isOpen ? null : c.id)}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          background: '#f1f1f1',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon
                          name={isOpen ? 'chevronUp' : 'chevronDown'}
                          size={16}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                {isOpen && (
                  <div
                    style={{
                      borderTop: '1px solid #f0f0f0',
                      padding: '14px 16px',
                    }}
                  >
                    {c.address && (
                      <div
                        style={{
                          fontSize: 13,
                          color: '#666',
                          marginBottom: 10,
                        }}
                      >
                        📍 {c.address}
                      </div>
                    )}
                    {c.notes && (
                      <div
                        style={{
                          fontSize: 13,
                          color: '#666',
                          background: '#FFF7ED',
                          padding: '8px 12px',
                          borderRadius: 8,
                          marginBottom: 10,
                        }}
                      >
                        💬 {c.notes}
                      </div>
                    )}
                    {cJobs.length > 0 && (
                      <div style={{ marginBottom: 12 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: '#888',
                            marginBottom: 8,
                          }}
                        >
                          SERVİS GEÇMİŞİ
                        </div>
                        {cJobs.map((j) => (
                          <div
                            key={j.id}
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '8px 0',
                              borderBottom: '1px solid #f5f5f5',
                            }}
                          >
                            <div>
                              <div
                                style={{
                                  display: 'flex',
                                  gap: 8,
                                  alignItems: 'center',
                                }}
                              >
                                <div
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    background:
                                      j.status === 'tamamlandı'
                                        ? '#22C55E'
                                        : '#F97316',
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: 12,
                                    color: '#888',
                                    fontWeight: 600,
                                  }}
                                >
                                  {formatDate(j.date)}
                                </span>
                              </div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  marginTop: 2,
                                }}
                              >
                                {j.device}
                              </div>
                              <div style={{ fontSize: 12, color: '#888' }}>
                                {j.problem}
                              </div>
                            </div>
                            {j.price > 0 && (
                              <span style={{ fontSize: 14, fontWeight: 700 }}>
                                {formatMoney(j.price)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => setShowAddJob(c.id)}
                        style={{
                          flex: 1,
                          background: '#FFF7ED',
                          color: '#F97316',
                          border: '1.5px solid #FED7AA',
                          borderRadius: 10,
                          padding: '10px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        + Randevu Oluştur
                      </button>
                      <button
                        onClick={() => setEditCustomer(c)}
                        style={{
                          width: 40,
                          background: '#f1f1f1',
                          border: 'none',
                          borderRadius: 10,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name="edit" size={15} color="#666" />
                      </button>
                      <button
                        onClick={() => del(c.id)}
                        style={{
                          width: 40,
                          background: '#FEF2F2',
                          border: 'none',
                          borderRadius: 10,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon name="trash" size={15} color="#ef4444" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={() => setShowAdd(true)}
        style={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: '#FF6B35',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255,107,53,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
        }}
      >
        <Icon name="plus" size={24} color="#fff" />
      </button>

      {showAdd && (
        <CustomerModal onClose={() => setShowAdd(false)} onAdd={load} />
      )}
      {editCustomer && (
        <CustomerModal
          onClose={() => setEditCustomer(null)}
          onAdd={load}
          editCustomer={editCustomer}
        />
      )}
      {showAddJob && (
        <AddJobModal
          onClose={() => setShowAddJob(null)}
          onAdd={load}
          customers={customers}
          prefillCustomer={showAddJob}
        />
      )}
    </div>
  );
};

// ============================================================
// FINANCE SCREEN
// ============================================================
const FinanceScreen = () => {
  const [jobs, setJobs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const [showAddExp, setShowAddExp] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const [j, e, c] = await Promise.all([
      supabase.from('jobs').select('*').eq('status', 'tamamlandı'),
      supabase.from('expenses').select('*'),
      supabase.from('customers').select('*'),
    ]);
    setJobs(j.data || []);
    setExpenses(e.data || []);
    setCustomers(c.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filterByPeriod = (date) => {
    const d = new Date(date);
    const t = new Date(TODAY);
    if (period === 'today') return date === TODAY;
    if (period === 'week') {
      const w = new Date(t);
      w.setDate(t.getDate() - 7);
      return d >= w;
    }
    if (period === 'month')
      return (
        d.getMonth() === t.getMonth() && d.getFullYear() === t.getFullYear()
      );
    return true;
  };

  const filteredJobs = jobs.filter((j) => filterByPeriod(j.date));
  const filteredExp = expenses.filter((e) => filterByPeriod(e.date));
  const totalIncome = filteredJobs.reduce((a, b) => a + (b.price || 0), 0);
  const totalExpense = filteredExp.reduce((a, b) => a + (b.amount || 0), 0);
  const net = totalIncome - totalExpense;

  const deviceMap = {};
  filteredJobs.forEach((j) => {
    deviceMap[j.device] = (deviceMap[j.device] || 0) + (j.price || 0);
  });
  const chartData = Object.entries(deviceMap).sort((a, b) => b[1] - a[1]);
  const chartTotal = chartData.reduce((a, [, v]) => a + v, 0);
  const colors = ['#FF6B35', '#F97316', '#FBBF24', '#22C55E', '#3B82F6'];

  const allTx = [
    ...filteredJobs.map((j) => ({
      type: 'income',
      date: j.date,
      time: j.time,
      label: `${j.device} - ${
        (customers.find((c) => c.id === j.customer_id) || {}).name?.split(
          ' '
        )[0] || ''
      }`,
      amount: j.price,
    })),
    ...filteredExp.map((e) => ({
      type: 'expense',
      date: e.date,
      time: '00:00',
      label: e.category + (e.note ? ` · ${e.note}` : ''),
      amount: e.amount,
    })),
  ]
    .sort(
      (a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
    )
    .slice(0, 15);

  return (
    <div style={{ paddingBottom: 90 }}>
      <div style={{ padding: '20px 16px 12px' }}>
        <h1
          style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', margin: 0 }}
        >
          Finansal Özet
        </h1>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '0 16px 16px',
          overflowX: 'auto',
        }}
      >
        {[
          ['today', 'Bugün'],
          ['week', 'Bu Hafta'],
          ['month', 'Bu Ay'],
          ['all', 'Tüm Zamanlar'],
        ].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setPeriod(v)}
            style={{
              flexShrink: 0,
              background: period === v ? '#FF6B35' : '#f1f1f1',
              color: period === v ? '#fff' : '#333',
              border: 'none',
              borderRadius: 20,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {l}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              margin: '0 16px 16px',
              background: 'linear-gradient(135deg,#1e3a8a,#3B82F6)',
              borderRadius: 20,
              padding: '24px 20px',
              color: '#fff',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                opacity: 0.8,
                marginBottom: 6,
              }}
            >
              Net Kazanç
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
              {formatMoney(net)}
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>
                  TOPLAM GELİR
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: '#86EFAC' }}
                >
                  +{formatMoney(totalIncome)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>
                  TOPLAM GİDER
                </div>
                <div
                  style={{ fontSize: 18, fontWeight: 700, color: '#FCA5A5' }}
                >
                  -{formatMoney(totalExpense)}
                </div>
              </div>
            </div>
          </div>

          {chartData.length > 0 && (
            <div
              style={{
                margin: '0 16px 16px',
                background: '#fff',
                borderRadius: 20,
                padding: '18px 16px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}
            >
              <h3 style={{ fontWeight: 700, margin: '0 0 16px' }}>
                Kazanç Dağılımı
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <svg width={100} height={100} viewBox="0 0 36 36">
                  {(() => {
                    let off = 25;
                    return chartData.map(([name, val], i) => {
                      const pct = (val / chartTotal) * 100;
                      const el = (
                        <circle
                          key={name}
                          cx="18"
                          cy="18"
                          r="15.9"
                          fill="transparent"
                          stroke={colors[i % colors.length]}
                          strokeWidth="3.8"
                          strokeDasharray={`${pct} ${100 - pct}`}
                          strokeDashoffset={-off + 25}
                        />
                      );
                      off += pct;
                      return el;
                    });
                  })()}
                  <circle cx="18" cy="18" r="12" fill="#fff" />
                </svg>
                <div style={{ flex: 1 }}>
                  {chartData.map(([name, val], i) => (
                    <div
                      key={name}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            background: colors[i % colors.length],
                          }}
                        />
                        <span style={{ fontSize: 13 }}>{name}</span>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>
                        %{Math.round((val / chartTotal) * 100)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div style={{ padding: '0 16px 16px' }}>
            <button
              onClick={() => setShowAddExp(true)}
              style={{
                width: '100%',
                background: '#FF6B35',
                color: '#fff',
                border: 'none',
                borderRadius: 16,
                padding: '16px',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <Icon name="plus" size={20} color="#fff" /> Gider Ekle
            </button>
          </div>

          <div style={{ padding: '0 16px' }}>
            <h3 style={{ fontWeight: 700, margin: '0 0 12px' }}>
              Son İşlemler
            </h3>
            {allTx.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  color: '#aaa',
                  padding: '20px 0',
                }}
              >
                Bu dönemde işlem yok
              </div>
            )}
            {allTx.map((tx, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: tx.type === 'income' ? '#F0FDF4' : '#FEF2F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    name={tx.type === 'income' ? 'arrowUp' : 'arrowDown'}
                    size={18}
                    color={tx.type === 'income' ? '#22C55E' : '#EF4444'}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {tx.label}
                  </div>
                  <div style={{ color: '#888', fontSize: 12 }}>
                    {formatDate(tx.date)}
                    {tx.time && tx.time !== '00:00' ? `, ${tx.time}` : ''}
                  </div>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    color: tx.type === 'income' ? '#22C55E' : '#EF4444',
                  }}
                >
                  {tx.type === 'income' ? '+' : '-'}
                  {formatMoney(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {showAddExp && (
        <ExpenseModal onClose={() => setShowAddExp(false)} onAdd={load} />
      )}
    </div>
  );
};

// ============================================================
// SETTINGS SCREEN
// ============================================================
const SettingsScreen = ({ onDisconnect }) => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddPart, setShowAddPart] = useState(false);
  const [editPart, setEditPart] = useState(null);
  const [name, setName] = useState('');
  const [cat, setCat] = useState('Çamaşır Makinesi');
  const [stock, setStock] = useState('');
  const [cost, setCost] = useState('');
  const [sell, setSell] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from('parts').select('*').order('name');
    setParts(data || []);
    setLoading(false);
  };
  useEffect(() => {
    load();
  }, []);

  const reset = () => {
    setName('');
    setCat('Çamaşır Makinesi');
    setStock('');
    setCost('');
    setSell('');
    setEditPart(null);
  };
  const openEdit = (p) => {
    setEditPart(p);
    setName(p.name);
    setCat(p.category);
    setStock(String(p.stock));
    setCost(String(p.cost_price));
    setSell(String(p.sell_price));
    setShowAddPart(true);
  };

  const savePart = async () => {
    if (!name) return alert('Parça adı zorunludur.');
    setSaving(true);
    const data = {
      name,
      category: cat,
      stock: Number(stock),
      cost_price: Number(cost),
      sell_price: Number(sell),
    };
    if (editPart)
      await supabase.from('parts').update(data).eq('id', editPart.id);
    else await supabase.from('parts').insert(data);
    setSaving(false);
    load();
    setShowAddPart(false);
    reset();
  };

  const delPart = async (id) => {
    if (!window.confirm('Parçayı sil?')) return;
    await supabase.from('parts').delete().eq('id', id);
    load();
  };

  return (
    <div style={{ padding: '20px 16px 90px' }}>
      <h1
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: '#1a1a2e',
          marginBottom: 20,
        }}
      >
        Ayarlar
      </h1>

      {/* Stok */}
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '18px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <h3
            style={{
              fontWeight: 700,
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="package" size={18} color="#FF6B35" /> Stok Yönetimi
          </h3>
          <button
            onClick={() => {
              reset();
              setShowAddPart(true);
            }}
            style={{
              background: '#FF6B35',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '6px 14px',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            + Ekle
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          parts.map((p) => (
            <div
              key={p.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #f5f5f5',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#888' }}>
                  {p.category} · Satış: {formatMoney(p.sell_price)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontWeight: 700,
                    color:
                      p.stock === 0
                        ? '#EF4444'
                        : p.stock <= 2
                        ? '#F97316'
                        : '#22C55E',
                    fontSize: 14,
                  }}
                >
                  ×{p.stock}
                </span>
                <button
                  onClick={() => openEdit(p)}
                  style={{
                    background: '#f1f1f1',
                    border: 'none',
                    borderRadius: 8,
                    width: 30,
                    height: 30,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="edit" size={13} />
                </button>
                <button
                  onClick={() => delPart(p.id)}
                  style={{
                    background: '#FEF2F2',
                    border: 'none',
                    borderRadius: 8,
                    width: 30,
                    height: 30,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="trash" size={13} color="#ef4444" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Supabase Info */}
      <div
        style={{
          background: '#fff',
          borderRadius: 20,
          padding: '18px 16px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          marginBottom: 16,
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            margin: '0 0 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Icon name="wifi" size={18} color="#22C55E" /> Bağlantı Durumu
        </h3>
        <div
          style={{
            background: '#F0FDF4',
            borderRadius: 10,
            padding: '10px 12px',
            fontSize: 13,
            color: '#15803D',
          }}
        >
          ✅ Supabase'e bağlı — veriler bulutta saklanıyor
        </div>
        <button
          onClick={onDisconnect}
          style={{
            marginTop: 12,
            width: '100%',
            background: '#f1f1f1',
            color: '#666',
            border: 'none',
            borderRadius: 10,
            padding: '10px',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Bağlantıyı Değiştir
        </button>
      </div>

      {showAddPart && (
        <Modal
          title={editPart ? 'Parça Düzenle' : 'Yeni Parça'}
          onClose={() => {
            setShowAddPart(false);
            reset();
          }}
        >
          <Inp
            label="Parça Adı *"
            value={name}
            onChange={setName}
            placeholder="Pompa Motoru"
            req
          />
          <Sel
            label="Kategori"
            value={cat}
            onChange={setCat}
            options={[
              'Çamaşır Makinesi',
              'Bulaşık Makinesi',
              'Kombi',
              'Klima',
              'Buzdolabı',
              'Genel',
            ].map((c) => ({ value: c, label: c }))}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
            }}
          >
            <Inp
              label="Stok"
              type="number"
              value={stock}
              onChange={setStock}
              placeholder="0"
            />
            <Inp
              label="Alış TL"
              type="number"
              value={cost}
              onChange={setCost}
              placeholder="0"
            />
            <Inp
              label="Satış TL"
              type="number"
              value={sell}
              onChange={setSell}
              placeholder="0"
            />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Btn
              onClick={() => {
                setShowAddPart(false);
                reset();
              }}
              outline
              color="#666"
              full
            >
              İptal
            </Btn>
            <Btn onClick={savePart} full disabled={saving}>
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </Btn>
          </div>
        </Modal>
      )}
    </div>
  );
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState('home');

  useEffect(() => {
    const url = localStorage.getItem('sb_url');
    const key = localStorage.getItem('sb_key');
    if (url && key && !url.includes('PROJE_ID')) setReady(true);
  }, []);

  const disconnect = () => {
    localStorage.removeItem('sb_url');
    localStorage.removeItem('sb_key');
    setReady(false);
  };

  const tabs = [
    { id: 'home', icon: 'home', label: 'Ana Sayfa' },
    { id: 'customers', icon: 'users', label: 'Rehber' },
    { id: 'finance', icon: 'wallet', label: 'Finans' },
    { id: 'settings', icon: 'settings', label: 'Ayarlar' },
  ];

  if (!ready) return <SetupScreen onSave={() => setReady(true)} />;

  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100vh',
        background: '#f8f8fc',
        fontFamily: "'Segoe UI',system-ui,sans-serif",
      }}
    >
      <div style={{ minHeight: 'calc(100vh - 70px)' }}>
        {tab === 'home' && <HomeScreen />}
        {tab === 'customers' && <CustomersScreen />}
        {tab === 'finance' && <FinanceScreen />}
        {tab === 'settings' && <SettingsScreen onDisconnect={disconnect} />}
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 430,
          background: '#fff',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          zIndex: 200,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              padding: '10px 0 8px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Icon
              name={t.icon}
              size={22}
              color={tab === t.id ? '#FF6B35' : '#aaa'}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: tab === t.id ? '#FF6B35' : '#aaa',
              }}
            >
              {t.label.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
