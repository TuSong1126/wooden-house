import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { CircleLoading } from '@/components/basic/circle-loading'

export default function TimeAxisPage() {
  return (
    <>
      <div>postOffice</div>
      <br />
      <Suspense fallback={<CircleLoading />}>
        <Outlet />
      </Suspense>
    </>
  )
}
