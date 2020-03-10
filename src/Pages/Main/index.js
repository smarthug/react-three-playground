import React from "react";
import DockLayout from "rc-dock";
import './dock.css'

const defaultLayout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            {id: 'tab1', title: 'tab1', content: <div>Hello World</div>},
            {id: 'tab2', title: 'tab1', content: <div>Hello World</div>}
          ]
        }
      ]
    }
  };


export default function Main() {
  return <DockLayout style={{height: "100%", width: "100%"}} defaultLayout={defaultLayout} />;
}
