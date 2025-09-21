import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para renderizar fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode enviar o erro para um serviço de log aqui
    console.error("Erro capturado pelo ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // UI de fallback quando der erro
      return (
        <div style={{ padding: 20 }}>
          <h1>Algo deu errado.</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => window.location.reload()}>Recarregar página</button>
        </div>
      );
    }

    // Renderiza os filhos normalmente se não houver erro
    return this.props.children;
  }
}

export default ErrorBoundary;
