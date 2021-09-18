import React, { useState, Fragment, useRef, useEffect } from "react";
import axios from 'axios';
import { Input, Button, Select, MenuItem, Table } from '../Form';
import { FaUser, FaImages, FaFont } from 'react-icons/fa';
import { AlertError, AlertSuccess } from '../Alert/Modal';

export default function FormularioQuestao () {

    const [ selectUniversidade, setselectUniversidade ] = useState(0);
    const [ selectAssuntoMateria, setselectAssuntoMateria ] = useState(0);
    const [ selectDificuldade, setselectDificuldade ] = useState(0);
    const [ selectAdministrador, setselectAdministrador ] = useState(0);

    const refTitulo = useRef(null);
    const refTexto = useRef(null);
    const refImage = useRef(null);
    const refSelectUniversidade = useRef(null);
    const refSelectAssuntoMateria = useRef(null);
    const refSelectDificuldade = useRef(null);
    const refSelectAdministrador = useRef(null);

    const [ universidades, setUniversidades ] = useState(null);
    const [ assuntoMaterias, setAssuntoMaterias ] = useState(null);
    const [ dificuldades, setDificuldades ] = useState(null);
    const [ adms, setAdms ] = useState(null);
    const [ Questoes, setQuestoes ] = useState([]);

    const [ ErroTitulo, setErroTitulo ] = useState(null);
    const [ ErroTexto, setErroTexto ] = useState(null);
    const [ ErroUniversidade, setErroUniversidade ] = useState(null);
    const [ ErroAssuntoMateria, setErroAssuntoMateria ] = useState(null);
    const [ ErroDificuldade, setErroDificuldade ] = useState(null);
    const [ ErroAdministrador, setErroAdministrador ] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(data => setUniversidades(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/dificuldade/index/')
            .then(data => setDificuldades(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/assuntoMateria/index/')
            .then(data => setAssuntoMaterias(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/administrador/index/')
            .then(data => setAdms(data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/questao/index/8/')
            .then(data => {
                let imagens = JSON.parse(data.data.data[ 0 ].imagensQuestao);
                setQuestoes(imagens[ 0 ]);
            })
            .catch(error => console.error(error));


    }, []);

    const submitForm = (e) => {
        e.preventDefault();

        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);

        axios.post(`${process.env.REACT_APP_API}/questao/create/`, formData)
            .then(val => {
                console.log(val.data);
            });

        let inputs = [
            refTitulo.current.value,
            refTexto.current.value,
            refImage.current.value
        ];

        let errorMsg = 'O campo precisa ter mais de 4 caracteres';

        // Seta erro nos input's contidos na questão
        if (refTitulo.current.value.length < 4) setErroTitulo(errorMsg);
        else setErroTitulo(null);

        if (refTexto.current.value.length < 4) setErroTexto(errorMsg);
        else setErroTexto(null);

        // Seta erro nos select's contidos na questão
        if (selectUniversidade === 0) setErroUniversidade('Selecione uma Universidade');
        else setErroUniversidade(null);


        if (selectDificuldade === 0) setErroDificuldade('Selecione uma Dificuldade');
        else setErroDificuldade(null);

        if (selectAssuntoMateria === 0) setErroAssuntoMateria('Selecione um Assunto Matéria');
        else setErroAssuntoMateria(null);

        if (selectAdministrador === 0) setErroAdministrador('Selecione um Administrador');
        else setErroAdministrador(null);

        // Verificação geral
        if (inputs.every(ipt => ipt.trim().length > 4) && selectUniversidade !== 0 && selectAssuntoMateria !== 0 && selectDificuldade !== 0 && selectAdministrador !== 0)
        {
            axios.post(`${process.env.REACT_APP_API}/questao/create/`, formData)

                .then(function (parametro) {
                    refTitulo.current.value = '';
                    refTexto.current.value = '';
                    refImage.current.value = '';
                    setselectUniversidade(0);
                    setselectDificuldade(0);
                    setselectAssuntoMateria(0);
                    setselectAdministrador(0);
                    AlertSuccess({ text: "Questão inserida com sucesso", title: 'Sucesso...' });
                })
                .catch(function (err) {
                    AlertError({});
                });
            console.log('Pode passar!');
        } else console.log('Não pode passar!');
    };

    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Titulo: *' id='titulo' name='titulo' type='text' error={ ErroTitulo } ref={ refTitulo } icon={ <FaUser /> } inputMode='text' />
                <Input title='Texto: *' id='texto' name='texto' type='text' error={ ErroTexto } ref={ refTexto } icon={ <FaFont /> } inputMode='text' />
                <Input title='Imagens:' id='image' accept='image/*' name='images[]' multiple={ true } ref={ refImage } type='file' icon={ <FaImages /> } />
                <Select label='Universidades: *' id='universidade' name='universidade' error={ ErroUniversidade } ref={ refSelectUniversidade }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectUniversidade(e.target.value);
                    } }
                    value={ selectUniversidade }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { universidades && universidades.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idUniversidade' ] }>{ el[ 'nomeUniversidade' ] }</MenuItem>
                    ) }
                </Select>
                <Select label='Dificuldades: *' id='dificuldades' name='dificuldade' error={ ErroDificuldade } ref={ refSelectDificuldade }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectDificuldade(e.target.value);
                    } }
                    value={ selectDificuldade }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { dificuldades && dificuldades.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idDificuldade' ] }>{ el[ 'nivelDificuldade' ] }</MenuItem>
                    ) }
                </Select>

                <Select label='Assunto Matéria: *' id='assuntoMateria' name='assuntoMateria' error={ ErroAssuntoMateria } ref={ refSelectAssuntoMateria }
                    onChange={ e => {
                        // console.log(e.target);
                        setselectAssuntoMateria(e.target.value);
                    } }
                    value={ selectAssuntoMateria }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { assuntoMaterias && assuntoMaterias.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idAssuntoMateria' ] }>{ el[ 'nomeAssuntoMateria' ] }</MenuItem>
                    ) }
                </Select>
                <Select label='Administrador: *' id='administrador' name='administrador' error={ ErroAdministrador } ref={ refSelectAdministrador }
                    onChange={ e => {
                        setselectAdministrador(e.target.value);
                    } }
                    value={ selectAdministrador }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { adms && adms.data.map((el, i) =>
                        <MenuItem key={ i } value={ el[ 'idAdministrador' ] }>{ el[ 'nomeAdministrador' ] }</MenuItem>
                    ) }
                </Select>
                <Button type='submit' styleButton={ { marginTop: 30 } }>Enviar</Button>
            </form>
            <img src={ Questoes } />

        </Fragment >
    );
}