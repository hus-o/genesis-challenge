import React from 'react';
//import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import {Home} from './home';

const App: React.FC = () => <Home />;

//ReactDOM.render(<App />, document.getElementById('root'));
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
