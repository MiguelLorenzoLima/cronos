import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
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
    });

  }

  function handleInterruptTask() {
    setState(prevState => {
      return{
        ...prevState,
        activeTask:null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: prevState.tasks.map(task =>{
          if (prevState.activeTask && prevState.activeTask.id === task.id){
            return { ...task , interruptDate: Date.now()};
          }
          return task;
        }),
      };
    });
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
            disabled={!!state.activeTask}
            />
          </div>
        
           <div className="formRow">
            <p>O próximo intervalo é de 25 min.</p>
          </div>

         {state.currentCycle > 0 && ( 
            <div className="formRow">
             <Cycles />
            </div>   
         )}
    

          <div className='formRow'>

            {!state.activeTask ? (
              <DefaultButton 
              aria-label="Iniciar nova tarefa" 
              title="Iniciar nova tarefa" 
              type="submit" 
              key='Este é o botão pra enviar'
              icon={<PlayCircleIcon/>} />
              ) :
              <DefaultButton 
              aria-label="Interromper a tarefa" 
              title="Interromper a tarefa" 
              type="button" 
              color="red" 
              key='Esse é pra parar a contagem'
              onClick={handleInterruptTask}
              icon={<StopCircleIcon/>} 
              />
              }
            
           
          </div>
        </form>
  )
}