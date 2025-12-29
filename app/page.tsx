'use client'

import { BookOpenCheck } from 'lucide-react';
import Card from '@/components/Card';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Home() {

  const [email, setEmail] = useState(''); 

  const handleSubscribe = () => {
    fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }).then(res => res.json()).then(data => {
      if(data.error) {
        toast.error(data.error);
      } else {
        toast.success('Subscribed successfully');
      }
    }).catch(err => {
      toast.error('Fail to subscribe');
    }).finally(() => {
      setEmail('');
    });

  };

  return (
    <>
      <div className="min-h-screen bg-while">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <div className='flex items-center gap-3'>
            <BookOpenCheck />
            <h1 className='text-2xl font-bold'>Daily News</h1>
          </div>
          <nav className='flex items-center gap-6'>
            <a href="/" className='hover:text-gray-500'>About</a>
            <a href="/" className='hover:text-gray-500'>Contact</a>
          </nav>
        </header>

        {/* Main Content */}
        <div className='max-w-7xl mx-auto px-8 py-12'>
          {/** title */}
          <div className='text-center mb-16'>
            <h2 className='text-5xl font-bold mb-6'>Daily Briefs of AI</h2>
            <p className='text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed'>
              Stay up to date with the latest news in the world of AI.
            </p>
          </div>

          {/** input and subscribe button */}
          <div className='text-center flex items-center justify-center gap-4'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              className='px-4 py-2 border border-gray-300 rounded-lg'
            />
            <button onClick={handleSubscribe} className='bg-black text-white px-6 py-3 rounded-lg hover:bg-bule-600 transition-colors'>Subscribe</button>
          </div>

          {/** cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-16'>
            <Card title="AI" description="Stay up to date with the latest news in the world of AI." />
            <Card title="Startups" description="Get the latest updates on the most promising startups in the tech industry." />
            <Card title="Tech" description="Discover the latest technological advancements and innovations changing the world." />
          </div>

        </div>
      </div>
    </>
  );
}
