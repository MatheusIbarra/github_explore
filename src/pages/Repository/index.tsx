import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles';

import { Repository as Repo, Issues as Issue } from '../../services/repos'

import logoImg from '../../assets/logo.svg';


interface RepositoryParams {
    repository: string;

}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState(new Repo());
    const [issues, setIssues] = useState<Issue[]>([]);



    useEffect(() => {
        Repo.load(params.repository).then((response) => {
            setRepository(response.data);
        });
        Issue.load(params.repository).then((response) => {
            setIssues(response.data);
        });
    }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                </Link>
            </Header>
            { repository && (
                <RepositoryInfo>
                    <header>
                        <img src={repository?.owner?.avatar_url} alt={repository?.owner?.login}/>
                        <div>
                            <strong><a target="_blank" rel="noreferrer" href={`https://www.github.com/${repository?.owner?.login}/${repository.full_name}`}>{repository.full_name}</a></strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}
            <Issues>
                {issues && issues.map((issue) => {
                    <a key={issue.id} href={issue.html_url} >
                    <div>
                        <strong>{issue.title}</strong>
                        <p>{issue.user?.login}</p>
                    </div>
                    <FiChevronRight size={20}/>
                </a>
                })}
            </Issues>
        </>
    );
}

export default Repository;
