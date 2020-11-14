import { JobProvider } from '../context/JobContext'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <JobProvider>
        <Component {...pageProps} />
    </JobProvider>
  )
}

export default MyApp
