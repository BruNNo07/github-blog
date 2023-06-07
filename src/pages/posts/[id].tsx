import axios from "axios"
import { GetServerSideProps, GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { GithubLogo, ArrowLeft,Calendar, Chat , ArrowUpRight} from "phosphor-react"

interface PostProps{
  post:{
    body: string;
    title: string;
    created_at:Date;
    comments: number;
    repository_url: string;
    username: string;
  }
}

export default function Posts({ post }:PostProps){
  return(
    <div id="conteiner" className="flex flex-col items-center justify-center pb-20">
      <header id="info-post" className="flex flex-col gap-4 p-8 justify-around items-start bg-baseProfile rounded-lg w-[864px] h-[212px] mt-[-5%] shadow-black shadow-sm">
        <header className="flex w-full justify-between items-center">
          <Link href="/" className="flex gap-1 items-center text-blue text-md">
            <ArrowLeft size={18}/>
            Voltar
          </Link>
          <a href={post.repository_url} className="flex gap-1 items-center text-blue text-md">
            Ver no Github
            <ArrowUpRight size={18} />
          </a>
        </header>
        <h1 className="text-baseTitle text-2xl">{post.title}</h1>
        <div className="flex justify-start gap-4">
          <div className="flex gap-2 text-baseSpan">
            <GithubLogo size={18}/>
            <p>{post.username}</p>
          </div>
          <div className="flex gap-2 text-baseSpan">
            <Calendar size={18}/>
            <p>há 2 dias</p>
          </div>
          <div className="flex gap-2 text-baseSpan">
            <Chat size={18}/>
            <p>{post.comments} comentários</p>
          </div>
        </div>
      </header>
      <main className="p-8 text-baseText w-[864px] h-auto text-clip">
        {post.body}
      </main>
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async ({query}) => {
  const response = await axios.get(`https://api.github.com/repos/brunno07/dt-money/issues/${query.id}`)
  const {body,title,created_at,comments,repository_url} = response.data

  console.log(response)
  return{
    props:{
      post:{
        body,
        title,
        created_at,
        comments,
        repository_url,
        username: response.data.user.login
      }
    }
  }
}