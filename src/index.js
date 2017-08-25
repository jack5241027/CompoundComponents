import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components';

const tabsData = [
  {
    label: 'Label1',
    content: 'Content1',
  },
  {
    label: 'Label2',
    content: 'Content2',
  },
  {
    label: 'Label3',
    content: 'Content3',
    isDisable: true,
  },
];


const TabWrap = styled.div`
  display: block;
`;

const TabListWrap = styled.div`
  display: block;
`;

const TabItemWrap = styled.div`
  display: inline-block;
  margin: 5px;
  cursor: ${props => props.isDisable ? 'auto' : 'pointer' };
  ${props => props.isDisable ? 'background-color: #999' : '' };
  ${props => props.isActive ? 'border-bottom: 2px solid yellow' : '' };
`;

const Panel = styled.div`
  margin-top: 10px;
  border: 1px solid red;
`;

const NoteWrap = styled.div`
  margin: 10px;
  background-color: #e3dfdd;
`;

// const TabList = ({ labels, handleClick, disable = [] }) => (
//   <div>
//     {labels.map((label, index) => {
//       if (disable.includes(index)) {
//         return <TabItemWrap isDisable onClick={null}>{label}</TabItemWrap>;
//       }
//       return <TabItemWrap onClick={() => handleClick(index)}>{label}</TabItemWrap>;
//     })}
//   </div>
// );

// class Tab extends PureComponent {
//   state = {
//     activeIndex: 0,
//   };

//   handleSwitchTab = (activeIndex) => {
//     this.setState({ activeIndex })
//   }

//   render() {
//     const {
//       tabsData,
//       tabPos = 'top',
//       notePos = 'top',
//       Note,
//       disable,
//     } = this.props;
//     const { activeIndex } = this.state;
//     return (
//       <TabWrap>
//         { tabPos === 'top' && (
//           <TabList
//             disable={disable}
//             handleClick={this.handleSwitchTab}
//             labels={tabsData.map(tab => tab.label)}
//           />
//         ) }
//         { Note && notePos === 'top' && <Note /> }
//         <Panel>{tabsData[activeIndex].content}</Panel>
//         { Note && notePos === 'middle' && <Note /> }
//         { tabPos === 'bottom' && <TabList disable={disable} handleClick={this.handleSwitchTab} labels={tabsData.map(tab => tab.label)}/> }
//         { Note && notePos === 'bottom' && <Note /> }
//       </TabWrap>
//     );
//   }
// };

// class App extends PureComponent {
//   render() {
//     return (
//       <div>
//         <Tab
//           tabPos="bottom"
//           notePos="bottom"
//           Note={() => (
//             React.cloneElement(<NoteWrap />, {
//               children: 'NoteNoteNoteNote',
//             })
//           )}
//           disable={[ 1 ]}
//           tabsData={tabsData}
//         />
//       </div>
//     )
//   }
// }


// ================================================================


class Tab extends PureComponent {
  state = {
    activeIndex: 0,
  };

  handleSwitchTab = (activeIndex) => {
    this.setState({ activeIndex })
  }
  render() {
    const { activeIndex } = this.state;
    const children = React.Children.map(
      this.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          activeIndex,
          handleSwitchTab: this.handleSwitchTab
        })
      }
    )
    return (
      <TabWrap>
        {children}
      </TabWrap>
    );
  }
}

class TabList extends PureComponent {
  render() {
    const { activeIndex } = this.props;
    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        isActive: index === activeIndex,
        handleSwitchTab: () => this.props.handleSwitchTab(index)
      })
    });
    return <TabListWrap>{children}</TabListWrap>
  }
}

class TabItem extends PureComponent {
  render() {
    const { children, isActive, isDisable, handleSwitchTab } = this.props;
    return (
      <TabItemWrap
        isActive={isActive}
        isDisable={isDisable}
        onClick={isDisable ? null : handleSwitchTab}
      >{children}</TabItemWrap>
    );
  }
}

class TabPanels extends PureComponent {
  render() {
    const { children, activeIndex } = this.props;
    return <Panel>{children[activeIndex]}</Panel>
  }
}
class TabPanel extends PureComponent {
  render() {
    const { children } = this.props;
    return <div>{children}</div>
  }
}

class TabWithData extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <Tab>
        <TabPanels
          // activeIndex={2} 回老路
        >
          {data.map(tab => <TabPanel>{tab.content}</TabPanel>)}
        </TabPanels>
        <TabList>
          {data.map(tab => <TabItem isDisable={tab.isDisable} >{tab.label}</TabItem>)}
        </TabList>
      </Tab>
    );
  }
}

// const options = [
//   {
//     Name: 'jack',
//   }
// ]
// <Select options={options}>

// <Select>
// {
//   options.map(option => <Option name={option.Name}>  </Option>)
// }
// </Select>

class App extends React.Component {
  render() {
    return (
      <div>
        <TabWithData data={tabsData} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />
, document.getElementById('root'));
