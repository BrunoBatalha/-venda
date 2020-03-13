import React from 'react';

function Login() {
  return (
    <div className='container'>
      <p><strong>Bem-vindo ao<br /> + Venda</strong></p>
      <form>
        <div className='input-block'>
          <label htmlFor='user'>Usuário</label>
          <input type='text' name='user' />
        </div>

        <div className='input-block'>
          <label htmlFor='password'>Senha</label>
          <input type='password' name='password' />
        </div>

        <input type="submit" value="Entrar" />
      </form>
    </div>
  )
}

export default Login;