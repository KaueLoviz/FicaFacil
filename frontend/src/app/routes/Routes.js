import React from 'react';

// Components 
import Main from '../components/Main/Main';
import FormularioQuestao from '../components/Main/FormularioQuestao';
import FormularioAreaMateria from '../components/Main/FormularioAreaMateria';
import FormularioMateria from '../components/Main/FormularioMateria';
import FormularioAssuntoMateria from '../components/Main/FormularioAssuntoMateria';
import FormularioUniversidade from '../components/Main/FormularioUniversidade';
import FormularioDificuldade from '../components/Main/FormularioDificuldade';
import FormularioResposta from '../components/Main/FormularioResposta';
import FormularioSugestaoVideo from '../components/Main/FormularioSugestaoVideo';
import { Route } from 'react-router-dom';


export default function Routes() {

    return (
        <>
            <Route exact path='/'>
                <h1>ola mundo</h1>
            </Route>
            <Route path='/questao'>
                <Main>
                    <FormularioQuestao />
                </Main>
            </Route>
            <Route path='/areamateria'>
                <Main>
                    <FormularioAreaMateria />
                </Main>
            </Route>
            <Route path='/materia'>
                <Main>
                    <FormularioMateria />
                </Main>
            </Route>
            <Route path='/assuntomateria'>
                <Main>
                    <FormularioAssuntoMateria />
                </Main>
            </Route>
            <Route path='/universidade'>
                <Main>
                    <FormularioUniversidade />
                </Main>
            </Route>
            <Route path='/dificuldade'>
                <Main>
                    <FormularioDificuldade />
                </Main>
            </Route>
            <Route path='/resposta'>
                <Main>
                    <FormularioResposta />
                </Main>
            </Route>
            <Route path='/sugestaoVideo'>
                <Main>
                    <FormularioSugestaoVideo />
                </Main>
            </Route>
           
        </>
    );
}