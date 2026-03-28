import { TaskContextProvider } from './Contexts/TaskContext/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer';
import { MainRouter } from './Routers/MainRouter';

import './styles/theme.css';
import './styles/global.css';

export function App(){
  return (
    <TaskContextProvider>
      <MessagesContainer>
       <MainRouter />
      </MessagesContainer> 
    </TaskContextProvider>
 
);
}


