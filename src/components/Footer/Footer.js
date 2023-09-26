import './Footer.css';
import github from './github.png'
 const Footer= ()=> {
    return(
        <div className='footer'>Made By ❤️ Sonali Gadekar 
        <a href='https://github.com/sonaligadekar20/Daily-Task-Minder' target='blank'> <img src={github} className='github-logo'alt='github-logo'/></a>   
        </div>
    )

 }
 export default Footer;