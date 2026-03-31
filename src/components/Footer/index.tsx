import styles from './styles.module.css';
import { RouterLink } from '../RouterLink';


export function Footer(){
    return( 
    <footer className={styles.footer}>
        <RouterLink href="/about-pomodoro/">entenda como funciona a técnica pomodoro</RouterLink>
        <RouterLink href='/'>Cronos Pomodoro &copy; {new Date().getFullYear()}</RouterLink>        
    </footer>
    )
}