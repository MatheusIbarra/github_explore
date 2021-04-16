import React, { useState, useEffect,  FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';


import logoImg from '../../assets/logo.svg';

import { Link } from 'react-router-dom';

import { Title, Form, Repositories, Error } from './styles';


import { Repository } from '../../services/repos';


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
            const { data } = await Repository.load(newRepo);
            setRepositories([ ...repositories, data ])
            setNewRepo('');
            setInputError('');

        } catch (err) {
            setInputError('Erro na busca por esse repositório')
        }
    }

    useEffect(() => {
        if ( repositories ) {
            localStorage.setItem('@GithubExplore:repositories', JSON.stringify(repositories))
        }


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
                    <Link key={repo?.full_name} to={`/repository/${repo.full_name}`}>
                        <img
                            src={repo?.owner?.avatar_url}
                            alt={repo?.owner?.login}
                        />
                        <div>
                            <strong>{repo?.full_name}</strong>
                            <p>{repo?.description}</p>
                        </div>
                        <FiChevronRight size={20}/>
                    </Link>
               ))}
            </Repositories>
        </>
    );

}

export default Dashboard;
