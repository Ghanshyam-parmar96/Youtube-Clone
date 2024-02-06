import { ReactNode } from "react"

const ContentWrapper = ({children}: {children: ReactNode}) => {
  return (
    <div className="max-w-screen-2xl mx-auto relative">
      {children}
    </div>
  )
}

export default ContentWrapper