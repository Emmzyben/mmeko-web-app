import React from 'react';
import Chat from '@/app/components/Chat';
import VideoCall from '@/app/components/VideoCall';
import AudioCall from '@/app/components/AudioCall';

const App: React.FC = () => {
  return (
    <div>
      <h1 className='head-text'>Chat and Call Application</h1>
      <Chat />
      <VideoCall />
      <AudioCall />
    </div>
  );
};

export default App;
