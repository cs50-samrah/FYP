export default function Button(props) {
    return <button style={{
        color: 'white',
        border: 'none',
        background: '#DB915E',
        borderRadius: 4,
        padding: 10,
        ...props.style
    }}
        onMouseOver={(e) => {
            e.target.style.background = 'orange' 
        }}
        onMouseLeave={(e) => {
            e.target.style.background = '#DB915E'
        }}
        onClick={props.onClick}

    >{props.children}</button>
}