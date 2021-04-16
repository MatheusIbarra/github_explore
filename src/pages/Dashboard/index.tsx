import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories } from './styles';

const Dashboard: React.FC = () => {
    return (
        <>
            <img src={logoImg} alt="Github explorer"/>
            <Title>Explore repositórios no github</Title>

            <Form>
                <input placeholder="Digite o nome do repositório"/>
                <button type="submit">Pesquisar</button>
            </Form>

            <Repositories>
                <a href="teste">
                    <img
                        src="https://avatars.githubusercontent.com/u/72452262?v=4"
                        alt="MatheusIbarra"
                    />
                    <div>
                        <strong>matheusIbarra/repo</strong>
                        <p>a simple app to list some repositores</p>
                    </div>
                    <FiChevronRight size={20}/>
                </a>
            </Repositories>
        </>
    );

}

export default Dashboard;
