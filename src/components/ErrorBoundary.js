import { Component } from 'react';
import { EmptyState, EmptyStateBody, Title, Button } from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import PropTypes from 'prop-types';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // eslint-disable-next-line no-console
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/app/payload-tracker/payloads';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem' }}>
                    <EmptyState icon={ExclamationTriangleIcon}>
                        <Title headingLevel="h1" size="lg">
                            Something went wrong
                        </Title>
                        <EmptyStateBody>
                            {this.state.error?.message || 'An unexpected error occurred'}
                        </EmptyStateBody>
                        <Button variant="primary" onClick={this.handleReset}>
                            Return to Home
                        </Button>
                    </EmptyState>
                </div>
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node
};

export default ErrorBoundary;
