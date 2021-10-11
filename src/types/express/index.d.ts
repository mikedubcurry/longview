declare module 'express-serve-static-core' {
  interface Request {
    user?: {id: number}
  }
  interface Response {
    user?: {id: number}
  }
}

export {}