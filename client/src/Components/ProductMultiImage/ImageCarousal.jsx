import useDimesions from "../../utils/useDimensions"
import Box from "../Box"
import { BACKEND_URL } from "../../utils/constant";
import { useEffect, useState } from "react";



export default function ImageCarousal({ product }) {
    const [, , isMobile] = useDimesions();
    const [imageSelected, setImageSelected] = useState(`${BACKEND_URL}${product?.thumbnail}`);
    console.log(`${BACKEND_URL}${product?.thumbnail}`)
    useEffect(()=>{
        if(product && product.thumbnail){
            console.log(product)
            setImageSelected(`${BACKEND_URL}${product?.thumbnail}`)
        }
    },[])
    return <Box w={isMobile ? '100%' : '40%'} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}  >
        <Box style={isMobile && { overflowX: 'scroll' }} w={isMobile ? '100%' : '30%'} display={'flex'} justifyContent={'center'} flexDirection={isMobile ? 'row' : 'column'} padding={8}>
            {product?.images && product?.images.map(image => {
                return <img src={`${BACKEND_URL}${image}`}
                    style={{ margin: '4px', borderRadius: 12, border: '1px solid gray', width: '60%' }}
                    onClick={() => setImageSelected(`${BACKEND_URL}${image}`)}
                />
            })}

        </Box>
        <Box w={isMobile ? '100%' : '70%'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <img src={imageSelected} style={{ margin: '4px', borderRadius: 12, width: '100%', height: '70%', border: '1px solid gray' }} />
        </Box>
    </Box>
}