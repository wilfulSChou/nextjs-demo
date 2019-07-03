import { cloneElement } from 'react'

const style = {
    width: '100%',
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20
}

export default ({ children, renderer = <div /> }) => {
    // console.log(renderer);
    
    const newElement = cloneElement(renderer, {
        style: Object.assign({}, renderer.props.style, style),
        children
    })

    // console.log(newElement);
    

    return newElement
    // return <Comp style={style}>{children}</Comp>
}