import { useEffect, useState } from "react";

function TextBoxContent() {
  const exampleJSON = [
    {
      name: "Andrew",
      age: 21,
      secretIdentity: "Klashan"
    },
  ];

  const parseJsonIntoConsoleStr = (item, index) => {
    return (
      <p key={index}>
        {item.name}'s true identity is {item.secretIdentity}
      </p>
    );
  };

  return exampleJSON.map(parseJsonIntoConsoleStr);
}

export default function App() {
  const [input, setinput] = useState("");
  const [serverdata, setserverData] = useState();
  useEffect(() => { 
    const response = fetch('http://localhost:3000/').then(
      (res) => {
        const result = res.json();
        return result
      }
    ).then(
      (res) => {
        setserverData(res);
        console.log(res);
      }
    );

    
  }, [])



  return (
    <div className="App">
      <h1>Textbox example</h1>
      <div className="Github">
        <TextBoxContent />
        <input onChange={(e) => {
          setinput(e.target.value);
        }}>
        </input>
      </div>
      <div>{
        // serverdata[0].language
        }
      </div>
      {
        serverdata?.map((data) => (<div>{data.language}</div>))
      }
    </div>
  );
}
