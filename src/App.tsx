import React, { useState, useEffect } from 'react';
import { CheckCircle, Github, Download, Code, Lock, Bot, AlertTriangle, ArrowRight, User, Shield, FileText, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomWaitlistWidget } from '@/components/CustomWaitlistWidget';
import { EnhancedGenuineWidget } from '@/components/EnhancedGenuineWidget';
import { logDemoMounted, logDemoVerified } from '@/utils/logLandingEvent';

declare global {
  interface Window {
    getwaitlist?: () => void;
  }
}

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [widgetKey, setWidgetKey] = useState(Date.now());

  // Log demo mounted event
  useEffect(() => {
    logDemoMounted();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };



  return (
    <div className="min-h-screen font-sans bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
            <img src="/genuine-logo-text.png" alt="Genuine Logo" className="h-12 w-auto" style={{ maxHeight: 48 }} />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('demo')} className="hover:text-primary transition-colors">Demo</button>
            <button onClick={() => scrollToSection('developers')} className="hover:text-primary transition-colors">Developers</button>
            <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            </nav>
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden p-2 rounded-md hover:bg-muted">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          {isNavOpen && (
          <div className="md:hidden py-4 border-t border-border bg-card">
              <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('demo')} className="text-left hover:text-primary transition-colors">Demo</button>
              <button onClick={() => scrollToSection('developers')} className="text-left hover:text-primary transition-colors">Developers</button>
              <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="text-left hover:text-primary transition-colors">GitHub</a>
              </nav>
            </div>
          )}
      </header>

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 px-6 bg-background text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight flex flex-col items-center">
            <span className="text-primary text-4xl sm:text-5xl mb-2">Genuine</span>
            The human security layer for AI agents.
            </h1>
          <p className="text-xl text-muted mb-8">
            Verify real human presence—no puzzles, no surveillance. Just gestures and proof. Built for platforms, developers, and autonomous systems that need to trust the humans behind the commands.
          </p>
          <Button size="lg" onClick={() => scrollToSection('waitlist')} className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 rounded-md shadow-lg transition-all duration-200 text-lg font-semibold">
            <Lock className="mr-2 h-5 w-5" /> Join the Beta Waitlist
              </Button>
        </div>
      </section>

      {/* How It Works (NEW) */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">How Genuine Works</h2>
          </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: User,
              title: 'User Performs a Real-Time Gesture',
              desc: 'A quick, natural movement like a head tilt proves the user is physically present. No biometrics, no recordings, no invasions.'
            },
            {
              icon: Shield,
              title: 'Presence Token Is Created',
              desc: 'A cryptographic token is generated in the browser, proving a human was verified at a moment in time.'
            },
            {
              icon: Bot,
              title: 'Agents or APIs Verify the Token',
              desc: 'Apps or agents check this token before executing tasks. Supports JS SDK and REST API.'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-card p-3 rounded-full mb-2"><item.icon className="h-8 w-8 text-primary" /></div>
                <CardTitle className="text-base font-semibold text-foreground text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center leading-relaxed">{item.desc}</CardContent>
            </Card>
          ))}
          </div>
        
        {/* Token Output Preview */}
        <div className="bg-card rounded-lg p-4 text-left font-mono text-sm mt-8 shadow-md max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-2">Example Presence Token:</p>
          <pre className="overflow-x-auto text-green-400 whitespace-pre-wrap">
{`{
  "verified": true,
  "gesture": "head_tilt",
  "timestamp": "2025-07-12T16:14:03Z",
  "token_id": "abc123"
}`}
          </pre>
        </div>
        
        {/* Why Now */}
        <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto text-center">
          As agentic AI systems scale, the internet still has no reliable way to prove a real human is behind the command. Genuine solves that.
        </p>
      </section>

      {/* Use Cases (NEW) */}
      <section className="py-16 px-6 bg-card text-center">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Where to Use Genuine</h2>
          </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Bot,
              title: 'AI Agent Verification',
              desc: 'Confirm a real human approved an agent\'s task.'
            },
            {
              icon: FileText,
              title: 'Form & Workflow Protection',
              desc: 'Replace CAPTCHAs on sensitive forms.'
            },
            {
              icon: Key,
              title: 'API & Resource Gating',
              desc: 'Require a presence token before unlocking secure APIs.'
            },
            {
              icon: Shield,
              title: 'Authentication Enhancer',
              desc: 'Add presence checks to login or delegation workflows.'
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-card p-2 rounded-lg mb-2"><item.icon className="h-8 w-8 text-primary" /></div>
                <CardTitle className="text-base font-semibold text-foreground text-center">{item.title}</CardTitle>
                </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center leading-relaxed">{item.desc}</CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">CAPTCHAs are broken</h2>
          </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: 'Bots are getting smarter',
              desc: 'AI bots can now bypass most traditional CAPTCHAs, making them less effective at stopping automated abuse.',
              icon: Bot
            },
            {
              title: 'CAPTCHAs ruin UX',
              desc: 'Users are frustrated by slow, confusing, or inaccessible CAPTCHAs that interrupt their experience.',
              icon: AlertTriangle
            },
            {
              title: 'Trust is missing',
              desc: 'Current solutions fail to build real trust between humans and digital agents, leaving gaps in security and user confidence.',
              icon: Bot
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-card p-3 rounded-full mb-2"><item.icon className="h-6 w-6 text-primary" /></div>
                <CardTitle className="text-base font-semibold text-foreground text-center">{item.title}</CardTitle>
                </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center leading-relaxed">{item.desc}</CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-6 bg-card text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Verify once. Reuse everywhere.</h2>
          <p className="text-lg text-muted">Genuine uses a gesture-based verification to prove presence once — then issues a reusable token for trusted sessions. Fully embeddable. Privacy-first. AI-ready.</p>
        </div>
      </section>

      {/* How It Works */}
      {/* (REMOVE the old How it works section here) */}

      {/* Live Demo */}
      <section id="demo" className="py-16 px-6 bg-card text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try it now</h2>
          <p className="text-lg text-muted mb-8">Tilt your head to prove you're human. Then get a token you can use in apps or agent flows.</p>
          <div className="flex flex-col items-center">
            <label className="flex items-center gap-2 text-sm font-medium mb-4 text-foreground">
              <Switch checked={showDebug} onCheckedChange={setShowDebug} className="ml-2" />
              Show Debug Panel
            </label>
            <style>{`
              video, canvas {
                width: 480px !important;
                height: 360px !important;
                max-width: none !important;
                max-height: none !important;
                min-width: 0 !important;
                min-height: 0 !important;
                object-fit: contain !important;
                box-sizing: content-box !important;
              }
              
              /* Enhanced canvas sizing for HiDPI displays */
              canvas {
                image-rendering: pixelated;
                image-rendering: -moz-crisp-edges;
                image-rendering: crisp-edges;
              }
              
              /* Ensure proper container sizing */
              .genuine-widget-container {
                position: relative;
                width: 480px;
                height: 360px;
                margin: 0 auto;
              }
              
              /* Fix for device pixel ratio scaling */
              @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                canvas {
                  transform: scale(1);
                  transform-origin: top left;
                }
              }
            `}</style>
            <EnhancedGenuineWidget
              key={widgetKey}
              theme="dark"
              gestureType="headTilt"
              debug={showDebug}
              enhancedEyeTracking={true}
              instructionalText="To prove you're human, click below and tilt your head as shown. Enhanced eye tracking is now active!"
              instructionalTextStyle={{
                background: 'rgba(40,40,50,0.95)',
                color: '#fff',
                border: '2px solid #6366F1',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '0.01em',
                boxShadow: '0 4px 24px rgba(99,102,241,0.15)',
                padding: '12px 18px',
                marginBottom: 12,
                textShadow: '0 2px 8px #232323',
              }}
              onSuccess={(payload: unknown) => {
                console.log('✅ Verification successful!', payload);
                logDemoVerified('headTilt', Date.now() - widgetKey);
              }}
            />
            <Button className="mt-4" onClick={() => setWidgetKey(Date.now())}>Reset</Button>
          </div>
        </div>
      </section>

      {/* Agent Use Case */}
      <section className="py-16 px-6 bg-card text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for the agent-native future</h2>
          <p className="text-lg text-muted mb-8">AI agents shouldn’t act without consent. Genuine ensures a real human is present before any sensitive action.</p>
          <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 transition-colors" asChild>
            <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/98cf052843f425c69dc0c446da69a3c5/783b99d9-9f90-4624-a17c-508d9b176d78/index.html?utm_source=perplexity" target="_blank" rel="noopener noreferrer">
              Try the Agent Simulation <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="py-16 px-6 bg-card text-center">
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">For developers</h2>
                </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mb-10">
          {[
            {
              title: 'Plug & Play React SDK',
              desc: 'Integrate human verification in minutes with a drop-in React component. No backend required.',
              icon: Code
            },
            {
              title: 'Privacy-First',
              desc: 'All processing is 100% client-side. No tracking, no data sent to servers—ever.',
              icon: Lock
            },
            {
              title: 'Secure Token System',
              desc: 'Cryptographically signed tokens provide robust, reusable permissions for your app.',
              icon: Bot
            },
            {
              title: 'Resilient by Design',
              desc: 'Automatic fallbacks, retries, and error handling ensure reliability in real-world scenarios.',
              icon: CheckCircle
            },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-card p-2 rounded-lg mb-2"><item.icon className="h-5 w-5 text-primary" /></div>
                <CardTitle className="text-base font-semibold text-foreground text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm text-center leading-relaxed">{item.desc}</CardContent>
            </Card>
          ))}
    </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/80 text-primary-foreground">
            <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" /> View GitHub
                </a>
              </Button>
          <Button size="lg" variant="outline" asChild className="border-2 border-primary text-primary hover:bg-primary/10 transition-colors">
            <a href="https://github.com/3CBolt/Genuine#readme" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" /> Read the Docs
                </a>
              </Button>
            </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 px-6 bg-card text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Want updates or early access to SDK features?</h3>
          <CustomWaitlistWidget />
          </div>
      </section>

      {/* YC-style Summary Blurb (NEW) */}
      <section className="py-8 px-6 bg-card text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg text-muted-foreground font-medium">
            Genuine is building the presence layer for AI agents—verifying that a real human is behind the request, not a bot or deepfake.
          </p>
        </div>
      </section>

      {/* What's Next */}
      <section className="mt-24 text-center max-w-2xl mx-auto px-4">
        <h4 className="text-lg font-semibold text-foreground">What's Next</h4>
        <p className="text-muted-foreground mt-2">
          This is just the beginning. We're building toward delegated agent trust, session-based presence tokens, and authenticationless workflows. Presence is the new primitive.
        </p>
      </section>

      {/* Second CTA + Social Proof */}
      <section className="text-center mt-20 pb-16 px-6">
        <p className="text-muted-foreground mb-4 text-sm">Trusted by early agent platforms and privacy-first developers</p>
        <Button size="lg" onClick={() => scrollToSection('waitlist')} className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium px-6 py-3 rounded-md shadow-md transition-all duration-200">
          <Lock className="mr-2 h-5 w-5" /> Join the Private Beta
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-background text-muted-foreground text-center border-t border-border">
        <div className="flex justify-center mb-4">
          <img src="/genuine-logo-icon.png" alt="Genuine Icon Logo" className="h-10 w-auto" style={{ maxHeight: 40 }} />
            </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
          <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://github.com/3CBolt/Genuine#readme" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Docs</a>
          <a href="mailto:cambolton4@live.com" className="hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="text-xs">Made by Cameron Bolton</div>
      </footer>
      <style>{`
        /* Dark styling for GetWaitlist widget */
        #getWaitlistContainer, #getWaitlistContainer * {
          background: #18181B !important;
          color: #EAEAEA !important;
          border-color: #232323 !important;
        }
        #getWaitlistContainer input, #getWaitlistContainer button {
          background: #232323 !important;
          color: #EAEAEA !important;
          border: 1px solid #333 !important;
        }
        #getWaitlistContainer button:hover {
          background: #6366F1 !important;
          color: #fff !important;
        }
        #getWaitlistContainer input:focus {
          border-color: #6366F1 !important;
          outline: none !important;
        }
      `}</style>
    </div>
  );
}

export default App;