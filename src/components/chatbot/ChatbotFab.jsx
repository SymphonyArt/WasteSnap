import { useState, useRef, useEffect } from 'react';
import { FaComment, FaTimes, FaPaperPlane, FaRedo } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import '../../styles/ChatbotFab.css';

// nanti ganti aja mas mbak sesuai model dari ML ini saya pake data dummy
const ChatbotFab = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [conversation, setConversation] = useState({
    currentStep: 0,
    answers: [],
    isComplete: false
  });
  
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: 'Hai! Saya WasteBot. Pilih jenis bantuan yang Anda butuhkan:', 
      sender: 'bot',
      options: [
        'Identifikasi jenis sampah',
        'Informasi daur ulang',
        'Lokasi TPS3R terdekat'
      ]
    }
  ]);
  
  const fabRef = useRef(null);
  const chatWindowRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const conversationFlow = {
    'Identifikasi jenis sampah': [
      {
        question: 'Apa warna sampah yang ingin Anda identifikasi?',
        options: ['Hijau', 'Kuning', 'Merah', 'Biru'],
        responseKey: 'wasteColor'
      },
      {
        question: 'Bagaimana bentuk fisik sampah tersebut?',
        options: ['Padat', 'Cair', 'Bubuk', 'Lembek'],
        responseKey: 'wasteForm'
      },
      {
        question: 'Dari kategori mana sampah ini berasal?',
        options: ['Rumah tangga', 'Industri', 'Medis', 'Elektronik'],
        responseKey: 'wasteOrigin'
      },
      {
        conclusion: 'Berdasarkan informasi Anda:\n- Warna: {wasteColor}\n- Bentuk: {wasteForm}\n- Asal: {wasteOrigin}\n\nIni kemungkinan sampah jenis: {wasteType}',
        wasteTypes: {
          'Hijau-Padat-Rumah tangga': 'Organik (daun, sisa makanan)',
          'Kuning-Padat-Rumah tangga': 'Plastik kemasan',
          'Merah-Cair-Medis': 'Sampah B3 medis',
          'Biru-Padat-Elektronik': 'E-waste (limbah elektronik)'
        }
      }
    ],
    'Informasi daur ulang': [
      {
        question: 'Material apa yang ingin Anda daur ulang?',
        options: ['Plastik', 'Kertas', 'Logam', 'Kaca'],
        responseKey: 'recycleMaterial'
      },
      {
        question: 'Apa yang ingin Anda ketahui tentang daur ulang {recycleMaterial}?',
        options: ['Cara memilah', 'Proses daur ulang', 'Tempat penerima', 'Manfaat'],
        responseKey: 'recycleQuestion'
      },
      {
        conclusion: 'Informasi {recycleQuestion} {recycleMaterial}:\n\n{recycleInfo}',
        recycleInfo: {
          'Cara memilah-Plastik': 'Pisahkan berdasarkan nomor resin (1-7), bersihkan dari sisa makanan',
          'Proses daur ulang-Kertas': 'Dihancurkan menjadi pulp, dibersihkan, kemudian dicetak ulang',
          'Tempat penerima-Logam': 'TPS3R terdekat atau bank sampah khusus logam',
          'Manfaat-Kaca': 'Mengurangi energi hingga 40% dibanding membuat kaca baru'
        }
      }
    ],
    'Lokasi TPS3R terdekat': [
      {
        question: 'Lokasi Anda saat ini di wilayah mana?',
        options: ['Denpasar', 'Badung', 'Gianyar', 'Tabanan'],
        responseKey: 'location'
      },
      {
        question: 'Jenis sampah apa yang ingin Anda buang?',
        options: ['Umum', 'B3 rumah tangga', 'Elektronik', 'Medis'],
        responseKey: 'wasteType'
      },
      {
        conclusion: 'TPS3R terdekat di {location} untuk {wasteType}:\n\n{tpsLocation}',
        tpsLocations: {
          'Denpasar-Umum': 'TPS3R Denpasar Selatan, Jl. Tukad Pakerisan No. 12',
          'Badung-B3 rumah tangga': 'TPS3R Mengwi, Jl. Raya Kapal No. 45',
          'Gianyar-Elektronik': 'TPS3R Gianyar, Jl. Astina Utara No. 8',
          'Tabanan-Medis': 'TPS3R Kediri, Jl. Gunung Agung No. 21'
        }
      }
    ]
  };

  const [position, setPosition] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth - 80 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight - 80 : 0
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 60),
        y: Math.min(prev.y, window.innerHeight - 60)
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      const chatWidth = chatWindowRef.current.offsetWidth;
      const chatHeight = chatWindowRef.current.offsetHeight;
      
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;
        
        if (prev.x + chatWidth > window.innerWidth) {
          newX = window.innerWidth - chatWidth - 20;
        }
        
        if (prev.y - chatHeight < 0) {
          newY = chatHeight + 20;
        }
        
        return { x: newX, y: newY };
      });
    }
  }, [isOpen]);

  const handleOptionSelect = (option) => {
    const userMessage = {
      id: Date.now(),
      text: option,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    const path = conversation.answers[0] || option;
    const currentFlow = conversationFlow[path] || conversationFlow['Identifikasi jenis sampah'];
    const currentStep = conversation.currentStep;
    
    if (currentStep < currentFlow.length) {
      const nextStep = currentStep + 1;
      const flowStep = currentFlow[currentStep];
      
      if (flowStep.conclusion) {
        const conclusion = generateConclusion(flowStep, [...conversation.answers, option], path);
        
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: conclusion,
            sender: 'bot',
            isConclusion: true
          }
        ]);
        
        setConversation({
          currentStep: nextStep,
          answers: [...conversation.answers, option],
          isComplete: true
        });
      } else {
        const nextQuestion = generateQuestion(flowStep, [...conversation.answers, option]);
        
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + 1,
            text: nextQuestion,
            sender: 'bot',
            options: flowStep.options
          }
        ]);
        
        setConversation({
          currentStep: nextStep,
          answers: [...conversation.answers, option],
          isComplete: false
        });
      }
    }
  };

  const generateQuestion = (flowStep, answers) => {
    let question = flowStep.question;
    
    if (flowStep.responseKey) {
      const responseKeyIndex = conversationFlow[answers[0]].findIndex(
        step => step.responseKey === flowStep.responseKey
      );
      
      if (responseKeyIndex !== -1 && answers[responseKeyIndex + 1]) {
        question = question.replace(`{${flowStep.responseKey}}`, answers[responseKeyIndex + 1]);
      }
    }
    
    return question;
  };

  const generateConclusion = (flowStep, answers, path) => {
    let conclusion = flowStep.conclusion;
    const answerKey = answers.slice(1).join('-');
    
    for (let i = 1; i < answers.length; i++) {
      const key = `{${conversationFlow[path][i-1].responseKey}}`;
      conclusion = conclusion.replace(new RegExp(key, 'g'), answers[i]);
    }
    
    if (flowStep.wasteTypes) {
      conclusion = conclusion.replace('{wasteType}', flowStep.wasteTypes[answerKey] || 'tidak diketahui');
    } else if (flowStep.recycleInfo) {
      conclusion = conclusion.replace('{recycleInfo}', flowStep.recycleInfo[answerKey] || 'informasi tidak tersedia');
    } else if (flowStep.tpsLocations) {
      conclusion = conclusion.replace('{tpsLocation}', flowStep.tpsLocations[answerKey] || 'lokasi tidak ditemukan');
    }
    
    return conclusion;
  };

  const resetConversation = () => {
    setMessages([
      { 
        id: Date.now(), 
        text: 'Hai! Ada yang bisa saya bantu lagi?', 
        sender: 'bot',
        options: [
          'Identifikasi jenis sampah',
          'Informasi daur ulang',
          'Lokasi TPS3R terdekat'
        ]
      }
    ]);
    
    setConversation({
      currentStep: 0,
      answers: [],
      isComplete: false
    });
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    const rect = fabRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = Math.max(
      20,
      Math.min(
        e.clientX - dragOffset.x, 
        window.innerWidth - 60
      )
    );
    
    const newY = Math.max(
      20,
      Math.min(
        e.clientY - dragOffset.y,
        window.innerHeight - 60
      )
    );
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

   if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div
        ref={fabRef}
        className={`chatbot-fab ${isOpen ? 'active' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
        onClick={() => !isDragging && setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaComment />}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="chatbot-window"
          style={{
            left: `${position.x}px`,
            top: `${position.y - 400}px`
          }}
        >
          <div className="chatbot-header">
            <h3>WasteBot</h3>
            <p>AI Pembantu Sampah</p>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
                
                {msg.options && !conversation.isComplete && (
                  <div className="message-options">
                    {msg.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {conversation.isComplete && (
              <button 
                className="restart-button"
                onClick={resetConversation}
              >
                <FaRedo /> Mulai Percakapan Baru
              </button>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotFab;