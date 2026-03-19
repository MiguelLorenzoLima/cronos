import { PlayCircleIcon } from "lucide-react";
import { DefaultButton } from "../DefaultButton";
import { Cycles } from "../Cycles";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinuts } from "../../utils/formatSecondsToMinutes";


export function MainForm(){

  const {state, setState} = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  
  //proximo ciclo
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    console.log(taskName);

    if (!taskName){
      alert("Digite o nome da tarefa");
       return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration*60;

    setState(prevState => {
      return{
        ...prevState,
        config: {...prevState.config },
        activeTask:newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinuts(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      }
    })

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