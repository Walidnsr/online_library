
import 'express-session';

declare module 'express-session' {
  interface Session {
    userId?: number;  // Add userId property to the session
  }
}
