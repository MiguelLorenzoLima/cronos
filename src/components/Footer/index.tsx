import { Link } from 'react-router';
import styles from './styles.module.css';


export function Footer(){
    return( 
    <footer className={styles.footer}>
        <Link to="/about-pomodoro/">entenda como funciona a técnica pomodoro</Link>
        <Link to='/'>Cronos Pomodoro &copy; {new Date().getFullYear()}</Link>        
    </footer>
    )
}