import React from 'react';

function Register() {
    return (
        <div className='container'>
            <p><strong>Cadastro</strong></p>
            <form>
                <div className='input-block'>
                    <label htmlFor='user'>Usuário</label>
                    <input type='text' name='user' />
                </div>

                <div className='input-block'>
                    <label htmlFor='password'>Senha</label>
                    <input type='password' name='password' />
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