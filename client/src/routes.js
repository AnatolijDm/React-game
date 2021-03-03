import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { StartGamePage } from './pages/StartGamePage';
import { ScorePage } from './pages/ScorePage';

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/start" exact>
                    <StartGamePage />
                </Route>
                <Route path="/score" exact>
                    <ScorePage />
                </Route>
                <Redirect to="/start" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}