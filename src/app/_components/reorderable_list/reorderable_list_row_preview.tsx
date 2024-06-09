import React from 'react'
import { TravelCardData } from './reorderable_list'

export default function ReorderableListRowPreview({travelCardData} : {travelCardData: TravelCardData}) {
  return (
    <div className="min-w-40 h-20 bg-white border rounded-lg shadow-lg flex items-center p-2">
      <img className="w-10 h-10 rounded-lg mr-2" src={travelCardData.image_url} alt="location_image" />
    <span className="text-sm font-semibold">{travelCardData.name}</span>
    </div>
  )
}
