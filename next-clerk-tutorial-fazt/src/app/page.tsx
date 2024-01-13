import Link from 'next/link'
import { Button } from '@/components/ui/button'



export default function Page() {
  return (
    <div>
      
      <h1>Home Page</h1>

      <Button variant="outline" size="sm">Click me</Button>
      
      <Link href="/dashboard">click to dashboard</Link>
      
      
      </div>
    
  )
}
