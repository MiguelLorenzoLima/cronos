import { Heading } from './components/Heading';

import './styles/theme.css';
import './styles/global.css';
import { TimerIcon } from 'lucide-react';

export function App(){

    return (  
   
   <>
      <Heading>
        Hello world
        
        <button>
          <TimerIcon/>
        </button>
      </Heading>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex modi enim
        quae ipsam? Repellendus placeat sint enim voluptas dolorem similique ad
        non! Culpa quidem facere recusandae, dignissimos ea iusto eligendi?
      </p>
   </>
   
    );
};


