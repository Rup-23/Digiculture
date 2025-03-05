import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/role'
import React from 'react'


const AdminRoute = async () => {

  // Protect the page from users who are not admins
  const isAdmin = await checkRole('digi_culture')
  if (!isAdmin) {
    redirect('/')
  }

  return (
    <div className='py-20 text-center'>
      <h1 className='text-black text-4xl'>Only Admin can access this page</h1>
      </div>
  )
}

export default AdminRoute