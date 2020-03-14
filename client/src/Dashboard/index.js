import React, { useEffect, useState } from 'react';
import api from '../api';
import './style.css';

function Dashboard() {
    const [troco, setTroco] = useState(0);
    const [pago, setPago] = useState(0);
    const [total, setTotal] = useState(0);
    const [codigo, setCodigo] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [productsAll, setProductsAll] = useState([]);
    const [productsSell, setProductsSell] = useState([]);

    useEffect(() => {
        api.post('listar').then(response => {
            setProductsAll(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        const t = totalPrice(productsSell);
        console.log(t)
        setTotal(t);
    }, [productsSell]);

    useEffect(() => {
        setTroco(pago - total)
    }, [pago, total]);

    function addProductInTable(e) {
        e.preventDefault();
        const product = productsAll.filter(element => (element.codigo === codigo))[0];
        if (product) {
            const copyProductsSell = JSON.parse(JSON.stringify(productsSell));
            product.quantidade = quantidade;
            if (containProduct(product, copyProductsSell)) {
                const newProductsSell = sumAmountAndPriceProduct(product, copyProductsSell);
                setProductsSell(newProductsSell);
            } else {
                product.preco_total = product.preco_unitario * product.quantidade;
                copyProductsSell.push(product);
                setProductsSell(copyProductsSell);
            }

        } else alert('Produto não encontrado');
    }

    function containProduct(product, arr) {
        let productInTable = false;
        arr.forEach(element => {
            if (element.codigo === product.codigo) {
                productInTable = true;
            }
        });
        return productInTable;
    }

    function sumAmountAndPriceProduct(product, arr) {
        return arr.map(element => {
            if (product.codigo === element.codigo) {
                element.quantidade += product.quantidade;
                element.preco_total = element.quantidade * element.preco_unitario;
            }
            return element;
        });
    }

    function totalPrice(arr) {
        const copyProductsSell = JSON.parse(JSON.stringify(arr))
        if (arr.length) {
            const arrTotalPrices = copyProductsSell.map(element => element.preco_total)
            return arrTotalPrices.reduce((accumulator, precoTotal) => (
                accumulator += precoTotal
            ));
        }
        return 0;
    }

    return (
        <div className="dash-container">
            <aside className='menu-side'>
                <ul>
                    <li>
                        <button className="btn-menu ativo" id='venda'>
                            Venda
                        </button>
                    </li>
                    <li>
                        <button className="btn-menu" id='produtos'>
                            Produtos
                        </button>
                    </li>
                    <li>
                        <button className="btn-menu" id='sair'>
                            Sair
                        </button>
                    </li>
                </ul>
            </aside>
            <main className='main-container visible' id='id-venda'>
                <form onSubmit={addProductInTable}>
                    <div className='row'>
                        <div className="input-block">
                            <label htmlFor="codigo">Código do Produto</label>
                            <input type="number" name="codigo" required onChange={e => setCodigo(Number(e.target.value))} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="quantidade">Qnt.</label>
                            <input type="number" name="quantidade" required onChange={e => setQuantidade(Number(e.target.value))} />
                        </div>
                        <input type="submit" value="Próximo" />
                    </div>
                </form>

                <form className='margin-top'>
                    <hr></hr>
                    <div className='margin-top'>
                        <p>Produtos</p>
                        <div className='overflow-y'>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Código</th>
                                        <th>Descrição</th>
                                        <th>Quantidade</th>
                                        <th>Preço unitário (R$) </th>
                                        <th>Preço total (R$)</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {productsSell.map((element, i) => (
                                        <tr key={i}>
                                            <td>{element.codigo}</td>
                                            <td>{element.descricao}</td>
                                            <td>{element.quantidade}</td>
                                            <td>R$ {element.preco_unitario}</td>
                                            <td>R$ {element.preco_total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='margin-top'
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '33% 33% 33%',
                            gridGap: '10px'
                        }}>
                        <div className="input-block">
                            <label htmlFor="total">Total à pagar</label>
                            <input type="text" name="total" readOnly value={'R$ ' + total.toFixed(2)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="valor_pago">Valor pago</label>
                            <input type="text" name="valor_pago" required value={pago} onChange={e => setPago(e.target.value)} />
                        </div>
                        <div className="input-block">
                            <label htmlFor="valor_troco">Valor do troco</label>
                            <input type="text" name="valor_troco" readOnly value={'R$ ' + troco.toFixed(2)} />
                        </div>
                    </div>
                    <div className='margin-top' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '10px' }}>
                        <input type="submit" value="Novo" style={{ margin: '0  5px' }} />
                        <input type="submit" value="Finalizar" style={{ margin: '0 5px' }} />
                        <input type="submit" value="Cancelar" style={{ margin: '0 5px' }} />
                    </div>
                </form>
            </main>

            <main className="main-container no-visible" id='id-produtos'>
                <form>
                    <div className='row'>
                        <div className="input-block">
                            <label htmlFor="pesquisa">Pesquisar</label>
                            <input type="text" name="pesquisa" />
                        </div>
                        <div className="input-block">
                            <label htmlFor="filtro">Filtrar por</label>
                            <select name="filtro">
                                <option value="Código">Código</option>
                                <option value="Descricao">Descricao</option>
                            </select>
                        </div>
                        <input type="submit" value="Procurar" />
                    </div>
                </form>
                <hr className='margin-top'></hr>
                <div className='margin-top'>
                    <p>Produtos</p>
                    <div className='overflow-y' style={{ maxHeight: '400px' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descrição</th>
                                    <th>Preço unitário (R$) </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productsAll.map((element, i) => (
                                    <tr key={i}>
                                        <td>{element.codigo}</td>
                                        <td>{element.descricao}</td>
                                        <td>R$ {element.preco_unitario}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default Dashboard;

window.onload = function () {
    const buttons = document.querySelectorAll('.btn-menu')
    if (buttons.length) {
        buttons[0].onclick = function () {
            changeButton(buttons, this);
            changeMain(this.textContent);
        }
        buttons[1].onclick = function () {
            changeButton(buttons, this);
            changeMain(this.textContent);
        }
        buttons[2].onclick = function () {
            changeButton(buttons, this);
            changeMain(this.textContent);
        }
    }
}

function changeMain(strNewScreen) {
    switch (strNewScreen.toUpperCase()) {
        case 'VENDA': {
            document.getElementById('id-venda').className = 'main-container visible'
            document.getElementById('id-produtos').className = 'main-container no-visible'
            break;
        }
        case 'PRODUTOS': {
            document.getElementById('id-venda').className = 'main-container no-visible'
            document.getElementById('id-produtos').className = 'main-container visible'
            break;
        }
        case 'SAIR': {
            break;
        }
        default: {
            break;
        }
    }
}

function changeButton(buttons, newButton) {

    buttons.forEach(element => {
        element.className = 'btn-menu'
        if (element.textContent === newButton.textContent) {
            element.className = 'btn-menu ativo'
        }
    });
}