import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import Pagination from "../../components/Pagination";
import Input from "../../components/Input";
import Modal from '../../components/Modal';

import { Category, CategoryFilter } from '../../services/post';

import { Container, Content, ModalContent } from './styles';

import { useToast } from '../../hooks/toast';
import formatDate from '../../utils/formatDate';
import BreadCrumb from '../../components/BreadCrumb';

import errorHandler from '../../services/errorHandler';

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [animating, setAnimating] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number>();
    const [modal, setModal] = useState<boolean>(false);
    const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
    const [filter, setFilter] = useState(new CategoryFilter());
    const [totalRecords, setTotalRecords] = useState(0);
    const history = useHistory();
    const { addToast } = useToast();

    const breadItens = [
        { name: 'Dashboard', path: '/', active: false },
        { name: 'Categorias', path: '/categorias', active: true },
    ];

    function handlePageChange(pageNumber: number, itemsPerPage: number) {
        setFilter({ ...filter, page: pageNumber, itemsPerPage });
        loadCategories({ ...filter, page: pageNumber, itemsPerPage });
    }

    function toggleModal() {
        if (modal) {
            setAnimating(false);
            setTimeout(() => {
                setModal(oldValue => !oldValue);
            }, 500)
        } else {
            setAnimating(false);
            setModal(oldValue => !oldValue);
            setTimeout(() => {
                setAnimating(true);
            }, 500)
        }
    }

    function selectCategory(id: number) {
        setCategoryId(id);
        toggleModal();
    }

    const loadCategories = async (filter: CategoryFilter) => {
        try{
             const {data} = await  Category.search(filter)
                setCategories(data.content);
                setTotalRecords(data.totalElements);
        }
        catch (error) {
            const message = errorHandler.handle(error)
            addToast({
                type: 'error',
                title: 'Erro ao carregar a lista.',
                description: message,
            });
        }
    };

    const changeOrder = () => {
        setOrder(order === "ASC" ? "DESC" : "ASC")
    }

    useEffect(() => {
        setFilter({...filter, direction: order, page: 1})
        loadCategories({...filter, direction: order, page : 1})
    }, [order])


    async function removeCategory(id: number) {
        await Category.delete(id)
        try {
            loadCategories(filter);
            toggleModal();
            addToast({
                type: 'success',
                title: 'Categoria excluída com sucesso!',
            });
        }  catch (error) {
            const message = errorHandler.handle(error)
            addToast({
                type: 'error',
                title: 'Erro ao excluir a a categoria.',
                description: message,
            });
        }
    }

    function redirect(route: string) {
        history.push(route);
    }

    function handleFilterInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        setFilter({ ...filter, page: 1});
        loadCategories({ ...filter, page: 1});
    }

    useEffect(() => {
        loadCategories(filter);
    }, [])


    return (
        <Container>
            <Modal onClickOutside={() => setModal(false)} onCloseClick={() => setModal(false)} modalState={modal}>
                <ModalContent>
                    <div className="title">
                        Você realmente deseja excluir ?
                    </div>
                    <div className="buttons">
                        <button className="sim" onClick={() => categoryId && removeCategory(categoryId)}>Sim</button>
                        <button className="nao" onClick={() => toggleModal()}>Não</button>
                    </div>
                </ModalContent>
            </Modal>
            <Content>
                <BreadCrumb itens={breadItens}>
                </BreadCrumb>
                <div className="filter">
                    <form onSubmit={handleSearch}>
                        <div>
                            <div>
                                <button style={{height: 35, width: 100 }} type="button" className="new bg-primary text-white" onClick={() => redirect('/categorias/new')}>
                                    Novo
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                                <Input
                                    containerStyle={{ height: 35, width: 320, padding: 2, borderColor: 'black' }}
                                    style={{ paddingLeft: 5, paddingTop: 2 }}
                                    type={"text"}
                                    name={"name"}
                                    placeholder={"Categoria"}
                                    onChange={handleFilterInputChange} />
                                <Input
                                    containerStyle={{ height: 35, width: 320, padding: 2, borderColor: 'black' }}
                                    style={{ paddingLeft: 5}}
                                    type={'text'}
                                    name={"description"}
                                    placeholder={"Descriçao da categoria"}
                                    onChange={handleFilterInputChange} />
                            <div>
                                <button className="filterbutton" type="submit">
                                    Filtrar
                                    <i style={{ marginLeft: 5 }} className="fa fa-search" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th style={{ width: '10%' }}>Id</th>
                                <th style={{ width: '20%' }}>Nome</th>
                                <th style={{ width: '40%' }}>Descrição</th>
                                <th style={{ width: '15%' }}>Data  <i style={{marginLeft: 5}} className={order === "DESC" ? "fas fa-sort-amount-down-alt" : "fas fa-sort-amount-up-alt"}  onClick={() => changeOrder()}/></th>
                                <th style={{ width: '15%' }}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map(category => (
                                    <tr key={category.id}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>{category.description.length > 40 ? category.description.substr(0,39) + "..." : category.description}</td>
                                        <td>{category.createdAt && formatDate(category.createdAt.toString())}</td>
                                        <td className={"tableIcon"} >
                                            <button className="bg-yellow" type="button" onClick={() => redirect(`/categorias/${category.id}`)}>
                                                <i className="fa fa-pencil-alt"></i>
                                            </button>
                                            <button className="bg-red" type="button" onClick={() => selectCategory(category.id)}>
                                                <i className="fas fa-times" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                    <tr>
                                        <td className="none" colSpan={3}>Nenhum registro encontrado</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <Pagination
                        page={filter.page}
                        size={filter.itemsPerPage}
                        totalRecords={totalRecords}
                        itensOnCurrentPage={categories.length}
                        pageChange={(pageNumber, itemsPerPage) => handlePageChange(pageNumber, itemsPerPage ? itemsPerPage : filter.itemsPerPage)}
                    />
                </div>
            </Content>
        </Container>
    );
}

export default CategoryList;
