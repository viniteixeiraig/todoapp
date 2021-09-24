import { FormEvent, useState, useEffect } from 'react'

import toast, { Toaster } from 'react-hot-toast';

import update from 'react-addons-update';

import { MdDelete } from 'react-icons/md';


import './styles.scss'

type listType = {
    id: number,
    value: string,
    isChecked: boolean
}

export function Home() {

    const [ tarefa, setTarefa ] = useState('');
    const [ id, setId ] = useState(0);
    const [ list, setList ] = useState<listType[]>([]);

    useEffect(() => {
        
    }, [ list ])

    async function handleAddToList(event: FormEvent) {
        event.preventDefault();

        if (tarefa.trim() === '') {
            toast.error("Preencha o campo do formlário!");
            return;
        }     
        
        await setList([...list, {
            "id": id+1,
            "value": tarefa, 
            "isChecked": false
        }])   
        
        toast.success("Sucesso ao adicionar tarefa!");

        setId(id+1)
        setTarefa('');
    }

    // Função para checar item
    async function handleCheckItem(idItem : number) {
        if( idItem ) {

            const updatedTodos = [...list].map((item) => {
                if(item.id === idItem) {
                    item.isChecked = !item.isChecked;
                }

                return item;
            })

            setList(updatedTodos)

            toast.success("Item atualizado!");

        }
    }

    // Função para deletar item
    async function handleDeleteItem(idItem : number) {
        if( idItem ) {
            const deletedTodos = [...list].filter((item) => item.id !== idItem)

            setList(deletedTodos)
        }
    }

    return(
        <div id="page-home">
            <div>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <aside>
                <form onSubmit={handleAddToList}>
                    <h1>Todo List</h1>
                    <input 
                        type="text" 
                        placeholder="Tarefas"
                        onChange={ event => setTarefa(event.target.value) }
                        value={ tarefa }
                    />
                    <button type="submit">Enviar</button>
                </form>
            </aside>
            <main>
                <ul id="lista">
                    { list.map(campo => {
                        return (
                            <ol>
                                <input type="checkbox" defaultChecked={campo.isChecked} onClick={() => handleCheckItem(campo.id)} />
                                <label className={`${campo.isChecked ? 'checked' : ''}`}>{campo.value}</label>
                                { campo.isChecked === true ? <button onClick={() => handleDeleteItem(campo.id)}><MdDelete /></button> : ''}
                            </ol>
                        )
                    }) }
                </ul>
            </main>
        </div>
    )
}