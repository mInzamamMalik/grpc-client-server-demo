import React, { useState } from 'react';
import { GreeterClient } from './proto/helloworld_grpc_web_pb';
import { HelloRequest } from './proto/helloworld_pb';


const client = new GreeterClient('http://localhost:50051'); // Replace with your gRPC web server address

function App() {
  const [name, setName] = useState('World');
  const [response, setResponse] = useState('');
  const [hiResponse, setHiResponse] = useState('');

  const callSayHello = () => {
    const request = new HelloRequest();
    request.setName(name);

    client.sayHello(request, {}, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setResponse(res.getMessage());
      }
    });
  };

  const callSayHi = () => {
    const request = new HelloRequest();
    request.setName(name);

    client.sayHi(request, {}, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        setHiResponse(res.getMessage());
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>gRPC Web Client</h1>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
      />
      <div style={{ marginTop: '20px' }}>
        <button onClick={callSayHello}>Say Hello</button>
        {response && <h2>Response from SayHello: {response}</h2>}
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={callSayHi}>Say Hi</button>
        {hiResponse && <h2>Response from SayHi: {hiResponse}</h2>}
      </div>
    </div>
  );
}

export default App;
