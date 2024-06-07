"use client"

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3000');

const AudioCall: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const myAudio = useRef<HTMLAudioElement>(null);
  const userAudio = useRef<HTMLAudioElement>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      setStream(stream);
      if (myAudio.current) {
        myAudio.current.srcObject = stream;
      }
    });

    socket.on('call', (data) => {
      if (data.signal) {
        const peer = new SimplePeer({
          initiator: false,
          trickle: false,
          stream: stream!,
        });

        peer.on('signal', (signal) => {
          socket.emit('call', { signal });
        });

        peer.on('stream', (stream) => {
          if (userAudio.current) {
            userAudio.current.srcObject = stream;
          }
        });

        peer.signal(data.signal);
        peerRef.current = peer;
      }
    });
  }, [stream]);

  const startCall = () => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream!,
    });

    peer.on('signal', (signal) => {
      socket.emit('call', { signal });
    });

    peer.on('stream', (stream) => {
      if (userAudio.current) {
        userAudio.current.srcObject = stream;
      }
    });

    peerRef.current = peer;
  };

  return (
    <div>
      <h2>Audio Call</h2>
      <audio ref={myAudio} autoPlay muted />
      <audio ref={userAudio} autoPlay />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default AudioCall;
