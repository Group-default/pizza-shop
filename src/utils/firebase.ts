import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZMmsIWNWReCIPG0WHuZ8eU06zu_fWHN0",
  authDomain: "pizzadrua-ffa15.firebaseapp.com",
  projectId: "pizzadrua-ffa15",
  storageBucket: "pizzadrua-ffa15.appspot.com",
  messagingSenderId: "271345613595",
  appId: "1:271345613595:web:772398cc76b686d209f1be",
  measurementId: "G-2RBGN2WBGX"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);


export async function streamToUint8Array(stream: NodeJS.ReadableStream): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];

  for await (const chunk of stream) {
    if (typeof chunk === 'string') {
      chunks.push(Buffer.from(chunk, 'utf-8'));
    } else {
      chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
    }
  }

  return Buffer.concat(chunks);
}