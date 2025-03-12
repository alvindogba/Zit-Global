import { GraduationCap, Users, Target, ArrowRight, Earth, BookOpen, Laptop, Lightbulb, BookOpenText, Globe, HandHelping, Trophy } from 'lucide-react';
import MotivationBgImg from '../asset/images/Graduation-Bg-Img.jpg';
import { Link } from 'react-router-dom';
export default function MotivationPage() {
  const groundWork = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      number: "80+",
      description: "Industry-aligned curriculum taught by experienced professionals."
    },
    {
      icon: Users,
      title: "Supportive Community",
      number: "100+",
      description: " Learn alongside passionate peers in a collaborative environment."
    },
    {
      icon: Target,
      title: "Career Focus",
      number: "20+",
      description: "Practical skills and guidance for your tech career journey."
    }
  ];

  const visions = [
    {
      icon: Target,
      description: "Every Liberian has access to quality education that leads to stable, well-paying jobs."
    },
    {
      icon: Target,
      description: "An expanding community of skilled professionals drives Liberia’s growth and technological advancement."
    },
    {
      icon: Target,
      description: "Graduates contribute to their communities, creating a self-sustaining system of education and empowerment."
    },
    {
      icon: Target,
      description: "Liberia becomes a leader in the digital transformation of Africa."
    }
  ]

  const believeExplanations = [
    {
      icon: BookOpen,
      title: "Education Without Barriers ",
      description: "We believe education should be accessible to everyone. Our free programs ensure no one is left behind due to financial limitations."
    },
    {
      icon: Laptop,
      title: "Real-World Skills",
      description: "Our hands-on, industry-aligned curriculum prepares students for jobs in the tech sector, helping them build practical skills for the future."
    },
    {
      icon: BookOpenText,
      title: "We believe that breaking the cycle of systemic poverty starts with accessible education.",
      description: "In Liberia, poverty and high unemployment restrict countless people from accessing quality education, trapping many in a cycle of limited opportunities. With an average income of less than $2.00 a day, most Liberians cannot afford tuition for advanced education, leaving potential innovators, engineers, and tech leaders without a chance to pursue their dreams. By making ZIT entirely free, we remove financial obstacles and empower every Liberian—regardless of socioeconomic background—to acquire the skills they need for meaningful work. With this access, they are better equipped to support themselves, uplift their families, and build a better future."
    },
    {
      icon: Globe,
      title: "We believe that Liberia’s workforce can and must meet the demands of the modern world.",
      description: "Liberia’s economy is growing, but its local talent pool is struggling to keep pace with global standards. Essential roles in technology, engineering, agriculture, and other sectors often require foreign expertise, as there aren’t enough skilled local candidates to fill them. ZIT’s free programs and specialized training aim to close this gap by aligning education with Liberia’s most urgent workforce needs. Through our TTM model, we ensure that students not only learn technical skills but also receive the ongoing support they need to become leaders and innovators, ready to drive Liberia forward."
    },
    {
      icon: Lightbulb,
      title: "We believe that the Teach, Tutor, Mentor (TTM) model is vital to solving Liberia’s education crisis.",
      description: "Liberia’s education system has faced countless challenges, from overcrowded classrooms and limited resources to underqualified teachers. The 2013 University of Liberia entrance exam failure—where more than 25,000 high school graduates did not pass—exposed just how urgent these challenges are. Our TTM model is designed to address this crisis by ensuring students have continuous support and guidance. Teaching provides them with high-quality, relevant education; tutoring reinforces understanding; and mentorship prepares them for both personal and professional success. By involving each ZIT graduate in the TTM model, we create a system of mutual support that grows stronger with each new student."
    },
    {
      icon: HandHelping,
      title: "We believe in building a culture of giving back, creating a ripple effect that benefits all of Liberia.",
      description: "At ZIT, our free tuition model is more than a solution—it’s a call for shared responsibility. We ask our graduates to “pay it forward” by using their skills to teach, tutor, or mentor future students. This creates a culture of generosity and empowerment, where each graduate’s success helps uplift others. As they give back, they not only strengthen our educational community but also contribute to a Liberia that values growth, support and shared success."
    },
    {
      icon: Trophy,
      title: "We believe in preparing Liberians to compete and excel in the global economy.",
      description: "Today’s world is interconnected, and technology skills are in high demand worldwide. ZIT’s focus on tech and job-ready skills ensures that our students are prepared not only for opportunities in Liberia but also for those in the global economy. Our curriculum includes essential digital skills, programming, cybersecurity, and data science competencies—skills that open doors to global job opportunities, remote work, and entrepreneurship. By equipping our students with globally relevant skills, we empower them to earn a stable income, contribute to Liberia’s economy, and bring growth to their communities."
    },
    {
      icon: Earth,
      title: "We believe in Liberia’s potential to lead Africa’s digital transformation. ",
      description: "Africa is experiencing a digital revolution, and Liberia has the talent and drive to play a leading role. ZIT’s TTM model not only provides technical skills but also cultivates the critical thinking and confidence needed to lead this transformation. With specialized training and mentorship, we empower Liberia’s youth to create solutions tailored to Africa’s unique needs, contributing to a thriving digital economy. Our graduates are not just job seekers; they are innovators, entrepreneurs, and leaders who can help shape the future of Liberia and Africa as a whole."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-navy-600 text-white">
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:4px_4px]"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">
            Join Our Community of Future Tech Leaders
          </h1>
          <p className="text-md text-gray-200 max-w-2xl mb-8">
            Transform your passion for technology into a successful career. Learn, grow, and connect with like-minded individuals in our supportive learning environment.
          </p>
          <Link
          to="/admission"
          className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
          Start Your Journey <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>

      {/* What we believe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <h2 className="text-2xl font-bold md:text-lg text-primary my-5">
          Why Zongea Institute of Technology Exists & Why Education Is Free for All Liberians 
          </h2>
          <p className="text-black mb-2 text-sm">
            At Zongea Institute of Technology (ZIT), we believe in a Liberia where everyone has the opportunity to unlock their potential, acquire job-ready skills, and contribute to a more prosperous future. We established ZIT with a transformative vision: to break down barriers and open doors for all Liberians through high-quality, accessible, and free education.
            <br /><br />
            Our unique approach—<span className="text-primary font-bold">Teach, Tutor, Mentor (TTM)</span>—is designed to support students at every stage of their learning journey, empowering them to thrive in a world that is increasingly driven by technology and innovation.
            <br /><br />
            We believed every Liberians should have:
          </p>
      </div>

      {/* Explaining What we believe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
        <div className="flex flex-col gap-8">
            {believeExplanations.map((explanation, index) => (
              <div key={index} className="flex items-center sm:flex-row gap-8">
                <div className="w-24 h-24 rounded-tl-3xl rounded-br-3xl bg-primary shadow-xl flex items-center justify-center">
                 <explanation.icon className="w-12 h-12 text-white"/>
                </div>
                <div className='w-[80%]'>
                  <h2 className="text-lg font-bold text-primary mb-2">{explanation.title}</h2>
                  <p className="text-black mb-2 text-sm">{explanation.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary mb-8">
          Laying the Groundwork: Year One Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {groundWork.map((work, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg text-center">
                <work.icon className="w-12 h-12 mb-4 mx-auto text-secondary-yellow" />
                <h3 className="text-2xl font-bold mb-3 text-primary">{work.number}</h3>
                <h3 className="text-lg font-semibold mb-3">{work.title}</h3>
                <h3 className="text-sm text-black">{work.description}</h3>
              </div>
            ))}  
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mb-4 bg-gray-50">
        <h2 className="text-lg font-bold text-primary mt-12 ">
          Our Vision: Opportunity and Empowerment for Every Liberian
        </h2>
        <p className="text-black text-sm mb-4">At ZIT, we see a future where:</p>
        <div className="flex flex-col gap-4">
          {visions.map((vision, index) => (
            <div key={index} className="flex items-center gap-4">
              <vision.icon className="w-4 h-4 text-secondary-yellow" />
              <p className="text-black text-sm">{vision.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-white py-16" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 90, 0.6), rgba(0, 0, 90, 0.6)), url(${MotivationBgImg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Ready to Begin Your Journey?</h2>
          <p className="text-md text-white mb-8 max-w-2xl mx-auto">
            Take the first step towards your future in technology. Join our community of learners and innovators.
          </p>
          <Link
          to="/admission"
          className="bg-secondary-yellow font-bold text-xs hover:px-6 hover:py-2 text-white px-3 sm:px-6 py-1 sm:py-2 transition-colors rounded-md inline-flex items-center justify-center"
          >
          Apply Now <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}



