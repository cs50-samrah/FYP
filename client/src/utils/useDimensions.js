import React from 'react';

const useDimesions = ()=>{
    const [width , setWidth] = React.useState(0);
    const [height , setHeigth] = React.useState(0);
    const [isMobile , setMobile] = React.useState(false);

    React.useEffect(()=>{
        setWidth(window.innerWidth)
        setHeigth(window.innerHeight)
        window.addEventListener('resize' , ()=>{
            setWidth(window.innerWidth)
            setHeigth(window.innerHeight)
         })
    },[])
    
    React.useEffect(()=>{
         setMobile(width <= 768)
    },[width])

    return [width , height , isMobile];
}

export default useDimesions