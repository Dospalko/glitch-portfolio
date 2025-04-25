"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { glitchyPageTransitionVariants } from "../utils/motionVariants"
import { VscMail, VscGithubAlt } from "react-icons/vsc"
import { FiChevronDown, FiUser, FiCpu } from "react-icons/fi"

const glitchTextVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
  glitch: {
    opacity: [1, 0.8, 1, 0.7, 1, 0.9, 1],
    x: [0, -2, 3, -1, 0, 2, 0],
    y: [0, 1, -1, 2, -2, 0],
    scale: [1, 1.01, 0.99, 1.02, 0.98, 1],
    filter: ["none", "brightness(1.2) contrast(1.1)", "none", "brightness(0.9) contrast(1.2)", "none"],
    transition: { duration: 0.4, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6], ease: "easeInOut" }
  },
  exit: { opacity: 0, transition: { duration: 0.2 } }
}

const chatBubbleVariants = {
  initial: { opacity: 0, y: 20, x: 0 },
  animate: custom => ({ opacity: 1, y: 0, x: 0, transition: { duration: 0.4, delay: custom * 0.1 } }),
  exit: { opacity: 0, x: -10, transition: { duration: 0.2 } }
}

const predefinedQA = {
  "Tell me about your services": "I offer web development, AI integration, and design services. Let me know which one you'd like to explore in detail.",
  "What's your availability for new projects?": "I'm available for new projects starting next month. Feel free to pick a date and I’ll pencil you in.",
  "Can we schedule a call?": "Absolutely. Just send me your preferred slots and I'll confirm a calendar invite.",
  "What are your rates?": "My rates depend on the scope. Share your project details and I’ll get you a ballpark estimate."
}

const ContactPage = () => {
  const [messages, setMessages] = useState([
    { id: "0", text: "Hello! Select one of the questions below to see an answer.", sender: "system", timestamp: new Date() }
  ])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleQuestionClick = question => {
    const answer = predefinedQA[question] || ""
    const timestamp = Date.now().toString()
    const userMsg = { id: `u-${timestamp}`, text: question, sender: "user", timestamp: new Date() }
    const answerMsg = { id: `s-${timestamp}`, text: answer, sender: "system", timestamp: new Date() }
    setMessages(prev => [...prev, userMsg, answerMsg])
    setSelectedQuestion(question)
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
      <motion.h2
        className="text-3xl md:text-4xl font-bold font-mono mb-4 text-center"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <span className="text-[var(--color-accent-glitch)]">//</span> Contact: Open_Channel
      </motion.h2>

      <motion.p
        className="text-center text-[var(--color-text-secondary)] mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Have a question, proposal, or just want to say hi? Click one of the quick questions below.
      </motion.p>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
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
                  <a href="mailto:dominikpalo12@gmail.com" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors">
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
                  <a href="https://github.com/Dospalko" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors">
                    github.com/Dospalko
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-highlight-bg)] p-3 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-accent-glitch)]">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                <div>
                  <h4 className="font-mono text-[var(--color-text-secondary)] text-sm mb-1">_LinkedIn:</h4>
                  <a href="https://www.linkedin.com/in/dominik-pa%C4%BEo-a61801205/" target="_blank" rel="noopener noreferrer" className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-glitch)] transition-colors">
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
              <span className="text-[var(--color-accent-glitch)] mr-2">&gt;</span>Response Time
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

        <motion.div
          className="lg:col-span-3 border border-[var(--color-border-subtle)] rounded-lg overflow-hidden flex flex-col bg-[var(--color-background-alt)]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          style={{ boxShadow: "0 0 20px rgba(0,0,0,0.2), 0 0 10px var(--color-accent-glitch)/20", height: "600px" }}
        >
          <div className="bg-[var(--color-background)]/80 backdrop-blur-sm p-4 border-b border-[var(--color-border-subtle)] flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[var(--color-accent-glitch)] mr-2 relative">
                <motion.div
                  className="absolute inset-0 w-3 h-3 rounded-full bg-[var(--color-accent-glitch)]"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h3 className="font-mono font-bold">CHAT_INTERFACE</h3>
            </div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
              <div className="w-2 h-2 rounded-full bg-[var(--color-text-secondary)]"></div>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  custom={i}
                  variants={chatBubbleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${msg.sender === "user" ? "bg-[var(--color-accent-glitch)]/20 border border-[var(--color-accent-glitch)]/30" : "bg-[var(--color-highlight-bg)] border border-[var(--color-border-subtle)]"}`}>
                    <div className="flex items-center mb-1 text-xs text-[var(--color-text-secondary)]">
                      {msg.sender === "user" ? <><span className="font-mono">USER</span><FiUser className="ml-1" size={12} /></> : <><span className="font-mono">SYSTEM</span><FiCpu className="ml-1" size={12} /></>}
                    </div>
                    <motion.p variants={glitchTextVariants} initial="initial" animate="animate" className="text-sm">
                      {msg.text}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          <div className="p-3 border-t border-[var(--color-border-subtle)] bg-[var(--color-background)]/50">
            <div className="flex items-center mb-2">
              <FiChevronDown size={14} className="text-[var(--color-accent-glitch)] mr-1" />
              <h4 className="text-xs font-mono text-[var(--color-text-secondary)]">Quick Questions</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(predefinedQA).map(question => (
                <motion.button
                  key={question}
                  onClick={() => handleQuestionClick(question)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selectedQuestion === question ? "bg-[var(--color-accent-glitch)]/20 border-[var(--color-accent-glitch)]/50" : "bg-[var(--color-highlight-bg)]/70 border-[var(--color-border-subtle)] hover:border-[var(--color-accent-glitch)]/30"}`}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: var(--color-background); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: var(--color-border-subtle); border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: var(--color-accent-glitch); }
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        .animate-blink { animation: blink 1s infinite }
      `}</style>
    </motion.section>
  )
}

export default ContactPage
