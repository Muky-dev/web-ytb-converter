import { useEffect, useState } from 'react';
import { Button, Container, Image, Input } from '@mantine/core';
import { io, Socket } from 'socket.io-client';

import CustomHeader from '../components/UI/header';
import axios from 'axios';

function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io('ws://localhost:3333', {
      withCredentials: true,
    });

    setSocket(socketIo);

    function cleanup() {
      socketIo.disconnect();
    }

    return cleanup;
  }, []);

  return socket;
}

const Home = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<string | null>(null);
  const [quality, setQuality] = useState<string | null>(null);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('ready-to-download', (data) => {
        setDownloadUrl(data);
      });
    }
  }, [socket]);

  const getInfo = (format: string) => {
    if (!url) return;
    const response = axios.get(url);
  };

  const handleConvert = () => {
    if (socket) {
      socket.emit('convert', {
        url: 'https://www.youtube.com/watch?v=QH2-TGUlwu4',
        quality: 18,
        format: 'mp4',
      });
    }
  };

  return (
    <>
      <CustomHeader />
      <Container className="flex justify-center">
        <div className="max-w-3xl">
          <div className="flex flex-col w-full gap-2">
            <div className="mt-4">
              <Input.Wrapper id="url" label="url">
                <Input
                  id="url"
                  radius="lg"
                  autoComplete="off"
                  onChange={(ev) => setUrl(ev.target.value)}
                  placeholder="https://youtube.com/example"
                />
              </Input.Wrapper>
            </div>
            <div className="w-full h-auto">
              <Image
                radius="md"
                src={thumbnail ? thumbnail : 'youtube-placeholder.png'}
                alt="thumbnail"
              />
            </div>

            <Input component="select" radius="lg">
              <option value="videoandaudio">Mp4</option>
              <option value="audioonly">Mp3</option>
            </Input>

            <Button radius="lg" color={'violet'} onClick={handleConvert}>
              Convert
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
