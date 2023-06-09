'use client';

import { useState } from "react";
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('../modal'));
// const BackButton = dynamic(() => import('../backButton'), { ssr: false });

export default function OpenModal() {

  const [showMore, setShowMore] = useState(false);

  return (
    <div>
      <button onClick={() => setShowMore(!showMore)}>Toggle</button>
   
      {showMore && <Modal />}

    </div>
  )
}