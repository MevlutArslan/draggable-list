"use client";
import React, { DragEvent, useState } from 'react'
import { TravelCardData } from './reorderable_list'
import { GrLocationPin } from 'react-icons/gr'

interface ReorderableListRowProps {
    travelCardData: TravelCardData,
    onDragStart: (e: DragEvent<HTMLDivElement>) => void,
    onDragOver: (e: DragEvent<HTMLDivElement>) => void,
    onDrop: (e: DragEvent) => void,
    isHoveredOn: boolean
}

export default function ReorderableListRow({
    travelCardData,
    onDragStart,
    onDragOver,
    onDrop,
    isHoveredOn
}: ReorderableListRowProps) {
    const [isBeingDragged, setIsBeingDragged] = useState(false);

    function handleOnDragStart(e: DragEvent<HTMLDivElement>) {
        setIsBeingDragged(true);
        onDragStart(e); // Pass index here
    }

    function handleOnDragEnd(e: DragEvent<HTMLDivElement>) {
        setIsBeingDragged(false);
    }
    

    return (
        <>
            {isHoveredOn && <div className="min-h-1 max-h-1 w-full bg-blue-500"></div>}
            <div draggable className={`flex flex-row w-full h-40 items-center justify-start  ${isBeingDragged ? "opacity-50" : "opacity-100"}`}
                onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd} onDragOver={onDragOver} onDrop={onDrop}>
                <img className='w-20 h-20 m-5 rounded-lg' src={travelCardData.image_url} alt='location_image'
                    style={{ backgroundImage: "url(/loading-gif.gif)", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />
                <div className='flex flex-col'>
                    <span className="text-sm sm:text-sm md:text-base font-semibold">{travelCardData.name}</span>
                    <div className='flex flex-row text-xs sm:text-xs md:text-sm text-gray-400'>
                        <GrLocationPin />
                        <span>{travelCardData.location}</span>
                    </div>
                </div>
            </div>
        </>
    );
}