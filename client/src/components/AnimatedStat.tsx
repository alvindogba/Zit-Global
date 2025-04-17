import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

export const AnimatedStat = ({
  value,
  suffix = '',
  label,
  duration = 2.5,
}: AnimatedStatProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className="text-center text-white">
      <div className="text-4xl md:text-5xl font-bold mb-2">
        {inView ? (
          <CountUp
            end={value}
            duration={duration}
            suffix={suffix}
          />
        ) : (
          '0' + suffix
        )}
      </div>
      <div className="text-sm md:text-base text-white">{label}</div>
    </div>
  );
};
