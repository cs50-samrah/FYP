
import Text from "../Text";
import Box from "../Box";
import useDimesions from "../../utils/useDimensions";

const Footer = () => {
  const [width, height, isMobile] = useDimesions();
  return <Box
       mt={isMobile ? 80 : 10}
    className={'footer'}
    bg={"#F7F3F0"}
  >
    <Box display={'flex'} flexWrap={isMobile ? 'wrap' : null} padding={15} >
      <Box w={isMobile ? '100%' : '25%'} mt={isMobile ? '2em' : null} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <Text>COMPANY</Text>
        <ul>
          <li>About Kids Good Hub</li>
          <li>Our Experts</li>
          <li>Service & Prices</li>
          <li>Latest News</li>
          <li>FAQ's</li>
        </ul>
      </Box>
      <Box w={isMobile ? '100%' : '25%'} mt={isMobile ? '1em' : null} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <Text>CUSTOMERS</Text>
        <ul>
          <li>Read Our Advice</li>
          <li>Get in Touch</li>
          <li>Online Store</li>
          <li>Terms & Conditions</li>
          <li>Ask Away</li>
        </ul>
      </Box>
      <Box w={isMobile ? '100%' : '25%'} mt={isMobile ? '1em' : null} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >
        <Text>SOCIAL MEDIA</Text>
        <ul>
          <li>Twitter (X)</li>
          <li>FaceBook</li>
          <li>Instagram</li>
          <li>Pinterest</li>
        </ul>
      </Box>
      <Box w={isMobile ? '100%' : '25%'} mt={isMobile ? '1em' : null} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >

        <Text>CONTACTS</Text>
        <ul>
          <li>(021) 905 678 908</li>
          <li>(021) 865 749 907</li>
          <li>info@kidsgoodshub.com</li>
          <li>www.kidsgoodshub.com</li>
        </ul>
      </Box>
    </Box>
    <Text ml={'1em'} fontFamily={'Kids'} color={'var(--text-orange)'} fontSize={'3em'} >Kids Good Hub</Text>
  </Box>
}

export default Footer