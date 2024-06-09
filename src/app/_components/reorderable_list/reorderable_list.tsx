"use client";
import React, { useState, DragEvent, useRef } from 'react'
import ReorderableListRow from './reorderable_list_row';
import { nanoid } from "nanoid";
import ReorderableListRowPreview from './reorderable_list_row_preview';

export interface TravelCardData {
  id: string,
  name: string,
  location: string,
  image_url: string
}

const example_list_data: TravelCardData[] = [
  { id: nanoid(), name: "Scotland Island", location: "Sydney, Australia", image_url: "https://picsum.photos/id/10/2500/1667" },
  { id: nanoid(), name: "The Charles Grand Brasserie & Bar", location: "Lorem ipsum, Dolor", image_url: "https://picsum.photos/id/11/2500/1667" },
  { id: nanoid(), name: "Bridge Climb", location: "Dolor, Sit amet", image_url: "https://picsum.photos/id/12/2500/1667" },
  { id: nanoid(), name: "Scotland Island", location: "Sydney, Australia", image_url: "https://picsum.photos/id/13/2500/1667" },
  { id: nanoid(), name: "Clam Bar", location: "Etcetera veni, Vidi vici", image_url: "https://picsum.photos/id/14/2500/1667" },
  { id: nanoid(), name: "Vivid Festival", location: "Sydney, Australia", image_url: "https://picsum.photos/id/15/2500/1667" } 
];

export function ReorderableList() {
  const [list, setList] = useState(example_list_data);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  function onDragStart(e: DragEvent, index: number) {
    e.dataTransfer.setData('text/plain', index.toString());

    setDraggedIndex(index);
    
    if (dragPreviewRef.current) {
      e.dataTransfer.setDragImage(dragPreviewRef.current, 0, 0);
    }
  }

  function onDragOver(e: DragEvent, index: number) {
    e.preventDefault();
    setHoveredIndex(index);
  }

  function onDrop(e: DragEvent<Element>, index: number) {
    const droppedItemIndex: number = parseInt(e.dataTransfer.getData('text'));
    if (index === droppedItemIndex) {
      return;
    }

    setList((prevList: TravelCardData[]) => {
      const itemBeingDragged = prevList[droppedItemIndex];
      const newList = [...prevList];

      newList.splice(droppedItemIndex, 1);
      newList.splice(index, 0, itemBeingDragged);

      return newList;
    });

    setHoveredIndex(null);
    setDraggedIndex(null);
  }

  return (
    <div className="flex flex-col max-h-[90%] w-full sm:w-2/3 md:w-1/2 lg:w-1/3 overflow-y-auto border border-black rounded-lg">
    <div ref={dragPreviewRef} style={{ position: 'absolute', top: '-10000px', left: '-10000px' }}>
      {draggedIndex !== null && <ReorderableListRowPreview travelCardData={list[draggedIndex]} />}
    </div>

    {list.map((travelCardData, index) => (
      <React.Fragment key={travelCardData.id}>
        <ReorderableListRow
          travelCardData={travelCardData}
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => onDragOver(e, index)}
          onDrop={(e: DragEvent<Element>) => onDrop(e, index)}
          isHoveredOn={hoveredIndex === index}
        />
      </React.Fragment>
    ))}
  </div>
  );
}