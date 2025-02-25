import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const EditarGenero = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        axios.get('/api/genres/' + match.params.id)
            .then(res => {
                setName(res.data.name)
            })
    }, [match.params.id])

    const onChange = e => {
        setName(e.target.value)
    }

    const save = () => {
        axios.put('/api/genres/' + match.params.id, {
            name: name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    if (success) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='container'>
            <h1>Editar Gênero</h1>
            <form>
                <div className='form-group'>
                    <label htmlFor='name'>Nome</label>
                    <input type='text' value={name} onChange={onChange} className='form-control' id='name' aria-describedby='nameHelp' placeholder='Nome do Genêro' />
                </div>
            </form>
            <button type="button" onClick={save} className="btn btn-primary">Salvar</button>
        </div>
    )
}

export default EditarGenero