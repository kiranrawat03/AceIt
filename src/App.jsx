import { useState } from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatContainer from './components/Chat/ChatContainer';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import './styles/global.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ChatProvider>
      <div className="app-layout">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <div className="main-content">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="chat-area">
            <ChatContainer />
          </main>
        </div>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="backdrop"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </ChatProvider>
  );
}

export default App;
