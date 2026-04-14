export default function TeamSection() {
  return (
    <section 
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 20px',
        position: 'relative',
        zIndex: 5
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, textTransform: 'uppercase', marginBottom: 40, lineHeight: 1 }}>
          The <span style={{ color: 'var(--orange)' }}>Squad</span>
        </h2>
        
        <div className="liquid-glass p-2">
           <img 
             src="/team_photo.png" 
             alt="GBU Basketball Team" 
             style={{ width: '100%', borderRadius: 12, display: 'block' }}
           />
        </div>
      </div>
    </section>
  )
}
