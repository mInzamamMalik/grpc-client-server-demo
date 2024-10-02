# React client not working

Unfortunately, gRPC cannot be called directly from a web browser because it relies on HTTP/2 and the browser's security model doesn't support direct gRPC calls. Browsers restrict gRPC because they don't allow the raw HTTP/2 framing required for gRPC requests, and they block cross-origin requests that don't follow standard HTTP request patterns.

However, you can use gRPC-Web to call gRPC services from the browser without using an Envoy proxy by leveraging the grpc-web protocol on the server itself. To achieve this, you need to implement gRPC-Web support directly in your gRPC server, depending on the backend language you are using.

what proxy does is it setup an additional server between your client and gRPC server, in this setup client does not make request to gRPC server directly and instead make request to proxy server HTTP/1 and the proxy server translate it to HTTP/2 and forward it to your actual server, and response comes back in similar way.


## conclusion:

since broswer does not allow to call HTTP/2 request it is not a good idea to call grpc request directly from browser, if you use proxy translation it makes it complicated and even slower then normal rest api because of addition hop, grpc is best for server to server communication until browser start supporting http/2.