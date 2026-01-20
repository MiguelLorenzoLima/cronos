
import './styles/theme.css';
import './styles/global.css';

import { Logo } from './components/Logo';
import { Container } from './components/Container';
import { Menu } from './components/Menu';
import { CountDown } from './components/CountDown';

export function App(){

    return<>

      <Container>
        <Logo />
      </Container>  


      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <form className='form' action="">
          <div className="formRow">
            <label htmlFor="">Tarefa</label>
            <input id='meuInput' type="text" />
          </div>
        
           <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

           <div className="formRow">
            <p>CIclos</p>
            <p>0 0 0 0 0 0 </p>
          </div>       

          <div className='formRow'>
            <button>Enviar</button>
          </div>
        </form>
      </Container>
   </>
};


