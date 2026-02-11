
import { useState } from 'react';
import styles from './styles.module.css';
import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from 'lucide-react';

type AvailableThemes = 'dark' | 'light';

export function Menu(){

    const [theme, setTheme] = useState<AvailableThemes>('dark');
    function handleThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) {
      event.preventDefault();//ele não vai seguir o link do href solzinho  

      setTheme(prevTheme => {
        const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
        return nextTheme;
      });
      
    }


    return( 
    <nav className={styles.menu}>
        <h1>{theme}</h1>

        <a className={styles.menuLink} href="#" aria-label='ir para a Home' title='Ir para a Home'>
            <HouseIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label='ir para a Histórico' title='Ir para o Hitórico'>
            <HistoryIcon />
        </a>

            <a className={styles.menuLink} href="#" aria-label='ir para a Configurações' title='Ir para as Configurações'>
            <SettingsIcon />
        </a>

        <a className={styles.menuLink} href="#" aria-label='mudar a cor do tema' title='mudar a cor do Tema' onClick={handleThemeChange} >
            <SunIcon />
        </a>
    </nav>
    );
}