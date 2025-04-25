"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { glitchyPageTransitionVariants } from "../utils/motionVariants"
import { VscMail, VscGithubAlt } from "react-icons/vsc"
import { FiSend, FiChevronDown, FiUser, FiCpu } from "react-icons/fi"

// Glitch animation variants
const glitchTextVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  glitch: {
    opacity: [1, 0.8, 1, 0.7, 1, 0.9, 1],
    x: [0, -2, 3, -1, 0, 2, 0],
    y: [0, 1, -1, 2, -2, 0],
    scale: [1, 1.01, 0.99, 1.02, 0.98, 1],
    filter: ["none", "brightness(1.2) contrast(1.1)", "none", "brightness(0.9) contrast(1.2)", "none"],
    transition: {
      duration: 0.4,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const chatBubbleVariants = {
  initial: {
    opacity: 0,
    y: 20,
    x: 0,
  },
  animate: (custom) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.4,
      delay: custom * 0.1,
    },
  }),
  glitch: {
    x: [0, -3, 5, -2, 0, 3, 0],
    filter: ["none", "hue-rotate(10deg) brightness(1.1)", "none", "hue-rotate(-10deg) contrast(1.1)", "none"],
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: 0.2 },
  },
}

// Terminal typing effect component
const TerminalTyping = ({ text, className = "", speed = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prevIndex) => prevIndex + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      if (onComplete) onComplete()
    }
  }, [currentIndex, text, speed, isComplete, onComplete])

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="inline-block w-2 h-4 bg-[var(--color-accent-glitch)] animate-blink ml-0.5"></span>
      )}
    </div>
  )
}

// Message structure (using JSDoc instead of TypeScript)
/**
 * @typedef {Object} Message
 * @property {string} id - Unique identifier for the message
 * @property {string} text - Message content
 * @property {'user'|'ai'} sender - Who sent the message
 * @property {Date} timestamp - When the message was sent
 * @property {boolean} [isGlitching] - Whether the message is currently glitching
 */

// Predefined questions
const predefinedQuestions = [
  "Tell me about your services",
  "What's your availability for new projects?",
  "Can we schedule a call?",
  "What are your rates?",
]

