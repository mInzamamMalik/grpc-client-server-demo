
referance: https://github.com/grpc/grpc-web?tab=readme-ov-file#code-generator-plugins

1. make proto folder with proto file inside of it

2. install protoc cli `brew install protobuf`

3. install javascript codegen plugins `npm install -g protoc-gen-js` and `npm install -g protoc-gen-grpc-web`

4. genrate with command `protoc -I=<PROTO_DIRECTORY_NAME> <FILE_NAME> --js_out=import_style=<IMPORT_STYLE>,binary:<OUTPUT_DIRECTORY> --grpc-web_out=import_style=<IMPORT_STYLE>,mode=grpcwebtext:<OUTPUT_DIRECTORY>`

e.g: `protoc -I=./proto helloworld.proto --js_out=import_style=commonjs,binary:./proto --grpc-web_out=import_style=commonjs,mode=grpcwebtext:./proto`

> js_out import style expected one of: closure, commonjs, browser, es6. 
> grpc-web_out import style expected one of: commonjs, typescript. 