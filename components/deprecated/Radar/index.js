import React from 'react';
import Radar from 'react-tech-radar';

const SEGMENTS = [
    { name: 'Domain Competence', color: 'rgba(240, 56, 177, 0.2)', value: 1 },
    { name: 'Pragmatism', color: 'rgba(0, 196, 156, 0.2)', value: 1 },
    { name: 'Work Ethic', color: 'rgba(255, 187, 40, 0.2)', value: 1 },
    { name: 'Coaching & Learning', color: 'rgba(255, 128, 66, 0.2)', value: 1 },
    { name: 'Communication', color: 'rgba(0, 136, 254, 0.2)', value: 1 },
];

function App() {

    const setup = {
        rings: [
            'Never',
            'Rarely',
            'Sometimes',
            'Frequently',
            'Always',
        ],
        quadrants: SEGMENTS.map((s) => s.name),
        // colorScaleIndex: 0,
        data: [
            {
                name: '',
                quadrant: 'Communication',
                ring: "Sometimes",
                onClick: () => console.log('aaa')

            },
            {
                name: 'TypeScript',
                quadrant: 'languages',
                ring: "trial"
            },
            {
                name: 'Storybook',
                quadrant: 'tools',
                ring: "adopt"
            }
        ]
    };

    return (
        <div className="App">
            <Radar {...setup} />
        </div>
    );
}

export default App;
