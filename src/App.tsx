import React, { useState, useEffect, useRef } from 'react';

const NeuronBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let neurons: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3;
    };

    resize();
    window.addEventListener('resize', resize);

    // Create neurons
    for (let i = 0; i < 80; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2,
        connections: []
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 12, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      neurons.forEach((neuron, i) => {
        neuron.x += neuron.vx;
        neuron.y += neuron.vy;
        neuron.pulse += 0.02;

        if (neuron.x < 0 || neuron.x > canvas.width) neuron.vx *= -1;
        if (neuron.y < 0 || neuron.y > canvas.height) neuron.vy *= -1;

        // Draw connections
        neurons.forEach((other, j) => {
          if (i !== j) {
            const dx = other.x - neuron.x;
            const dy = other.y - neuron.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              const alpha = (1 - dist / 150) * 0.4;
              const gradient = ctx.createLinearGradient(neuron.x, neuron.y, other.x, other.y);
              gradient.addColorStop(0, `rgba(0, 200, 180, ${alpha})`);
              gradient.addColorStop(0.5, `rgba(50, 150, 255, ${alpha * 1.5})`);
              gradient.addColorStop(1, `rgba(100, 255, 200, ${alpha})`);

              ctx.beginPath();
              ctx.strokeStyle = gradient;
              ctx.lineWidth = 1;
              ctx.moveTo(neuron.x, neuron.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        });

        // Draw neuron body
        const glowSize = neuron.radius + Math.sin(neuron.pulse) * 2;
        const gradient = ctx.createRadialGradient(
          neuron.x, neuron.y, 0,
          neuron.x, neuron.y, glowSize * 4
        );
        gradient.addColorStop(0, 'rgba(100, 255, 220, 0.8)');
        gradient.addColorStop(0.3, 'rgba(50, 200, 255, 0.4)');
        gradient.addColorStop(1, 'rgba(0, 100, 150, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(neuron.x, neuron.y, glowSize * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = '#00ffd0';
        ctx.arc(neuron.x, neuron.y, glowSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
};

export default function MetaCognition() {
  const [formData, setFormData] = useState({ name: '', email: '', thoughts: '' });
  const [submitted, setSubmitted] = useState(false);
  const [hoveredHost, setHoveredHost] = useState<number | null>(null);

  const hosts = [
    {
      name: "Neural Node #1",
      quote: "is this one of those x dot com parties",
      emoji: "🧠",
      color: "#00ffd0"
    },
    {
      name: "Neural Node #2",
      quote: "you're telling me we are going to think about thinking?",
      emoji: "🤯",
      color: "#4dabff"
    },
    {
      name: "Neural Node #3",
      quote: "meta, isn't that an AI company or something?",
      emoji: "💀",
      color: "#00ff88"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #080c14 0%, #0a1525 50%, #051510 100%)',
      color: '#e0fff8',
      fontFamily: '"Space Mono", monospace',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Orbitron:wght@400;700;900&display=swap');

        @keyframes synapseFlash {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(2); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 208, 0.3); }
          50% { box-shadow: 0 0 40px rgba(0, 255, 208, 0.6), 0 0 80px rgba(0, 255, 208, 0.3); }
        }

        @keyframes glitch {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-2px, 2px); }
          94% { transform: translate(2px, -2px); }
          96% { transform: translate(-2px, -2px); }
          98% { transform: translate(2px, 2px); }
        }

        @keyframes dendrite {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }

        ::selection {
          background: rgba(0, 255, 208, 0.3);
          color: #fff;
        }
      `}</style>

      <NeuronBackground />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Title Section */}
        <header style={{
          padding: '60px 20px 40px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '12px',
            letterSpacing: '4px',
            color: '#4dabff',
            opacity: 0.7
          }}>
            ◈ NEURAL NETWORK PRESENTS ◈
          </div>

          <h1 style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            margin: 0,
            background: 'linear-gradient(135deg, #00ffd0 0%, #4dabff 50%, #00ff88 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 60px rgba(0, 255, 208, 0.5)',
            letterSpacing: '-2px',
            animation: 'float 6s ease-in-out infinite'
          }}>
            META COGNITION
          </h1>

          <p style={{
            fontSize: '14px',
            letterSpacing: '8px',
            color: '#00ffd0',
            marginTop: '20px',
            opacity: 0.8
          }}>
            THINKING ABOUT THINKING
          </p>
        </header>

        {/* Hero Image Section */}
        <section style={{
          display: 'flex',
          justifyContent: 'center',
          padding: '20px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '900px',
            width: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '2px solid rgba(0, 255, 208, 0.3)',
            boxShadow: '0 0 60px rgba(0, 255, 208, 0.2), inset 0 0 60px rgba(0, 0, 0, 0.5)',
            animation: 'pulse 4s ease-in-out infinite'
          }}>
            <img
              src="/coginvite/brain-ai-comparison.png"
              alt="Brain Without AI vs Brain Using AI Comparison"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              right: '0',
              height: '100px',
              background: 'linear-gradient(transparent, rgba(8, 12, 20, 0.9))',
              pointerEvents: 'none'
            }} />
          </div>
        </section>

        {/* Meet the Hosts Section */}
        <section style={{
          padding: '80px 20px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            marginBottom: '10px',
            color: '#4dabff'
          }}>
            MEET THE HOSTS
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#00ffd0',
            opacity: 0.6,
            marginBottom: '50px',
            letterSpacing: '3px'
          }}>
            ( BRAIN ROTTED )
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {hosts.map((host, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredHost(i)}
                onMouseLeave={() => setHoveredHost(null)}
                style={{
                  background: 'rgba(10, 30, 50, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${hoveredHost === i ? host.color : 'rgba(0, 255, 208, 0.2)'}`,
                  borderRadius: '20px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  transition: 'all 0.4s ease',
                  transform: hoveredHost === i ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredHost === i
                    ? `0 20px 60px rgba(0, 255, 208, 0.2), 0 0 30px ${host.color}40`
                    : '0 10px 40px rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  animation: hoveredHost === i ? 'glitch 0.5s ease infinite' : 'none'
                }}>
                  {host.emoji}
                </div>

                <h3 style={{
                  fontFamily: '"Orbitron", sans-serif',
                  fontSize: '1rem',
                  color: host.color,
                  marginBottom: '20px',
                  letterSpacing: '2px'
                }}>
                  {host.name}
                </h3>

                <p style={{
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: '#b0e0d8',
                  lineHeight: 1.6,
                  position: 'relative'
                }}>
                  <span style={{ color: host.color, fontSize: '1.5rem' }}>"</span>
                  {host.quote}
                  <span style={{ color: host.color, fontSize: '1.5rem' }}>"</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Manifesto Section */}
        <section style={{
          padding: '80px 20px',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
            width: '2px',
            height: '60px',
            background: 'linear-gradient(transparent, #00ffd0)'
          }} />

          <h2 style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            marginBottom: '50px',
            color: '#00ffd0',
            letterSpacing: '4px'
          }}>
            ◈ MANIFESTO ◈
          </h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(10, 30, 50, 0.8) 0%, rgba(5, 20, 30, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 255, 208, 0.2)',
            borderRadius: '30px',
            padding: '50px 40px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle at 30% 30%, rgba(0, 255, 208, 0.05) 0%, transparent 50%)',
              pointerEvents: 'none'
            }} />

            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              lineHeight: 2,
              color: '#c0f0e8',
              textAlign: 'justify',
              position: 'relative',
              zIndex: 1
            }}>
              <span style={{
                color: '#00ffd0',
                fontSize: '3rem',
                float: 'left',
                lineHeight: 1,
                marginRight: '10px',
                fontFamily: '"Orbitron", sans-serif'
              }}>T</span>
              he question of labor automation has never been so top of mind, as some of the first to ever say it, we at Cognition have been thinking (no pun intended) about what comes after. We believe that "units of labor" previously thought of as human software engineers can now be delegated powerfully, but the world has not yet caught up with how to do this.
              <br /><br />
              While thinking about the way we think, the ancient technology of <span style={{ color: '#4dabff', fontWeight: 'bold' }}>cartography</span> came to mind as a compression technology that makes it easier to take action. While the map is most certainly not the territory, <span style={{ color: '#00ff88', fontWeight: 'bold' }}>codemaps</span> has made it easier than ever for us to delegate effectively, turning every person into a CEO.
              <br /><br />
              Our new era of meta cognition reflects the data we have gathered over the past few years. We hope you will join us to <span style={{ color: '#00ffd0', fontWeight: 'bold' }}>think a bit about thinking</span>.
            </p>
          </div>
        </section>

        {/* Sign Up Section */}
        <section style={{
          padding: '80px 20px 120px',
          maxWidth: '700px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontFamily: '"Orbitron", sans-serif',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            marginBottom: '20px',
            color: '#4dabff',
            letterSpacing: '3px'
          }}>
            JOIN THE NETWORK
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#80c0b8',
            marginBottom: '40px',
            fontSize: '14px',
            letterSpacing: '2px'
          }}>
            ESTABLISH YOUR NEURAL CONNECTION
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} style={{
              background: 'rgba(10, 30, 50, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(0, 255, 208, 0.2)',
              borderRadius: '30px',
              padding: '50px 40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#00ffd0',
                  fontSize: '12px',
                  letterSpacing: '2px'
                }}>
                  NEURAL IDENTIFIER (NAME)
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    background: 'rgba(0, 20, 40, 0.8)',
                    border: '1px solid rgba(0, 255, 208, 0.3)',
                    borderRadius: '10px',
                    color: '#e0fff8',
                    fontSize: '16px',
                    fontFamily: '"Space Mono", monospace',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#00ffd0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 208, 0.3)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#00ffd0',
                  fontSize: '12px',
                  letterSpacing: '2px'
                }}>
                  SYNAPSE ADDRESS (EMAIL)
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    background: 'rgba(0, 20, 40, 0.8)',
                    border: '1px solid rgba(0, 255, 208, 0.3)',
                    borderRadius: '10px',
                    color: '#e0fff8',
                    fontSize: '16px',
                    fontFamily: '"Space Mono", monospace',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#00ffd0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 208, 0.3)'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  color: '#00ffd0',
                  fontSize: '12px',
                  letterSpacing: '2px'
                }}>
                  INITIAL THOUGHT PATTERN (OPTIONAL)
                </label>
                <textarea
                  value={formData.thoughts}
                  onChange={(e) => setFormData({...formData, thoughts: e.target.value})}
                  rows={4}
                  placeholder="What are you thinking about thinking about?"
                  style={{
                    width: '100%',
                    padding: '15px 20px',
                    background: 'rgba(0, 20, 40, 0.8)',
                    border: '1px solid rgba(0, 255, 208, 0.3)',
                    borderRadius: '10px',
                    color: '#e0fff8',
                    fontSize: '16px',
                    fontFamily: '"Space Mono", monospace',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#00ffd0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(0, 255, 208, 0.3)'}
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '18px 40px',
                  background: 'linear-gradient(135deg, #00ffd0 0%, #4dabff 100%)',
                  border: 'none',
                  borderRadius: '50px',
                  color: '#080c14',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  fontFamily: '"Orbitron", sans-serif',
                  letterSpacing: '3px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 40px rgba(0, 255, 208, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 255, 208, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 255, 208, 0.3)';
                }}
              >
                ESTABLISH CONNECTION
              </button>
            </form>
          ) : (
            <div style={{
              background: 'rgba(10, 30, 50, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #00ffd0',
              borderRadius: '30px',
              padding: '60px 40px',
              textAlign: 'center',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🧠⚡</div>
              <h3 style={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: '1.5rem',
                color: '#00ffd0',
                marginBottom: '15px'
              }}>
                NEURAL LINK ESTABLISHED
              </h3>
              <p style={{ color: '#80c0b8', lineHeight: 1.8 }}>
                Your synaptic pathway has been registered.<br />
                Prepare to think about thinking.
              </p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 20px',
          borderTop: '1px solid rgba(0, 255, 208, 0.1)',
          color: '#406860',
          fontSize: '12px',
          letterSpacing: '2px'
        }}>
          <p>◈ COGNITION LABS ◈</p>
          <p style={{ marginTop: '10px', opacity: 0.6 }}>THINK DIFFERENT. THINK ABOUT IT.</p>
        </footer>
      </div>
    </div>
  );
}
