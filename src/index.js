import React from 'react';
import ReactDOM from 'react-dom/client'
import Chat from './Chat';
import Header from './Header';
import 'devextreme/dist/css/dx.light.css';

const App = () => {
  return (
    <div>
      {/* Other components */}
      <Header />
      <Chat />
      <footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
)
