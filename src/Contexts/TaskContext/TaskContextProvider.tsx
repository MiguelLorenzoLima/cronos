import { useEffect, useReducer} from "react";
import { initialTaskState } from "./initialTaskContext";
import { TaskContext } from "./taskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerMenager } from "../../workers/timerWorkeMenager";
import { TaskActionTypes } from "./taskActions";

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
      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    }else{
      dispatch({
        type: TaskActionTypes.COUNT_DONW,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });


  useEffect(()=>{

    console.log(state);
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
