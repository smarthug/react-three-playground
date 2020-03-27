import React from 'react';

import {DockLayout, DockContextType} from 'rc-dock';

import 'rc-dock/dist/rc-dock.css'

//import './dock.css'

import Scene from './scene'
console.log('hifefefhi')
let tab = {
  content: <div>Tab Content</div>,
  closable: true,
};

let layout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          size: 200,
          children: [
            {
              tabs: [{...tab, id: 't1', title: 'Tab 1'}, {...tab, id: 't2', title: 'Tab 2'}],
            },
            {
              tabs: [{
                ...tab, id: 't3', title: 'Min Size', content: (
                  <div>
                    <p>This tab has a minimal size</p>
                    150 x 150 px
                  </div>
                ), minWidth: 150, minHeight: 150,
              }],
            },
          ]
        },
        {
          size: 1000,
          tabs: [
            {
              ...tab, id: 't5', title: 'basic demo', content: (
                <Scene />
              ),
            },
           
          ],
          panelLock: {panelStyle: 'main'},
        },
        {
          size: 200,
          tabs: [{...tab, id: 't8', title: 'Tab 8'}],
        },
      ]
    },
    
  }
;
if (window.innerWidth < 600) {
  // remove a column for mobile
  layout.dockbox.children.pop();
}

let count = 0;

export default class Demo extends React.Component {

  

  render() {
    return (
      <DockLayout defaultLayout={layout} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}/>
    );
  }
}