const ContactPage = () => {
  const [messages, setMessages] = useState([
    {
      id: "0",
      text: "Hello! I'm the AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showInitialAnimation, setShowInitialAnimation] = useState(true)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Handle sending a message
  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
      isGlitching: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setSelectedQuestion(null)

    // Remove glitch effect after animation completes
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, isGlitching: false } : msg)))
    }, 500)

    // Simulate AI response after a delay
    setTimeout(() => {
      let response

      // Generate response based on message content
      if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
        response = "Hello! How can I assist you with your inquiry today?"
      } else if (text.toLowerCase().includes("service")) {
        response =
          "I offer web development, AI integration, and design services. Would you like more specific information about any of these areas?"
      } else if (text.toLowerCase().includes("availability") || text.toLowerCase().includes("schedule")) {
        response =
          "I'm currently available for new projects starting next month. Would you like to discuss project details or schedule a call?"
      } else if (text.toLowerCase().includes("rate") || text.toLowerCase().includes("price")) {
        response =
          "My rates depend on project scope and requirements. Could you share more details about your project so I can provide a more accurate estimate?"
      } else if (text.toLowerCase().includes("call")) {
        response =
          "I'd be happy to schedule a call. Please provide your email and preferred time, and I'll send you a calendar invite."
      } else {
        response =
          "Thanks for your message! I'll get back to you soon. Feel free to ask any other questions you might have."
      }

      const aiMessage = {
        id: Date.now().toString(),
        text: response,
        sender: "ai",
        timestamp: new Date(),
        isGlitching: true,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      // Remove glitch effect after animation completes
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === aiMessage.id ? { ...msg, isGlitching: false } : msg)))
      }, 500)
    }, 1500)
  }

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    setInputValue(question)
  }

  return (
    <motion.section
      id="contact"
      className="py-16 md:py-20 px-4"
      variants={glitchyPageTransitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold font-mono mb-4 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="text-[var(--color-accent-glitch)]">//</span> Contact: Open_Channel
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Have a question, proposal, or just want to say hi? Send a message through the AI interface or connect via other
        channels.
      </motion.p>

      {/* Main content area with chat interface */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left side - Contact info */}
        <motion.div
          className="lg:col-span-2 flex flex-col justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div>
            <h3 className="text-xl font-mono font-bold mb-6">
              <span className="text-[var(--color-accent-glitch)]">//</span> Direct Channels
            </h3>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-highlight-bg)] p-3 rounded-lg">
                  <VscMail size={24} className="text-[var(--color-accent-glitch)]" />
                </div>
                <div>
                  <h4 className="font-mono text-[var(--color-text-secondary)] text-sm mb-1">_Email:</h4>
                  <a
                    href="mailto:dominikpalo12@gmail.com"
                    className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors"
                  >
                    dominikpalo12@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-highlight-bg)] p-3 rounded-lg">
                  <VscGithubAlt size={24} className="text-[var(--color-accent-glitch)]" />
                </div>
                <div>
                  <h4 className="font-mono text-[var(--color-text-secondary)] text-sm mb-1">_GitHub:</h4>
                  <a
                    href="https://github.com/Dospalko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors"
                  >
                    github.com/Dospalko
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-highlight-bg)] p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[var(--color-accent-glitch)]"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="font-mono text-[var(--color-text-secondary)] text-sm mb-1">_LinkedIn:</h4>
                  <a
                    href="https://www.linkedin.com/in/dominik-pa%C4%BEo-a61801205/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors"
                  >
                    linkedin.com/in/dominik-paľo
                  </a>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            className="mt-12 p-6 border border-[var(--color-border-subtle)] rounded-lg bg-[var(--color-highlight-bg)]/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <h4 className="font-mono text-lg mb-4 flex items-center">
              <span className="text-[var(--color-accent-glitch)] mr-2">&gt;</span>
              Response Time
            </h4>
            <p className="text-[var(--color-text-secondary)] mb-2">
              I typically respond within 24 hours. For urgent matters, please indicate in your message.
            </p>
            <div className="w-full bg-[var(--color-background)] rounded-full h-2 mt-4">
              <motion.div
                className="bg-[var(--color-accent-glitch)] h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ delay: 0.8, duration: 1 }}
              />
            </div>
            <div className="flex justify-between text-xs text-[var(--color-text-secondary)] mt-1">
              <span>Immediate</span>
              <span>24 hours</span>
              <span>48+ hours</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - AI Chat Interface */}
        <motion.div
          className="lg:col-span-3 border border-[var(--color-border-subtle)] rounded-lg overflow-hidden flex flex-col bg-[var(--color-background-alt)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{
            boxShadow: "0 0 20px rgba(0, 0, 0, 0.2), 0 0 10px var(--color-accent-glitch)/20",
            height: "600px",
          }}
        >
          {/* Chat header */}
          <div className="bg-[var(--color-background)]/80 backdrop-blur-sm p-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent-glitch)] mr-2 relative">
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-accent-glitch)]"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
              <h3 className="font-mono font-bold">AI_ASSISTANT.exe</h3>
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
            </div>
          </div>

          {/* Terminal intro animation */}
          <AnimatePresence>
            {showInitialAnimation && (
              <motion.div
                className="absolute inset-0 bg-[var(--color-background)] z-10 flex flex-col justify-center items-center p-8"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 2.5 }}
              >
                <div className="max-w-md w-full">
                  <TerminalTyping
                    text="> Initializing communication channel..."
                    className="text-[var(--color-accent-glitch)] mb-2"
                    onComplete={() => {}}
                  />
                  <TerminalTyping
                    text="> Establishing secure connection..."
                    className="text-[var(--color-text-secondary)] mb-2"
                    speed={40}
                    onComplete={() => {}}
                  />
                  <TerminalTyping
                    text="> Loading AI interface..."
                    className="text-[var(--color-text-secondary)] mb-2"
                    speed={35}
                    onComplete={() => {}}
                  />
                  <TerminalTyping
                    text="> Connection established. Welcome."
                    className="text-[var(--color-accent-glitch)]"
                    speed={25}
                    onComplete={() => {
                      setTimeout(() => setShowInitialAnimation(false), 800)
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  custom={index}
                  variants={chatBubbleVariants}
                  initial="initial"
                  animate={message.isGlitching ? "glitch" : "animate"}
                  exit="exit"
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-[var(--color-accent-glitch)]/20 border border-[var(--color-accent-glitch)]/30 text-[var(--color-text-primary)]"
                        : "bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)]"
                    }`}
                  >
                    <div className="flex items-center mb-1 text-xs text-[var(--color-text-secondary)]">
                      {message.sender === "user" ? (
                        <>
                          <span className="font-mono">USER</span>
                          <FiUser className="ml-1" size={12} />
                        </>
                      ) : (
                        <>
                          <span className="font-mono">AI_ASSISTANT</span>
                          <FiCpu className="ml-1" size={12} />
                        </>
                      )}
                    </div>
                    <motion.p
                      variants={glitchTextVariants}
                      initial="initial"
                      animate={message.isGlitching ? "glitch" : "animate"}
                      className="text-sm"
                    >
                      {message.text}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] rounded-lg p-3">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[var(--color-accent-glitch)]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[var(--color-accent-glitch)]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: 0.2, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-[var(--color-accent-glitch)]"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, delay: 0.4, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          {/* Quick questions */}
          <div className="p-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]/50">
            <div className="flex items-center mb-2">
              <FiChevronDown size={14} className="text-[var(--color-accent-glitch)] mr-1" />
              <h4 className="text-xs font-mono text-[var(--color-text-secondary)]">Quick Questions</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {predefinedQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleQuestionClick(question)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedQuestion === question
                      ? "bg-[var(--color-accent-glitch)]/20 border-[var(--color-accent-glitch)]/50 text-[var(--color-text-primary)]"
                      : "bg-[var(--color-highlight-bg)]/70 border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-glitch)]/30"
                  }`}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]/80">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)] rounded-md text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]/70 focus:border-[var(--color-accent-glitch)] focus:ring-1 focus:ring-[var(--color-accent-glitch)] focus:outline-none transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-[var(--color-accent-glitch)] text-[var(--color-background)] rounded-md hover:bg-[var(--color-accent-glitch)]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-glitch)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)]"
              >
                <FiSend size={18} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--color-background);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-border-subtle);
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--color-accent-glitch);
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </motion.section>
  )
}

export default ContactPage
