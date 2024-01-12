import ws from "ws";
import jwt from 'jsonwebtoken'

let onlineClients: any[] = [];
const JWT_SECRET = process.env.JWT_SECRET || '';

export let socketServer: any = null;

export function setupWebSocket(server: any): void {

  socketServer = new ws.WebSocketServer({server});

  socketServer.on('connection', (connection:any, req: any) => {
    console.log('webSocket server running!');
    
    // might be more cookies than one
    const cookies: string = req.headers.cookie;
    
    let token: string | null = '';
    if (cookies) token = decodeCookieToken(cookies);

    
    // send message to client
    //connection.send('hello!!');

    // can only send string:
    //connection.send(token);

    verifyToken(token, connection);

    sendOnlineClients();

    // on client message
    connection.on('message', (data: any) => {
      console.log('client message!');
    });

    connection.on('close', (code: any, reason:any) => {
      console.log(`client code: ${code} was disconnected! reason ${reason}`);
      sendOnlineClients();
    });
  });
}

function decodeCookieToken(cookies: string): string | null {
  const tokenCookies: string[] | undefined = cookies.split(';');
  const tokenCookie: string | undefined = tokenCookies.find((str:string) => {
    str = str.trim();
    return str.startsWith('token=');
  });

  if (!tokenCookie) return null; 

  const token: string = tokenCookie.split('=')[1]; 
  return token;
}

function sendOnlineClients(): void {
  onlineClients = [...socketServer.clients].map((c => c.userId));
  const onlinesStr: string = JSON.stringify({
    onlines: onlineClients,
  });

  [...socketServer.clients].forEach((client:any) => {
    // send message to each online client
    client.send(onlinesStr);
  });
}

// get data out of cookie and put it in socket_object
function verifyToken(token: string | null, connection: any): void {
  if (token) {
    jwt.verify(token, JWT_SECRET, {}, (error: any, data: any) => {
      if (error) throw error;

      // authUser.id
      const {id, email} = data;
      connection.userId = id;
      connection.email = email;
    });
  }
}