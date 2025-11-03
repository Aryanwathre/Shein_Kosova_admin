'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getMarkup, updateMarkup } from '@/app/lib/api';

export default function MarkupSettingsPage() {
  const [percentage, setPercentage] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  
  const [sampleBasePrice, setSampleBasePrice] = useState<number>(100);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getMarkup();
        const value = typeof res === 'string' ? parseFloat(res) : res;
        setPercentage(isNaN(value) ? 0 : value);
      } catch (err) {
        console.error('Failed to load markup:', err);
        toast.error('Failed to load markup percentage');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (percentage === '' || isNaN(Number(percentage)) || Number(percentage) < 0) {
      toast.error('Enter a valid non-negative percentage');
      return;
    }

    try {
      setSaving(true);
      await updateMarkup(Number(percentage));
      toast.success('Markup updated successfully');
    } catch (err) {
      console.error('Failed to update markup:', err);
      toast.error('Failed to update markup');
    } finally {
      setSaving(false);
    }
  };

  const computedPrice = (base: number, pct: number | '') => {
    if (pct === '' || isNaN(Number(pct))) return base;
    return +(base * (1 + Number(pct) / 100)).toFixed(2);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="card">
          <div className="card-title">Markup Settings</div>
          <div style={{ padding: 16 }}>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="heading-page">Markup Settings</div>

      <div className="card" style={{ maxWidth: 560 }}>
        <div className="card-title">Global Markup Percentage</div>

        <div style={{ padding: 16 }}>
          <label className="label" htmlFor="markup">
            Markup Percentage (%)
          </label>
          <input
            id="markup"
            type="number"
            min={0}
            className="input"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ width: '120px', marginTop: 8 }}
          />

          <p style={{ marginTop: 12, color: '#4b5563' }}>
            This percentage will be applied to base product price to calculate final price.
          </p>

          {/* Sample preview */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <label className="label">Sample Base Price</label>
                <input
                  type="number"
                  className="input"
                  value={sampleBasePrice}
                  onChange={(e) => setSampleBasePrice(Number(e.target.value || 0))}
                />
              </div>

              <div style={{ width: 1, background: '#eef2f7', margin: '0 12px', height: 64 }} />

              <div style={{ minWidth: 220 }}>
                <label className="label">Final Price</label>
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: '#f8fafc',
                    fontWeight: 700,
                    fontSize: 16,
                    marginTop: 6,
                  }}
                >
                  € {computedPrice(sampleBasePrice, percentage)}
                </div>
                <div style={{ marginTop: 6, color: '#6b7280', fontSize: 13 }}>
                  (+{percentage || 0}% applied)
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
            <button
              type="button"
              className="btn btn-yellow"
              onClick={() => {
                // reset to server value
                setLoading(true);
                getMarkup()
                  .then((res) => {
                    const value = typeof res === 'string' ? parseFloat(res) : res;
                    setPercentage(isNaN(value) ? 0 : value);
                    toast.success('Reset to server value');
                  })
                  .catch(() => toast.error('Failed to reload'))
                  .finally(() => setLoading(false));
              }}
              disabled={saving}
            >
              Reset
            </button>

            <button className="btn btn-blue" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
