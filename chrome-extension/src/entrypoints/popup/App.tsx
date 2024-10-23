import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';


function App() {
  const [active , setActive] = useState<boolean>(false)
  const activeClass = active ? 'active' : 'inactive'
  return (
    <>
      <div className=' p-10'>
      gfdsgdfgjlklkjlksdgfdsfgdsgsdfgdsgsdfgsdgsdfg gfdgsdfgsdfgggggggggggggggggggggggggg
      </div>
      <p onClick={()=>setActive(!active)} className="bg-gray-200 text-red-700 hello">
        Click on the WXT and React logos to learn more
      </p>
      <div>
        <h1 className={activeClass}>hello</h1>
      </div>
    </>
  );
}

export default App;
