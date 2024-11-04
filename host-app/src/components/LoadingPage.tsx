import LoadingPikachu from '../assets/loading-pikachu.gif'


function LoadingPage() {
    return (
        <div className=' flex justify-center items-center h-full bg-[#fff2b2]'><img src={LoadingPikachu} alt="" className='filter drop-shadow-[0_0_10px_rgba(0,0,0)]'   /></div>
    )
}

export default LoadingPage