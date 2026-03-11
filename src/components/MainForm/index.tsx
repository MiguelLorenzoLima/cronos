import { PlayCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";


export function MainForm(){

  const taskNameInput = useRef<HTMLInputElement>(null);
  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

  }

  return (
     <form onSubmit={handleCreateNewTask} className='form' action="">
          <div className="formRow">
            <DefaultInput 
            labelText='Digite a sua Tarefa'
            id='meuInput' 
            type='text' 
            placeholder='Digite algo' 
            ref={taskNameInput}
            />
          </div>
        
           <div className="formRow">
            <p>O próximo intervalo é de 25 min.</p>
          </div>

           <div className="formRow">
            <Cycles />
          </div>       

          <div className='formRow'>
            <DefaultButton icon={<PlayCircleIcon/>} color='green'/>
           
          </div>
        </form>
  )
}