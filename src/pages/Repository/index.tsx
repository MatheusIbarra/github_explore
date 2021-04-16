import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { Header, RepositoryInfo, Issues } from './styles';

import { Repository as Repo } from '../../services/repos'

import logoImg from '../../assets/logo.svg';


interface RepositoryParams {
    repository: string;

}

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState(new Repo());



    // const loadRepo = async () => {
    //     const [ repository, issues ] = await Promise.all([
    //         Repo.load(params.repository),
    //         Repo.loadIssues(params.repository)
    //     ]);

    //     console.log(repository, issues);
    // }


    // useEffect(() => {

    // loadRepo();

    // }, [params.repository])

    return (
        <>
            <Header>
                <img src={logoImg} alt="Github Explorer" />
                <Link to="/">
                    <FiChevronLeft size={16}/>
                    Voltar
                </Link>
            </Header>

            <RepositoryInfo>
                <header>
                    <img src="https://scontent.fjdo1-2.fna.fbcdn.net/v/t1.6435-9/37739166_2616231355069242_4023706868210728960_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=e3f864&_nc_ohc=nu3ZFFcNGcMAX-g5968&_nc_ht=scontent.fjdo1-2.fna&oh=62c3faed7996a46861bf06785b386854&oe=609DDDDC"/>
                    <div>
                        <strong>unform</strong>
                        <p>descricao</p>
                    </div>
                </header>
                <ul>
                    <li>
                        <strong>1080</strong>
                        <span>Stars</span>
                    </li>
                    <li>
                        <strong>1080</strong>
                        <span>Forks</span>
                    </li>
                    <li>
                        <strong>1080</strong>
                        <span>Issues abertas</span>
                    </li>
                </ul>
            </RepositoryInfo>
            <Issues>
                <Link  to={`dsadaw`}>
                    <div>
                        <strong>repo?.full_name</strong>
                        <p>repo?.description</p>
                    </div>
                    <FiChevronRight size={20}/>
                </Link>
            </Issues>
        </>
    );
}

export default Repository;
