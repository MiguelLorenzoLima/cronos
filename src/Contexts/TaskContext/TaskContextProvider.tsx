import { useEffect, useReducer, useRef} from "react";
import { initialTaskState } from "./initialTaskContext";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerMenager } from "../../workers/timerWorkeMenager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from '../../utils/loadBeep';
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({children}:TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
  const storageState = localStorage.getItem('state');

  if (storageState === null) return initialTaskState;

  const parsedStorageState =  JSON.parse(storageState) as TaskStateModel;

  return{ 
  ...parsedStorageState,
  activeTask: null,
  secondsRemaining: 0,
  formattedSecondsRemaining: '00:00',  
  };
  });


  const playBeepRef = useRef<ReturnType<typeof loadBeep> | null>(null); //nulo é pra saber se o áudio ja tocou ou não | ref é pra não renderizar e perder os valores

  const worker = TimerWorkerMenager.getInstance();

   
  // eslint-disable-next-line react-hooks/refs
  worker.onmessage(e => {
    const countDownSeconds = e.data
    console.log (countDownSeconds);

    if(countDownSeconds <= 0){
      if(playBeepRef.current){
        playBeepRef.current();
        playBeepRef.current = null;
      }

      dispatch({
        type: TaskActionTypes.COMPLETE_TASK,
      });
      worker.terminate();
    }else{
      dispatch({
        type: TaskActionTypes.COUNT_DOWN,
        payload: { secondsRemaining: countDownSeconds },
      });
    }
  });


  useEffect(()=>{
    localStorage.setItem('state', JSON.stringify(state));

    if(!state.activeTask){
    worker.terminate();
    }
    document.title = `${state.formattedSecondsRemaining} - Cronos`;

    worker.postMessage(state);
}, [worker, state]);

  useEffect(()=>{
     if (state.activeTask && playBeepRef.current === null){
      playBeepRef.current = loadBeep();
     }else{
        playBeepRef.current = null;
     }
  }, [state.activeTask]);

  return( 
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
}
