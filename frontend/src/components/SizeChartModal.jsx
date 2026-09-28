import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Ruler } from 'lucide-react';

export default function SizeChartModal() {
  const { isSizeChartOpen, setIsSizeChartOpen } = useShop();
  const [activeTab, setActiveTab] = useState('mens'); // 'mens', 'womens', 'kids'

  if (!isSizeChartOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsSizeChartOpen(false)}>
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          width: '100%',
          maxWidth: '640px',
          padding: '30px 24px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsSizeChartOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#f4f3ef',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333',
            cursor: 'pointer',
          }}
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Ruler size={22} color="#d4af37" />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: '#0b0c10' }}>
            Malak Apparel Size Guide
          </h3>
        </div>
        <p style={{ color: '#7a8190', fontSize: '13px', marginBottom: '20px' }}>
          Measurements are in inches. For a relaxed fit in kurtas or streetwear tees, consider choosing one size up.
        </p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>
          <button
            onClick={() => setActiveTab('mens')}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'mens' ? '#0b0c10' : '#f4f3ef',
              color: activeTab === 'mens' ? '#ffffff' : '#555',
              cursor: 'pointer',
            }}
          >
            Men's Wear & Sherwanis
          </button>
          <button
            onClick={() => setActiveTab('womens')}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'womens' ? '#0b0c10' : '#f4f3ef',
              color: activeTab === 'womens' ? '#ffffff' : '#555',
              cursor: 'pointer',
            }}
          >
            Women's Lehengas & Kurtis
          </button>
          <button
            onClick={() => setActiveTab('kids')}
            style={{
              padding: '6px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '700',
              background: activeTab === 'kids' ? '#0b0c10' : '#f4f3ef',
              color: activeTab === 'kids' ? '#ffffff' : '#555',
              cursor: 'pointer',
            }}
          >
            Kids Wear
          </button>
        </div>

        {/* Size Table */}
        <div style={{ overflowX: 'auto', border: '1px solid #ebe8de', borderRadius: '12px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8f7f4', borderBottom: '1px solid #ebe8de' }}>
                <th style={{ padding: '10px 14px', color: '#0b0c10' }}>Size Tag</th>
                <th style={{ padding: '10px 14px', color: '#0b0c10' }}>Chest / Bust (in)</th>
                <th style={{ padding: '10px 14px', color: '#0b0c10' }}>Waist (in)</th>
                <th style={{ padding: '10px 14px', color: '#0b0c10' }}>Length (in)</th>
                <th style={{ padding: '10px 14px', color: '#0b0c10' }}>Shoulder (in)</th>
              </tr>
            </thead>
            <tbody>
              {activeTab === 'mens' && (
                <>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>S (38)</td>
                    <td style={{ padding: '10px 14px' }}>38 - 39</td>
                    <td style={{ padding: '10px 14px' }}>32 - 34</td>
                    <td style={{ padding: '10px 14px' }}>40</td>
                    <td style={{ padding: '10px 14px' }}>17.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>M (40)</td>
                    <td style={{ padding: '10px 14px' }}>40 - 41</td>
                    <td style={{ padding: '10px 14px' }}>34 - 36</td>
                    <td style={{ padding: '10px 14px' }}>42</td>
                    <td style={{ padding: '10px 14px' }}>18.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>L (42)</td>
                    <td style={{ padding: '10px 14px' }}>42 - 43</td>
                    <td style={{ padding: '10px 14px' }}>36 - 38</td>
                    <td style={{ padding: '10px 14px' }}>43</td>
                    <td style={{ padding: '10px 14px' }}>19.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>XL (44)</td>
                    <td style={{ padding: '10px 14px' }}>44 - 45</td>
                    <td style={{ padding: '10px 14px' }}>38 - 40</td>
                    <td style={{ padding: '10px 14px' }}>44</td>
                    <td style={{ padding: '10px 14px' }}>20.5</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>XXL (46)</td>
                    <td style={{ padding: '10px 14px' }}>46 - 48</td>
                    <td style={{ padding: '10px 14px' }}>41 - 44</td>
                    <td style={{ padding: '10px 14px' }}>45</td>
                    <td style={{ padding: '10px 14px' }}>21.5</td>
                  </tr>
                </>
              )}

              {activeTab === 'womens' && (
                <>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>XS (34)</td>
                    <td style={{ padding: '10px 14px' }}>34</td>
                    <td style={{ padding: '10px 14px' }}>28</td>
                    <td style={{ padding: '10px 14px' }}>42</td>
                    <td style={{ padding: '10px 14px' }}>14.0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>S (36)</td>
                    <td style={{ padding: '10px 14px' }}>36</td>
                    <td style={{ padding: '10px 14px' }}>30</td>
                    <td style={{ padding: '10px 14px' }}>43</td>
                    <td style={{ padding: '10px 14px' }}>14.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>M (38)</td>
                    <td style={{ padding: '10px 14px' }}>38</td>
                    <td style={{ padding: '10px 14px' }}>32</td>
                    <td style={{ padding: '10px 14px' }}>44</td>
                    <td style={{ padding: '10px 14px' }}>15.0</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>L (40)</td>
                    <td style={{ padding: '10px 14px' }}>40</td>
                    <td style={{ padding: '10px 14px' }}>34</td>
                    <td style={{ padding: '10px 14px' }}>44</td>
                    <td style={{ padding: '10px 14px' }}>15.5</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>XL (42)</td>
                    <td style={{ padding: '10px 14px' }}>42</td>
                    <td style={{ padding: '10px 14px' }}>36</td>
                    <td style={{ padding: '10px 14px' }}>45</td>
                    <td style={{ padding: '10px 14px' }}>16.0</td>
                  </tr>
                </>
              )}

              {activeTab === 'kids' && (
                <>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>2 - 3 Years</td>
                    <td style={{ padding: '10px 14px' }}>22</td>
                    <td style={{ padding: '10px 14px' }}>20</td>
                    <td style={{ padding: '10px 14px' }}>20</td>
                    <td style={{ padding: '10px 14px' }}>9.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>4 - 5 Years</td>
                    <td style={{ padding: '10px 14px' }}>24</td>
                    <td style={{ padding: '10px 14px' }}>22</td>
                    <td style={{ padding: '10px 14px' }}>23</td>
                    <td style={{ padding: '10px 14px' }}>10.5</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f2f0ea' }}>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>6 - 7 Years</td>
                    <td style={{ padding: '10px 14px' }}>26</td>
                    <td style={{ padding: '10px 14px' }}>24</td>
                    <td style={{ padding: '10px 14px' }}>26</td>
                    <td style={{ padding: '10px 14px' }}>11.5</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '10px 14px', fontWeight: '700' }}>8 - 9 Years</td>
                    <td style={{ padding: '10px 14px' }}>28</td>
                    <td style={{ padding: '10px 14px' }}>26</td>
                    <td style={{ padding: '10px 14px' }}>29</td>
                    <td style={{ padding: '10px 14px' }}>12.5</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="btn-gold"
            style={{ padding: '10px 24px', fontSize: '13px' }}
          >
            Got It, Back to Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
