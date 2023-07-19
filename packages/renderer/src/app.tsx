import React , {FC,useState,useCallback} from 'react'
import './app.css'
import Editor from './editor'
import Preview from './preview'
const App: FC = () => {
    const [doc,setDoc]=useState<string>('# Hello World!\n')
    const handleDocChange = useCallback((newDoc:string)=>{
        setDoc(newDoc)
    },[])
    return (
        <div className='app'>
            <Editor onChange={handleDocChange} initialDoc={doc}/>
            <Preview doc={doc}/>
        </div>
    )
    // const [count, setCount] = useState(0)
    // return (
    //     <div className='app'>
    //         <header className='app-header'>
    //             <p>Count: {count}</p>
    //             <button onClick={() => setCount(count + 1)}>+</button>
    //         </header>
    //     </div>
    // )
}  
export default App