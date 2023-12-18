export type ResponseData = {
    id: string,
    response: string,
    user: string,
    messageId: string,
    createdAt: Date,
    updatedAt: Date,
}
  
export type Post = {
    id: string,
    message: string
    subject: string,
    user: string,
    createdAt: Date,
    updatedAt: Date,
    responses: ResponseData[]
}