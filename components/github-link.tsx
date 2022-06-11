import { FaGithub } from 'react-icons/fa'

type Props = {
  repo?: string | null
}

const GithubLink = ({ repo }: Props) => {
  return (
    <>
      {repo != null && (
        <div className="flex flex-row items-center">
          <FaGithub className="mr-1" />
          <a href={`https://github.com/${repo}`}>{repo}</a>
        </div>
      )}
    </>
  )
}

export default GithubLink
