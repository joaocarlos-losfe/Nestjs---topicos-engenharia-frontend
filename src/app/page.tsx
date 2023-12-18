"use client"

import { Post } from "@/models/post.dto";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([]);

  const currentUser = "joaocarlos"

  const [messageText, setMessageText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [subjectText, setSubjectText] = useState('');

  async function loadPosts(){
    try{
      const response = await axios.get<Post[]>("http://localhost:5000/messages/");

      if(response.status == 200){
        setPosts(response.data.reverse());
      }
    }
    catch{

    }
  }

  async function sendMessage() {

    if(subjectText == "" || messageText == "")
      return;
    
    try{
      
      const data = {
        message: messageText,
        subject: subjectText,
        user:    "joaocarlos"
      }

      const response = await axios.post("http://localhost:5000/messages/", data);

      if(response.status == 201){
        await loadPosts();
      }
       
    }
    catch{

    }
  }

  async function deletePost(postId: string) {

    
    try{
      
      const response = await axios.delete(`http://localhost:5000/messages/${postId}`);

      if(response.status == 200){
        await loadPosts();
      }
       
    }
    catch{

    }
     
  }

  async function sendResponse(messageId: string) {
    try{
      
      const data = {
          response: responseText,
          user: "antonio",
          messageId: messageId
      }

      const response = await axios.post("http://localhost:5000/responses", data);

      if(response.status == 201){
        await loadPosts();
      }
            
    }
    catch (e){
      console.log(e)
    }
    
  }

  useEffect(()=> {
     loadPosts();
  },[]);

  return (
    <main className=" flex min-h-screen flex-col items-center justify-between p-24">
      <div className="max-w-screen-xl">
      <form className="m-4">
        <label htmlFor="pergunta" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">enviar</label>
          <div className="relative">
              <input onChange={(e)=> setMessageText(e.target.value)} type="text" id="pergunta" className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite sua mensagem" required/>
              <button type="button" onClick={()=> sendMessage()} className="text-white absolute end-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Enviar</button>
          </div>
      </form>
        <select onChange={(e)=> setSubjectText(e.target.value)} id="subject" className="mb-2  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block m-4 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Defina uma categoria</option>
          <option value="Programação">Programação</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Culinária">Culinária</option>
          <option value="Games">Games</option>
          <option value="Exatas">Exatas</option>
          <option value="Humanas">Humanas</option>
          <option value="Geral">Geral</option>
        </select>
        {
          posts.map((data)=> 
            <div className="p-6 m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="rounded-md flex-row mb-2">
                  <h4 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.user}</h4> 
                  {currentUser == data.user && <button type="button" onClick={()=> deletePost(data.id)} className="text-red-500 hover:text-red-700  text-2" >Excluir mensagem</button>}
                </div>
                <h4 className="mb-2 text-sm font-bold tracking-tight text-gray-600 dark:text-white">{data.subject}</h4>
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-400 dark:text-white">{data.createdAt.toLocaleString().split('T')[0].split('-').reverse().join('/')}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{data.message}</p>
                <details open  className=" min-w-full inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <summary  className="text-left" >{`Respostas (${data.responses.length})`}</summary>
                    {
                      data.responses.reverse().map((value)=> 
                      <div>
                        <br/>
                        <div className="text-left">
                          <h2 className="font-bold ">{`por ${value.user}`}</h2>
                          <h5 className="mb-2 text-sm">{value.createdAt.toLocaleString().split('T')[0].split('-').reverse().join('/')}</h5>
                          <p className="mb-1 text-sm font-bold">{value.response}</p>
                        </div>   
                        <hr className="mb-4"/>
                      </div>
                    )}
                </details>
                
                <form className="mt-8">
                  <label htmlFor="responder" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">enviar</label>
                    <div className="relative">
                        <input onChange={(e)=> setResponseText(e.target.value)} type="text" id="responder" className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite sua resposta" required/>
                        <button type="button" onClick={()=> sendResponse(data.id)} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">responder</button>
                    </div>
                </form>
            </div>
          )}
        </div>
    </main>
  )
}
