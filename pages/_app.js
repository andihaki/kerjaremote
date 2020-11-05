import { JobProvider } from '../context/JobContext'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <JobProvider>
      <div className="container mx-auto my-10 max-w-xl">
        <Component {...pageProps} />
      </div>
    </JobProvider>
  )
}

export default MyApp
