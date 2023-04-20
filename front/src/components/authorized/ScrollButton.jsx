import React, {useState} from 'react';
  
const ScrollButton = () =>{
  
  const [visible, setVisible] = useState(false)
  
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    const width = document.documentElement.clientWidth;
    if (scrolled > 300 && width > 767){
      setVisible(true)
    } 
    else if (scrolled <= 300){
      setVisible(false)
    }
  };
  
  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  
  window.addEventListener('scroll', toggleVisible);
  
  return (
    <button type="button" onClick={scrollToTop} className="btn btn-outline-light" style={{display: visible ? 'inline' : 'none'}}>Наверх</button>
  );
}
  
export default ScrollButton;