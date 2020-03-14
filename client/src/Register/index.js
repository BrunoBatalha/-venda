import React, { useState } from 'react';
import api from '../api';

function Register({ history }) {

    const [formData, setFormData] = useState({ usuario: '', senha: '' })

    function handleRegister(e) {
        e.preventDefault();
        console.log(e)
        api.post('register', { usuario: formData.usuario, senha: formData.senha }).then(response => {
            if (response.status === 200) history.push('/');
            else console.log(response.statusText);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='container'>
            <p><strong>Cadastro</strong></p>
            <form onSubmit={handleRegister}>
                <div className='input-block'>
                    <label htmlFor='usuario'>Usuário</label>
                    <input type='text' name='usuario' onChange={e => setFormData({ ...formData, usuario: e.target.value })} />
                </div>

                <div className='input-block'>
                    <label htmlFor='senha'>Senha</label>
                    <input type='password' name='senha' onChange={e => setFormData({ ...formData, senha: e.target.value })} />
                </div>

                <div className='input-block'>
                    <label htmlFor='confirm_password'>Confirmar senha</label>
                    <input type='password' name='confirm_password' />
                </div>

                <input type="submit" value="Cadastrar" />
            </form>
        </div>
    );
}

export default Register;