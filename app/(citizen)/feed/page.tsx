export default function FeedPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#17264A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FBFAF7',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <div
        style={{
          padding: '2rem',
          backgroundColor: '#EFEBE2',
          color: '#14181F',
          borderLeft: '3px solid #17264A',
          borderRadius: '2px',
          maxWidth: '380px',
          width: '100%',
        }}
      >
        <p style={{ fontSize: '1.0625rem', fontWeight: 600 }}>Feed — S3L (próxima sesión)</p>
        <p style={{ fontSize: '0.9375rem', color: '#5A6472', marginTop: '0.5rem' }}>
          El feed del ciudadano se construye en la Sesión 3L.
        </p>
        <p
          style={{
            fontSize: '0.6875rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#77808F',
            marginTop: '1rem',
            borderTop: '1px solid #D6CFC0',
            paddingTop: '0.75rem',
          }}
        >
          datos de demostración
        </p>
      </div>
    </div>
  )
}
