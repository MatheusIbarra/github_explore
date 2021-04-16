import React, { useState, useEffect,  FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Repositories, Error } from './styles';


import { Repository } from '../../services/Repo';


const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@GithubExplore:repositories');
        if ( storageRepositories ) {
            return JSON.parse(storageRepositories);
        } else {
            return [];
        }
    });

    const handleAddRepo = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if( newRepo.length < 1 ) {
            setInputError('Digite autor/nome do repositório.');
            return;
        }
        try {

            const { data } = await Repository.findByName(newRepo);

            const repository = data

            setRepositories( [ ...repositories, repository ] );
            setNewRepo('');
            setInputError('');

        } catch (err) {
            setInputError('Erro na busca por esse repositório')
        }
    }

    useEffect(() => {
        localStorage.setItem('@GithubExplore:repositories', JSON.stringify(repositories))
    }, [repositories]);

    return (
        <>
            <img src={logoImg} alt="Github explorer"/>
            <Title>Explore repositórios no github</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepo}>
                <input
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value)}
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>
            {inputError &&
                <Error>{inputError}</Error>
            }

            <Repositories>
               {repositories.map(repo => (
                    <a key={repo?.full_name} href="teste">
                        <img
                            src={repo?.owner?.avatar_url}
                            alt={repo?.owner?.login}
                        />
                        <div>
                            <strong>{repo?.full_name}</strong>
                            <p>{repo?.description}</p>
                        </div>
                        <FiChevronRight size={20}/>
                    </a>
               ))}
            </Repositories>
        </>
    );

}

export default Dashboard;
