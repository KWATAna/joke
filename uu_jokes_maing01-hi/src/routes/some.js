//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useRef } from "uu5g04-hooks";
import "uu_plus4u5g01-bricks";


import Config from "./config/config.js";
//@@viewOff:imports
const Form = (props) => {
    return <UU5.Forms.ContextForm onCancel={props.cancel} onSave={props.save}>
        <UU5.Forms.Text name="name" label="name" />
        <UU5.Forms.Text name="desc" label="desc" />
        <UU5.Forms.Text name="rate" label="rate" />
    </UU5.Forms.ContextForm>
}
const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Home",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  welcomeRow: () => Config.Css.css`
    padding: 56px 0 20px;
    max-width: 624px;
    margin: 0 auto;
    text-align: center;
  
    ${UU5.Utils.ScreenSize.getMinMediaQueries("s", `text-align: left;`)}
  
    .uu5-bricks-header {
      margin-top: 8px;
    }
    
    .plus4u5-bricks-user-photo {
      margin: 0 auto;
    }
  `,
};

export const Some = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  //@@viewOn:render
render() {
    const countRef = useRef(6);
    const modalRef = useRef();
    const [show, setShow] = useState(3)
    const [itemList, setItemList] = useState([
        {
          id: 1,
          name: "Name 1",
          desc: "Some desc 1",
          rate: 4,
        },
        {
          id: 2,
          name: "Name 2",
          desc: "Some desc 2",
          rate: 2,
        },
        {
          id: 3,
          name: "Name 3",
          desc: "Some desc 3",
          rate: 3,
        },
        {
          id: 4,
          name: "Name 4",
          desc: "Some desc 4",
          rate: 4,
        },
        {
          id: 5,
          name: "Name 5",
          desc: "Some desc 5",
          rate: 5,
        },
      ]);
    
    function deleteItem(id){
  
        setItemList(prev=> prev.filter((elem)=>elem.id!==id))
    }

    function closeModal() {
        modalRef.current.close();
    }

    function onSave(opt) {
                let newObj = {
            id: countRef.current,
            name: `${opt.values.name} ${countRef.current}`,
            desc: `${opt.values.desc} ${countRef.current}`,
            rate: opt.values.rate,
        }   
        setItemList(prev=> [...prev, newObj]) 
        countRef.current++;
    }
    function addNew(){
        // let newObj = {
        //     id: countRef.current,
        //     name: `Name ${countRef.current}`,
        //     desc: `Some desc ${countRef.current}`,
        //     rate: `3`
        // }             
        // setItemList(prev=> [...prev, newObj]) 
        // countRef.current++;
        modalRef.current.open({header: "Create item", content: <Form cancel={closeModal} save={onSave} />, footer: <UU5.Forms.ContextControls />, size: "l"})
    }
    function showMore(){
        setShow(prev=>prev+2)
    }
  return (
  <div>
      <UU5.Forms.ContextModal ref={modalRef} />
    <UU5.Bricks.Header content="Some header" />
        <UU5.Bricks.Button content="add new"onClick={addNew} colorSchema="blue" />
    {itemList.map((item, key) => {    

        
     if(item.id<show)  { return (
            <UU5.Bricks.Card key={key}>
                <h3>
                    {item.name}
                </h3>
                <p>
                    {item.desc}
                </p>
                <UU5.Bricks.Rating value={item.rate} />
                <UU5.Bricks.Button onClick={()=>deleteItem(item.id)} colorSchema="red">
                    <UU5.Bricks.Icon icon="mdi-delete"/>
                </UU5.Bricks.Button>

 
            </UU5.Bricks.Card>
            
        )   }

    })          
    }
    {itemList.length>=show?<UU5.Bricks.Button borderRadius="12px"content="Show more"onClick={showMore} colorSchema="blue" />: null}

  </div>);
}
//@@viewOff:render
  
});

export default Some;
