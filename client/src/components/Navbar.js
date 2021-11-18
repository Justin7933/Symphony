import React from 'react'
import tw from 'tailwind-styled-components'; 


const Navbar = () => {

const Container1 = tw.div`
    flex-1
    items-center
    flex-col
    w-full
    bg-indigo-600
    text-grey-900
    poppins
    h-1/2
`

    return (
    
        <Container1> <h1 className="text-center">Hello World </h1> </Container1>
    )
}


export default Navbar
