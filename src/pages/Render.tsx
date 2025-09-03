import { ChartAreaInteractive } from '@/components/ui/chart-area-interactive';
import { DataTable } from '@/components/ui/data-table';
import { SectionCards } from '@/components/ui/section-cards';
import { RenderFile } from '@/components/modules/Render/fileInput';
import { OutputFile } from '@/components/modules/Render/outputFile';

const Render = () => {
  // ✅ Proper mock data as an array of objects
  const tableData = [
    {
      id: 1,
      header: "Hello",
      type: "string",
      status: "string",
      target: "string",
      limit: "string",
      reviewer: "string",
    },
  ];
    
  const fileUrl = "https://unsplash.com/photos/a-modern-yellow-mushroom-lamp-against-a-gradient-background-KR2oNIFA5bI";
  const fileName = "Chobi";

  return (
    <div>
      <div className='mt-20 mb-15'>
        <RenderFile />
      </div>
      <div className='mb-15'>
        <OutputFile fileUrl={fileUrl} fileName={fileName} />
      </div>
      <div className='mb-15'>
        <ChartAreaInteractive />
      </div>
      <div className='mb-15'>
        <SectionCards />
      </div>
    </div>
  );
};

export default Render;
