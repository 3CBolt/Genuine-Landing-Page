import React, { useState, Suspense } from 'react';
import { ChevronRight, Zap, CheckCircle, Github, Download, Eye, Code, Lock, Bot, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const Switch = React.lazy(() => import('@/components/ui/switch').then(mod => ({ default: mod.Switch })));
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GenuineWidget } from 'genuine-verify-sdk';
import { WaitlistWidget } from '@/components/WaitlistWidget';

declare global {
  interface Window {
    getwaitlist?: () => void;
  }
}

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [widgetKey, setWidgetKey] = useState(Date.now());

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };



  return (
    <div className="min-h-screen font-sans bg-[#0A0A0A] text-[#EAEAEA]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#111]/80 backdrop-blur-md border-b border-[#222]/50">
        <div className="container mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <img src="/genuine-logo-text.png" alt="Genuine Logo" className="h-12 w-auto" style={{ maxHeight: 48 }} />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('demo')} className="hover:text-[#6366F1] transition-colors">Demo</button>
            <button onClick={() => scrollToSection('developers')} className="hover:text-[#6366F1] transition-colors">Developers</button>
            <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366F1] transition-colors">GitHub</a>
          </nav>
          <button onClick={() => setIsNavOpen(!isNavOpen)} className="md:hidden p-2 rounded-md hover:bg-[#222]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {isNavOpen && (
          <div className="md:hidden py-4 border-t border-[#222]/50 bg-[#111]">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('demo')} className="text-left hover:text-[#6366F1] transition-colors">Demo</button>
              <button onClick={() => scrollToSection('developers')} className="text-left hover:text-[#6366F1] transition-colors">Developers</button>
              <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="text-left hover:text-[#6366F1] transition-colors">GitHub</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 bg-[#0A0A0A] text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">Presence is the new primitive</h1>
          <p className="text-xl text-[#999] mb-8">Genuine verifies real-time human presence for AI-native applications.</p>
          <Button size="lg" onClick={() => scrollToSection('demo')} className="bg-[#6366F1] hover:bg-[#818CF8] text-white px-8 py-4 text-lg font-semibold rounded-full transition-colors">Try the Demo <ChevronRight className="ml-2 h-5 w-5" /></Button>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6 bg-[#111]">
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
            <Card key={i} className="bg-[#18181B] border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-[#232323] p-3 rounded-full mb-2"><item.icon className="h-6 w-6 text-[#6366F1]" /></div>
                <CardTitle className="text-base font-semibold text-[#EAEAEA] text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#bbb] text-sm text-center leading-relaxed">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-6 bg-[#18181B] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Verify once. Reuse everywhere.</h2>
          <p className="text-lg text-[#999]">Genuine uses a gesture-based verification to prove presence once — then issues a reusable token for trusted sessions. Fully embeddable. Privacy-first. AI-ready.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-[#111]">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">How it works</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: '1',
              title: 'Gesture Initiation',
              desc: 'Start by performing a simple gesture, like a head tilt, to prove you are present and human.',
              icon: Eye
            },
            {
              step: '2',
              title: 'On-Device Analysis',
              desc: 'Genuine instantly verifies your presence and gesture on your device—no data leaves your browser.',
              icon: Bot
            },
            {
              step: '3',
              title: 'Token Issuance',
              desc: 'A secure, short-lived token is generated, cryptographically signed for your session.',
              icon: CheckCircle
            },
            {
              step: '4',
              title: 'Seamless Access',
              desc: 'Use your token to unlock features, trigger agents, or reuse it across trusted apps and flows.',
              icon: Zap
            },
          ].map((item, i) => (
            <Card key={i} className="bg-[#18181B] border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-[#232323] p-3 rounded-full mb-2"><item.icon className="h-6 w-6 text-[#6366F1]" /></div>
                <span className="text-2xl font-bold text-[#6366F1] mb-1">{item.step}</span>
                <CardTitle className="text-base font-semibold text-[#EAEAEA] text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#bbb] text-sm text-center leading-relaxed">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Live Demo */}
      <section id="demo" className="py-16 px-6 bg-[#18181B] text-center">
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Try it now</h2>
          <p className="text-lg text-[#999] mb-8">Tilt your head to prove you're human. Then get a token you can use in apps or agent flows.</p>
          <div className="flex flex-col items-center">
            <label className="flex items-center gap-2 text-sm font-medium mb-4 text-[#EAEAEA]">
              <Suspense fallback={<input type="checkbox" checked={showDebug} onChange={e => setShowDebug(e.target.checked)} />}>
                <Switch checked={showDebug} onCheckedChange={setShowDebug} />
              </Suspense>
              Show Debug Panel
            </label>
            <GenuineWidget
              key={widgetKey}
              theme="dark"
              gestureType="headTilt"
              debug={showDebug}
              instructionalText="To prove you're human, click below and tilt your head as shown."
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
              onSuccess={payload => {
                console.log('✅ Verification successful!', payload);
              }}
            />
            <Button className="mt-4" onClick={() => setWidgetKey(Date.now())}>Reset</Button>
          </div>
        </div>
      </section>

      {/* Agent Use Case */}
      <section className="py-16 px-6 bg-[#111] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for the agent-native future</h2>
          <p className="text-lg text-[#999] mb-8">AI agents shouldn’t act without consent. Genuine ensures a real human is present before any sensitive action.</p>
          <Button size="lg" variant="outline" className="border-2 border-[#6366F1] text-[#6366F1] hover:bg-[#232323] hover:text-white transition-colors" asChild>
            <a href="https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/98cf052843f425c69dc0c446da69a3c5/783b99d9-9f90-4624-a17c-508d9b176d78/index.html?utm_source=perplexity" target="_blank" rel="noopener noreferrer">
              Try the Agent Simulation <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Developer Section */}
      <section id="developers" className="py-16 px-6 bg-[#18181B] text-center">
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
            <Card key={i} className="bg-[#232323] border-0 shadow-none flex flex-col items-center p-6 rounded-2xl transition-transform hover:scale-105 hover:shadow-lg">
              <CardHeader className="pb-2 flex flex-col items-center">
                <div className="bg-[#18181B] p-2 rounded-lg mb-2"><item.icon className="h-5 w-5 text-[#6366F1]" /></div>
                <CardTitle className="text-base font-semibold text-[#EAEAEA] text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-[#bbb] text-sm text-center leading-relaxed">{item.desc}</CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" asChild className="bg-[#6366F1] hover:bg-[#818CF8] text-white">
            <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" /> View GitHub
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild className="border-2 border-[#6366F1] text-[#6366F1] hover:bg-[#232323] hover:text-white transition-colors">
            <a href="https://github.com/3CBolt/Genuine#readme" target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" /> Read the Docs
            </a>
          </Button>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 px-6 bg-[#111] text-center">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Want updates or early access to SDK features?</h3>
          <WaitlistWidget />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-[#0A0A0A] text-[#999] text-center border-t border-[#232323]">
        <div className="flex justify-center mb-4">
          <img src="/genuine-logo-icon.png" alt="Genuine Icon Logo" className="h-10 w-auto" style={{ maxHeight: 40 }} />
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-4">
          <a href="https://github.com/3CBolt/Genuine" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366F1] transition-colors">GitHub</a>
          <a href="https://github.com/3CBolt/Genuine#readme" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366F1] transition-colors">Docs</a>
          <a href="mailto:cambolton4@live.com" className="hover:text-[#6366F1] transition-colors">Contact</a>
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