// src/adapters/navigation/ProtectedRoute.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
    component: React.ComponentType<Record<string, unknown>>;
    path: string;
    exact?: boolean;
    roles?: string[];
    isAuthenticated: boolean;
    userRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    component: Component,
    isAuthenticated,
    userRole,
    roles,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            !isAuthenticated ? (
                <Redirect to="/login" />
            ) : roles && !roles.includes(userRole || '') ? (
                <Redirect to="/" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

export default ProtectedRoute;