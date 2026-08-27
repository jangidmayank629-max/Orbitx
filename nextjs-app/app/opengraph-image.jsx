import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'OrbitX Marketing - Best Social Media Marketing Agency in Mahwa, Rajasthan';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0e0e10 0%, #131315 50%, #201f21 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '64px',
          fontFamily: 'sans-serif',
          border: '4px solid rgba(208, 188, 255, 0.2)',
          position: 'relative'
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(76, 215, 246, 0.25)',
            filter: 'blur(100px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(208, 188, 255, 0.25)',
            filter: 'blur(100px)'
          }}
        />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <span
            style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#d0bcff',
              letterSpacing: '-1px'
            }}
          >
            OrbitX Marketing
          </span>
          <div
            style={{
              background: 'rgba(76, 215, 246, 0.15)',
              border: '1px solid #4cd7f6',
              padding: '6px 16px',
              borderRadius: '9999px',
              color: '#4cd7f6',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            📍 Mahwa, Rajasthan (321608)
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10, maxWidth: '950px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            Best Social Media Marketing & Video Editing Agency
          </h1>
          <p
            style={{
              fontSize: '24px',
              color: '#cbc3d7',
              margin: 0,
              lineHeight: 1.4
            }}
          >
            High-Velocity Social Strategy &bull; Cinematic Video Editing &bull; Hyper-Targeted Ads &bull; Local SEO
          </p>
        </div>

        {/* Footer Badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            zIndex: 10
          }}
        >
          <span style={{ color: '#4cd7f6', fontSize: '20px', fontWeight: '700' }}>
            orbitxmarketing.com
          </span>
          <span style={{ color: '#958ea0', fontSize: '18px' }}>
            Fueling the next digital frontier
          </span>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
