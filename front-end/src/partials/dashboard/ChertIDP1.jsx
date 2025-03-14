import React from 'react';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import DoughnutChart from '../../charts/DoughnutChart';
import PolarChart from '../../charts/PolarChart';
import Fintech from '../../pages/Fintech';

function ChertIDP1({chartData, width, height, title }) {

  

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      </header>
      {/* Change the height attribute to adjust the chart height */}
      <PolarChart data={chartData} width={width} height={height} />
      
    </div>
  );
}

export default ChertIDP1;
