import Navbar from '../components/navbar/navbar';
import WhatsAppWiper from '../components/whatsappwiper/whatsappwiper';
import InstagramWiper from '../components/Instagramwiper/Instagramwiper';
import ContainerVoluntario from '../components/containervoluntario/containervoluntario';

export default function sejavoluntario() {
  return (
    <>
      <InstagramWiper />
      <WhatsAppWiper />
      <Navbar />
      <ContainerVoluntario />
    </>
  );
}
