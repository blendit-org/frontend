import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive';
import { SectionCards } from '@/components/ui/section-cards';



const Home = () => {
  return (
    <div>
      <div className='mt-20 mb-15'>
        <ChartAreaInteractive />
      </div>
      <div className='mb-15'>
        <SectionCards />
      </div>
    </div>
  );
};

export default Home;