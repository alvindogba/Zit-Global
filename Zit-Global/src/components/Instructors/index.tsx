import InstructorCard from './InstructorCard';
import JonathanImg from '../../asset/images/jonathan-williams.jpg';
import EvelynaImg from '../../asset/images/evelyna-sawah.jpg';
import AlvinImg from '../../asset/images/alvin-dogba.jpg';
import ThompsonImg from '../../asset/images/thompson-daiminah.jpg';

const instructors = [
  {
    name: "Evelyna B Sawah", 
    subject: "Front-End Developer",
    description: "Evelyna, a dedicated graduate of Zongea Institute of Technology, is building her expertise in front-end development with a focus on creating engaging and interactive user interfaces. Currently serving as a Teacher’s Assistant at Zongea, Evelyna’s journey from student to mentor reflects the institute’s transformative impact. She inspires students to explore the latest web technologies, equipping them with the skills to design seamless and visually captivating web experiences, while contributing to Zongea’s mission of excellence in tech education.",
    image: EvelynaImg
  },
  {
    name: "Alvin A Dogba Jr.",
    subject: "Full-Stack Development",
    description: "Alvin, a proud graduate of Zongea Institute of Technology, is building his career as a Full Stack Developer and currently serves as a Teacher’s Assistant at Zongea. With foundational knowledge in both front-end and back-end technologies, Alvin is passionate about supporting students in their learning journey. He shares his growing industry experience in the classroom, helping students develop essential skills to become competent developers and contribute to Zongea’s legacy of excellence in tech.",
    image: AlvinImg
  },
  {
    name: "Thompson N Daiminah Jr",
    subject: "Full-Stack Developer",
    description: "Thompson, a proud graduate of Zongea Institute of Technology, has established himself as a skilled Full Stack Developer with a focus on delivering beautiful, and interactive responsive websites. As a legacy builder at Zongea, Thompson’s teaching approach emphasizes creativity, attention to detail, and the importance of understanding user experience. He inspires his students to innovate and push the boundaries of front-end development.",
    image: ThompsonImg
  },
  {
    name: "Jonathan H K Williams",
    subject: "Graphic Design",
    description: "Jonathan, a talented Zongea graduate, is now a leader in the field of Graphic Design and UI/UX Design. With a strong focus on creating visually appealing and user-friendly experiences, Jonathan teaches students how to merge creativity with usability. As a legacy builder at Zongea, he instills a passion for design in his students, guiding them toward becoming innovative designers who shape the digital world.",
    image: JonathanImg
  },
];

export default function Instructors() {
  return (
    <section className="py-16 px-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-primary">Meet Our Graduates and Legacy Builders</h2>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {instructors.map((instructor, index) => (
            <InstructorCard key={index} {...instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}