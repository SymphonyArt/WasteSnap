import { useState, useRef, useEffect } from 'react';
import { FaCamera, FaImage, FaTrash, FaSearch } from 'react-icons/fa';
import '../../styles/pindai.css';

const PindaiPage = () => {
  const [activeTab, setActiveTab] = useState('camera');
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);

  const startCamera = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { facingMode: 'environment' }
    });
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onplaying = () => {
        setCameraReady(true);
        console.log("Kamera siap digunakan");
      };
    }
  } catch (err) {
    console.error("Error kamera:", err);
    setCameraReady(false);
    alert("Tidak dapat mengakses kamera. Pastikan izin diberikan.");
  }
};


  const captureImage = () => {
    if (videoRef.current?.srcObject && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      setActiveTab('result');
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult("Hasil analisa: 70% Organik, 30% Anorganik");
      setIsAnalyzing(false);
      setActiveTab('analysis');
    }, 2000);
  };

  const resetScan = () => {
    setCapturedImage(null);
    setAnalysisResult('');
    setActiveTab('camera');
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="pindai-container">
      <h1>Pindai Sampah</h1>
      
      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeTab === 'camera' ? 'active' : ''}`}
          onClick={() => setActiveTab('camera')}
        >
          Kamera
        </button>
        <button 
          className={`tab-btn ${activeTab === 'result' ? 'active' : ''}`}
          onClick={() => capturedImage && setActiveTab('result')}
          disabled={!capturedImage}
        >
          Hasil Gambar
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => analysisResult && setActiveTab('analysis')}
          disabled={!analysisResult}
        >
          Analisis
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'camera' && (
          <div className="camera-tab">
            <div className="video-container">
              <video ref={videoRef} autoPlay playsInline muted />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className="camera-controls">
              <button onClick={startCamera} className="btn btn-start">
                <FaCamera /> {videoRef.current?.srcObject ? 'Kamera Aktif' : 'Mulai Kamera'}
              </button>
              <button 
                onClick={captureImage} 
                className="btn btn-capture" 
                disabled={!cameraReady}
              >
                <FaCamera /> Ambil Gambar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'result' && capturedImage && (
          <div className="result-tab">
            <div className="image-preview">
              <img src={capturedImage} alt="Captured" />
            </div>
            <div className="action-buttons">
              <button onClick={analyzeImage} className="btn btn-analyze">
                <FaSearch /> {isAnalyzing ? 'Menganalisa...' : 'Analisis Gambar'}
              </button>
              <button onClick={resetScan} className="btn btn-reset">
                <FaTrash /> Ambil Ulang
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="analysis-tab">
            <div className="image-preview">
              <img src={capturedImage} alt="Analysed" />
            </div>
            <div className="analysis-result">
              <h3>Hasil Analisis:</h3>
              <div className="result-text">
                {analysisResult || 'Tidak ada hasil analisis'}
              </div>
            </div>
            <button onClick={resetScan} className="btn btn-reset">
              <FaTrash /> Scan Baru
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PindaiPage;