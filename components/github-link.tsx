import cn from 'classnames'
import { FaGithub } from 'react-icons/fa'

type Props = {
  className?: string
  repo?: string | null
}

const GithubLink = ({ className, repo }: Props) => {
  return (
    <>
      {repo != null && (
        <div className={cn('flex flex-row items-center', className)}>
          <FaGithub className="mr-1" />
          <a href={`https://github.com/${repo}`}>{repo}</a>
        </div>
      )}
    </>
  )
}

export default GithubLink
