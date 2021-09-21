import axios from 'axios';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { FaFont, FaImages, FaUser } from 'react-icons/fa';
import { AlertError, AlertSuccess } from '../Alert/Modal';
import { ToastWarning } from '../Alert/Toast';
import { Button, Input, MenuItem, Select, Table } from '../Form';


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
    const [ questoes, setQuestao ] = useState([]);

    const [ ErroTitulo, setErroTitulo ] = useState(null);
    const [ ErroTexto, setErroTexto ] = useState(null);
    const [ ErroUniversidade, setErroUniversidade ] = useState(null);
    const [ ErroAssuntoMateria, setErroAssuntoMateria ] = useState(null);
    const [ ErroDificuldade, setErroDificuldade ] = useState(null);
    const [ ErroAdministrador, setErroAdministrador ] = useState(null);

    useEffect(() => {
        axios.get(process.env.REACT_APP_API + '/universidade/index/')
            .then(value => setUniversidades(value.data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/dificuldade/index/')
            .then(value => setDificuldades(value.data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/assuntoMateria/index/')
            .then(value => setAssuntoMaterias(value.data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/administrador/index/')
            .then(value => setAdms(value.data.data))
            .catch(error => console.error(error));

        axios.get(process.env.REACT_APP_API + '/questao/index/')
            .then(value => setQuestao(value.data.data))
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

        /** */
        let formulario = document.getElementById('form');
        let formData = new FormData(formulario);

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
                    if (parametro.data)
                        refTitulo.current.value = '';
                    refTexto.current.value = '';
                    refImage.current.value = '';
                    setselectUniversidade(0);
                    setselectDificuldade(0);
                    setselectAssuntoMateria(0);
                    setselectAdministrador(0);
                    AlertSuccess({ text: "Questão inserida com sucesso", title: 'Sucesso...' });

                    setTimeout(() => {
                        window.location.reload();
                    }, 4000);

                })
                .catch(function () {
                    AlertError({ text: "Ocorreram alguns erros...", title: 'Ops...' });
                });
        } else ToastWarning({ text: 'Preencha todos os campos' });
    };

    const colunas = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },
        {
            field: "questao",
            headerName: "Questão",
            width: 200,
        },
        {
            field: "titulo",
            headerName: "Titulo Questão",
            width: 200,
        },
        {
            field: "texto",
            headerName: "Texto Questão",
            width: 200,
        },
        {
            field: "imagem",
            headerName: "Imagem Questão",
            width: 200,
        },
        {
            field: "universidade",
            headerName: "Universidade",
            width: 200,
        },
        {
            field: "dificuldade",
            headerName: "Dificuldade",
            width: 200,
        },
        {
            field: "assuntoMateria",
            headerName: "Assunto Matéria",
            width: 200,
        },
        {
            field: "administrador",
            headerName: "Administrador",
            width: 200,
        }
    ];

    const linhas = questoes.questao ? questoes.questao.map(questao => {
        return {
            id: questao.idQuestao,
            titulo: questao.tituloQuestao,
            texto: questao.textoQuestao,
            imagem: questao.imagemQuestao,
            universidade: questao.universidade.filter(e => e.idUniversidade === questao.idUniversidade)[ 0 ].nomeUniversidade,
            dificuldade: questao.dificuldade.filter(e => e.idDificuldade === questao.idDificuldade)[ 0 ].nivelDificuldade,
            assuntoMateria: questao.assuntoMateria.filter(e => e.idAssuntoMateria === questao.idAssuntoMateria)[ 0 ].nomeAssuntoMateria,
            administrador: questao.administrador.filter(e => e.idAdministrador === questao.idAdministrador)[ 0 ].nomeAdministrador,
        };
    }) : null;

    return (
        <Fragment>
            <form method="post" id='form' onSubmit={ (e) => submitForm(e) } encType="multipart/form-data">
                <Input title='Titulo: *' id='titulo' name='titulo' type='text' error={ ErroTitulo } ref={ refTitulo } icon={ <FaUser /> } inputMode='text' />
                <Input title='Texto: *' id='texto' name='texto' type='text' error={ ErroTexto } ref={ refTexto } icon={ <FaFont /> } inputMode='text' />
                <Input title='Imagens:' id='image' accept='image/*' name='images[]' multiple={ true } ref={ refImage } type='file' icon={ <FaImages /> } />
                <Select label='Universidades: *' id='universidade' name='universidade' error={ ErroUniversidade } ref={ refSelectUniversidade }
                    onChange={ e => {
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
                        setselectAssuntoMateria(e.target.value);
                    } }
                    value={ selectAssuntoMateria }
                >
                    <MenuItem value={ 0 }>Selecione</MenuItem>
                    { assuntoMaterias && assuntoMaterias.data.assuntoMateria && assuntoMaterias.data.assuntoMateria.map((el, i) =>
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
            <Table colunas={ colunas } linhas={ linhas || [] } tabela='questao' />
            <img src={ Questoes } alt='Imagem' />

        </Fragment >
    );
}
