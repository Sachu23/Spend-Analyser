//import { useNavigate } from 'react-router-dom'

import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from '../../img/bg.png'
import {MainLayout} from '../../styles/Layouts'
import Orb from '../../components/Orb/Orb'
import Navigation from '../../components/Navigation/Navigation'
import Dashboard from '../../components/Dashboard/Dashboard';
import Income from '../../components/Income/Income'
import Expenses from '../../components/Expenses/Expenses';
import { useGlobalContext } from '../../context/globalContext';
import Transaction from '../../Transactions/Transaction'


const Home = (props) => {
const [active, setActive] = useState(1)

const global = useGlobalContext();
console.log(global);

const displayData = () => {
  switch(active){
    case 1:
      return <Dashboard />
    case 2:
      return <Transaction />
    case 3:
      return <Income />
    case 4: 
      return <Expenses />
    default: 
      return <Dashboard />
  }
}

const orbMemo = useMemo(() => {
  return <Orb />
},[])

return (
  <AppStyled bg={bg} className="App">
    {orbMemo}
    <MainLayout>
      <Navigation active={active} setActive={setActive} />
      <main>
        {displayData()}
      </main>
    </MainLayout>
  </AppStyled>
);
}

const AppStyled = styled.div`
  height: 100vh;
  background-color: #36669d;
background-image: linear-gradient(315deg, #36669d 0%, #d3d3d3 74%);


  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;
 export default Home;