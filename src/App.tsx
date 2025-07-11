import React, { useState } from 'react';
import { ChevronRight, Shield, Zap, CheckCircle, Github, Download, Eye, Code, Users, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GenuineVerifyDemo } from '@/components/GenuineVerifyDemo';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 dark:bg-slate-900/80 dark:border-slate-700/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-red-600" />
              <span className="text-xl font-bold text-slate-900 dark:text-white">Genuine Verify</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('demo')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection('install')}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Install
              </button>
              <a
                href="https://github.com/genuine-verify/genuine-verify-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                GitHub
              </a>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isNavOpen && (
            <div className="md:hidden py-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection('demo')}
                  className="text-left text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Demo
                </button>
                <button
                  onClick={() => scrollToSection('install')}
                  className="text-left text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  Install
                </button>
                <a
                  href="https://github.com/genuine-verify/genuine-verify-sdk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-left text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Zap className="h-4 w-4 mr-2" />
              Now Available on NPM
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Real Humans.
              <br />
              <span className="text-red-600">Verified Locally.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Built for the Post-AI Internet. Uses gesture detection to verify human presence in real time — 
              100% client-side, no tracking or servers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => scrollToSection('demo')}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold rounded-full"
              >
                Try Demo
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('install')}
                className="border-2 border-slate-300 hover:border-slate-400 px-8 py-4 text-lg font-semibold rounded-full"
              >
                <Download className="mr-2 h-5 w-5" />
                Install SDK
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Experience real-time human verification with a simple gesture. No personal data leaves your device.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <GenuineVerifyDemo 
              title="Human Verification Demo"
              onTokenIssued={(payload) => {
                console.log('Human verified!', payload)
              }}
              onError={(error) => {
                console.error('Verification failed:', error)
              }}
                  />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              A simple three-step process that keeps your users' privacy intact while ensuring they're human.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                step: "1",
                title: "Gesture Detection",
                description: "User performs a simple gesture like tilting their head. Our AI analyzes the movement patterns locally on their device.",
                icon: Eye
              },
              {
                step: "2",
                title: "Local Verification",
                description: "The gesture is processed entirely client-side using WebGL and machine learning. No data is sent to servers.",
                icon: Shield
              },
              {
                step: "3",
                title: "Presence Token",
                description: "A short-lived, cryptographically signed token is generated proving human presence for your application to use.",
                icon: CheckCircle
              }
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                      <item.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <span className="text-3xl font-bold text-slate-300 dark:text-slate-600">
                      {item.step}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Built for Developers
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Integrate human verification into any flow where you need to ensure real user interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Secure Authentication",
                description: "Add human verification to login flows to prevent bot attacks and credential stuffing.",
                icon: Lock
              },
              {
                title: "Checkout Protection",
                description: "Verify humans during payment processes to reduce fraud and ensure legitimate transactions.",
                icon: Shield
              },
              {
                title: "Agent Triggering",
                description: "Ensure AI agents are only activated by real humans, not automated systems.",
                icon: Users
              },
              {
                title: "Form Submissions",
                description: "Protect contact forms and user-generated content from spam and automated abuse.",
                icon: CheckCircle
              },
              {
                title: "API Rate Limiting",
                description: "Implement human verification for API access to prevent automated scraping and abuse.",
                icon: Zap
              },
              {
                title: "Content Moderation",
                description: "Verify human moderators before allowing content approval or removal actions.",
                icon: Eye
              }
            ].map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-lg">
                      <useCase.icon className="h-5 w-5 text-red-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
                      {useCase.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {useCase.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Install Guide Section */}
      <section id="install" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Simple installation and integration. Start verifying humans with just a few lines of code.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Installation */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
                  <Download className="mr-3 h-6 w-6" />
                  Installation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <code className="text-green-400 text-lg font-mono">
                    npm install genuine-verify-sdk
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Basic Usage */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
                  <Code className="mr-3 h-6 w-6" />
                  Basic Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300">
{`import { GenuineWidgetEmbeddable } from 'genuine-verify-sdk';

// Simple React component usage
function MyComponent() {
  const handleTokenIssued = (token) => {
    console.log('Human verified! Token:', token);
    // Use the token in your application
    authenticateUser(token);
  };

  return (
    <GenuineWidgetEmbeddable
      onTokenIssued={handleTokenIssued}
    />
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* React Integration */}
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-slate-900 dark:text-white">
                  <Code className="mr-3 h-6 w-6" />
                  React Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-6 overflow-x-auto">
                  <pre className="text-sm font-mono text-slate-300">
{`import { GenuineWidgetEmbeddable } from 'genuine-verify-sdk';

function LoginForm() {
  const handleVerification = (token) => {
    // Proceed with login using the token
    login(token);
  };

  return (
    <div>
      <h3>Verify you're human to continue</h3>
      <GenuineWidgetEmbeddable
        onTokenIssued={handleVerification}
      />
    </div>
  );
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <a href="https://github.com/genuine-verify/genuine-verify-sdk" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2"
              >
                <a href="https://www.npmjs.com/package/genuine-verify-sdk" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" />
                  NPM Package
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-900 dark:bg-slate-800 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-red-500" />
              <span className="text-lg font-bold">Genuine Verify</span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="https://github.com/genuine-verify/genuine-verify-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="mailto:support@genuineverify.com"
                className="text-slate-400 hover:text-white transition-colors text-sm"
              >
                Get Support
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
            <p>© 2024 Genuine Verify. Built for the Post-AI Internet.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;