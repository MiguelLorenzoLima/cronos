import { useTaskContext } from "../../Contexts/TaskContext/useTaskContext";
import { getNextCycle } from "../../utils/getNextCycle";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips(){
    const {state} = useTaskContext();
   const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);
  

    const tipsForWhenActiveTask ={
    workTime: <span>Foque por {state.config.workTime} min.</span>,
    shortBreakTime: <span>Descanse por {state.config.shortBreakTime} min.</span>,
    longBreakTime: <span>Descanso longo</span>
  } 

  const tipsForNoActiveTask ={
    workTime: <span>O próximo cilco é {state.config.workTime} min.</span>,
    shortBreakTime: <span>O próximo ciclo é de {state.config.shortBreakTime}</span>,
    longBreakTime: <span>O próximo será um descanso longo</span>
  } 

  return(
  <>
    {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
    {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
  </>
  );
}