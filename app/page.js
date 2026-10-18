'use client';
import { useState } from 'react';

export default function Home() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');

  const handleGenerate = async () => {
    if (!image) return alert("សូមជ្រើសរើសរូបភាពដើមសិន!");
    setLoading(true);
    setVideoUrl('');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('prompt', prompt);

    try {
      const res = await fetch('/api/generate-video', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
      } else {
        alert("ការបង្កើតវីដេអូមានបញ្ហា៖ " + data.error);
      }
    } catch (err) {
      alert("មិនអាចតភ្ជាប់ទៅកាន់ប្រព័ន្ធបានទេ!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>បំប្លែងរូបភាពទៅជាវីដេអូ AI</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>រូបភាព៖</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={{ width: '100%' }} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>ពាក្យបញ្ជា (Prompt)៖</label>
        <input type="text" placeholder="ឧទាហរណ៍៖ ធ្វើឱ្យសក់ហើរតាមខ្យល់..." value={prompt} onChange={(e) => setPrompt(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
      </div>

      <button onClick={handleGenerate} disabled={loading} style={{ width: '100%', padding: '12px', background: '#4F46E5', color: '#fff', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
        {loading ? 'កំពុងបង្កើតវីដេអូ...' : 'ចាប់ផ្ដើមបង្កើតវីដេអូ'}
      </button>

      {videoUrl && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>លទ្ធផលវីដេអូ៖</label>
          <video src={videoUrl} controls style={{ width: '100%', borderRadius: '5px' }} />
        </div>
      )}
    </div>
  );
  }
                                                       
