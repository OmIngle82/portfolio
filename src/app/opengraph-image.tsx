import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Om Ingle | Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #030014, #0a0520, #030014)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Subtle background glow effect using radial gradients */}
        <div style={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: -200,
          left: -200,
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
        }} />

        {/* Logo Container */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '28px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '2px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '32px',
          boxShadow: '0 0 60px rgba(249, 115, 22, 0.3)',
          marginBottom: '40px',
        }}>
          {/* Sparkles SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
            <path d="M20 3v4"/>
            <path d="M22 5h-4"/>
            <path d="M4 17v2"/>
            <path d="M5 18H3"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: 84,
          fontWeight: 800,
          color: 'white',
          margin: 0,
          marginBottom: 16,
          letterSpacing: '-0.02em',
          textAlign: 'center',
        }}>
          Om Ingle
        </h1>

        <h2 style={{
          fontSize: 36,
          fontWeight: 500,
          color: '#a1a1aa',
          margin: 0,
          letterSpacing: '0.1em',
          textAlign: 'center',
        }}>
          SOFTWARE ENGINEER
        </h2>
        
        {/* Decorative line */}
        <div style={{
          marginTop: 48,
          width: 100,
          height: 6,
          background: 'linear-gradient(to right, #f97316, #ec4899)',
          borderRadius: 3,
        }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
