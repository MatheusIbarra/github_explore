import React from 'react';

import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/global'

import Routes from './routes'
// import { Container } from './styles';

const App: React.FC = () => (
    <>
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
        <GlobalStyle/>
    </>
)

export default App;
