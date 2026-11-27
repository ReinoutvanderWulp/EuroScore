import {ComponentProps, FunctionComponent, ReactNode} from 'react'
import {Heading} from '@/components/ui/heading'

interface StyledTitleProps {
  children?: ReactNode
  style?: ComponentProps<typeof Heading>['style']
}

const StyledTitle: FunctionComponent<StyledTitleProps> = ({children, style}) => {
  return (
    <Heading size="lg" className="mb-3 mt-4 text-typography-900" style={style}>
      {children}
    </Heading>
  )
}

export default StyledTitle