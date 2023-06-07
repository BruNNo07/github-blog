import axios from "axios"
import { GetStaticProps } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, GithubLogo, Users } from "phosphor-react"

interface HomeProps{
  user:{
    followers: number;
    username:string;
    perfilURL: string;
    name: string;
    work: string;
    bio: string;
  }
  issues:{
    number: number;
    title:string;
    body:string;
    created_at: Date;
  }[]
}
export default function Home({ user, issues }:HomeProps) {
  return (
    <div id="conteiner" className="flex flex-col items-center justify-center pb-20">
      <header id="info-person" className="flex gap-8 p-8 justify-around items-center bg-baseProfile rounded-lg w-[864px] h-[212px] mt-[-5%] shadow-black shadow-sm">
        <div className="shadow-gray-900 shadow-md">
          <Image src={'https://github.com/brunno07.png'} alt="" width={148} height={148} className="rounded-lg"/>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <header className="flex justify-between items-center">
            <h1 className="text-baseTitle text-lg">
              {user.name}
            </h1>

            <a href={user.perfilURL} className="flex gap-2 items-center">
              <p className="text-blue">GitHub</p>
              <ArrowUpRight size={18} className="text-blue"/>  
            </a>
            
          </header>
          <div className="flex flex-wrap flex-1">
            <p className="text-baseText line-clamp-3 overflow-hidden text-ellipsis">{user.bio}</p>
          </div>
          <footer className="flex gap-4">
            <div className="flex gap-2">
              <GithubLogo size={18} className="text-baseLabel"/>
              <p className="text-baseTitle text-sm">{user.username}</p>
            </div>
            <div className="flex gap-2">
              <Users size={18} className="text-baseLabel"/>
              <p className="text-baseTitle text-sm">{user.followers} Seguidores</p>
            </div>
          </footer>
        </div>
      </header>

      <main className="w-[864px] mt-16">
        <form action="">
          <header className="flex justify-between items-center mb-3">
            <h1 className="text-baseSubTitle text-lg">Publicações</h1>
            <p className="text-baseSpan text-sm">{issues.length} publicações</p>
          </header>
          <input type="text" placeholder="Buscar Conteúdo" className="w-full px-4 py-3 bg-baseInput text-baseLabel text-md rounded-md border border-baseBorder active:border-blue"/>
        </form>
        <div className="grid grid-cols-2 mt-12 gap-8">
          {issues.map(issues=>{
            const currentDate= Number(new Date())
            const createdAtDate = Number(new Date(issues.created_at))
            const difference:number = (currentDate - createdAtDate)
            const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
            return (
              <Link href={`/posts/${issues.number}`}>
                <div className="bg-basePost flex flex-col p-8 rounded-md max-h-96 cursor-pointer border border-transparent hover:border-baseLabel transition-all ease-in-out delay-75 ">
                  <header className="flex justify-between items-center gap-4 mb-5">
                    <h1 className="text-baseTitle text-xl">
                      {issues.title}
                    </h1>
                    <p className="text-baseSpan text-sm whitespace-nowrap">há {daysAgo} dias</p>
                  </header>
                  <section>
                    <p className="text-ellipsis w-full overflow-hidden line-clamp-4 text-md text-baseText">{issues.body}</p>
                  </section>
                </div>
              </Link>
            )
          })}
          
        </div>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  
  const responseUser = await axios.get(`https://api.github.com/users/${'brunno07'}`);
  const user = responseUser.data;

  const responseIssues = await axios.get(`https://api.github.com/search/issues?q=repo:brunno07/dt-money`)
  const issues = responseIssues.data.items

  console.log(issues)
  
  return{
    props:{
      user:{
        followers: user.followers,
        username: user.login,
        perfilURL: user.html_url,
        name: user.name,
        work: user.company,
        bio: user.bio
      },
      issues
    },
    revalidate: 60 * 60 * 1
  }
}