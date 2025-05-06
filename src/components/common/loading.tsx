
import Loader from '../global/Loader'

export const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <div className="animate-pulse flex flex-col items-center gap-2">
        <Loader />
      </div>
    </div>
  )
}

export default Loading
