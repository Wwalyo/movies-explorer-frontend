import './Footer.css';


function Footer() {

    return (
      <footer className="Footer">
        <h6 className="Footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h6>
        <hr className="Footer__line"></hr>  
        <div className="Footer__main"> 
          <div className="Footer__nav">          
            <a href="https://praktikum.yandex.ru/" className="Footer__link">Яндекс.Практикум</a> 
            <a href="https://github.com/Wwalyo" className="Footer__link">Github</a>    
            <a href="https://www.facebook.com/alyona.19892209" className="Footer__link">Facebook</a>        
          </div>
          <p className="Footer__copyright">&copy;2020</p>     
        </div>        
      </footer>
    )
  }
  
  export default Footer;