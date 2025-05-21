"use client";
import Loader from '@/components/common/Loader';
import Retrive from '@/components/retrivecom';
import TitleSection from '@/components/landing/title-section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const Find = () => {
  // Basic form state
  const [secretKey, setSecretKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [arewedone, setAreWeDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!secretKey.trim()) {
      toast('Error', { description: 'Please enter a secret key' });
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Submitting secret key:', secretKey);
      
      // Make the API call
      const response = await axios.get(`http://localhost:4000/retrive-link`, {
        params: { SecretKey: secretKey }
      });
      
      console.log('API Response:', response.data);
      
      // Update state with the response
      const result = response.data;
      setResponse(result);
      setAreWeDone(true);
      
      // Show appropriate toast message
      if (result && result.data && result.data.length > 0) {
        toast('Success', {
          description: `Found ${result.data.length} link(s)`
        });
      } else {
        toast('No links found', {
          description: 'No links found with this secret code'
        });
      }
    } catch (error: any) {
      setError(error.message || 'Error retrieving links');
      console.error('Error retrieving links:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className='overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center'
      >
        <div className='md:w-full w-[80%] blur-[120px] rounded-full h-32 absolute bg-brand/brand-primaryblue/50 -z-10 sm:top-52 top-40' />

        <div>
          <TitleSection pill='❓ Your Secret Code'
            title={`Enter Your Secret Code to Retrieve!`}
          />

          <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center my-10 gap-y-5'>
            <div className='w-full max-w-xs'>
              <Input 
                type='text' 
                placeholder='Enter secret code here'
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className='mb-2'
              />
            </div>
            
            <Button className='p-6' type='submit' disabled={loading}>
              {!loading ? 'Get Carter' : <Loader />}
            </Button>
          </form>
        </div>
        <section className='sm:px-6 grid grid-cols-1 gap-4 mt-10 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {arewedone && response && response.data && response.data.length > 0 && (
            response.data.map((item: any, index: number) => (
              <Retrive key={index} url={item.links} imgurl={item.imgurl} title={item.title} />
            ))
          )}
          {arewedone && (!response?.data || response.data.length === 0) && (
            <div className="col-span-full text-center p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-medium">No links found</h3>
              <p className="text-sm text-muted-foreground mt-2">Please check your secret code and try again</p>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center p-6 bg-destructive/10 rounded-lg">
              <h3 className="text-lg font-medium text-destructive">Error</h3>
              <p className="text-sm text-destructive/80 mt-2">{error}</p>
            </div>
          )}
        </section>
      </section>
    </>
  );
}

export default Find;