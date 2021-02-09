const VerticalAlign = ( props ) => (
    <span style={{ display: "table", height: "100%", width: "100%" }}>
    <span style={{ display: "table-cell", verticalAlign: "middle" }}>
      {
          props.children
      }
    </span>
    </span>
) 
    
export default VerticalAlign;