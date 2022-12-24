import { Header, Container } from '@mantine/core';
import Image from 'next/image';
import youtubeLogo from '../../public/youtube-logo.svg';

const CustomHeader: React.FC = () => {
  return (
    <Header className="w-full" height={60} mb={120}>
      <Container
        fluid
        className="flex items-center justify-center sm:justify-start h-full"
      >
        <div className="flex gap-2 items-center">
          <Image src={youtubeLogo} width="36" alt="Youtube Logo" />
          <h1 className="text-xl m-0">Youtube Video Converter</h1>
        </div>
      </Container>
    </Header>
  );
};

export default CustomHeader;
