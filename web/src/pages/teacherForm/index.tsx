import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import api from '../../services/api';
import PageHeader from '../../components/pageHeader';
import Input from '../../components/input';
import Textarea from '../../components/textarea';
import Select from '../../components/select';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css'




function TeacherForm() {
    const history = useHistory(); 

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [wpp, setWpp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [price, setPrice] = useState('');



    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, start: '', end: '' }
    ]);

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, start: '', end: '' }
        ]);
    }

    function setScheduleItemsValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem

        })
        setScheduleItems(updateScheduleItems);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            wpp,
            bio,
            subject,
            price: Number(price),
            schedule: scheduleItems
        }).then(() => {
            alert('Aula cadastrada com sucesso');

            history.push('/');
        }).catch(() => {
            alert('Error no cadastro de aula, tente novamente!')
        })

        console.log({
            name,
            avatar,
            wpp,
            bio,
            subject,
            price,
            scheduleItems
        });
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />

                        <Input
                            name="wpp"
                            label="Whatsapp"
                            value={wpp}
                            onChange={(e) => { setWpp(e.target.value) }}
                        />

                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Disciplina"
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Química', label: 'Química' },
                                { value: 'Português', label: 'Português' }
                            ]}
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                        />

                        <Input
                            name="price"
                            label="Custo da sua hora por aula"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemsValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domingo' },
                                            { value: '1', label: 'Segunda-feria' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                        ]} />

                                    <Input
                                        name="start"
                                        label="Hora de início da aula"
                                        type="time"
                                        value={scheduleItem.start}
                                        onChange={e => setScheduleItemsValue(index, 'start', e.target.value)}
                                    />

                                    <Input
                                        name="end"
                                        label="Hora do término da aula"
                                        type="time"
                                        value={scheduleItem.end}
                                        onChange={e => setScheduleItemsValue(index, 'end', e.target.value)}
                                    />
                                </div>
                            )
                        })}




                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Alerta" />
                        Importante! <br />
                        Preencha todos os dados.
                    </p>
                        <button type="submit">Enviar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )

}
export default TeacherForm;