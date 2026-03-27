import type { TaskModel } from "../../models/TaskModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
  COUNT_DONW = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
}

export type TaskActionsWithPayload =
  | {
  type: TaskActionTypes.START_TASK,
  payload: TaskModel;
  } 
  | {
  type: TaskActionTypes.COUNT_DONW,
  payload: {secondsRemaining: number};
  } ;



  export type TaskActionsWithoutPayload =
  | { type: TaskActionTypes.RESET_TASK; }
  | { type: TaskActionTypes.INTERRUPT_TASK; }
  | { type: TaskActionTypes.COMPLETE_TASK; };

export type TaskActionModel = 
  | TaskActionsWithPayload
  | TaskActionsWithoutPayload ; 