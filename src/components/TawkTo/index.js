import React, { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

const TalkToComponent = () => {
  useScript("https://embed.tawk.to/5f401761cc6a6a5947adc27c/default") // chia
  //useScript("https://embed.tawk.to/5d02b7f653d10a56bd79fa83/default") // municourt
  return null
}

export default TalkToComponent;