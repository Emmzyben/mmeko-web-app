"use client"

import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

const socket = io('http://localhost:3000');

const VideoCall: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<SimplePeer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
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
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
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
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peerRef.current = peer;
  };

  return (
    <div>
      <h2>Video Call</h2>
      <video ref={myVideo} autoPlay muted />
      <video ref={userVideo} autoPlay />
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
