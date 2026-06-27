'use client';

import Fish from './Fish';
import Whale from './Whale';   // <--- Gọi bé Cá Voi vào đây
import Starfish from './Starfish';
import Crab from './Crab';
import Coral from './Coral';
import Turtle from './Turtle';
import Octopus from './Octopus';

const creatures = [
    // Đàn cá
    { type: 'fish', left: '10%', top: '18%', size: '120px', variant: 'blue' },
    { type: 'fish', left: '72%', top: '15%', size: '96px', variant: 'pink' },
    { type: 'fish', left: '32%', top: '65%', size: '85px', variant: 'blue' },
    { type: 'fish', left: '88%', top: '45%', size: '105px', variant: 'pink' },
    { type: 'fish', left: '8%', top: '58%', size: '70px', variant: 'pink' },

    // Bé Cá Voi (Thay thế hoàn toàn cho Sứa, kích thước ngang nên để to hơn xíu)
    { type: 'whale', left: '15%', top: '32%', size: '140px' },
    { type: 'whale', left: '82%', top: '22%', size: '120px' },
    { type: 'whale', left: '48%', top: '2%', size: '160px' },

    // Bạch Tuộc
    { type: 'octopus', left: '26%', top: '50%', size: '100px' },
    { type: 'octopus', left: '75%', top: '62%', size: '95px' },

    // Rùa biển
    { type: 'turtle', left: '86%', top: '10%', size: '110px' },
    { type: 'turtle', left: '5%', top: '8%', size: '90px' },

    // Sao biển & Cua
    { type: 'starfish', left: '16%', top: '82%', size: '60px' },
    { type: 'starfish', left: '78%', top: '84%', size: '70px' },
    { type: 'crab', left: '28%', top: '86%', size: '65px' },
    { type: 'crab', left: '58%', top: '88%', size: '55px' },
];

export default function OceanCreatures() {
    return (
        <>
            {creatures.map((item, i) => {
                if (item.type === 'fish') return <Fish key={i} style={{ left: item.left, top: item.top, width: item.size }} variant={item.variant} />;
                if (item.type === 'whale') return <Whale key={i} style={{ left: item.left, top: item.top, width: item.size }} />; // <--- Render Cá Voi
                if (item.type === 'octopus') return <Octopus key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                if (item.type === 'turtle') return <Turtle key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                if (item.type === 'starfish') return <Starfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                if (item.type === 'crab') return <Crab key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                return null;
            })}
            
            <Coral style={{ left: '5%', bottom: '3%', width: '130px' }} />
            <Coral style={{ right: '6%', bottom: '1%', width: '150px' }} />
        </>
    );
}