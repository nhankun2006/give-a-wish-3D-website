'use client';

import Fish from './Fish';
import Jellyfish from './Jellyfish';
import Starfish from './Starfish';
import Crab from './Crab';
import Coral from './Coral';

const creatures = [
    // Đàn cá
    { type: 'fish', left: '12%', top: '20%', size: '120px', variant: 'blue' },
    { type: 'fish', left: '68%', top: '15%', size: '96px', variant: 'pink' },
    { type: 'fish', left: '35%', top: '65%', size: '85px', variant: 'blue' },
    { type: 'fish', left: '85%', top: '50%', size: '105px', variant: 'pink' },
    { type: 'fish', left: '5%', top: '75%', size: '70px', variant: 'pink' },

    // Sứa biển
    { type: 'jellyfish', left: '15%', top: '40%', size: '100px' },
    { type: 'jellyfish', left: '90%', top: '25%', size: '80px' },
    { type: 'jellyfish', left: '50%', top: '1%', size: '120px' },

    // Sao biển & Cua (Nằm ở đáy)
    { type: 'starfish', left: '15%', top: '85%', size: '60px' },
    { type: 'starfish', left: '75%', top: '82%', size: '70px' },
    { type: 'crab', left: '30%', top: '88%', size: '65px' },
    { type: 'crab', left: '60%', top: '86%', size: '55px' },
];

export default function OceanCreatures() {
    return (
        <>
            {creatures.map((item, i) => {
                if (item.type === 'fish') return <Fish key={i} style={{ left: item.left, top: item.top, width: item.size }} variant={item.variant} />;
                if (item.type === 'jellyfish') return <Jellyfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                if (item.type === 'starfish') return <Starfish key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                if (item.type === 'crab') return <Crab key={i} style={{ left: item.left, top: item.top, width: item.size }} />;
                return null;
            })}
            <Coral style={{ left: '5%', bottom: '3%', width: '130px' }} />
            <Coral style={{ right: '8%', bottom: '1%', width: '150px' }} />
        </>
    );
}