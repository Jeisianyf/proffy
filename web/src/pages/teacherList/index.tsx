import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/pageHeader';
import TeacherItem, {Teacher} from '../../components/teacherItem';
import Select from '../../components/select';
import api from '../../services/api';

import './styles.css';
import Input from '../../components/input';

import searchIcon from '../../assets/images/icons/search.svg';


function TeacherList() {
    const [teachersCard, setTeachersCard] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        setTeachersCard(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis:">
                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select
                        name="subject"
                        label="Disciplina"
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Português', label: 'Português' }
                        ]} />

                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => { setWeek_day(e.target.value) }}
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
                        type="time"
                        name="time"
                        label="Hora"
                        value={time}
                        onChange={e => { setTime(e.target.value) }}
                    />

                    <button type="submit" onClick={searchTeachers}>
                        <img src={searchIcon} alt="Filtrar" />
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachersCard.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}/>
                })}
            </main>
        </div>
    )
}

export default TeacherList;