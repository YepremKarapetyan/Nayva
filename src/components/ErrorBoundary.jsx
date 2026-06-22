import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32,
        }}>
          <h2 style={{ fontFamily: 'Poppins,sans-serif', color: '#1a3330', fontSize: 24 }}>
            Ինչ-որ բան սխալ գնաց
          </h2>
          <p style={{ color: '#666', fontFamily: 'Poppins,sans-serif' }}>
            Խնդրում ենք թարմացնել էջը:
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#007f7e', color: '#fff', border: 'none',
              borderRadius: 50, padding: '12px 32px', fontSize: 15,
              fontFamily: 'Poppins,sans-serif', cursor: 'pointer',
            }}
          >
            Թարմացնել
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
