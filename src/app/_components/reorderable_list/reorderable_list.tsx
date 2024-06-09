"use client";
import React, { useState, DragEvent } from 'react'
import ReorderableListRow from './reorderable_list_row';
import { nanoid } from "nanoid";

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
  const [list, setList] = useState(example_list_data)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  function onDragStart(e: DragEvent, index: number) {
    e.dataTransfer.setData('text/plain', index.toString())
  }

  function onDragOver(e: DragEvent, index: number) {
    e.preventDefault()
    setHoveredIndex(index)
    // console.log("Dragging Over Element:", e.target)
  }

  function onDrop(e: DragEvent<Element>, index: number) {
    const droppedItemIndex: number = parseInt(e.dataTransfer.getData('text'))
    if (index === droppedItemIndex) {
      // item has been dropped at its original position, do nothing.
      return
    }

    setList((prevList: TravelCardData[]) => {
      const itemBeingDragged = prevList[droppedItemIndex]
      const newList = [...prevList]

      // remove the dragged item from the list
      newList.splice(droppedItemIndex, 1)
      // insert the itemBeingDragged at the dropped index
      newList.splice(index, 0, itemBeingDragged)

      return newList
    })

    setHoveredIndex(null)
  }

  return (
    <div className="flex flex-col max-h-[90%] w-full sm:w-2/3 md:w-1/2 lg:w-1/3 overflow-y-auto border border-black rounded-lg">
      {list.map((travelCardData, index) => (
          <ReorderableListRow
          key={travelCardData.id}
            travelCardData={travelCardData}
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={(e: DragEvent<Element>) => onDrop(e, index)}
            isHoveredOn={hoveredIndex === index}
          />
        ))}
    </div>
  )
}
