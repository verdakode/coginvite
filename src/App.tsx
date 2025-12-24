import { useState } from 'react'

type ModalContent = {
  type: 'blog' | 'salon' | 'video' | null
  title: string
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [modalContent, setModalContent] = useState<ModalContent>({ type: null, title: '' })

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '314159') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const openModal = (type: 'blog' | 'salon' | 'video', title: string) => {
    setModalContent({ type, title })
  }

  const closeModal = () => {
    setModalContent({ type: null, title: '' })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cognition-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-cognition-blue/20 via-transparent to-cognition-green/20" />
        <div className="relative z-10 bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-cognition-blue/30 shadow-2xl max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cognition-blue to-cognition-green bg-clip-text text-transparent mb-2">
              Welcome
            </h1>
            <p className="text-gray-400">Enter the password to continue</p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-cognition-dark/80 border border-cognition-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cognition-green focus:ring-1 focus:ring-cognition-green transition-all"
              />
            </div>
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cognition-blue to-cognition-green text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen neuron-background relative">
      <div className="absolute inset-0 bg-cognition-dark/70" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="p-6 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cognition-blue to-cognition-green bg-clip-text text-transparent mb-4">
            You're Invited!
          </h1>
          <p className="text-xl text-gray-300">Click on the neurons to explore</p>
        </header>

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl h-96">
            <div
              onClick={() => openModal('blog', 'Blog Post')}
              className="clickable-neuron absolute left-[15%] top-[20%] w-32 h-32 rounded-full bg-gradient-to-br from-cognition-blue to-cognition-blue/50 flex items-center justify-center shadow-lg shadow-cognition-blue/30 border-2 border-cognition-blue/50"
            >
              <div className="text-center text-white">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="text-sm font-medium">Blog</span>
              </div>
            </div>

            <div
              onClick={() => openModal('salon', 'Opening Salon')}
              className="clickable-neuron absolute left-[50%] top-[40%] transform -translate-x-1/2 w-36 h-36 rounded-full bg-gradient-to-br from-cognition-green to-cognition-green/50 flex items-center justify-center shadow-lg shadow-cognition-green/30 border-2 border-cognition-green/50"
            >
              <div className="text-center text-white">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <span className="text-sm font-medium">Salon Chat</span>
              </div>
            </div>

            <div
              onClick={() => openModal('video', 'Video')}
              className="clickable-neuron absolute right-[15%] top-[25%] w-32 h-32 rounded-full bg-gradient-to-br from-cognition-blue via-cognition-green to-cognition-blue flex items-center justify-center shadow-lg shadow-cognition-blue/30 border-2 border-cognition-green/50"
            >
              <div className="text-center text-white">
                <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Video</span>
              </div>
            </div>

            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
              <line x1="20%" y1="35%" x2="45%" y2="50%" stroke="url(#gradient1)" strokeWidth="2" opacity="0.5" />
              <line x1="55%" y1="50%" x2="80%" y2="40%" stroke="url(#gradient2)" strokeWidth="2" opacity="0.5" />
              <line x1="25%" y1="40%" x2="75%" y2="35%" stroke="url(#gradient1)" strokeWidth="1" opacity="0.3" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0066FF" />
                  <stop offset="100%" stopColor="#00D9A5" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00D9A5" />
                  <stop offset="100%" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </main>

        <footer className="p-6 text-center text-gray-500 text-sm">
          <p>A Cognition Experience</p>
        </footer>
      </div>

      {modalContent.type && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0" onClick={closeModal} />
          <div className="relative bg-cognition-dark border border-cognition-blue/30 rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-cognition-dark border-b border-cognition-blue/30 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cognition-blue to-cognition-green bg-clip-text text-transparent">
                {modalContent.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {modalContent.type === 'blog' && (
                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl text-cognition-green mb-4">The Future of AI Collaboration</h3>
                  <p className="text-gray-300 mb-4">
                    Welcome to a new era of human-AI collaboration. At Cognition, we believe that the most powerful 
                    innovations emerge when human creativity meets artificial intelligence. This blog post explores 
                    our vision for the future and the exciting journey ahead.
                  </p>
                  <p className="text-gray-300 mb-4">
                    The intersection of neural networks and human intuition creates possibilities we're only 
                    beginning to understand. Like the neurons that connect in our brains, forming complex 
                    networks of thought and memory, our AI systems are learning to collaborate in ways that 
                    amplify human potential.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Join us as we explore this frontier together. The party you're attending tonight is just 
                    the beginning of a conversation that will shape the future of technology and humanity.
                  </p>
                  <p className="text-gray-400 italic">
                    Stay curious. Stay connected. The future is collaborative.
                  </p>
                </div>
              )}
              {modalContent.type === 'salon' && (
                <div className="space-y-6">
                  <p className="text-gray-300">
                    Welcome to the Opening Salon! This is a space for open discussion about the blog post 
                    and the ideas it presents. Feel free to share your thoughts, questions, and insights.
                  </p>
                  <div className="bg-black/30 rounded-lg p-4 border border-cognition-green/20">
                    <h4 className="text-cognition-green font-semibold mb-2">Discussion Topics:</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li>What does human-AI collaboration mean to you?</li>
                      <li>How do you envision the future of creative work?</li>
                      <li>What excites or concerns you about AI development?</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 rounded-lg p-4 border border-cognition-blue/20">
                    <h4 className="text-cognition-blue font-semibold mb-2">Salon Guidelines:</h4>
                    <p className="text-gray-400 text-sm">
                      This is a space for respectful, thoughtful dialogue. Listen actively, share openly, 
                      and embrace diverse perspectives. The best conversations happen when we approach 
                      each other with curiosity and kindness.
                    </p>
                  </div>
                  <p className="text-gray-400 text-center italic">
                    The salon opens at the event. See you there!
                  </p>
                </div>
              )}
              {modalContent.type === 'video' && (
                <div className="space-y-4">
                  <p className="text-gray-300 mb-4">
                    Watch this special video message about our vision and the celebration ahead.
                  </p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                      title="Party Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <p className="text-gray-400 text-sm text-center">
                    A special message for our guests
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
