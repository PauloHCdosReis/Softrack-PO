import React from 'react'
import { View, ViewProps } from 'react-native'

import { styled } from 'nativewind'

type ContainerProps = ViewProps & {
  children: React.ReactNode
}
const Main = ({ children, ...props }: ContainerProps) => {
  return (
    <View
      className="min-h-[100%] max-h-[100%]  bg-light-fundo dark:bg-dark-fundo"
      {...props}
    >
      {children}
    </View>
  )
}
const Container = styled(Main)
export { Container }