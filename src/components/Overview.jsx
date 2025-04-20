import { useState, useEffect } from 'react';
export default function Overviews() {
    const [data, setData] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        fetch("http://localhost:3001/dashboardStats")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data);
            });
    }, []);

    return (
        <>
            <div className="flex mb-10">
                <img src="src/assets/img/Squares four 1.png" alt="" />
                <h2 className="font-bold ml-3 text-2xl">Overview</h2>
            </div>
            <div className="flex">
                {
                    data.map((data) => (
                        <div key={data.id} className='mr-35 bg-pink-100 rounded w-2xs'>
                            <div className="flex justify-between mb-5">
                                <div className="flex flex-col">
                                    <h2 className='font-bold'>{data.title}</h2>
                                    <h2 className='font-bold text-2xl'>{data.unit} {data.value}</h2>
                                </div>
                                <img src={data.changeDirection} alt="" />
                            </div>
                            <div className="flex">
                                <img src={data.icon} width={15} alt="" />
                                <span>{data.changePercent}{data.percent} {data.description}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}