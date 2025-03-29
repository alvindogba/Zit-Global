import { Link } from 'react-router-dom';
import MotivationBgImg from '../../asset/images/Graduation-Bg-Img.jpg';

function Statics() {
    return (
        <div className="text-white py-8" style={{
            backgroundImage: `linear-gradient(rgba(3, 3, 83, 0.9), hsla(240, 97.70%, 16.90%, 0.95)), url(${MotivationBgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="font-noto text-2xl font-bold mb-4 text-white">Our Programs by Number</h2>
                <p className="font-roboto text-md text-white mb-8 max-w-2xl mx-auto">
                    Don't waste any more time, Register Now to secure your spot.
                </p>
                <div className='flex justify-center space-x-8'>
                    <div className="block">
                        <h2 className="text-3xl font-bold text-white mb-4">+50</h2>
                        <p className="text-md text-white mb-8 max-w-2xl mx-auto">Mentees</p>
                    </div>
                    <div className="block">
                        <h2 className="text-3xl font-bold text-white mb-4">+40</h2>
                        <p className="text-md text-white mb-8 max-w-2xl mx-auto">Tutees</p>
                    </div>
                    <div className="block">
                        <h2 className="text-3xl font-bold text-white mb-4">+300</h2>
                        <p className="text-md text-white mb-8 max-w-2xl mx-auto">Students</p>
                    </div>

                </div>
                <Link
                    to="/admission"
                    className="hover:border hover:border-white hover:font-semibold hover:bg-transparent text-xs bg-secondary text-white px-3 sm:px-6 py-2 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
                >
                    Apply Now
                </Link>
            </div>
        </div>
    )
}

export default Statics;

