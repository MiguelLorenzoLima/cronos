import { TrashIcon } from "lucide-react";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { MainTemplate } from "../../templates/MainTemplate";
import { DefaultButton } from "../../components/DefaultButton";

import styles from './style.module.css';


export function History() {

  return(
    
      <MainTemplate> 

        <Container>
          <Heading>
            <span>History</span>
            <span>
              <DefaultButton icon={<TrashIcon />} />
            </span>
            </Heading>
        </Container>

        <Container>
          <div className="responsiveTable">
            asidjfhalksjhdflakjshdflk
          </div>
        </Container>

      </MainTemplate>
   );
}


