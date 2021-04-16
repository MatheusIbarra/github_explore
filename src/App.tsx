import React from 'react';

import { BrowserRouter } from 'react-router-dom'

import Routes from './routes'
// import { Container } from './styles';

const App: React.FC = () => (
    <BrowserRouter>
        <Routes/>
    </BrowserRouter>
)

export default App;
