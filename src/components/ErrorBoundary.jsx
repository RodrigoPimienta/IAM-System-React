import { Component } from 'react';
import Swal from 'sweetalert2';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    console.log('ErrorBoundary');

    if (this.state.hasError) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: this.state.error?.message || 'An unexpected error occurred.',
        confirmButtonText: 'Refresh',
      }).then(() => {
        this.handleRefresh();
      });

      return null;
    }

    return this.props.children;
  }
}
