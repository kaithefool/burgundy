const { parse, serialize } = require('cookie');

const { io, onServer } = require('../../start/socketIO');

onServer(() => {
  io.engine.on('initial_headers', (headers, req) => {
    // parse cookies
    req.headers.cookies = parse(req.headers.cookie);

    headers['Set-Cookie'] = serialize('meh', 'abc', {
      httpOnly: true,
    });
    headers['set-Cookie'] = serialize('foo', 'bar', {
      httpOnly: true,
    });

    console.log(headers);
  });
});

// io.use((socket, next) => {
//   const { headers } = socket.request;

//   headers.cookies = parse(headers.cookie);

//   return next();
// });

io.use((socket) => {
  console.log(socket.request.headers.cookies);
});
