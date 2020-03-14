import React, { useState } from 'react';
import api from '../api';
function Login({ history }) {

  const [formData, setFormData] = useState({ usuario, senha });

  function handleLogin(e) {
    e.preventDefault();
    api.post('login', { usuario: formData.usuario, senha: formData.senha }).then(response => {
      if (response.status === 200) history.push('/dashboard')
      else console.log(response.statusText)
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <div className='container'>
      <p><strong>Bem-vindo ao<br /> + Venda</strong></p>
      <form onSubmit={handleLogin}>
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