import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ReflectionService, } from '@grpc/reflection'; // for server reflection
import path from 'path';

const PROTO_PATH = path.resolve('./proto/helloworld.proto');

// Load the gRPC protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const helloProto = grpc.loadPackageDefinition(packageDefinition).helloworld;

const reflection = new ReflectionService(packageDefinition); // for server reflection


// Define the SayHello RPC method
function sayHello(call, callback) {
    console.log('Hello API is called');
    const name = call.request.name;
    callback(null, { message: `Hello, ${name}!` });
}
// Define the SayHi RPC method
function sayHi(call, callback) {
    console.log('Hi API is called');
    const name = call.request.name;
    callback(null, { message: `Hi, ${name}!` });
}

const server = new grpc.Server();
reflection.addToServer(server); // for server reflection

server.addService(helloProto.Greeter.service, {
    SayHello: sayHello,
    SayHi: sayHi
    // more methods goes here
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running at http://127.0.0.1:50051');
    // server.start(); // No need to call server.start() anymore

});

