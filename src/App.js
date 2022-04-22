import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import schema from './schema';
import './App.css';

function App() {
  function onSubmit(values, actions) {
    console.log('SUBMIT', values);
  }

  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, '');

    if (cep?.length !== 8) {
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue('bairro', data.bairro);
        setFieldValue('cidade', data.localidade);
        setFieldValue('logradouro', data.logradouro);
        setFieldValue('uf', data.uf);
      });
  }

  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{
          name: '',
          email: '',
        }}
        render={({ isValid, setFieldValue }) => (
          <Form>

            <div className='form-control-group'>
              <label>Nome</label>
              <Field name="name" type="text" />
              <ErrorMessage name="name" />
            </div>
            <div className='form-control-group'>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" />
            </div>

            <div className='form-control-group'>
              <label>Cep</label>
              <Field name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
            </div>

            <div className='form-control-group'>
              <label>Logradouro</label>
              <Field name="logradouro" type="text" />
            </div>

            <div className='form-control-group'>
              <label>Número</label>
              <Field name="numero" type="text" />
            </div>

            <div className='form-control-group'>
              <label>Complemento</label>
              <Field name="complemento" type="text" />
            </div>

            <div className='form-control-group'>
              <label>Bairro</label>
              <Field name="bairro" type="text" />
            </div>

            <div className='form-control-group'>
              <label>Cidade</label>
              <Field name="cidade" type="text" />
            </div>

            <div className='form-control-group'>
              <label>Estado</label>
              <Field component="select" name="uf">
                <option value={"null"}>Selecione o Estado</option>
                <option value="SP">São Paulo</option>
                <option value="SC">Santa Catarina</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
              </Field>
            </div>
            <button type="submit" disabled={!isValid}>Enviar</button>
          </Form>
        )}
      />
    </div>
  );
}

export default App;
