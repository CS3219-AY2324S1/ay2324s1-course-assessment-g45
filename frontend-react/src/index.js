import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './contexts/userContext';
import { QuestionsContextProvider } from './contexts/QuestionContext';
import { MaintainerContextProvider } from './contexts/MaintainerContext';
import { MatchContextProvider } from './contexts/MatchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <MatchContextProvider>
        <QuestionsContextProvider>
          <MaintainerContextProvider>
            <App />
          </MaintainerContextProvider>
        </QuestionsContextProvider>
      </MatchContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
