import CircularProgress from '@mui/material/CircularProgress/CircularProgress'

interface LoadingProps {
    isEnabled: boolean;
}

function Loading() {
  return (
    <>
        <div className="loader-container">
            <div className="loader loader-top-50">
                <CircularProgress color="secondary" size={50} />
            </div>
        </div>
    </>
  )
}

export default Loading
