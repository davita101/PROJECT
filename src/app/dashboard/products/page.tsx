import { LeftChart } from '@/components/chart-left'
import { ChartResult } from '@/components/charts'
import { Card } from '@/components/ui/card'
import { RoundChart } from '@/components/roundchart'
import React from 'react'

export default function page() {
  return (
    <>
      <div className='flex w-full xl:flex-row flex-col'>
        <Card>
          <ChartResult />
          <RoundChart />
        </Card>
        <LeftChart />
      </div>
    </>
  )
}
