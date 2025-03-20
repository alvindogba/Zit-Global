import { Carousel } from '../Carousel';
import img1 from "../../asset/images/Technology - Digital.jpg"
import img2 from "../../asset/images/herobg2.jpg"
import img3 from "../../asset/images/bigBrother.jpg"

const carouselSlides = [
    {
      title: "Tech Education for the Future",
      subtitle: "Empowering Future Tech Leaders Across the Globe",
      description: "We provide world-class technology education through our innovative Teaching Through Mentorship (TTM) model and Big Brother program, preparing students for leadership in the tech industry.",
      image: img1,
      ctaText: "Explore Programs",
      ctaLink: "/courses"
    },
    {
      title: "Teaching Through Mentorship",
      subtitle: "A Revolutionary Learning Approach",
      description: "Our unique TTM model pairs students with industry professionals and experienced mentors worldwide, creating a practical, hands-on learning environment that bridges the gap between education and industry demands.",
      image: img2,
      ctaText: "Learn About TTM",
      ctaLink: "/tutorship-program"
    },
    {
      title: "Guiding Hands Program: Empowering Youth",
      subtitle: "Transforming Challenges into Opportunities",
      description: "Through personalized, one-to-one mentoring, the Guiding Hands Program connects children facing adversity with caring mentors. Our approach empowers young individuals to excel academically, build lasting self-confidence, and steer clear of risky behaviors. Backed by a diverse community of volunteers and donors, we ensure measurable, life-changing impact for every child we serve.",
      image: img3,
      ctaText: "Join Our Community",
      ctaLink: "/guiding-hands"
    }
  ];

const LandingSection = () => {
    return(
        <section
          id="hero"
          title='Hero'
          className="bg-primary-900 min-h-screen relative flex items-center justify-center overflow-hidden w-full"
        >
          <div className="text-white bg-primary-900 absolute inset-0 " />
          <Carousel slides={carouselSlides} />
        </section>  
    )
}

export default LandingSection;