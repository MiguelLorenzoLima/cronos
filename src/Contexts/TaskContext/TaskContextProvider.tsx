import { useEffect, useReducer} from "react";
import { initialTaskState } from "./initialTaskContext";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerMenager } from "../../workers/timerWorkeMenager";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({children}:TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  const worker = TimerWorkerMenager.getInstance();

  worker.onmessage(e => {
    const countDownSeconds = e.data
    console.log (countDownSeconds);

    if(countDownSeconds <= 0){
      console.log('Worker COMPLETED');
      worker.terminate();
    }
  });


  useEffect(()=>{
    if(!state.activeTask){
    console.log('Worker encerrado por falta de Active Task');
    worker.terminate();
    }

    worker.postMessage(state);
}, [worker, state]);

  return( 
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
}
