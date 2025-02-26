import { useEffect, useState } from "react"
import data from "./utils/data"

let counter = 0;

const App = () => {
  const [state,setState] = useState(data);

  console.log(state)
 
  useEffect(() => {
     
    const allClicked = state.every(item => item.isClicked)
    if(allClicked){
      const intervalId = setInterval(() => {
        setState(prev => {
          return prev.map(item => {
            if(item.order === counter){
              console.log(item.order,counter)
              item.order = 0;
              item.isClicked = false;
            }
            return item
          })
        })
        setTimeout(() => {
          counter--;
          if(counter <= 0) clearInterval(intervalId)
        },100)
      },500)
    }
  },[state])


   function handleClick(e : React.MouseEvent<HTMLButtonElement>){
    
     const id = Number((e.target as HTMLButtonElement).id.split('-')[1]);
     setState(prev => {
      return prev.map(item => {
         if(item.id === id){ 
          item.isClicked = true
          counter+=1;
          item.order = counter;
        }
           return item
        })
     })
   }
  return (
    <div className="flex flex-col items-center gap-8 pt-16 min-h-screen bg-zinc-800 text-white">
      <h1 className="text-5xl">Grid Lights</h1>
      <p>Click all 9 cells to see the effect!</p>
    <div className=" grid grid-cols-3 gap-4">
    {  
      state.map(item => {
          return <button key={item.id} id={`btn-${item.id}`}  style={ item.isClicked ? {backgroundColor : 'coral',cursor : 'not-allowed'} : undefined} className="w-24 h-24  border-2 border-bg-zinc-700 cursor-pointer" onClick={handleClick}></button>
      })
}
    </div>
    </div>
  )
}

export default App